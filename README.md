# hack-firebase-hybrid-ai

Entry for **#BuildHybridAI 2026** (Firebase AI Logic, Google, on Devpost).
Private until G5 (public only after `prepublish_scan.py`).

## Facts (from Devpost emails, 9 and 11 Nov 2026)
- **Deadline:** Mon 30 Nov 2026, 14:00 PT = **23:00 Valencia**.
- Must use Firebase AI Logic hybrid inference (on-device + cloud): Gemini Nano 4 on Web/Android, or Apple Foundation Models on iOS, plus a cloud Gemini model.
- Free tier is enough: pick models marked "billing not required" on https://firebase.google.com/docs/ai-logic/models. Stay on the Spark plan (Blaze links billing).
- Optional Google Account Quota (4 days, you pay anything past it): sprint 2 request by Wed 18 Nov 10:00 PT (19:00 Valencia); sprint 3 by Wed 25 Nov 10:00 PT. Needs Ahmed's OK and a zero-spend check.
- Official page: https://firebasehybridaihackathon.devpost.com/

## Live rules (read via Kapture, 14 Nov 2026, firebasehybridaihackathon.devpost.com/rules)
- Spain eligible. Individuals or teams. 2,107 participants so far; gallery not published yet.
- Platforms: Web/Chrome (Gemini Nano 4, web app or extension), Android, iOS (Apple Foundation Models). Multi-platform preferred and gets "strong consideration" for the Grand Prize.
- **App Check required** (debug tokens OK). Firebase AI Logic must be imported and actually called.
- Repo public at submission, open-source licence visible in About (Apache preferred). Video ≤3 min on YouTube, English. Test link encouraged. The app must support English.
- Judging: four equal criteria, 1–5 each: Technological Implementation (hybrid use), Design (a whole product, not a proof of concept), Potential Impact (credible, specific), Quality of Idea (non-obvious). AI-assisted judging possible. Judging 10–16 Dec; winners ~21 Dec.
- Prizes: $10k / $7k / $4k + Best iOS / Android / Web $3k each. No healthcare category.
- Web on-device facts: Chrome desktop 139+, Firebase JS SDK 12.5.0+, flag `chrome://flags/#prompt-api-for-gemini-nano-multimodal-input`. Modes PREFER_ON_DEVICE / ONLY_ON_DEVICE / PREFER_IN_CLOUD / ONLY_IN_CLOUD. On-device does single-turn text, text+image and **structured JSON/enum output**, 9,216 tokens; no chat, tools, audio or PDFs. `initializeDeviceModel()` after a user click. Default cloud model `gemini-3.5-flash-lite`.
- Free models: gemini-4-hydrogen, gemini-3.8-flash, gemini-3.5-flash-lite, the TTS and Live models. Billing required: gemini-4-argon, gemini-4-carbon, all image models.
- **Hardware:** Chrome's model needs 22 GB free disk plus either >4 GB VRAM or 16 GB RAM with 4 cores. The 8 GB M1s fail the RAM path, and the Pro had 21 GB free on 14 Nov. Test first: `await LanguageModel.availability()` in Chrome DevTools.

## Idea chosen at G0 (10 Nov)
Option A: a local identifier-redaction gate. On-device detection of identifiers plus deterministic rules; the user sees a preview; only abstracted fields go to the cloud model, raw text never does. No compliance, de-identification or clinical-performance claim.

Research and council notes: Drive `Zayed OS/Hackathons/2026-11-firebase-hybrid-ai/` (SPEC.md, `g0_research_council_2026-11-10/CHAIRMAN.md`).

## Layout
- `src/` app code
- `data/synthetic/` synthetic notes with fake, seeded identifiers only (no real patient data, ever)
- `docs/` plan, data card, claims

## Next gates
1. Check the live Devpost rules and the hybrid API docs (Web or Android).
2. Make the falsifiable test for the local guard: a seeded identifier must never reach the cloud call.
3. Synthetic data + data card.
4. Firebase project setup and any cloud call: Ahmed's OK for that exact action.
