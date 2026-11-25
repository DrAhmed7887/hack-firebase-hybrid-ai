# #BuildHybridAI 2026: Project Spec & Architecture

**Entry:** Private Clinical Registry Gate (Firebase AI Logic Hybrid Inference)  
**Track:** Web / Chrome Extension & Web App  
**Deadline:** Monday 30 November 2026, 14:00 PT (23:00 Valencia time)  
**Status:** Submitted & Deployed (v2 UI + Hybrid AI Logic)

---

## 1. Verified Official Facts & Rules (from Devpost & GWS Email)
- **Host & Platform:** Google Firebase on Devpost (`firebasehybridaihackathon.devpost.com`).
- **Core Requirement:** Gen AI application using **Firebase AI Logic** hybrid inference (on-device + cloud) along with supported Firebase products (App Check required; Firestore/RemoteConfig optional). Debug tokens accepted for App Check.
- **Platforms:** Web (Chrome with Gemini Nano 4 via Firebase AI Logic) or multi-platform.
- **Free Tier Models (Spark Plan - No Billing Required):**
  - On-Device: Gemini Nano 4 (`ONLY_ON_DEVICE`).
  - Cloud: `gemini-3.5-flash-lite`, `gemini-3.8-flash` (`PREFER_IN_CLOUD`).
- **Judging Criteria (Equally Weighted, 1-5 scale):**
  1. *Technological Implementation:* How effectively does it use Firebase AI Logic hybrid inference?
  2. *Design:* Complete, coherent product experience, not just a technical proof of concept.
  3. *Potential Impact:* Credible, specific case for a real audience with a measurable outcome.
  4. *Quality of the Idea:* Creative, non-obvious use of Firebase AI Logic.

---

## 2. Product Framing & Stake (Addressing LESSONS.md Causes 2 & 3)
- **Target User:** Clinical Research Coordinator (CRC) / Hospital Quality Improvement (QI) Nurse Auditor abstracting unstructured progress notes into disease registries (e.g. KDIGO Chronic Kidney Disease staging, AHA Get With The Guidelines).
- **The Stake:**
  - *Time:* Manual chart abstraction consumes 12–20 minutes per patient (900s).
  - *Risk:* Hospital CISOs strictly forbid pasting raw EHR progress notes into cloud LLM endpoints due to institutional data-governance policies.
  - *The Goal:* Cut manual abstraction time while the app sends only masked text to the cloud model. No time saving has been measured yet; to be measured on the demo notes. No compliance or de-identification claim is made.
- **Touch-able Safety Guarantee (Cause 2):**
  - A deterministic programmatic leak guard blocks network egress if any direct identifier remains.
  - A "Run 20 cases" button in the app (and `npm run bench`) runs 20 seeded synthetic cases. Measured rules-only on 100 seeded notes (`npm run bench:100`): 0 of 772 seeded identifiers reached the cloud, 71 of 100 notes blocked (names are the weak type), 29 sent (a guard property, see `docs/CLAIMS.md`). Earlier 20-note run: 137 of 154 masked, 14 blocked. Not a leak rate on real notes.

---

## 3. Built architecture (as of 25 Nov 2026)
- **Local guard:** deterministic rules (MRN, dates, phone, email, names after a title or label) plus Firebase AI Logic `ONLY_ON_DEVICE` (Gemini Nano) for names in free prose. Detected names are masked everywhere they occur. If Nano is unavailable the app says so and runs rules-only; it never falls back to the cloud with raw text.
- **Preview + leak guard:** the abstractor sees what will leave the device. `src/cloud/egress.js` scans the exact outgoing request (against the note's seeded identifiers and against residual patterns) and throws before the cloud call if anything is left.
- **Cloud call:** `PREFER_IN_CLOUD` on a free Gemini model, masked text only, JSON schema (CKD stage, eGFR, albuminuria category, evidence quote). Code checks the stage against the eGFR (KDIGO cut-points).
- **Rehydration:** tokens in the returned JSON are replaced from an in-memory vault; export is JSON, CSV or a FHIR R4 collection Bundle.
- **KDIGO 2024 heatmap + NSAID alert:** `src/kdigo.js` places the eGFR stage and albuminuria category on the KDIGO 2024 risk matrix (heatmap tiers Low to Very High, with monitoring frequency) and raises a nephrotoxin alert when the note mentions an NSAID (keyword match, negations not interpreted; evidence in `docs/EVIDENCE_LITERATURE.md`).
- **FHIR R4 export:** `src/fhir.js` builds a collection Bundle (Patient, eGFR and albuminuria Observations with LOINC codes, CKD-stage Condition with a SNOMED CT code) locally from the rehydrated result.
- **Hybrid Egress Payload Inspector:** shows the exact masked request that leaves the device and the SDK-reported `inferenceSource` for each step (`on_device` for name detection, `in_cloud` for extraction), plus a SHA-256 of the outgoing payload.
- **Benchmarks:** headline real-prose PMC50 extraction audited against a manual clinical key (`docs/pmc50-key-audit.json` & `docs/cloud-eval-pmc-v2.json`: 46/50 = 92.0%, 0 invented numbers; `node scripts/audit-pmc-key.mjs`; rules-only guard via `npm run bench:pmc`), 24 independent held-out hand-written notes (`npm run bench:heldout`, rules-only 156/177 = 88.1%), and 100-case synthetic seeded baselines (`npm run bench:100` rules-only, `docs/cloud-eval-100-runs.json` real-cloud oracle).
- **UI:** native `<dialog>` confirmations (no `window.confirm`), light/dark theme toggle.
- **Hosting:** `firebase.json` sets a Content-Security-Policy limiting `connect-src`, plus security headers.
- **App Check:** reCAPTCHA Enterprise provider when a Firebase config is present; no debug token in code. Firebase AI Logic App Check is Basic - Enforced (reCAPTCHA Enterprise) in the Firebase Console and was verified live on 25 Nov 2026.
- **Cut:** REDCap, Chrome extension.

## 4. Real versus mocked
- With no Firebase config (this repo's default) the cloud backend is a labelled MOCK regex stand-in, App Check is off, and Gemini Nano is used only if Chrome offers it. Chrome on the development Mac reported Nano ready on 19 Nov 2026 (despite 8 GB RAM, contrary to the hardware note in CLAUDE.md), so the app ran with the on-device model there; CI never runs it.
- Numbers come only from the bench and eval scripts (see `docs/CLAIMS.md`): PMC50 audited real-prose results from `docs/pmc50-key-audit.json` and `npm run bench:pmc`, held-out hand-written recall from `npm run bench:heldout`, 20-note synthetic counts from `npm run bench`, and 100-note synthetic counts from `npm run bench:100`.
