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

## 3. Hybrid Technical Architecture (Addressing LESSONS.md Cause 4)

### Tier 1: Local On-Device Redaction Gate (`ONLY_ON_DEVICE`)
- **Execution:** Runs 100% client-side in the browser via Firebase AI Logic / Chrome Prompt API.
- **Dual Pipeline (Union Merge):**
  1. *Deterministic Rule Engine:* Regex capturing MRNs, dates, phone numbers, emails, addresses, SSNs.
  2. *On-Device Model:* Gemini Nano detecting contextual entities (patient names in prose, relatives, clinician signatures, informal clinic locations).
- **Token Masking:** Replaces identified spans with deterministic tokens (`[PATIENT_1]`, `[DATE_1]`, `[CLINICIAN_1]`).
- **In-Memory Vault:** Stores the substitution mapping in volatile browser memory only.
- **Hard Leak Guard:** Pre-flight regex barrier. If any unmasked identifier pattern is detected in the serialized payload, the network call is physically thrown/aborted.

### Tier 2: Cloud Schema Abstraction (`PREFER_IN_CLOUD`)
- **Execution:** Firebase AI Logic calling `gemini-3.5-flash-lite` or `gemini-3.8-flash`.
- **Payload:** Strictly abstracted prose (zero direct PII).
- **Output:** Structured JSON schema extraction matching registry variables (e.g. primary diagnosis, eGFR baseline, proteinuria, medication adherence, CKD stage).
- **Security:** Secured via Firebase App Check using debug tokens for evaluation.

### Tier 3: Client-Side Rehydration
- **Execution:** Browser local memory joins extracted registry variables with local patient identifiers for immediate export (CSV / FHIR / REDCap-compatible JSON).

---

## 4. Hardware Adaptation for Development (8 GB RAM Constraint)
- **What is real vs mock:** where Gemini Nano is unavailable, the on-device step is a mock (`MockDeviceModel`) or rules-only, and the app must say so on screen. A cloud fallback is only used on masked text. The demo video must show what actually runs.
- Official Chrome Prompt API requires 16 GB RAM for local weight downloading.
- On 8 GB development hardware (M1 Mac):
  - In development/CI: Provide an automatic deterministic mock adapter (`MockDeviceModel`) simulating Gemini Nano's latency (<200ms) and token spans when `LanguageModel.availability()` returns `unavailable`.
  - In evaluation/demo: Support Chrome canary/dev flags (`--enable-features=PromptAPIForGeminiNano`) or live cloud execution fallback for demonstration while maintaining the explicit hybrid architecture in code.

---

## 5. Judge Experience (30-Second Touch - Addressing LESSONS.md Cause 1)
1. **Interactive Demo:** One-click hosted URL with 3 pre-loaded synthetic clinical notes (Cardiology, Nephrology, Oncology).
2. **Visual Inspection:** Real-time color-coded span highlighting (Blue = Regex Rule, Purple = Gemini Nano On-Device).
3. **"What Leaves Your Device" Inspector:** Live side-by-side payload preview showing exactly which masked text will be sent to the cloud call.
4. **Interactive `/judge` Benchmark Runner:** Live button that tests the 20-case seeded synthetic suite in the browser, showing the measured pass/fail count, leak rate and latency (numbers are reported as measured, not targets).
