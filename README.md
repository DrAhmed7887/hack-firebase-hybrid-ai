# Private Clinical Registry Gate

**A registry abstractor can send a kidney-clinic note to a cloud Gemini model with identifiers masked on the device first, and see exactly what leaves.** Identifiers are masked locally first (rules plus an on-device model through Firebase AI Logic); the masked text is previewed; the cloud call is aborted if any identifier is still in it.

Entry for **#BuildHybridAI 2026** (Firebase AI Logic hybrid inference, Devpost). Synthetic notes only. Not a de-identification tool, not validated for clinical use.

**Measured, rules-only mode** (20 seeded synthetic notes, `npm run bench`, mock cloud): the masker alone hid 137 of 154 seeded identifiers; every miss was a name in free prose. The guard then blocked those 14 notes and let 6 through, and 0 outgoing payloads held a seeded identifier (that last count is a guard property, since the guard checks against the same seeded list; the 137/154 is the independent number).

**Measured once with Gemini Nano** (in-app run, 19 Nov 2026, Chrome on the development Mac, where `LanguageModel.availability()` reported Nano ready): the masker with Nano hid 154 of 154 seeded identifiers. One run, not repeatable in CI, model output varies; Nano also masked some ordinary words as names (e.g. "Family"). Details and non-claims: [docs/CLAIMS.md](docs/CLAIMS.md).

```bash
npm ci && npm run dev      # app at http://localhost:5173, runs with no keys
npm test                   # includes the leak test: the guard must stop every seeded identifier
npm run bench              # the 20-case numbers above
```

## How it works
1. **Local guard:** rules for MRN, dates, phone, email and names after a title or label; Firebase AI Logic `ONLY_ON_DEVICE` (Gemini Nano) for names in prose. If Nano is unavailable the app says so, runs rules-only, and never falls back to the cloud with raw text.
2. **Preview and leak guard:** you see the masked text. `src/cloud/egress.js` scans the exact outgoing request and throws before the cloud call if one of the note's seeded identifiers or an identifier pattern remains. For a note you paste yourself there is no seeded list, so only patterns are checked, names in prose are not, and the app asks you to confirm after reading the masked text.
3. **Cloud call:** `PREFER_IN_CLOUD` on a free Gemini model returns JSON: CKD stage, eGFR, albuminuria category, evidence quote. Code checks the stage against the eGFR.
4. **Local rehydration and export:** tokens are restored from an in-memory vault; download JSON or CSV.

## What is real and what is mocked in this repo
| Part | Without a Firebase config (default) | With config |
|---|---|---|
| On-device names | Real Firebase AI Logic call if Chrome offers Gemini Nano, otherwise rules-only | same |
| Cloud extraction | **MOCK** regex stand-in, labelled in the UI | Firebase AI Logic, `gemini-3.5-flash-lite` |
| App Check | off | reCAPTCHA Enterprise |

## Configure Firebase (owner's step)
Spark plan only. Copy `.env.example` to `.env.local`, fill the public web config and the reCAPTCHA Enterprise site key, `npm run build`, `firebase deploy --only hosting`. No debug token is stored in the code; in dev the SDK prints one to register in the console.

## Layout
`src/guard/` rules, masking, leak guard, Nano · `src/cloud/` the only cloud egress and the mock · `src/pipeline.js` shared pipeline · `data/synthetic/` seeded notes · `docs/` [data card](docs/DATA_CARD.md), [claims](docs/CLAIMS.md), [judges](docs/JUDGES.md), [spec](docs/SPEC.md)

Licence: Apache-2.0.
