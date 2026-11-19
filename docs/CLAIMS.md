# Claims: every claim maps to a file and a command

| Claim | Evidence | Reproduce |
|---|---|---|
| Rules-only: the masker alone hid 137 of 154 seeded identifiers on 20 synthetic notes; all 17 misses are names in free prose (none are MRN, date, phone or email) | `docs/bench-rules-only.json` | `npm run bench` |
| Rules-only: 6 of 20 notes passed the guard and were sent; 14 were blocked | same file | `npm run bench` |
| The guard blocks the cloud call when one of a note's seeded identifiers, or an identifier pattern, remains in the outgoing request (0 of the 6 sent payloads held a seeded identifier). This is a guard property: it checks against the same seeded list the test uses. | `src/cloud/egress.js`; `tests/leak.test.js` | `npm test` |
| The cloud call is unreachable when the guard fires | test "guard aborts when masking is defeated" | `npm test` |
| With Gemini Nano plus rules the masker hid 154 of 154 seeded identifiers (one in-app run, 19 Nov 2026, Chrome on the development Mac; also masked ordinary words such as "Family") | the "Run 20 cases" button in the app; no file saved | click it on a machine where the status chip says Nano ready; expect run-to-run variation |

## Not claimed
- Any behaviour on real or non-seeded notes. For a pasted note the guard checks patterns only; names in prose are not checked, and review found names (accents, all-caps, "Surname, First") the rules can miss.
- Gemini Nano quality beyond the single run above. CI never runs Nano: the tests use a perfect-detector test double, labelled as such, to check the pipeline logic only.
- Extraction accuracy of the cloud model. The bench uses a MOCK regex backend, so its extraction output is not a model result and is not reported. A real-cloud run needs the Firebase project.
- Any de-identification, privacy-compliance or clinical-performance claim. Prototype on synthetic data.
- Any time saving. Not measured.
