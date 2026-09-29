# DsaHub
# DSA Hub

A focused Next.js practice system for the deduplicated NeetCode 150 + Striver Master DSA Patterns reference.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Data workflow

The PDF is the source of truth. The extracted catalog lives in `src/data/problems.ts` and can be regenerated with:

```bash
python3 scripts/extract-pdf-data.py NeetCode_Striver_Question_Reference.pdf src/data/problems.ts
npm run validate-data
```

The source contains 269 entries. Its headline says 179 Striver items, while the explicit `[S]` badges account for 178; the app uses the problem-level badges to avoid inventing a relationship.

## Local design skill

The project includes the UI/UX Pro Max skill at `.codex/skills/ui-ux-pro-max/`. It is intentionally stored in this repository so the design guidance used to build the interface is available locally without a global install.

## GitHub workflow

The repository is configured with `origin` pointing to `https://github.com/shaikhubaidahmed/DSAHub.git`, and the local author identity is set for `shaikhubaidahmed`. After authenticating GitHub once on this machine, normal pushes can use:

```bash
git push
```
