# For judges

| Criterion (Devpost wording) | Where to look |
|---|---|
| Technological Implementation: hybrid use of Firebase AI Logic | `src/firebase.js`: one `getAI`, two `getGenerativeModel` calls: `ONLY_ON_DEVICE` (names in prose, raw text) and `PREFER_IN_CLOUD` (masked text only). Called from `src/guard/nano.js` and `src/cloud/egress.js`. |
| Design: a whole product | One flow for one user: pick or paste a note, see what will leave, send, get registry fields, export JSON/CSV. |
| Potential Impact | Registry abstractors cannot paste raw notes into a cloud model. The app shows the masked text and blocks the call if an identifier remains. No time saving has been measured. |
| Quality of the Idea | A leak guard sits in front of the only cloud call; for the seeded notes it blocks the call if a known identifier remains (tested). |

## Who it is for, and the action held for a human
Persona (illustrative, not a real person; to be replaced by a real named abstractor if Ahmed has one): a clinic registry abstractor who must enter CKD stage, eGFR and albuminuria into a quality registry, and whose institution forbids pasting raw notes into a cloud model. Costly action: sending text to the cloud model. The app never does it on its own: **Send masked text** stays disabled until the abstractor has seen the masked text and the leak guard has passed (`index.html` `btn-send`, `src/main.js`).

## Evidence map
| Item | File |
|---|---|
| Sponsor product on the default path | `src/firebase.js`, `src/guard/nano.js`, `src/cloud/egress.js`; live build https://registry-gate-hybrid26.web.app |
| Data flow diagram | `docs/flow.svg` (shown at the top of the README) |
| Committed eval JSON | `docs/bench-rules-only.json` (20 notes), `docs/bench-100-rules-only.json` (100 notes, headline, `npm run bench:100 -- --write`), `docs/cloud-eval.json` (real cloud, 20 notes) |
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
| Save the Nano benchmark as a file and repeat it 3 times to show variation | 1 |
| Add a Content-Security-Policy on Hosting that limits `connect-src` (test after deploy) | 0.5 |
| Held-out, hand-written notes to measure the masker without the seeded answer key | 2 |

