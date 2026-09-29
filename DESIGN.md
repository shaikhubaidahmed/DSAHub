# DSAHub Design System

## Visual direction

DSAHub is a focused practice workspace for developers with a GeeksforGeeks-inspired color scheme: white panels on a light grey page, GFG green for action, charcoal ink, and a neutral near-black dark mode. High-contrast editorial type, compact mono metadata, and quiet panels keep the problem list in focus. The experience should feel like a well-made developer tool, not a generic dashboard.

## Color roles

- Canvas: light grey `#F6F7F8` with white `#FFFFFF` panels in light mode; neutral dark `#141516` with `#1E1F21` panels in dark mode.
- Primary practice action (buttons, progress, focus, links): GFG green `#2B8543` in light mode (a touch deeper than `#2F8D46` for small-text contrast) and `#4EB769` in dark mode.
- DSA brand color / NeetCode / LeetCode: charcoal `#273239` in light mode and `#E6E8E9` in dark mode.
- Hub brand color / Striver / GFG: GFG green, same as the action color.
- Text: `#273239` / `#E6E8E9`; muted text: `#5D6A72` / `#A0A6AA`.
- Borders: `#E0E4E7` on light surfaces and `#36393C` on dark surfaces.
- The header is white (dark: `#1B1C1E`) with a hairline border, like GFG's.
- Status: in progress uses amber, completed uses green; both are paired with icons, never color alone.

## Wordmark and logo

Always render the product as `DSAHub` with no space. `DSA` uses the charcoal brand color and `Hub` uses GFG green. The logo is an original SVG signal-graph mark: two chevrons connect through a central node, representing patterns converging into a practice hub. Do not replace it with a generic letter avatar.

## Typography

- Interface, headings, actions, and editorial copy: Apple's system font (SF Pro) via `-apple-system`, falling back to Segoe UI / Inter / Roboto on other platforms.
- Metadata, counts, shortcuts, and source badges: SF Mono via `ui-monospace`, falling back to Menlo / Consolas.
- Keep tracking natural: at most about -0.03em on display headings, and close to 0 elsewhere.
- Use the shared scale from 10px metadata through 68px display headings; keep problem rows compact and scannable.

## Progress visuals

- Overall progress uses a ring widget: concentric rings for overall (green), NeetCode (amber) and Striver (red), plus a dot grid with one dot per problem colored by status. A legend with counts accompanies it, so color is never the only signal.
- Per-pattern progress uses a small single ring with the percentage in the center. There are no linear progress bars.

## UI rules

- No gradients, decorative blobs, or excessive glassmorphism.
- Use subtle 8–12px rounding on primary panels and buttons; problem rows remain dense.
- Use GFG green for action and progress, with charcoal/green reserved for the DSAHub identity and source distinctions.
- Keep Lucide icons for interface controls; use the custom SVG only for the DSAHub brand mark.
- Preserve visible focus rings, keyboard search with `/`, reduced-motion support, and responsive layouts at 375px, 768px, 1024px, and 1440px.
