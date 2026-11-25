# For judges

| Criterion (Devpost wording) | Where to look |
|---|---|
| Technological Implementation: hybrid Firebase AI Logic | `src/firebase.js`: one `getAI`, two `getGenerativeModel` calls: `ONLY_ON_DEVICE` (`src/guard/nano.js`) and `PREFER_IN_CLOUD` (`src/cloud/egress.js`). |
| Design: whole product & interoperability | One flow (`index.html`, `src/main.js`), FHIR R4 Bundle (`src/fhir.js`), KDIGO 2024 risk matrix + NSAID alert (`src/kdigo.js`), Egress Inspector (`inferenceSource` + SHA-256), CSP (`firebase.json`). |
| Potential Impact & Quality of Idea | Clinic abstractors can't paste raw notes into cloud LLMs. A deterministic leak guard (`src/guard/leakGuard.js`) blocks egress if any identifier remains; **Send** stays disabled until previewed. |

## Headline & evidence map
- **Headline (real published prose, PMC50):** `docs/pmc50-key-audit.json` & `docs/cloud-eval-pmc-v2.json` — on 50 open-access PMC nephrology texts (synthetic IDs, oracle name masking, `gemini-3.5-flash-lite`), allowing `'not documented'` cut invented numbers from 10 to **0** and scored **46 of 50 (92.0%)** against the audited key (24/27 documented patient eGFRs, 22/23 null texts; single AI reader, one run; zero-cloud check: `node scripts/audit-pmc-key.mjs`). Rules-only guard on PMC50 (`npm run bench:pmc`): 300/350 IDs masked, 50/50 blocked on prose names, 0 leaked (`docs/bench-pmc-real-prose.json`).
- **Held-out hand-written notes (24 notes, rules-only):** `data/heldout/handwritten_notes.json` (zero name overlap with `scripts/gen-cases.mjs`), `docs/bench-heldout-rules-only.json` (`npm run bench:heldout`) — rules masked **156 of 177 (88.1%)**; 20 blocked on unmasked names, 4 sent, 0 leaked.
- **On-device Nano + real cloud (desktop Chrome, 3x 20 notes):** `docs/bench-nano-runs.json` — 154/154 seeded IDs masked, 20/20 sent, 0 blocked, 0 leaked, identical outputs across 3 runs.
- **Cloud Logging verification:** `docs/ai-monitoring-log-check.json` — live Firebase AI Logic request held placeholders only (`[NAME_1]`, `[MRN_1]`), 0/143 seeded IDs.
- **Synthetic 100-note baselines:** rules-only mock (`docs/bench-100-rules-only.json`, `npm run bench:100`) masked 683/772 (89 prose-name misses), blocked 71, sent 29, 0 leaked (guard property); real-cloud oracle (`docs/cloud-eval-100-runs.json`, 3x): eGFR 100/100, UACR 100/100, code stage 100/100 vs model stage 83-86/100.
- **Docs & CI:** `docs/CLAIMS.md`, `docs/EVIDENCE_LITERATURE.md`, `docs/SUBMISSION_CHECKLIST.md`, `.github/workflows/ci.yml`, `docs/flow.svg`.

## Try it in 30 seconds
Open https://registry-gate-hybrid26.web.app (or add `?rules-only` to test the no-Nano fallback). Press **Run local guard**, then **Send masked text**. Pick **Blocked prose name** (`case-08`): without Nano, rules miss prose names so the guard blocks egress and highlights leftovers in red; press **Mask these and re-check**, then Send to inspect KDIGO 2024 risk and FHIR R4 Bundle export.

## Backlog (closed)
- ~~Nano 3x repeat benchmark~~ done (`docs/bench-nano-runs.json`) · ~~Hosting CSP~~ done (`firebase.json`) · ~~PMC50 key audit~~ done (`docs/pmc50-key-audit.json`) · ~~Held-out hand-written notes (zero `gen-cases.mjs` name overlap)~~ done (`data/heldout/handwritten_notes.json`, `docs/bench-heldout-rules-only.json`: 156/177, 88.1%).

## Live checks (25 Nov 2026)
- **Isolated logged-out Chrome (`https://registry-gate-hybrid26.web.app` & `?rules-only`):** 0 console errors; fallback chip showed `Rules-only mode`; `case-08` blocked on `Soledad`, **Mask these and re-check** cleared it, cloud send returned `G5` / `eGFR 11` / `A3`, KDIGO 2024 matrix and `Download FHIR R4 Bundle` rendered. YouTube v3 (`https://youtu.be/x8h_Nd04CBk`, 2m 07s) and Devpost (`https://devpost.com/software/private-clinical-registry-gate`) verified public.
- **Desktop Chrome + Firebase Console:** App Check Basic-Enforced (reCAPTCHA Enterprise, Replay Off); HTTP 200 on token exchange and `generateContent`; 3x Nano runs passed (`docs/bench-nano-runs.json`).
