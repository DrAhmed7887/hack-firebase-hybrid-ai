# #BuildHybridAI 2026: Project Spec & Architecture

**Entry:** Private Clinical Registry Gate (Firebase AI Logic Hybrid Inference)  
**Track:** Web / Chrome Extension & Web App  
**Deadline:** Monday 30 November 2026, 14:00 PT (23:00 Valencia time)  
**Status:** Phase 1 (Architecture & Research Completed)

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
  - An interactive `/judge` tab running 20 seeded synthetic benchmark cases reporting the measured payload leak rate. No leak rate has been measured yet; to be measured on 20 seeded synthetic cases.

---

## 3. Built architecture (as of 19 Nov 2026)
- **Local guard:** deterministic rules (MRN, dates, phone, email, names after a title or label) plus Firebase AI Logic `ONLY_ON_DEVICE` (Gemini Nano) for names in free prose. Detected names are masked everywhere they occur. If Nano is unavailable the app says so and runs rules-only; it never falls back to the cloud with raw text.
- **Preview + leak guard:** the abstractor sees what will leave the device. `src/cloud/egress.js` scans the exact outgoing request (against the note's seeded identifiers and against residual patterns) and throws before the cloud call if anything is left.
- **Cloud call:** `PREFER_IN_CLOUD` on a free Gemini model, masked text only, JSON schema (CKD stage, eGFR, albuminuria category, evidence quote). Code checks the stage against the eGFR (KDIGO cut-points).
- **Rehydration:** tokens in the returned JSON are replaced from an in-memory vault; export is JSON or CSV.
- **App Check:** reCAPTCHA v3 provider when a Firebase config is present; no debug token in code.
- **Cut:** FHIR, REDCap, Chrome extension, 100-case runner.

## 4. Real versus mocked
- With no Firebase config (this repo's default) the cloud backend is a labelled MOCK regex stand-in, App Check is off, and Gemini Nano is used only if Chrome offers it. Both development laptops have 8 GB RAM, so Nano is not exercised in development.
- Numbers come only from `npm run bench` (see `docs/CLAIMS.md`).
