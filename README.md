# hack-firebase-hybrid-ai

Entry for **#BuildHybridAI 2026** (Firebase AI Logic, Google, on Devpost).
Private until G5 (public only after `prepublish_scan.py`).

## Facts (from Devpost emails, 9 and 11 Nov 2026)
- **Deadline:** Mon 30 Nov 2026, 14:00 PT = **23:00 Valencia**.
- Must use Firebase AI Logic hybrid inference (on-device + cloud): Gemini Nano 4 on Web/Android, or Apple Foundation Models on iOS, plus a cloud Gemini model.
- Free tier is enough: pick models marked "billing not required" on https://firebase.google.com/docs/ai-logic/models. Stay on the Spark plan (Blaze links billing).
- Optional Google Account Quota (4 days, you pay anything past it): sprint 2 request by Wed 18 Nov 10:00 PT (19:00 Valencia); sprint 3 by Wed 25 Nov 10:00 PT. Needs Ahmed's OK and a zero-spend check.
- $30,000 cash prizes: a win needs the lawyer first (NLV).
- Official page: https://firebasehybridaihackathon.devpost.com/

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
