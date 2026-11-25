# Submission checklist (#BuildHybridAI 2026)

**Submitted Sun 22 Nov 2026 01:49 CET (Devpost ID 1302481; editable until Mon 30 Nov 2026 23:00 CET).**
Deadline: Mon 30 Nov 2026, 2:00 PM PT = 23:00 Valencia. Source: `docs/RULES_DEVPOST.txt` §4, §6. Verified on 25 Nov 2026 where marked; unchecked boxes were not verified by this audit.

## Done in the repo
- [x] `npm test` (40 tests), `npm run bench`, `npm run bench:100` pass; `docs/bench-100-rules-only.json` committed
- [x] CI green on main (GitHub Actions, latest pushed main build `e843057`, success; later commits are docs-only and are checked after push)
- [x] README top shows the diagram, one number and the run command
- [x] Apache-2.0 `LICENSE` present (GitHub reports `apache-2.0`)
- [x] No keys, `.env.local` or debug token in the repo (`.env.local` is gitignored; only `.env.example` is tracked) (rules §6 Testing)

## Ahmed's clicks
- [x] Repo made public on GitHub; licence visible in the About box (GitHub: PUBLIC, Apache License 2.0; description and homepage set 25 Nov 2026)
- [ ] Demo video, 3 minutes or less, English, public on YouTube (rules §6): not verified here
- [x] Devpost submitted: platform Web (Chrome), Firebase AI Logic description, repo URL, live URL https://registry-gate-hybrid26.web.app (Devpost ID 1302481). YouTube URL field: not verified here
- [ ] Private-window test of the live URL and the repo page: not verified here
- [x] Submit (22 Nov 2026 01:49 CET); the entry stays editable until Mon 30 Nov 2026 23:00 CET
- [x] Devpost confirmation saved in the Drive entry: `submission/gmail_confirmation_1302481_2026-11-22.md` and `submission/devpost_public_1302481_2026-11-25.png`
- [x] Devpost story item 5 updated on 25 Nov 2026 to "JSON, CSV and FHIR R4 Bundle download" and saved (SUBMITTED, 5/5 steps done; the return to the public page hit a Cloudflare 403)
- [ ] Update the Notion row and `now.md`

## App Check status
- Firebase AI Logic App Check is **Basic - Enforced** (reCAPTCHA Enterprise, Replay Off) in the Firebase Console; the 102 requests of the prior 7 days were all verified. On 25 Nov 2026, HTTP 200 was verified on both `exchangeRecaptchaEnterpriseToken` and `generateContent` in a normal and an uncached isolated desktop Chrome context. The client sends the tokens (`src/firebase.js`). Headless Chrome failed the token exchange with HTTP 403 before enforcement, so judges should use desktop Chrome.
