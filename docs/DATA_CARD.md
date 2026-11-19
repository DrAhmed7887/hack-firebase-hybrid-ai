# Data card: synthetic CKD notes

- **What:** 20 short English nephrology-style notes (`data/synthetic/cases.json`), 5 note templates x 4 seeds. The first seed of each template (5 notes) is offered as a demo note in the app.
- **How made:** `node scripts/gen-cases.mjs` (seeded PRNG, no model, no real record). CI regenerates the file and fails if it differs.
- **Identifiers (all fake, all seeded):** person names from a fixed list of unusual names, MRN `ZX-` plus 7 digits, dates in 2025-2026 and birth years 1938-1972, phones with the reserved `555-01xx` range, emails at `example.org`. Each case lists its seeded identifiers under `seeded`.
- **Labels (`truth`):** latest eGFR, KDIGO GFR category and albuminuria category, derived by code from the generated numbers using the KDIGO 2024 cut-points (Kidney Int 2024;105(4S):S117-S314; same cut-points as 2012): G1 >=90, G2 60-89, G3a 45-59, G3b 30-44, G4 15-29, G5 <15 mL/min/1.73 m2; A1 <30, A2 30-300, A3 >300 mg/g. Cut-points were taken from a web search of the guideline tables, not yet checked against the PDF by Ahmed (to do).
- **Known limits:** the notes are short and templated, far cleaner than real charts. A name that appears only in free prose (no title or label before it) is in 13 of the 20 cases, by design, to test what the rules cannot see. Nothing here says how the app would behave on real notes. 1 of the 20 cases has no urine albumin value, so its label is `not_documented`.
- **Not included:** no real patient data, no data derived from real patients, no MIMIC.
