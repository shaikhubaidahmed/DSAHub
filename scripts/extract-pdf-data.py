#!/usr/bin/env python3
"""Extract the structured problem catalog from the supplied reference PDF.

The reference is intentionally treated as the source of truth. The script
reads problem headings, source markers, notes, and clickable URLs from the PDF
annotations and writes a typed TypeScript data module.
"""

from __future__ import annotations

import argparse
import json
import re
from collections import Counter
from pathlib import Path

import fitz


CATEGORY_NAMES = {
    "Arrays & Hashing": "Arrays & Hashing",
    "Two Pointers": "Two Pointers",
    "Sliding Window": "Sliding Window",
    "Stacks & Queues": "Stacks & Queues",
    "Binary Search": "Binary Search",
    "Linked Lists": "Linked Lists",
    "Binary Trees & Bsts": "Binary Trees & BSTs",
    "Heaps & Priority Queues": "Heaps & Priority Queues",
    "Recursion & Backtracking": "Recursion & Backtracking",
    "Tries": "Tries",
    "Graphs: Traversal & Connectivity": "Graphs: Traversal & Connectivity",
    "Graphs: Paths & Spanning Trees": "Graphs: Paths & Spanning Trees",
    "Dynamic Programming": "Dynamic Programming",
    "Greedy & Intervals": "Greedy & Intervals",
    "Math & Geometry": "Math & Geometry",
    "Bit Manipulation": "Bit Manipulation",
    "String Matching": "String Matching",
}


# The PDF includes direct links for the NeetCode/Striver references, but it
# does not include GFG fallbacks for the entries that have no suitable
# LeetCode equivalent. Keep those curated mappings here so regenerating the
# dataset never drops them. Keys use the stable slugs generated below.
GFG_LINKS_BY_SLUG = {
    "count-inversions": "https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1",
    "count-subarrays-with-given-xor-k": "https://www.geeksforgeeks.org/problems/count-subarray-with-given-xor/1",
    "merge-two-sorted-arrays-without-extra-space": "https://www.geeksforgeeks.org/problems/merge-two-sorted-arrays-1587115620/1",
    "next-greater-element": "https://www.geeksforgeeks.org/problems/next-larger-element-1587115620/1",
    "find-nth-root-of-a-number": "https://www.geeksforgeeks.org/problems/find-nth-root-of-m5843/1",
    "aggressive-cows": "https://www.geeksforgeeks.org/problems/aggressive-cows/1",
    "book-allocation-problem": "https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1",
    "matrix-median": "https://www.geeksforgeeks.org/problems/median-in-a-row-wise-sorted-matrix1527/1",
    "kth-element-of-2-sorted-arrays": "https://www.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array1317/1",
    "length-of-loop-in-ll": "https://www.geeksforgeeks.org/problems/find-length-of-loop/1",
    "sort-a-linked-list-of-0-s-1-s-and-2-s": "https://www.geeksforgeeks.org/problems/given-a-linked-list-of-0s-1s-and-2s-sort-it/1",
    "flattening-of-ll": "https://www.geeksforgeeks.org/problems/flattening-a-linked-list/1",
    "top-view-of-bt": "https://www.geeksforgeeks.org/problems/top-view-of-binary-tree/1",
    "inorder-successor-and-predecessor-in-bst": "https://www.geeksforgeeks.org/problems/predecessor-and-successor/1",
    "heapify-algorithm": "https://www.geeksforgeeks.org/problems/operations-on-binary-min-heap/1",
    "build-heap-from-a-given-array": "https://www.geeksforgeeks.org/problems/heap-sort/1",
    "implement-min-heap": "https://www.geeksforgeeks.org/problems/min-heap-implementation/1",
    "number-of-islands-graphs-traversal-and-connectivity-2": "https://www.geeksforgeeks.org/problems/find-the-number-of-islands/1",
    "distance-of-nearest-cell-having-one": "https://www.geeksforgeeks.org/problems/distance-of-nearest-cell-having-1-1587115620/1",
    "detect-a-cycle-in-an-undirected-graph": "https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1",
    "detect-a-cycle-in-a-directed-graph": "https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1",
    "topological-sort-or-kahn-s-algorithm": "https://www.geeksforgeeks.org/problems/topological-sort/1",
    "kosaraju-s-algorithm": "https://www.geeksforgeeks.org/problems/strongly-connected-components-kosarajus-algo/1",
    "articulation-point-in-graph": "https://www.geeksforgeeks.org/problems/articulation-point-1/1",
    "shortest-path-in-undirected-graph-with-unit-weights": "https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph-having-unit-distance/1",
    "shortest-path-in-dag": "https://www.geeksforgeeks.org/problems/shortest-path-in-directed-acyclic-graph/1",
    "dijkstra-s-algorithm": "https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1",
    "bellman-ford-algorithm": "https://www.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1",
    "floyd-warshall-algorithm": "https://www.geeksforgeeks.org/problems/implementing-floyd-warshall2042/1",
    "disjoint-set": "https://www.geeksforgeeks.org/problems/disjoint-set-union-find/1",
    "find-the-mst-weight": "https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1",
    "frog-jump-with-k-distances": "https://www.geeksforgeeks.org/problems/minimal-cost/1",
    "ninja-s-training": "https://www.geeksforgeeks.org/problems/geeks-training/1",
    "0-and-1-knapsack": "https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1",
    "partition-a-set-into-two-subsets-with-minimum-absolute-sum-difference": "https://www.geeksforgeeks.org/problems/minimum-sum-partition3317/1",
    "longest-common-substring": "https://www.geeksforgeeks.org/problems/longest-common-substring1452/1",
    "matrix-chain-multiplication": "https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1",
    "n-meetings-in-one-room": "https://www.geeksforgeeks.org/problems/activity-selection-1587115620/1",
    "minimum-number-of-platforms-required-for-a-railway": "https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1",
    "job-sequencing-problem": "https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1",
    "print-all-primes-till-n": "https://www.geeksforgeeks.org/problems/sieve-of-eratosthenes5242/1",
    "rabin-karp-algorithm": "https://www.geeksforgeeks.org/problems/search-pattern-rabin-karp-algorithm--141631/1",
    "z-function": "https://practice.geeksforgeeks.org/problems/search-pattern-z-algorithm/1",
    "kmp-algorithm-or-lps-array": "https://www.geeksforgeeks.org/problems/longest-prefix-suffix2527/1",
}


# The PDF carries NeetCode walkthrough videos for NeetCode 150 entries, but only
# two Striver videos. Striver videos are curated from the official takeUforward
# A2Z sheet (matched by the practice-page slug the PDF links to) and verified as
# "take U forward" uploads via YouTube oEmbed. Keys use the stable slugs below.
STRIVER_VIDEOS_BY_SLUG: dict[str, str] = json.loads(
    Path(__file__).with_name("striver-videos.json").read_text(encoding="utf-8")
)


# Difficulty is not in the PDF. It is the official rating from the platform the
# entry links to: LeetCode (GraphQL `question.difficulty`) when a LeetCode link
# exists, otherwise the GFG practice API (`difficulty`). The GFG Z-function page
# is access-restricted, so that entry is left unrated rather than guessed.
DIFFICULTY_BY_SLUG: dict[str, str] = json.loads(
    Path(__file__).with_name("difficulties.json").read_text(encoding="utf-8")
)


def youtube_id(uri: str) -> str | None:
    match = re.search(r"(?:youtu\.be/|[?&]v=|/embed/)([A-Za-z0-9_-]{11})", uri)
    return match.group(1) if match else None


def slugify(value: str) -> str:
    value = value.lower().replace("&", " and ")
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def normalize_uri(uri: str) -> str:
    """Keep source URLs canonical enough for direct practice links."""
    if "youtube.com" not in uri and "youtu.be" not in uri:
        return uri
    video_id = youtube_id(uri)
    return f"https://www.youtube.com/watch?v={video_id}" if video_id else uri


def parse_pdf(input_path: Path) -> list[dict]:
    document = fitz.open(input_path)
    problems: list[dict] = []
    current_category: str | None = None
    current: dict | None = None

    for page in document:
        lines: list[tuple[float, str]] = []
        for block in page.get_text("dict")["blocks"]:
            for line in block.get("lines", []):
                text = "".join(span["text"] for span in line["spans"]).strip()
                if text:
                    lines.append((line["bbox"][1], text))

        clickable_links = [
            (link["from"].y0, link.get("uri"))
            for link in page.get_links()
            if link.get("uri")
        ]

        for y, text in sorted(lines):
            if text.startswith("NeetCode 150 +") or text.startswith("Page "):
                continue
            if text.startswith("[N] = NeetCode 150"):
                continue

            if text.startswith("Note:"):
                if current:
                    note = text.removeprefix("Note:").strip()
                    current["note"] = f'{current["note"]} {note}'.strip() if current.get("note") else note
                continue

            category_match = re.match(r"^(.+?)\s*\((\d+)\)$", text)
            if category_match and not text.startswith("["):
                raw_name = category_match.group(1).strip().title()
                current_category = CATEGORY_NAMES.get(raw_name, raw_name)
                continue

            problem_match = re.match(
                r"^(?P<markers>(?:\[(?:N|S)\]\s*)+)(?P<title>.+)$", text
            )
            if problem_match:
                markers = re.findall(r"\[([NS])\]", problem_match.group("markers"))
                current = {
                    "title": problem_match.group("title").strip(),
                    "category": current_category,
                    "sources": ["neetcode" if marker == "N" else "striver" for marker in markers],
                    "links": {},
                }
                problems.append(current)
                continue

            if "|" in text or any(label in text for label in ("LeetCode", "NeetCode", "Striver", "YouTube")):
                for link_y, uri in clickable_links:
                    if current and abs(link_y - y) < 2:
                        uri = normalize_uri(uri)
                        if "leetcode.com" in uri:
                            current["links"]["leetcode"] = uri
                        elif "neetcode.io" in uri:
                            current["links"]["neetcode"] = uri
                        elif "takeuforward.org" in uri:
                            current["links"]["takeuforward"] = uri
                        elif "youtube.com" in uri or "youtu.be" in uri:
                            current["links"]["video"] = uri

    title_counts = Counter(slugify(problem["title"]) for problem in problems)
    used_ids: set[str] = set()
    slug_suffixes: Counter[str] = Counter()
    for problem in problems:
        base_slug = slugify(problem["title"])
        slug = base_slug
        if title_counts[base_slug] > 1:
            slug = f"{base_slug}-{slugify(problem['category'])}"
        if slug in used_ids:
            slug_suffixes[slug] += 1
            slug = f"{slug}-{slug_suffixes[slug] + 1}"
        used_ids.add(slug)
        problem["id"] = slug
        problem["slug"] = slug
        if "leetcode" not in problem["links"] and slug in GFG_LINKS_BY_SLUG:
            problem["links"]["gfg"] = GFG_LINKS_BY_SLUG[slug]
        # Split the PDF's single YouTube column by channel: its Striver videos
        # are all present in the curated map, everything else is NeetCode.
        pdf_video = problem["links"].pop("video", None)
        striver_video = STRIVER_VIDEOS_BY_SLUG.get(slug)
        if pdf_video and youtube_id(pdf_video) != youtube_id(striver_video or ""):
            problem["links"]["neetcodeVideo"] = pdf_video
        if striver_video:
            problem["links"]["striverVideo"] = striver_video
        if slug in DIFFICULTY_BY_SLUG:
            problem["difficulty"] = DIFFICULTY_BY_SLUG[slug]
        if not problem.get("note"):
            problem.pop("note", None)

    return problems


def write_module(output_path: Path, problems: list[dict]) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(problems, ensure_ascii=False, indent=2)
    module = f'''import type {{ Problem }} from "@/lib/types";

export const problems: Problem[] = {payload};

export const sourceTotals = {{
  neetcode: problems.filter((problem) => problem.sources.includes("neetcode")).length,
  striver: problems.filter((problem) => problem.sources.includes("striver")).length,
  shared: problems.filter((problem) => problem.sources.length === 2).length,
}} as const;
'''
    output_path.write_text(module, encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    problems = parse_pdf(args.input)
    write_module(args.output, problems)
    counts = Counter(source for problem in problems for source in problem["sources"])
    print(f"Extracted {len(problems)} problems")
    print(f"NeetCode: {counts['neetcode']}, Striver: {counts['striver']}, shared: {sum(len(p['sources']) == 2 for p in problems)}")


if __name__ == "__main__":
    main()
