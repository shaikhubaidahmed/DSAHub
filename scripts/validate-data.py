#!/usr/bin/env python3
"""Validate the extracted catalog against the PDF's explicit markers."""

from __future__ import annotations

import argparse
import importlib.util
import re
from collections import Counter
from pathlib import Path

extractor_path = Path(__file__).with_name("extract-pdf-data.py")
extractor_spec = importlib.util.spec_from_file_location("extractor", extractor_path)
if extractor_spec is None or extractor_spec.loader is None:
    raise RuntimeError(f"Unable to load {extractor_path}")
extractor = importlib.util.module_from_spec(extractor_spec)
extractor_spec.loader.exec_module(extractor)
parse_pdf = extractor.parse_pdf


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("dataset", type=Path)
    args = parser.parse_args()

    parsed = parse_pdf(args.pdf)
    dataset_text = args.dataset.read_text(encoding="utf-8")
    ids = re.findall(r'"id": "([^"]+)"', dataset_text)
    slugs = re.findall(r'"slug": "([^"]+)"', dataset_text)
    parsed_ids = [problem["id"] for problem in parsed]
    source_counts = Counter(source for problem in parsed for source in problem["sources"])
    gfg_fallbacks = sum("gfg" in problem["links"] for problem in parsed)

    failures: list[str] = []
    if len(parsed) != 269:
        failures.append(f"expected 269 problems, found {len(parsed)}")
    if len(ids) != len(set(ids)):
        failures.append("duplicate dataset ids")
    if len(slugs) != len(set(slugs)):
        failures.append("duplicate dataset slugs")
    if len(ids) != len(parsed_ids):
        failures.append(f"dataset id count {len(ids)} does not match parsed count {len(parsed_ids)}")
    if source_counts["neetcode"] != 150:
        failures.append(f"expected 150 NeetCode markers, found {source_counts['neetcode']}")
    if source_counts["striver"] != 178:
        failures.append(f"expected 178 explicit Striver markers, found {source_counts['striver']}")
    if sum(len(problem["sources"]) == 2 for problem in parsed) != 59:
        failures.append("shared marker count does not match the PDF")
    if any(not problem["title"] or not problem["category"] for problem in parsed):
        failures.append("missing title or category")
    if any(not problem["links"] for problem in parsed):
        failures.append("one or more problems have no clickable source links")
    if gfg_fallbacks != 44:
        failures.append(f"expected 44 curated GFG fallbacks, found {gfg_fallbacks}")
    if any(
        not url.startswith("https://")
        for problem in parsed
        for url in problem["links"].values()
    ):
        failures.append("one or more dataset links are not HTTPS URLs")
    if any(
        "gfg" in problem["links"]
        and "/problems/" not in problem["links"]["gfg"]
        and "practice.geeksforgeeks.org/problems/" not in problem["links"]["gfg"]
        for problem in parsed
    ):
        failures.append("one or more GFG fallbacks are not practice problem URLs")

    if any("neetcodeVideo" in problem["links"] and "neetcode" not in problem["sources"] for problem in parsed):
        failures.append("NeetCode video attached to a problem without the [N] marker")
    if any("striverVideo" in problem["links"] and "striver" not in problem["sources"] for problem in parsed):
        failures.append("Striver video attached to a problem without the [S] marker")
    if any(
        not problem["links"][key].startswith("https://www.youtube.com/watch?v=")
        for problem in parsed
        for key in ("neetcodeVideo", "striverVideo")
        if key in problem["links"]
    ):
        failures.append("one or more video links are not canonical YouTube watch URLs")

    unrated = [problem["title"] for problem in parsed if problem.get("difficulty") not in ("easy", "medium", "hard")]
    if unrated != ["Z function"]:
        failures.append(f"unexpected difficulty coverage; unrated entries: {unrated}")

    if failures:
        for failure in failures:
            print(f"FAIL: {failure}")
        raise SystemExit(1)

    print(f"OK: {len(parsed)} problems, {source_counts['neetcode']} NeetCode, {source_counts['striver']} explicit Striver, 59 shared")


if __name__ == "__main__":
    main()
