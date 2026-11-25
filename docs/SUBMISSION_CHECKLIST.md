# Submission checklist (#BuildHybridAI 2026)

**Submitted Sun 22 Nov 2026 01:49 CET (Devpost ID 1302481; editable until Mon 30 Nov 2026 23:00 CET).**
Deadline: Mon 30 Nov 2026, 2:00 PM PT = 23:00 Valencia. Source: `docs/RULES_DEVPOST.txt` §4, §6. Verified on 25 Nov 2026 where marked; unchecked boxes were not verified or still need owner action.

## Done in the repo
- [x] `npm test` (42 tests, including 24 held-out hand-written notes in `tests/heldout.test.js`), `npm run bench`, `npm run bench:100`, `npm run bench:heldout`, `npm run build` pass; `docs/bench-100-rules-only.json` and `docs/bench-heldout-rules-only.json` committed
- [x] CI green on main (GitHub Actions: `e843057` run `45519270601` and `31411af` run `45524450233` both succeeded; later commits are docs/scripts/tests)
- [x] README top shows the diagram, real-text PMC50 headline (46/50 = 92.0%, 0 invented numbers) and run command
- [x] Apache-2.0 `LICENSE` present (GitHub reports `apache-2.0`)
- [x] No keys, `.env.local` or debug token in the repo (`.env.local` is gitignored; only `.env.example` is tracked) (rules §6 Testing)

## Verification & owner clicks
- [x] Repo made public on GitHub; licence visible in the About box (GitHub: PUBLIC, Apache License 2.0; description and homepage set 25 Nov 2026)
- [x] Demo video v3 (`https://youtu.be/x8h_Nd04CBk`), 2m 07s (<= 3 minutes), English, public on YouTube, embedded on Devpost (verified in isolated logged-out Chrome context 25 Nov 2026)
- [x] Devpost submitted: platform Web (Chrome), Firebase AI Logic description, repo URL, live URL https://registry-gate-hybrid26.web.app (Devpost ID 1302481); YouTube v3 embed and `"FHIR R4 Bundle"` confirmed on public Devpost page 25 Nov 2026
- [x] Isolated logged-out browser test of live URL (`https://registry-gate-hybrid26.web.app` and `?rules-only`), GitHub repo page, and Devpost public page: verified 25 Nov 2026 (0 console errors; `?rules-only` fallback chip, `case-08` guard block -> **Mask these and re-check** -> cloud send -> KDIGO 2024 matrix + FHIR R4 Bundle download/preview all rendered)
- [x] Submit (22 Nov 2026 01:49 CET); the entry stays editable until Mon 30 Nov 2026 23:00 CET
- [x] Devpost confirmation saved in the Drive entry: `submission/gmail_confirmation_1302481_2026-11-22.md` and `submission/devpost_public_1302481_2026-11-25.png`
- [x] Devpost story item 5 updated on 25 Nov 2026 to "JSON, CSV and FHIR R4 Bundle download" and saved (SUBMITTED, 5/5 steps done)
- [ ] Optional before Mon 30 Nov 23:00 CET: refresh Devpost story text to lead with PMC50 (`46/50`, 92.0%, 0 invented numbers), reflect App Check Basic-Enforced (instead of "not switched on"), 3x Nano runs (`docs/bench-nano-runs.json`), CSP, and 24-note held-out recall (`88.1%`)
- [ ] Update the Notion row and `now.md`

## App Check status
- Firebase AI Logic App Check is **Basic - Enforced** (reCAPTCHA Enterprise, Replay Off) in the Firebase Console. On 25 Nov 2026, HTTP 200 was verified on both `exchangeRecaptchaEnterpriseToken` and `generateContent` in a normal and an uncached isolated desktop Chrome context. The client sends the tokens (`src/firebase.js`). Headless Chrome failed the token exchange with HTTP 403 before enforcement, so judges should use desktop Chrome.
