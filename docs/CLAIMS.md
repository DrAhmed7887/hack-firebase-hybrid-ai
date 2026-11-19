# Claims: every claim maps to a file and a command

| Claim | Evidence | Reproduce |
|---|---|---|
| Rules-only mode masked 137 of 154 seeded identifiers on 20 synthetic notes | `docs/bench-rules-only.json` | `npm run bench` |
| In that run 6 of 20 notes passed the guard and were sent; 14 were blocked because a name was left (all 17 misses are names, none are MRN, date, phone or email) | same file | `npm run bench` |
| In that run 0 cloud payloads contained a seeded identifier | same file; `tests/leak.test.js` | `npm test` |
| The cloud call is unreachable when the guard finds a leftover identifier | `src/cloud/egress.js`, test "guard aborts when masking is defeated" | `npm test` |
| Names in free prose need the on-device model | rules cannot see them; see the 14 blocked notes | `npm run bench` |

## Not claimed
- Anything about Gemini Nano output quality. Nano was not run: both development laptops have 8 GB RAM and Chrome's model needs 16 GB (or more than 4 GB VRAM). The tests use a perfect-detector test double, labelled as such, to check the pipeline logic only.
- Anything about extraction accuracy of the cloud model. The bench uses a MOCK regex backend, so its extraction output is not a model result and is not reported.
- Any de-identification, privacy-compliance or clinical-performance claim. This app is a prototype on synthetic data.
- Any time saving. Not measured.
