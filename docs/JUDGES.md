# For judges

| Criterion (Devpost wording) | Where to look |
|---|---|
| Technological Implementation: hybrid use of Firebase AI Logic | `src/firebase.js`: one `getAI`, two `getGenerativeModel` calls: `ONLY_ON_DEVICE` (names in prose, raw text) and `PREFER_IN_CLOUD` (masked text only). Called from `src/guard/nano.js` and `src/cloud/egress.js`. |
| Design: a whole product | One flow for one user: pick or paste a note, see what will leave, send, get registry fields, export JSON/CSV. |
| Potential Impact | Registry abstractors cannot paste raw notes into a cloud model. The app shows the masked text and blocks the call if an identifier remains. No time saving has been measured. |
| Quality of the Idea | The leak guard sits in front of the only cloud call and is tested: no seeded identifier may reach it. |

## Try it in 30 seconds
Open the app, press **Run local guard**, then **Send masked text**. Press **Run 20 cases** at the bottom to see the live counts. The status chips at the top say what is real in this build (on-device model, cloud model, App Check) and what is mocked.

## Open backlog (hours)
| Item | Hours |
|---|---|
| Run with real Gemini Nano on a 16 GB machine and record the numbers | needs hardware, 1 |
| Run the 20 cases against the real cloud model once the Firebase project exists | 0.5 |
