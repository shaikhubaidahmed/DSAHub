"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

export interface FilterOption {
  value: string;
  label: string;
}

// A styled single-select listbox; native <select> popups can't be themed.
export function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: FilterOption[]; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value));
  const selected = options[selectedIndex];

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  useEffect(() => {
    if (open) listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const openList = () => { setActive(selectedIndex); setOpen(true); };
  const choose = (index: number) => { onChange(options[index].value); setOpen(false); buttonRef.current?.focus(); };

  const onKeyDown = (event: KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) { event.preventDefault(); openList(); }
      return;
    }
    if (event.key === "ArrowDown") { event.preventDefault(); setActive((index) => Math.min(options.length - 1, index + 1)); }
    else if (event.key === "ArrowUp") { event.preventDefault(); setActive((index) => Math.max(0, index - 1)); }
    else if (event.key === "Home") { event.preventDefault(); setActive(0); }
    else if (event.key === "End") { event.preventDefault(); setActive(options.length - 1); }
    else if (event.key === "Enter" || event.key === " ") { event.preventDefault(); choose(active); }
    else if (event.key === "Escape" || event.key === "Tab") { setOpen(false); }
  };

  return (
    <div className={`filter-select ${open ? "is-open" : ""} ${value !== options[0]?.value ? "is-set" : ""}`} ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        className="filter-select-button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${label}: ${selected?.label}`}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
      >
        <span className="filter-select-value">{selected?.label}</span>
        <ChevronDown className="filter-select-chevron" size={15} aria-hidden="true" />
      </button>
      {open ? (
        <ul className="filter-select-list" role="listbox" id={listId} aria-label={label} ref={listRef}>
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${listId}-${index}`}
              data-index={index}
              role="option"
              aria-selected={option.value === value}
              className={`filter-select-option ${index === active ? "is-active" : ""}`}
              onMouseEnter={() => setActive(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => choose(index)}
            >
              <span>{option.label}</span>
              {option.value === value ? <Check size={14} aria-hidden="true" /> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
