# Submission checklist (#BuildHybridAI 2026)

**Submitted Sun 22 Nov 2026 01:49 CET (Devpost ID 1302481; editable until Mon 30 Nov 2026 23:00 CET).**
Deadline: Mon 30 Nov 2026, 2:00 PM PT = 23:00 Valencia. Source: `docs/RULES_DEVPOST.txt` §4, §6. Verified on 25 Nov 2026 where marked; unchecked boxes were not verified by this audit.

## Done in the repo
- [x] `npm test` (40 tests), `npm run bench`, `npm run bench:100` pass; `docs/bench-100-rules-only.json` committed
- [x] CI green on main (GitHub Actions, commit `0b839dc`, success)
- [x] README top shows the diagram, one number and the run command
- [x] Apache-2.0 `LICENSE` present (GitHub reports `apache-2.0`)
- [x] No keys, `.env.local` or debug token in the repo (`.env.local` is gitignored; only `.env.example` is tracked) (rules §6 Testing)

## Ahmed's clicks
- [x] Repo made public on GitHub; licence visible in the About box (GitHub: PUBLIC, Apache License 2.0; description and homepage set 25 Nov 2026)
- [ ] Demo video, 3 minutes or less, English, public on YouTube (rules §6): not verified here
- [x] Devpost submitted: platform Web (Chrome), Firebase AI Logic description, repo URL, live URL https://registry-gate-hybrid26.web.app (Devpost ID 1302481). YouTube URL field: not verified here
- [ ] Private-window test of the live URL and the repo page: not verified here
- [x] Submit (22 Nov 2026 01:49 CET); the entry stays editable until Mon 30 Nov 2026 23:00 CET
- [ ] Save the Devpost confirmation (email or screenshot) in this folder's Drive entry
- [ ] Update the Notion row and `now.md`

## App Check status
- The client sends reCAPTCHA Enterprise App Check tokens (`src/firebase.js`). Enforcement is client-gated: App Check enforcement for Firebase AI Logic is **OFF** (final state, 25 Nov 2026). Checked 25 Nov through the Firebase App Check REST API (`services/firebaseml.googleapis.com` has no enforcement mode set, so it is unenforced; the console page itself was not opened because no signed-in browser was available). Enforcement was not turned on: in two headless-Chrome runs the reCAPTCHA Enterprise token exchange failed (`appCheck/recaptcha-error` on a preview channel, HTTP 403 `exchangeRecaptchaEnterpriseToken` on the production URL), so enforcing it could have blocked judges. Whether a normal desktop browser obtains a token was not tested in this run. A 22 Nov 2026 run saw 67 HTTP 401s while a console setting change propagated (that run is discarded in `docs/CLAIMS.md`), so change the setting only with time to re-test the live URL.
