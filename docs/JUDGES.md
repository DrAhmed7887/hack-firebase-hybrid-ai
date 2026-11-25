# For judges

| Criterion (Devpost wording) | Where to look |
|---|---|
| Technological Implementation: hybrid use of Firebase AI Logic | `src/firebase.js`: one `getAI`, two `getGenerativeModel` calls: `ONLY_ON_DEVICE` (names in prose, raw text) and `PREFER_IN_CLOUD` (masked text only). Called from `src/guard/nano.js` and `src/cloud/egress.js`. |
| Design: a whole product | One flow for one user: pick or paste a note, see what will leave, send, get registry fields, export JSON/CSV. |
| Potential Impact | Registry abstractors cannot paste raw notes into a cloud model. The app shows the masked text and blocks the call if an identifier remains. No time saving has been measured. |
| Design: interoperability and safety surfaces | FHIR R4 collection Bundle export (`src/fhir.js`); KDIGO 2024 risk matrix and NSAID nephrotoxin alert (`src/kdigo.js`, literature in `docs/EVIDENCE_LITERATURE.md`); Egress Inspector showing the exact outgoing payload, its SHA-256 and the SDK's `inferenceSource` per step (`src/firebase.js`, `index.html`); CSP and security headers on Hosting (`firebase.json`). |
| Quality of the Idea | A leak guard sits in front of the only cloud call; for the seeded notes it blocks the call if a known identifier remains (tested). |

## Who it is for, and the action held for a human
Persona: a clinic registry abstractor who must enter CKD stage, eGFR and albuminuria into a quality registry, and whose institution forbids pasting raw notes into a cloud model. Costly action: sending text to the cloud model. The app never does it on its own: **Send masked text** stays disabled until the abstractor has seen the masked text and the leak guard has passed (`index.html` `btn-send`, `src/main.js`).

## Evidence map
| Item | File |
|---|---|
| Sponsor product on the default path | `src/firebase.js`, `src/guard/nano.js`, `src/cloud/egress.js`; live build https://registry-gate-hybrid26.web.app |
| Data flow diagram | `docs/flow.svg` (shown at the top of the README) |
| Committed eval JSON | `docs/bench-rules-only.json` (20 notes), `docs/bench-100-rules-only.json` (100 notes, headline, `npm run bench:100 -- --write`), `docs/bench-pmc-real-prose.json` (50 PMC texts, rules-only, `npm run bench:pmc`), `docs/cloud-eval.json` (real cloud, 20 notes) |
| Real-cloud runs | `docs/cloud-eval-100-runs.json` (three 100-note runs; run 1 alone `docs/cloud-eval-100.json`), `docs/cloud-eval-100-v2.json` (100 notes with 'not documented' allowed), `docs/cloud-eval-pmc.json` and `docs/cloud-eval-pmc-v2.json` (50 PMC texts, forced number then 'not documented') |
| PMC key audit | `docs/pmc50-key-audit.json`: all 50 texts re-read for the most recent single patient eGFR; recorded run scores 46 of 50 (92.0%), zero cloud calls (`node scripts/audit-pmc-key.mjs`) |
| Nano 3x runs (desktop Chrome, real cloud) | `docs/bench-nano-runs.json`: 3 repeat 20-note runs, 154/154 masked, 20/20 sent, 0 blocked, 0 leaked each |
| Google's side of the egress | `docs/ai-monitoring-log-check.json`: logged request held only placeholders (one request) |
| Literature | `docs/EVIDENCE_LITERATURE.md`: peer-reviewed sources behind the staging, the problem and the LLM-extraction limits |
| FHIR R4, KDIGO 2024, Egress Inspector, CSP | `src/fhir.js`, `src/kdigo.js`, `src/firebase.js` plus `index.html` inspector fields, `firebase.json` |
| CI | `.github/workflows/ci.yml`: tests, both benches, reproducible data, build |
| Claims with file and command | `docs/CLAIMS.md` |
| Failures and limits | `docs/CLAIMS.md` "Not claimed"; every rules-only miss is a name in free prose (100-note run: 89 of 772 identifiers missed by the masker, 71 of 100 notes blocked because of an unmasked name) |
| Headline result | Rules-only, 100 notes, **mock** cloud: the masker hid 683 of 772 seeded identifiers; 71 notes held back, 29 sent; 0 seeded identifiers in the 29 sent payloads (a guard property: it checks the same seeded list) (`docs/bench-100-rules-only.json`) |
| Submission receipt | `docs/SUBMISSION_CHECKLIST.md` |

## Try it in 30 seconds
Open the app, press **Run local guard**, then **Send masked text**. Pick another demo note: without Gemini Nano, rules miss names inside sentences, so the guard blocks the call and outlines the leftover words in red; press **Mask these and re-check**, then Send. Add `?rules-only` to the URL to see the no-Nano path on a machine that has Nano. Press **Run 20 cases** at the bottom to see the live counts. The status chips at the top say what is real in this build (on-device model, cloud model, App Check) and what is mocked.

## Open backlog (hours)
| Item | Hours |
|---|---|
| ~~Save the Nano benchmark as a file and repeat it 3 times to show variation~~ done 25 Nov 2026 (`docs/bench-nano-runs.json`) | n/a |
| ~~Add a Content-Security-Policy on Hosting that limits `connect-src`~~ done (`firebase.json`) | 0.5 |
| ~~Manual audit of the PMC answer key~~ done (`docs/pmc50-key-audit.json`) | n/a |
| Held-out, hand-written notes to measure the masker without the seeded answer key | 2 |


## Live check, 25 Nov 2026
**(a) Headless Chrome, fresh profile, production URL.** Rules-only mode (Nano `unavailable`): 0 CSP violations, 0 page errors. Blocked note (case-08) outlined in red, **Mask these and re-check** cleared it, the send returned `in_cloud` (HTTP 200 from Firebase AI Logic), the KDIGO 2024 matrix and the FHIR R4 Bundle preview rendered. A custom note without a seeded list opened the native confirmation dialog, and Cancel closed it with nothing sent. The theme toggle switched light and dark. The App Check token exchange returned HTTP 403 in this headless browser before enforcement was turned on.

**(b) Real desktop Chrome.** `LanguageModel.availability()` was `available`. Three 20-case runs with Nano plus real cloud calls each masked 154 of 154 seeded identifiers (evidence `docs/bench-nano-runs.json`). In the Firebase Console, App Check for Firebase AI Logic was set to Basic - Enforced (reCAPTCHA Enterprise, Replay Off); HTTP 200 was verified on both `exchangeRecaptchaEnterpriseToken` and `generateContent` in both a normal (cached) and an uncached isolated browser context.
