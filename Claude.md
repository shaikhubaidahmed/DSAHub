# DSA PROBLEM HUB — CLAUDE CODE INSTRUCTIONS

## 1. ROLE

You are the lead frontend engineer, UI/UX designer, and product engineer for this project.

I will provide you with a PDF containing a curated and deduplicated collection of DSA problems from **NeetCode 150 + Striver Master DSA Patterns**.

Your job is to:

1. Read and understand the entire PDF.
2. Extract the problem structure accurately.
3. Convert the PDF content into a polished, modern, production-quality website.
4. Preserve the organization and categorization from the PDF.
5. Create a highly usable DSA practice experience.
6. Find and attach the appropriate problem links.
7. Do NOT simply reproduce the PDF visually. Transform its content into a much better web experience.

The uploaded PDF is the source of truth for the problem list, categories, badges, and relationships.

---

# 2. SOURCE DATA

The PDF contains a deduplicated reference of:

- NeetCode 150
- Striver Master DSA Patterns
- Shared problems between both
- Problems grouped by DSA pattern/topic
- Platform/source links where available

The source contains **269 unique entries**.

Important:

- Do NOT invent problems.
- Do NOT silently remove problems.
- Do NOT rename problems unnecessarily.
- Do NOT change the categorization unless there is a clear technical reason.
- Preserve meaningful notes from the PDF.
- Shared problems should be represented as shared rather than duplicated.

The PDF explicitly uses:

- `[N]` = NeetCode 150
- `[S]` = Striver Master DSA Patterns
- `[N] [S]` = shared problem

Preserve this distinction in the website.

---

# 3. LINK HANDLING

This is extremely important.

For every problem, determine the best available practice link.

### Priority:

1. **LeetCode**
2. **GeeksForGeeks (GFG)** if there is no suitable LeetCode problem
3. Striver / takeUforward reference
4. NeetCode reference
5. YouTube reference where available

### LeetCode rule

If the PDF indicates that a valid/corresponding LeetCode problem exists:

- Add the LeetCode link.
- Make the LeetCode button prominent.
- Use the actual problem URL.
- Do not fabricate a URL.

Example:

```text
Two Sum
→ LeetCode
→ https://leetcode.com/problems/two-sum/
```

### GFG fallback

If there is no suitable LeetCode problem for the specific problem/variant:

- Search for the corresponding GeeksForGeeks problem.
- Add the GFG link.
- Label it clearly as `GFG`.

Do NOT force a LeetCode mapping when the problem variant is materially different.

For example, the PDF explicitly contains cases where a Striver problem is a different variant from an existing LeetCode problem. Preserve that distinction.

### Link verification

When researching links:

- Prefer canonical problem pages.
- Verify that the problem title and problem statement correspond.
- Do not use search-result URLs.
- Do not use random blog posts as the primary problem link.
- Do not fabricate links based solely on the title.

If no reliable link can be verified, leave the link unavailable rather than inventing one.

---

# 4. TECH STACK

Use a modern production-grade stack.

## Required

- TypeScript
- React
- Next.js
- Tailwind CSS
- Modern component architecture
- Responsive design
- Dark mode + Light mode

Prefer:

- Next.js App Router
- TypeScript strict mode
- Tailwind CSS
- shadcn/ui where useful
- Lucide icons
- Framer Motion / Motion for subtle animations
- Zustand or another lightweight state solution only if genuinely necessary

Avoid unnecessary dependencies.

The application should be fast and maintainable.

---

# 5. IMPORTANT: DO NOT MAKE IT LOOK LIKE A GENERIC AI-GENERATED WEBSITE

This is one of the highest-priority requirements.

DO NOT create a typical:

- Claude-style UI
- ChatGPT-style UI
- Generic AI dashboard
- Generic SaaS landing page
- Excessive glassmorphism
- Huge gradients everywhere
- Random glowing blobs
- Excessive rounded cards
- Purple/blue AI aesthetic
- Fake statistics
- Generic "AI-powered learning" copy

The site should feel like a **real developer-built DSA platform**.

It should look intentional, editorial, technical, and premium.

The visual identity should communicate:

> serious DSA practice + modern developer product

rather than:

> AI-generated dashboard

---

# 6. DESIGN INSPIRATION

The overall information architecture and visual discipline should be inspired by:

**takeUforward / TUF-style educational websites**

Use the general principles:

- Strong topic hierarchy
- Clear problem organization
- Practical navigation
- Content-first layout
- Problem lists that are easy to scan
- Strong typography
- Educational/product feel

DO NOT copy their design pixel-for-pixel.

Take inspiration from the structure and usability, then create an original design system.

---

# 7. BRAND / PRODUCT DIRECTION

The website should feel like a dedicated DSA problem hub.

Think:

- LeetCode's clarity
- takeUforward's structured learning approach
- modern developer documentation
- editorial knowledge base
- lightweight productivity tool

But with its own identity.

The interface should feel excellent even before interacting with it.

---

# 8. CORE PAGES

Create at least the following pages.

## `/`

Homepage / dashboard

Should contain:

- Product identity
- Short explanation
- Overall progress
- Total problem count
- NeetCode count
- Striver count
- Shared count
- Topic overview
- Continue practicing section
- Quick navigation
- Search

Do NOT invent fake user statistics.

If progress tracking is not persisted yet, show meaningful static collection statistics from the PDF instead.

---

## `/problems`

Main problem explorer.

Features:

- Search
- Topic filters
- Source filters
- Difficulty filters if reliable difficulty data is available
- Completion filter
- Sorting
- Grid/list toggle if appropriate
- Problem cards/table

Each problem should display:

```text
Problem title

[N] [S]

Topic / Pattern

[LeetCode] / [GFG]

[NeetCode] [Striver]
```

Keep the UI compact and scannable.

---

## `/patterns`

Pattern/topic explorer.

Display all categories from the PDF.

Examples include:

- Arrays & Hashing
- Two Pointers
- Sliding Window
- Stacks & Queues
- Binary Search
- Linked Lists
- Binary Trees & BSTs
- Heaps & Priority Queues
- Recursion & Backtracking
- Tries
- Graphs
- Dynamic Programming
- Greedy & Intervals
- Math & Geometry
- Bit Manipulation
- String Matching

Use the actual PDF categories as the source of truth.

Each pattern should show:

- Number of problems
- NeetCode problems
- Striver problems
- Shared problems
- Progress

---

## `/pattern/[slug]`

Pattern-specific page.

Example:

```text
/pattern/arrays-hashing
```

Page structure:

```text
Breadcrumb

Pattern title

Description / short explanation

Progress

Problem list

Related resources
```

The problem list should make it extremely easy to work through the topic sequentially.

---

## `/problem/[slug]`

Individual problem page.

Example:

```text
/problem/two-sum
```

Structure:

```text
Breadcrumb

Two Sum

[N] [S]

Topic: Arrays & Hashing

Practice

[LeetCode]
[NeetCode]
[Striver]

Problem metadata

Notes

Related problems

Previous / Next
```

If the PDF contains notes about a variant, display them.

Do not invent explanations or solutions unless explicitly requested later.

---

# 9. PROBLEM CARD DESIGN

Problem cards should NOT look like giant generic SaaS cards.

Prefer compact, information-dense layouts.

Example:

```text
01

Two Sum
Arrays & Hashing

[N] [S]

                    LeetCode →
```

or:

```text
Two Sum
[N] [S]     Arrays & Hashing

✓ Completed

LeetCode   Striver   NeetCode
```

Use subtle borders, typography, spacing, and hover states.

Avoid excessive shadows.

---

# 10. NAVIGATION

Create a clean navigation system.

Desktop:

```text
Logo

Problems
Patterns
Progress

                    Search
                    Theme
```

Mobile:

- Bottom navigation OR compact mobile navigation
- Search should remain easily accessible
- Do not overcrowd the header

The navigation should remain useful even when browsing hundreds of problems.

---

# 11. SEARCH

Implement a genuinely useful search experience.

Search should match:

- Problem title
- Topic
- Pattern
- NeetCode/Striver source

Examples:

Searching:

```text
binary
```

should find:

- Binary Search
- Binary Tree problems
- Binary Search Tree problems
- etc.

Searching:

```text
two sum
```

should find the appropriate problem immediately.

Use debounced search if needed.

---

# 12. FILTERING

Provide useful filters.

At minimum:

### Source

- All
- NeetCode
- Striver
- Shared

### Topic

All PDF topics.

### Status

- All
- Completed
- In Progress
- Not Started

### Platform

- All
- LeetCode
- GFG

Keep filtering fast and visually clean.

---

# 13. PROGRESS TRACKING

Implement local progress tracking.

Each problem should support:

- Not Started
- In Progress
- Completed

Persist the state locally using:

```text
localStorage
```

Do NOT require authentication.

The user should be able to close and reopen the site without losing progress.

Also provide:

- Overall progress
- Per-topic progress
- NeetCode progress
- Striver progress

Do not fake progress values.

---

# 14. DARK MODE / LIGHT MODE

Both themes are mandatory.

Dark mode should NOT simply be:

```text
background: #000
text: #fff
```

Create a proper design system.

### Light mode

Should feel:

- clean
- paper/editorial
- technical
- comfortable for long study sessions

### Dark mode

Should feel:

- developer-oriented
- sophisticated
- low eye strain
- not pitch black everywhere

Persist the user's theme preference.

Respect system preference initially.

---

# 15. TYPOGRAPHY

Use a strong modern typography system.

Possible combinations:

- Geist
- Inter
- IBM Plex Sans
- JetBrains Mono for code/technical metadata

Do not use too many fonts.

Use monospace selectively for:

- problem numbers
- technical labels
- statistics
- keyboard shortcuts

---

# 16. COLORS

Do not make the entire UI dependent on gradients.

Use a restrained palette.

Possible direction:

- Neutral base
- One strong accent
- Distinct source badges

For example:

```text
NeetCode → subtle orange/red accent
Striver → subtle green accent
LeetCode → subtle platform accent
GFG → subtle green accent
```

But keep the overall design cohesive.

Do not make every card colorful.

---

# 17. MICRO INTERACTIONS

Use subtle motion.

Examples:

- Problem card hover
- Button hover
- Filter transitions
- Page transitions
- Progress bar animation
- Theme transition
- Search interaction
- Completion state animation

Animations should feel intentional.

Avoid:

- excessive bouncing
- floating UI
- flashy gradients
- distracting animations

---

# 18. RESPONSIVENESS

The website must work extremely well on:

- Desktop
- Laptop
- Tablet
- Mobile

Do not simply shrink the desktop layout.

Design mobile layouts intentionally.

On mobile:

- Cards become compact
- Filters become drawers/sheets
- Navigation becomes mobile-friendly
- Problem links remain accessible
- Typography scales properly

---

# 19. ACCESSIBILITY

Implement:

- semantic HTML
- keyboard navigation
- visible focus states
- sufficient contrast
- accessible buttons
- accessible dialogs
- ARIA labels where needed

Do not rely solely on color to communicate state.

---

# 20. DATA ARCHITECTURE

Do NOT hardcode 269 problems directly into React components.

Create a structured dataset.

Example:

```ts
type ProblemSource = "neetcode" | "striver";

type Platform = "leetcode" | "gfg" | "neetcode" | "takeuforward" | "youtube";

interface Problem {
  id: string;
  title: string;
  slug: string;

  category: string;

  sources: ProblemSource[];

  links: {
    leetcode?: string;
    gfg?: string;
    neetcode?: string;
    takeuforward?: string;
    youtube?: string;
  };

  note?: string;
}
```

Store the problem dataset separately.

Possible structure:

```text
src/
  data/
    problems.ts
    categories.ts

  components/
    problems/
    patterns/
    navigation/
    progress/
    ui/

  app/
    page.tsx
    problems/
    patterns/
    problem/

  lib/
    progress.ts
    search.ts
    utils.ts
```

Adapt the structure to the chosen framework conventions.

---

# 21. DATA EXTRACTION RULES

When converting the PDF:

1. Read ALL 10 pages.
2. Extract every category.
3. Extract every problem.
4. Preserve `[N]`, `[S]`, and `[N][S]`.
5. Preserve meaningful notes.
6. Preserve verified platform relationships.
7. Do not duplicate shared problems.
8. Generate stable slugs.
9. Generate stable IDs.
10. Validate the final dataset.

The final dataset should contain **269 unique entries**, matching the source unless a source parsing issue is explicitly identified.

Create a validation script if useful.

For example:

```bash
npm run validate-data
```

It should check:

- duplicate IDs
- duplicate slugs
- missing titles
- invalid categories
- malformed links
- missing source information

---

# 22. LINK RESEARCH

The PDF identifies which entries have LeetCode / NeetCode / Striver / YouTube references.

For problems where a direct LeetCode URL is clearly available:

```text
https://leetcode.com/problems/<slug>/
```

Verify mappings where necessary.

If there is no suitable LeetCode equivalent:

Search for the corresponding GFG problem.

Important:

A similarly named LeetCode problem is NOT automatically equivalent.

Respect the PDF's notes regarding variants.

Example from the source:

- "Merge two sorted arrays without extra space" is specifically noted as an in-place two-array variant with no exact LeetCode link verified.
- "Number of islands" has a Striver variant involving eight-direction connectivity that differs from the standard LeetCode 200 problem.

Do not incorrectly merge these variants.

---

# 23. PDF NOTES

Where the PDF contains a note such as:

```text
Note: Shared: kth smallest. Striver additionally includes kth largest...
```

do not discard it.

Expose useful notes on the relevant problem page, perhaps as:

```text
Source note
```

or

```text
Variant note
```

These notes are valuable because they explain why seemingly similar problems were not merged.

---

# 24. PERFORMANCE

The website should remain fast with all 269 problems.

Avoid:

- unnecessary client components
- massive bundles
- unnecessary dependencies
- rendering expensive components repeatedly

Use server components where appropriate.

Only make components client-side when interactivity requires it.

Search/filter/progress functionality can use client-side state.

---

# 25. SEO

Add proper:

- page titles
- metadata
- descriptions
- OpenGraph metadata where appropriate
- semantic headings

Problem pages should have useful metadata.

Example:

```text
Two Sum — DSA Problem Hub
```

---

# 26. UX DETAILS

Add useful small touches:

### Keyboard shortcut

Allow:

```text
/
```

to focus search.

### Problem completion

Use a checkbox/check control.

### Previous / Next

Problem pages should support:

```text
← Previous
Next →
```

within the current pattern.

### Breadcrumbs

Example:

```text
Patterns / Arrays & Hashing / Two Sum
```

### External links

External platform links should clearly indicate they open an external website.

---

# 27. DO NOT ADD UNREQUESTED FEATURES

Do NOT add:

- authentication
- payments
- social profiles
- chat
- AI assistant
- fake leaderboards
- fake community statistics
- unnecessary backend
- database
- complex authentication system

Unless explicitly requested later.

Keep the project focused.

---

# 28. IMPLEMENTATION PROCESS

Before writing large amounts of code:

### Step 1

Inspect the repository.

### Step 2

Inspect the supplied PDF.

### Step 3

Extract and structure the data.

### Step 4

Create the application architecture.

### Step 5

Build the design system.

### Step 6

Build the main layout/navigation.

### Step 7

Build the problem explorer.

### Step 8

Build pattern pages.

### Step 9

Build individual problem pages.

### Step 10

Implement search/filtering.

### Step 11

Implement local progress tracking.

### Step 12

Implement dark/light themes.

### Step 13

Verify all problem data.

### Step 14

Run the application and inspect it visually.

### Step 15

Fix layout/UX issues.

### Step 16

Run lint/typecheck/build.

---

# 29. QUALITY BAR

Do not stop after producing a technically functional website.

The result should feel like a product someone would actually want to use every day for DSA preparation.

Ask yourself:

- Does the problem list feel effortless to browse?
- Can I find a problem in seconds?
- Is the hierarchy obvious?
- Does the site feel good in dark mode?
- Does it look professional on mobile?
- Does it feel different from an AI-generated template?
- Are NeetCode and Striver relationships obvious?
- Are external problem links easy to access?
- Does progress tracking feel useful?
- Does the interface encourage focused practice?

If the answer is no, improve it.

---

# 30. FINAL RULE

Prioritize:

```text
DATA ACCURACY
>
USABILITY
>
VISUAL QUALITY
>
PERFORMANCE
>
EXTRA FEATURES
```

The PDF is the source of truth for the problem collection.

The website should be an original, polished, modern DSA learning interface inspired by the information architecture of takeUforward, but it must have its own visual identity.

Do not produce a generic AI dashboard.

Build a real DSA product.