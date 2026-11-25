# Private Clinical Registry Gate

![Data flow: the note is masked on the device, previewed, checked by the leak guard, and only masked text reaches the cloud model](docs/flow.svg)

**Try it:** https://registry-gate-hybrid26.web.app (no login, no keys) · **Run it:** `npm ci && npm run dev`

**A registry abstractor can send a kidney-clinic note to a cloud Gemini model with identifiers masked on the device first, and see exactly what leaves.** Identifiers are masked locally first (rules plus an on-device model through Firebase AI Logic); the masked text is previewed; the cloud call is aborted if any identifier is still in it.

Entry for **#BuildHybridAI 2026** (Firebase AI Logic hybrid inference, Devpost). Synthetic notes only. Not a de-identification tool, not validated for clinical use.

**Measured, rules-only mode** (100 seeded synthetic notes, 772 seeded identifiers, `npm run bench:100`, mock cloud): 0 of 772 seeded identifiers reached the cloud, and 71 of 100 notes were held back. The masker alone hid 683 of 772; the 89 it missed are all names in free prose (names are the weak type: 71 notes still had an unmasked name, so the guard blocked them), and the other 29 notes were sent. The 0 is a guard property, since the guard checks against the same seeded list; 683/772 is the independent masking number. Earlier 20-note run (history): 137 of 154 masked, 14 blocked, 6 sent.

**Measured once with Gemini Nano** (in-app run, 19 Nov 2026, Chrome on the development Mac, where `LanguageModel.availability()` reported Nano ready): the masker with Nano hid 154 of 154 seeded identifiers. One run, not repeatable in CI, model output varies; Nano also masked some ordinary words as names (e.g. "Family"). 
**Real cloud model** (`gemini-3.5-flash-lite` through Firebase AI Logic, 20 seeded notes, names masked by an oracle so only extraction is tested, one run, 19 Nov 2026): eGFR 20/20 and albuminuria category 20/20 correct; the model's own CKD stage 17/20, so the app derives the stage from the eGFR with the KDIGO cut-points (20/20). Synthetic templated notes only.

**Real cloud model, 100 notes** (same model through Firebase AI Logic on the Sprint 2 project `fbailogic26vrt-3028`, seeded-name oracle masking, three runs, 22 Nov 2026): each run 100 sent, 0 errors; eGFR 100/100 and albuminuria category 100/100 correct in every run; the model's own CKD stage 86, 85 and 83 of 100 (every miss one stage off; the same 14 notes missed in all three runs), and stage derived by code from eGFR 100/100 in every run. Synthetic templated notes only. Evidence: `docs/cloud-eval-100-runs.json` (run 1 alone: `docs/cloud-eval-100.json`).

**What Google's own logs saw** (Firebase AI monitoring on, one live request from the deployed app, 22 Nov 2026): the request Firebase AI Logic logged in Cloud Logging held only placeholders (`[NAME_1]`, `[MRN_1]`, `[DATE_1]`...); none of the 143 seeded identifiers of the 20 synthetic cases appeared in the logs. This check reads Google's side, not our guard. One request. Evidence: `docs/ai-monitoring-log-check.json`.

**Real published prose** (50 open-access PMC nephrology texts with synthetic identifiers): with a forced-number schema the model returned 10 eGFR values that are not in the text (20 of 50 matched the automatic answer key). After allowing 'not documented', invented values fell to 0: 16 of 18 study abstracts and 9 of 32 case reports were answered 'not documented', 9 of 50 matched the key, and 3 case reports with a stated value were missed. The synthetic results did not change (100/100). The automatic answer key proved unreliable (it was the right answer in only 11 of 50 texts), so every text was re-read for "the most recent single patient eGFR": 27 texts document a patient value, 23 document none. Scored against that audited key, the recorded run is **46 of 50 correct (92.0%)**: 24 of 27 patient values returned, 22 of 23 no-value texts answered 'not documented'; errors are 3 missed values (pmc-02, pmc-04, pmc-37) and 1 cohort median returned as a patient value (pmc-07). Single AI reader, no clinician adjudication, one run. Evidence: `docs/pmc50-key-audit.json`; reproduce with `node scripts/audit-pmc-key.mjs` (no cloud call). See CLAIMS.md.

Details and non-claims: [docs/CLAIMS.md](docs/CLAIMS.md).

```bash
npm ci && npm run dev      # app at http://localhost:5173, runs with no keys
npm test                   # includes the leak test: the guard must stop every seeded identifier
npm run bench:100          # the 100-case numbers above (npm run bench: the earlier 20-case run)
```

## How it works
1. **Local guard:** rules for MRN, dates, phone, email and names after a title or label; Firebase AI Logic `ONLY_ON_DEVICE` (Gemini Nano) for names in prose. If Nano is unavailable the app says so, runs rules-only, and never falls back to the cloud with raw text.
2. **Preview and leak guard:** you see the masked text. `src/cloud/egress.js` scans the exact outgoing request and throws before the cloud call if one of the note's seeded identifiers or an identifier pattern remains. For a note you paste yourself there is no seeded list, so only patterns are checked, names in prose are not, and the app asks you to confirm after reading the masked text.
3. **Cloud call:** `PREFER_IN_CLOUD` on a free Gemini model returns JSON: CKD stage, eGFR, albuminuria category, evidence quote. Code checks the stage against the eGFR. The Egress Inspector shows the SDK's own `inferenceSource` for each step (`on_device` for name detection, `in_cloud` for extraction), so the hybrid routing is reported by Firebase, not assumed.
4. **Local rehydration and export:** tokens are restored from an in-memory vault; download JSON, CSV or a **FHIR R4** collection Bundle (`src/fhir.js`: Patient, eGFR and albuminuria Observations with LOINC codes, a CKD-stage Condition with a SNOMED CT code, built locally from the rehydrated result, surrogate identifiers only).
5. **KDIGO 2024 risk and nephrotoxin check:** `src/kdigo.js` places the eGFR stage (G1 to G5) and albuminuria category (A1 to A3) on the KDIGO 2024 risk matrix (heatmap tier: Low, Moderate, High, Very High) and flags NSAID mentions in the note as a nephrotoxin alert (keyword match on the raw note, local only; negations are not interpreted, so the abstractor reads the context). Literature behind the staging and the problem: [docs/EVIDENCE_LITERATURE.md](docs/EVIDENCE_LITERATURE.md).
6. **Hosting security headers:** `firebase.json` sets a Content-Security-Policy that limits `connect-src` to the Firebase AI Logic, App Check and reCAPTCHA origins, plus the other security headers; the deployed headers can be read with `curl -sI https://registry-gate-hybrid26.web.app`.

## What is real and what is mocked in this repo
| Part | Without a Firebase config (default) | With config |
|---|---|---|
| On-device names | Real Firebase AI Logic call if Chrome offers Gemini Nano, otherwise rules-only | same |
| Cloud extraction | **MOCK** regex stand-in, labelled in the UI | Firebase AI Logic, `gemini-3.5-flash-lite` (live build: https://registry-gate-hybrid26.web.app) |
| App Check | off | reCAPTCHA Enterprise |

## Configure Firebase (owner's step)
Spark plan only. Copy `.env.example` to `.env.local`, fill the public web config and the reCAPTCHA Enterprise site key, `npm run build`, `firebase deploy --only hosting`. No debug token is stored in the code; in dev the SDK prints one to register in the console.

## Layout
`src/guard/` rules, masking, leak guard, Nano · `src/cloud/` the only cloud egress and the mock · `src/pipeline.js` shared pipeline · `src/kdigo.js` KDIGO 2024 staging, risk matrix, nephrotoxin check · `src/fhir.js` FHIR R4 Bundle export · `firebase.json` Hosting CSP and security headers · `data/synthetic/` seeded notes · `data/pmc/` 50 PMC texts · `scripts/` benches, cloud eval, `audit-pmc-key.mjs` · `docs/` [evidence literature](docs/EVIDENCE_LITERATURE.md), [PMC key audit](docs/pmc50-key-audit.json), [data card](docs/DATA_CARD.md), [claims](docs/CLAIMS.md), [judges](docs/JUDGES.md), [spec](docs/SPEC.md)

Licence: Apache-2.0.
