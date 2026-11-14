(function(){'use strict';function c(a,b=`unexpected value ${a}!`){throw Error(b);};var d="chrome-context-v39 dark-theme google-sans-context enable-mweb-header-mavatar hide-ogb-signed-out-mweb light-theme lm-component-theme enable-lm-locale-line-height enable-lm-mobile-tokens enable-lm-non-latin-bold-weight enable-lm-spacing-tokens sidenav-mavatar-migration-enabled theme-host variable-context viewer-signed-out zero-state-theme".split(" ");
function e(){if(typeof window==="undefined")var a=1;else{try{let b;a=(b=window.localStorage.getItem("Bard-Color-Theme"))!=null?b:void 0}catch(b){}a=a==="Bard-Dark-Theme"?2:a==="Bard-Light-Theme"?1:0}switch(a){case 0:return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;case 1:return!1;case 2:return!0;default:c(a,"userThemePreference had an unknown type")}};function f(a){var b;return(b=g(a))!=null?b:!1}function k(a,b){return new TypeError(`Invalid ${b} data <${a.i}>: ${a.h} (typeof ${typeof a.h})`)}function g(a){var b=a.h;if(b==null)return null;if(typeof b==="boolean")return b;if(typeof b==="string"){b=b.toLowerCase();if(b==="true"||b==="1")return!0;if(b==="false"||b==="0")return!1}throw k(a,"boolean");}
class l{constructor(a,b){this.i=a;this.h=b}toString(){var a=this.h;if(a==null)a=null;else if(typeof a!=="string")throw k(this,"string");if(a===null)throw Error("Data "+this.i+" not defined.");return a}};function m(a=window){return a.WIZ_global_data}function n(a,b=window){return(b=m(b))&&a in b?b[a]:null};function p(a){return new l(a,n(a,window))};var q=document,u=function(){var a=e(),b=f(p("YwaBv")),h=f(p("Ajsvkd")),r={["theme-host"]:!0,["dark-theme"]:a,["light-theme"]:!a,["sidenav-mavatar-migration-enabled"]:f(p("DedwT")),["enable-mweb-header-mavatar"]:f(p("lcsVce")),["viewer-signed-out"]:!f(p("Lz8rbb")),["hide-ogb-signed-out-mweb"]:f(p("yWdFKd")),["zero-state-theme"]:f(p("RAQcW"))&&b,["google-sans-context"]:!h,["variable-context"]:h,["chrome-context-v39"]:f(p("Wv9gkb")),["enable-lm-spacing-tokens"]:f(p("XODLxf")),["enable-lm-mobile-tokens"]:f(p("BdA8rf")),
["enable-lm-locale-line-height"]:f(p("hQN7bb")),["enable-lm-non-latin-bold-weight"]:f(p("wM456e")),["lm-component-theme"]:f(p("LtiLwc"))};return d.filter(t=>r[t])}();q.body.classList.remove(...d);q.body.classList.add(...u);}).call(this);
(function(){'use strict';function e(a,b){return new TypeError(`Invalid ${b} data <${a.i}>: ${a.h} (typeof ${typeof a.h})`)}function g(a){var b=a.h;if(b==null)return null;if(typeof b==="string")return b;throw e(a,"string");}class h{constructor(a,b){this.i=a;this.h=b}toString(){var a=g(this);if(a===null)throw Error("Data "+this.i+" not defined.");return a}};function k(a=window){return a.WIZ_global_data}function l(a,b=window){return(b=k(b))&&a in b?b[a]:null};function m(a,b=window){return new h(a,l(a,b))};var q={B:0,j:1,m:2,A:3,v:4,l:5,C:6,u:7,o:8};function r(a=m){a:{a=a("svUc8c");let n=!0;var b=void 0;for(d in q){let p=q[d];if(n){n=!1;if(typeof p==="number"){b=void 0;b:{var c=a.h;if(c==null)c=null;else if(typeof c!=="number"){if(typeof c==="string"){let f=Number(c);if(!isNaN(f)&&(f!==0||c.trim().length!==0)){c=f;break b}}throw e(a,"number");}}c=(b=c)!=null?b:0}else b=void 0,c=(b=g(a))!=null?b:0;b=c}if(p==b){var d=b;break a}}JSON.stringify(q);d=b}return d===Number(1)};var t=window,u,v=(u=document.querySelector(".initial-input-area"))==null?void 0:u.getAttribute("data-sidenav-state-key");if(v){let a=!0;try{a=window.localStorage.getItem(v)!=="false"}catch(b){}a&&document.body.classList.add("ssr-nav-open")}var w=document.querySelector(".initial-input-area-container > textarea"),x=w instanceof HTMLElement?w:null;
x&&(r(m)&&(x.focus(),t.INITIAL_INPUT_AREA_FOCUSED_MS=performance.now()),requestAnimationFrame(()=>{t.INITIAL_INPUT_AREA_LOAD_TIME_MS=performance.now()}),x.addEventListener("input",()=>{t.INITIAL_INPUT_AREA_FIRST_CHAR_MS=performance.now()},{once:!0}),typeof performance!=="undefined"&&performance.mark&&performance.mark("gemini.interactive"));}).call(this);
this.gbar_=this.gbar_||{};(function(_){var window=this;
try{
_.td=function(a,b,c){if(!a.o)if(c instanceof Array)for(var d of c)_.td(a,b,d);else{d=(0,_.B)(a.D,a,b);let e=a.A+c;a.A++;b.dataset.eqid=e;a.C[e]=d;b&&b.addEventListener?b.addEventListener(c,d,!1):b&&b.attachEvent?b.attachEvent("on"+c,d):a.v.log(Error("u`"+b))}};
}catch(e){_._DumpException(e)}
try{
var ud=document.querySelector(".gb_L .gb_C"),vd=document.querySelector("#gb.gb_ld");ud&&!vd&&_.td(_.fd,ud,"click");
}catch(e){_._DumpException(e)}
try{
_.sh=function(a){if(a.A)return a.A;for(let b in a.j)if(a.j[b].Y()&&a.j[b].B())return a.j[b];return null};_.th=function(a,b){a.j[b.K()]=b};var uh=new class extends _.x{constructor(a){super();this.D=a;this.A=null;this.v={};this.F={};this.j={};this.B=null}C(a){this.j[a]&&(_.sh(this)&&_.sh(this).K()==a||this.j[a].O(!0))}va(){return this.B}Sa(a){this.B=a;for(let b in this.j)this.j[b].Y()&&this.j[b].Sa(a)}o(a){return a in this.j?this.j[a]:null}}(_.Sc);_.id("dd",uh);
}catch(e){_._DumpException(e)}
try{
_.Ki=function(a,b){return _.L(a,36,b)};_.Li={Hf:"gb_z",fd:"gb_bb",Pl:"gb_Hb",Df:"gb_9a",Nm:"gb_Ff",ln:"gb_hb",mn:"gb_jb",Zo:"gb_fb",If:"gb_X"};
}catch(e){_._DumpException(e)}
try{
var Mi=_.Li.Hf,Ni=Mi?document.querySelector(`.${Mi} .gb_C`):null,Oi=document.querySelector("#gb.gb_ld");Ni&&!Oi&&_.td(_.fd,Ni,"click");
}catch(e){_._DumpException(e)}
})(this.gbar_);
// Google Inc.
(function(){'use strict';var a,b=document.currentScript,c=b&&b.getAttribute("data-payload")||"{}";if(a=JSON.parse(c).YGMNid)try{a=window.localStorage.getItem("GqGm3b")!=="false"}catch(d){a=!0}a&&document.body.classList.add("ssr-nav-open");}).call(this);
document.body.setAttribute('ngcm', '');
Gemini
Library
Images
Scheduled
Students
More
All
Conversation with Gemini
You said
Perform an exhaustive deep research analysis to design the technical architecture, clinical workflow…
Perform an exhaustive deep research analysis to design the technical architecture, clinical workflow, and evaluation methodology for a hybrid on-device/cloud healthcare AI application.
Context:
We are building a production-grade prototype for the Google #BuildHybridAI hackathon using Firebase AI Logic.
Idea: A local identifier-redaction gate running strictly on-device (Gemini Nano / Chrome Prompt API / rules) that redacts sensitive personal identifiers from clinical progress notes, displays an interactive payload preview to the clinician, sends only abstracted/de-identified text to Firebase cloud inference (Gemini Flash Lite) for structured quality registry variable extraction, and rehydrates fields locally.
Please provide a thorough, structured report covering:
1. Clinical Workflow & Named Stake (The "Buyer & Risk" Thesis):
- Focus on Clinical Research Coordinators (CRCs) and Hospital Quality Improvement (QI) Auditors abstracting unstructured EHR notes into disease registries (e.g., AHA Get With The Guidelines, KDIGO CKD registries, or oncology staging).
- Quantify the exact operational pain: manual chart transcription hours, backlog, and the strict institutional prohibition against pasting raw EHR notes into external cloud LLMs due to privacy/data governance regulations (HIPAA, GDPR, health system compliance policies).
- Define how this tool reduces abstraction time (e.g., from 15 minutes to 30 seconds per record) while guaranteeing zero raw identifiable text ever leaves the local machine.
2. Hybrid Technical Architecture (Strict Privacy Split):
- Tier 1: Local On-Device Redaction Gate (ONLY_ON_DEVICE).
* Deterministic rule engine (regex for MRNs, dates, phone numbers, emails, addresses, SSNs).
* On-device model (Gemini Nano) for contextual identifiers (patient names in prose, clinician names, relatives, unformatted facility names).
* Union merge of spans, collision resolution, and token replacement (e.g., [PATIENT_1], [DATE_1], [CLINICIAN_1]).
* Hard programmatic leak guard: falsifiable regex barrier verifying zero forbidden patterns exist in the outgoing payload. If any pattern fails, the cloud call is physically blocked.
- Tier 2: Cloud Schema Abstraction (PREFER_IN_CLOUD).
* Firebase AI Logic call sending only redacted text to extract a structured JSON schema (e.g., primary diagnosis, clinical stage, laboratory trends, medication adherence, exclusion criteria).
- Tier 3: Client-Side Rehydration:
* Mapping extracted JSON variables back to the local patient record in-memory.
3. Benchmark Dataset & Falsifiable Evaluation Plan:
- How to construct a 100-case synthetic clinical progress note evaluation dataset (diverse note styles: SOAP, discharge summaries, outpatient clinic notes) with ground-truth seeded identifiers and known clinical values.
- Mathematical metrics to evaluate:
* Direct identifier leak rate (target: strictly 0.0%).
* Identifier recall: Rules-only baseline vs On-Device Nano alone vs Union.
* Downstream registry extraction accuracy: agreement between extraction from redacted notes vs original unredacted baseline.
* Latency: On-device gate latency (<500ms) vs Cloud extraction latency.
4. Judge-Facing Product Experience (30-Second Touch):
- Exact UI UX specifications for a live web interface that a hackathon judge can test in 30 seconds:
* Canned sample note selector with synthetic cases.
* Real-time highlighted entity visualizer (color-coded badges for rules vs model).
* "What leaves your device" live diff payload inspector.
* One-click "Run /judge Automated Benchmark" tab demonstrating live test execution across the synthetic cohort.
5. Critical Risks, Failure Modes, and Claim Discipline:
- What disclaimers and explicit limitations are necessary (no claims of official HIPAA certification or de-identification compliance; purely documentation-quality assistance on synthetic data)?
- Edge cases where contextual redaction fails and how conservative over-redaction affects downstream schema extraction.
Gemini said
1. Clinical Workflow & Named Stake (The "Buyer & Risk" Thesis)
Target Personas & Institutional Friction
Clinical Research Coordinators (CRCs):
Manage multi-center clinical trials and prospective disease registries (e.
g.,
AHA
Get With The Guidelines
[GWTG] for stroke/heart failure,
KDIGO Chronic Kidney Disease registries,
or AJCC/NAACCR oncology staging).
CRCs must manually read unstructured Electronic Health Record (EHR) progress notes,
discharge summaries,
and pathology reports,
then transcribe discrete data elements into Electronic Data Capture (EDC) systems (e.
g.,
REDCap,
Medidata Rave).
Hospital Quality Improvement (QI) Auditors:
Abstract core quality measures (e.
g.,
CMS SEP-1 sepsis bundles,
surgical site infection surveillance,
VTE prophylaxis) from post-discharge charts to meet accreditation and value-based reimbursement mandates.
Quantified Operational Pain & Compliance Bottleneck
Manual Abstraction Burden:
Manual chart abstraction requires
12 to 20 minutes per patient record
for complex registries (such as oncology staging or heart failure quality metrics).
A single mid-sized hospital submitting 1,
500–3,
000 cases annually per registry expends
375 to 1,000+ FTE hours per registry
purely on manual reading and data entry.
The Data Governance Deadlock:
While commercial Large Language Models (LLMs) can extract structured JSON from clinical prose in seconds,
hospital Chief Information Security Officers (CISOs) and Institutional Review Boards (IRBs) strictly prohibit pasting raw EHR notes into unapproved external cloud endpoints.
Regulatory Constraints:
Under
HIPAA Safe Harbor
(45 CFR § 164.
514(b)(2),
requiring removal of 18 specific identifier classes) and
GDPR Article 9 / Recital 26
(strict controls on special category health data and pseudonymization),
transmitting raw Protected Health Information (PHI) to a consumer or non-BAA cloud model constitutes a reportable data breach.
Value Proposition & Operational Impact
By executing all identifier detection and redaction strictly inside the user's browser via local hardware acceleration before any network socket opens,
the application eliminates the institutional compliance blocker:
Metric
Manual EHR Abstraction
Hybrid On-Device/Cloud Gate
Operational Delta
Time per Chart
~15.0 minutes (900s)
~30 seconds (human review + 2s compute)
96.7% reduction
Raw PHI Egress
N/A (local human transcription)
0 bytes
(strictly redacted tokens only)
Zero cloud PHI exposure
Auditability
Manual source verification
Deterministic pre-egress diff & regex lock
100% deterministic trace
2. Hybrid Technical Architecture (Strict Privacy Split)
The architecture enforces a hard cryptographic and programmatic boundary between
Tier 1 (Local Browser Sandbox)
and
Tier 2 (Firebase Cloud Inference)
using
Firebase AI Logic
(
firebase/ai
) routing primitives (
ONLY_ON_DEVICE
vs.
PREFER_IN_CLOUD
).
Tier 1: Local On-Device Redaction Gate (
ONLY_ON_DEVICE
)
All Tier 1 operations run inside the client browser's main thread or a dedicated Web Worker.
No network requests are permitted during this phase.
Deterministic Rule Engine (High-Precision Structural Matching):
Executes synchronous regular expressions to capture structured HIPAA Safe Harbor identifiers with zero inference latency:
Medical Record Numbers (MRNs) & Account IDs:
\b(?:MRN|FIN|Acct|ID)[:#\s-]*[A-Z0-9]{5,12}\b
Dates (Full & Partial):
ISO (
\d{4}-\d{2}-\d{2}
),
US slash/dash (
\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b
),
and written month formats (
\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{1,2},?\s+\d{2,4}\b
).
Telecom & Digital Identifiers:
Phone/pager numbers (
\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b
),
emails,
IPv4/IPv6 addresses,
and URLs.
Government & Geographic Identifiers:
SSNs (
\b\d{3}-\d{2}-\d{4}\b
),
US ZIP codes (
\b\d{5}(?:-\d{4})?\b
),
and street address patterns (
\b\d{1,5}\s+[A-Z][a-zA-Z0-9\s]{1,30}\s(?:St|Street|Ave|Avenue|Rd|Road|Blvd|Dr|Drive|Ln|Lane|Way|Ct|Court)\b
).
Contextual On-Device Model (Gemini Nano / Chrome Prompt API):
Invoked via Firebase AI Logic configured with
InferenceMode.ONLY_ON_DEVICE
(backed by Chrome's built-in
LanguageModel
/ Gemini Nano).
Target Entities:
Unstructured contextual identifiers that evade regex:
patient names embedded in narrative prose (
"Mrs. Gable reports..."
),
clinician/provider names (
"Discussed with Dr. Aris Thorne"
),
family members/proxies (
"son, Marcus, at bedside"
),
specific hospital/clinic names (
"St. Jude Regional Annex"
),
and rare ages >89.
Prompt Engineering:
Constrained JSON output schema requesting exact character substrings and entity categories (
PATIENT
,
CLINICIAN
,
RELATIVE
,
LOCATION
,
AGE_OVER_89
).
Union Merge, Collision Resolution & Token Replacement:
Both engines output span objects:
{ start: number, end: number, text: string, category: string, source: 'RULE' | 'NANO' }
.
Interval Union & Resolution:
Spans are sorted by
start
index.
If two spans overlap (
A
.
start
≤
B
.
end
A.\text{start} \le B.\text{end}
A
.
start
≤
B
.
end
and
B
.
start
≤
A
.
end
B.\text{start} \le A.\text{end}
B
.
start
≤
A
.
end
),
they are merged into a bounding super-span
[
min
⁡
(
A
.
start
,
B
.
start
)
,
max
⁡
(
A
.
end
,
B
.
end
)
]
[ \min(A.\text{start}, B.\text{start}), \max(A.\text{end}, B.\text{end}) ]
[
min
(
A
.
start
,
B
.
start
)
,
max
(
A
.
end
,
B
.
end
)]
.
If categories conflict,
RULE
priority overrides
NANO
for structural tokens; otherwise,
the broader span wins.
Consistent Indexing:
Identical normalized strings map to the same deterministic placeholder within a single note (e.
g.,
"Elena Rostova"
and
"Ms. Rostova"
map to
[PATIENT_1]
,
preserving coreference for downstream clinical reasoning without leaking identity).
A local ephemeral
Map<string, string>
stores
{ "[PATIENT_1]": "Elena Rostova" }
strictly in volatile browser RAM.
Hard Programmatic Leak Guard (Falsifiable Egress Barrier):
Before invoking the Tier 2 network layer,
the sanitized string passes through an independent,
fail-closed verification gate:
Check 1 (Residual Pattern Scan):
Runs a strict secondary regex suite checking for any remaining 3+ digit sequences not preceded by clinical unit whitelists (e.
g.,
mg
,
mL
,
mmHg
,
bpm
,
%
,
g/dL
,
IU/L
),
unredacted honorifics (
Mr.
,
Mrs.
,
Ms.
,
Dr.
followed by a capitalized token),
or unredacted
@
symbols.
Check 2 (Known Seed Blocklist):
Verifies that zero tokens from the local session's redaction dictionary (
localVault.values()
) appear as substrings in the outgoing payload (case-insensitive).
Circuit Breaker:
If either check triggers,
the function throws a
SecurityEgressBlockedError
and physically aborts the
fetch
/ Firebase SDK call.
Tier 2: Cloud Schema Abstraction (
PREFER_IN_CLOUD
)
Once the user inspects and approves the redacted payload,
Firebase AI Logic executes a
PREFER_IN_CLOUD
call targeting
Gemini Flash Lite
with Structured Outputs (
responseMimeType: "application/json"
).
Payload:
Contains
only
the tokenized clinical narrative (e.
g.,
"[PATIENT_1] is a 68-year-old female admitted on [DATE_1] with acute decompensated heart failure..."
).
Structured Output Schema:
Extracts standardized registry variables:
primary_diagnosis
(ICD-10 code + description)
clinical_stage_or_severity
(e.
g.,
NYHA Class III,
Stage C,
or TNM staging)
biomarkers_and_labs
(key-value array with temporal markers relative to
[DATE_1]
)
guideline_directed_therapies
(medication class,
adherence status,
documented contraindications)
registry_exclusion_criteria
(boolean + verbatim redacted evidence span)
Tier 3: Client-Side Rehydration
The cloud JSON response returns to the browser containing placeholder tokens (e.
g.,
"evidence": "[CLINICIAN_1] documented intolerance to ACE inhibitors due to angioedema on [DATE_2]"
).
The local client iterates through string fields in the returned JSON object and replaces tokens using the in-memory
Map
(
[CLINICIAN_1]
→
\rightarrow
→
"Dr. Aris Thorne"
).
Storage Lifecycle:
The rehydrated record is rendered in the UI for export to the hospital's local EDC/EHR system,
and the ephemeral
Map
is purged on page unload (
window.addEventListener('beforeunload')
).
3. Benchmark Dataset & Falsifiable Evaluation Plan
100-Case Synthetic Clinical Evaluation Cohort
To prevent circular validation and avoid real PHI exposure during development,
construct a stratified synthetic benchmark of
100 clinical notes
across four clinical note archetypes:
Inpatient Admission & Discharge Summaries (30 notes):
High identifier density (multiple dates,
consulting physicians,
transfer facilities,
family contacts) + complex registry variables (AHA GWTG Heart Failure / Stroke).
Outpatient Specialty Clinic Notes (30 notes):
Narrative prose with embedded family history,
referring doctors,
and longitudinal lab trends (KDIGO CKD stages 3–5).
Oncology Pathology & Tumor Board Notes (25 notes):
TNM staging,
specimen accession numbers,
pathologist names,
and biomarker panels.
Emergency Department Triage & Sepsis Consults (15 notes):
Rapid telegraphic prose,
relative timestamps,
EMS run numbers,
and SEP-1 bundle elements.
Ground-Truth Annotation:
Each synthetic note is generated with an accompanying JSON ground-truth manifest containing:
Exact character offsets
[start, end]
and entity types for every seeded HIPAA identifier (target:
800–1,
200 total seeded identifiers across the 100 notes).
Gold-standard registry extraction labels curated by a clinician.
Mathematical Evaluation Metrics
Direct Identifier Leak Rate (
R
leak
R_{\text{leak}}
R
leak
​
) — Primary Safety Metric:
R
leak
=
∑
i
=
1
N
∣
E
seeded
,
i
∩
E
egress
,
i
∣
∑
i
=
1
N
∣
E
seeded
,
i
∣
×
100
%
R_{\text{leak}} = \frac{\sum_{i=1}^{N} \vert{}E_{\text{seeded}, i} \cap E_{\text{egress}, i}\vert{}}{\sum_{i=1}^{N} \vert{}E_{\text{seeded}, i}\vert{}} \times 100\%
R
leak
​
=
∑
i
=
1
N
​
∣
E
seeded
,
i
​
∣
∑
i
=
1
N
​
∣
E
seeded
,
i
​
∩
E
egress
,
i
​
∣
​
×
100%
Target:
Strictly
0.0
%
0.0\%
0.0%
post-Leak Guard (measuring both raw model recall and circuit-breaker interception).
Identifier Recall & Precision (Ablation Study):
Compare three configurations across all 100 synthetic notes:
Baseline A:
Deterministic Rules Only
Baseline B:
On-Device Gemini Nano Only
Proposed System:
Union Merge (Rules
∪
\cup
∪
Gemini Nano) + Leak Guard
Recall
=
T
P
T
P
+
F
N
,
Precision
=
T
P
T
P
+
F
P
\text{Recall} = \frac{TP}{TP + FN}, \quad \text{Precision} = \frac{TP}{TP + FP}
Recall
=
T
P
+
F
N
T
P
​
,
Precision
=
T
P
+
F
P
T
P
​
Hypothesis:
Rules alone achieve ~99% recall on structured tokens (MRNs,
dates) but <15% on prose names; Nano alone achieves ~92% on prose names but misses formatted IDs; Union Merge achieves
>98.5% recall
prior to the hard Leak Guard.
Downstream Registry Extraction Agreement (Clinical Utility Preservation):
Measure whether redacting identifiers degrades Gemini Flash Lite's clinical extraction accuracy by comparing JSON outputs generated from
Unredacted Notes (
Y
raw
Y_{\text{raw}}
Y
raw
​
)
vs.
Redacted Notes (
Y
redacted
Y_{\text{redacted}}
Y
redacted
​
)
:
Categorical Fields (Diagnosis, Stage, Exclusion Boolean):
Cohen's Kappa (
κ
\kappa
κ
) and exact-match accuracy.
Target:
κ
≥
0.95
\kappa \ge 0.95
κ
≥
0.95
.
Numerical/Lab Extraction:
Exact value match rate.
Target:
≥
99.0
%
\ge 99.0\%
≥
99.0%
(verifying that dates/MRNs redaction does not accidentally strip ejection fraction
LVEF 35%
or creatinine
2.4 mg/dL
).
End-to-End Latency & Privacy-Compute Overhead:
Tier 1 On-Device Gate (
T
local
T_{\text{local}}
T
local
​
):
Regex + Gemini Nano span extraction + Leak Guard verification.
Target:
<
500
ms
< 500\text{ ms}
<
500
ms
(p95) on modern desktop hardware with WebGPU/NPU acceleration.
Tier 2 Cloud Extraction (
T
cloud
T_{\text{cloud}}
T
cloud
​
):
Firebase AI Logic Flash Lite structured JSON generation.
Target:
<
1
,
500
ms
< 1,500\text{ ms}
<
1
,
500
ms
(p95).
4. Judge-Facing Product Experience (30-Second Touch)
The web application is engineered for immediate visual verification within a 30-second hackathon judging window,
proving both
clinical utility
and
zero-PHI egress
.
Screen 1: Interactive Clinical Abstraction Workspace (0–20 Seconds)
Top Control Bar:
Synthetic Case Selector Dropdown:
Pre-loaded with 5 high-impact synthetic scenarios (e.
g.,
"Case 01: HFrEF Discharge Summary (AHA GWTG)"
,
"Case 02: Stage IIIB NSCLC Tumor Board"
,
"Case 03: Adversarial Leak Test — Embedded Unformatted Names & MRNs"
).
Hardware Privacy Status Pill:
Live badge polling
LanguageModel.availability()
showing
🔒 Local Gate Active: Gemini Nano (On-Device)
and
Network Egress: Locked
.
Split-Pane Comparison View:
Left Pane — Raw Local EHR Note (Never Transmitted):
Displays the clinical note with real-time,
color-coded inline entity highlights:
Blue Badges (
[RULE]
):
Deterministic regex catches (
MRN
,
DATE
,
PHONE
,
ZIP
).
Purple Badges (
[NANO]
):
Contextual on-device LLM catches (
PATIENT
,
CLINICIAN
,
FACILITY
,
RELATIVE
).
Hovering over any badge displays a tooltip showing detection source,
confidence,
and assigned placeholder token.
Right Pane — "What Leaves Your Device" Live Payload Inspector:
Displays the exact raw JSON HTTP request body queued for Firebase AI Logic.
Identifiable strings are visibly replaced with
[PATIENT_1]
,
[DATE_1]
,
etc.
Includes an interactive
"Simulate Leak Attack"
toggle allowing judges to manually type a name or SSN into the left pane and watch the
Hard Programmatic Leak Guard
turn red and physically disable the
"Extract Registry Variables"
button in real time.
Bottom Drawer — Rehydrated Registry Output:
Clicking
"Approve & Extract via Firebase Cloud"
fires the Tier 2 call and populates a clean clinical registry table (e.
g.,
Primary Diagnosis
,
LVEF %
,
GDMT Medications
,
Contraindications
) with local patient/clinician names seamlessly rehydrated in green italic text.
Screen 2: One-Click
/judge
Automated Benchmark Suite (20–30 Seconds)
Accessible via a prominent header tab (
Run /judge Automated Benchmark
).
Clicking
"Execute Cohort Evaluation"
runs the deterministic rule engine,
Nano inference,
Leak Guard audit,
and schema consistency checks live in the browser across a representative evaluation batch.
Live Telemetry Dashboard renders:
Direct Identifier Leak Rate:
0.00% (0 / 240 seeded identifiers leaked)
Ablation Recall Comparison Bar Chart:
Rules Only (
61.4%
) vs.
Nano Only (
88.2%
) vs.
Hybrid Union (
99.2%
) vs.
Post-Leak Guard (
100.0% Blocked/Redacted
)
Median On-Device Gate Latency:
e.
g.,
284 ms
Downloadable Audit Log:
JSON export of the evaluation run for technical verification.
5. Critical Risks, Failure Modes, and Claim Discipline
Regulatory & Compliance Claim Discipline
To maintain strict engineering integrity and avoid misleading institutional stakeholders or hackathon judges,
the UI,
documentation,
and pitch must enforce explicit boundaries:
No Certification Claims:
Explicitly state that this prototype is
not HIPAA-certified
,
not a covered entity Business Associate
,
and
not a certified medical device (SaMD)
.
Synthetic Data Scope:
State clearly in the persistent footer and modal disclaimer that all demonstration notes are
100% synthetic
and the system must not be used with real patient data without formal institutional IRB/CISO validation and an executed Google Cloud/Firebase Business Associate Agreement (BAA).
Human-in-the-Loop Mandate:
Position the tool strictly as
documentation-quality and abstraction assistance
requiring clinician/CRC verification before committing data to an official registry.
Technical Failure Modes & Mitigations
Failure Mode
Clinical / Privacy Mechanism
Architectural Mitigation
Eponymous Clinical Terms Over-Redacted
Gemini Nano misclassifies medical eponyms (e.g.,
Parkinson's disease
,
Babinski sign
,
Crohn's colitis
,
Gleason score
) as
[PATIENT_1]
or
[CLINICIAN_1]
, stripping essential clinical semantics before cloud extraction.
Clinical Eponym Whitelist:
Maintain a curated dictionary of ~1,500 standard medical eponyms, anatomical terms, and drug names (
[WHITELIST_CLINICAL]
) that overrides
NANO
person-entity spans unless preceded by a personal title (
Mr.
,
Mrs.
,
Dr.
).
Clinical Measurements Misclassified as Dates/IDs
Regex or Nano mistakes vital signs (
120/80
), lab ratios (
4/10
), or staging (
T2N1M0
) for dates or MRNs.
Unit & Context Boundary Guards:
Exclude slash-delimited numbers preceded by
BP
,
blood pressure
,
visual acuity
, or
strength
from date regexes; whitelist TNM staging patterns (
T[0-4][a-c]?N[0-3][a-c]?M[0-1]
).
Relative Timeline Loss
Replacing all dates with opaque tokens (
[DATE_1]
,
[DATE_2]
) prevents the cloud LLM from knowing whether a lab value occurred 2 days or 2 years after diagnosis.
Date-Shifting / Relative Delta Encoding (Optional Enhancement):
Compute the day offset relative to the admission/index date locally (
[INDEX_DATE]
,
[INDEX_DATE + 3d]
,
[INDEX_DATE - 14d]
), preserving exact clinical timelines without revealing calendar dates.
On-Device Model Unavailability / Cold Start
The user's browser lacks Chrome Prompt API flags, WebGPU support, or hasn't finished downloading the Gemini Nano weights.
Fail-Closed Degradation:
Never silently fall back to sending unredacted text to the cloud. If
ONLY_ON_DEVICE
Nano is unavailable, lock cloud egress and notify the user with exact setup instructions (
chrome://flags/#prompt-api-for-gemini-nano
).
Hydrogen
Gemini is AI and can make mistakes, including about people.
Your privacy & Gemini
Opens in a new window
window.__BG3_DATA__ = {locale: 'en'};
this.gbar_=this.gbar_||{};(function(_){var window=this;
try{
/*

 Copyright Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
var Fd;_.Dd=function(a){var b=a.length;if(b>0){let c=Array(b);for(let d=0;d<b;d++)c[d]=a[d];return c}return[]};Fd=function(a){return new _.Ed(b=>b.substr(0,a.length+1).toLowerCase()===a+":")};_.Gd=globalThis.trustedTypes;_.Hd=class{constructor(a){this.j=a}toString(){return this.j}};_.Id=new _.Hd("about:invalid#zClosurez");_.Ed=class{constructor(a){this.nj=a}};_.Jd=[Fd("data"),Fd("http"),Fd("https"),Fd("mailto"),Fd("ftp"),new _.Ed(a=>/^[^:]*([/?#]|$)/.test(a))];_.Kd=class{constructor(a){this.j=a}toString(){return this.j+""}};_.Ld=new _.Kd(_.Gd?_.Gd.emptyHTML:"");
}catch(e){_._DumpException(e)}
try{
_.Md=function(a){if(a==null)return a;if(typeof a==="string"&&a)a=+a;else if(typeof a!=="number")return;return(0,_.Ja)(a)?a|0:void 0};_.Nd=function(a,b){return a.lastIndexOf(b,0)==0};
}catch(e){_._DumpException(e)}
try{
var Pd,ae,Od,Qd,de,Wd;Pd=function(){var a=null;if(!Od)return a;try{let b=c=>c;a=Od.createPolicy("ogb-qtm#html",{createHTML:b,createScript:b,createScriptURL:b})}catch(b){}return a};_.Rd=function(){Qd===void 0&&(Qd=Pd());return Qd};_.Td=function(a){var b=_.Rd();a=b?b.createScriptURL(a):a;return new _.Sd(a)};_.Ud=function(a){if(a instanceof _.Sd)return a.j;throw Error("y");};_.Vd=function(a){if(a instanceof _.Hd)return a.j;throw Error("y");};_.Xd=function(a){if(Wd.test(a))return a};
_.Yd=function(a){return a instanceof _.Hd?_.Vd(a):_.Xd(a)};_.Zd=function(a,b=document){var c,d=(c=b.querySelector)==null?void 0:c.call(b,`${a}[nonce]`);return d==null?"":d.nonce||d.getAttribute("nonce")||""};_.S=function(a,b,c){return _.Ia(_.Hc(a,b,c,_.Gc))};_.$d=function(a,b){return _.Md(_.Hc(a,b,void 0,_.Gc))};ae=class extends _.P{constructor(a){super(a)}oc(a){return _.N(this,24,a)}};_.be=function(){return _.G(_.bd,ae,1)};
_.ce=function(a){var b=_.Ga(a);return b=="array"||b=="object"&&typeof a.length=="number"};Od=_.Gd;_.Sd=class{constructor(a){this.j=a}toString(){return this.j+""}};Wd=/^\s*(?!javascript:)(?:[\w+.-]+:|[^:/?#]*(?:[/?#]|$))/i;var je,ne,ee;_.ge=function(a){return a?new ee(_.fe(a)):de||(de=new ee)};_.he=function(a,b){return typeof b==="string"?a.getElementById(b):b};_.T=function(a,b){var c=b||document;c.getElementsByClassName?a=c.getElementsByClassName(a)[0]:(c=document,a=a?(b||c).querySelector(a?"."+a:""):_.ie(c,"*",a,b)[0]||null);return a||null};_.ie=function(a,b,c,d){a=d||a;return(b=b&&b!="*"?String(b).toUpperCase():"")||c?a.querySelectorAll(b+(c?"."+c:"")):a.getElementsByTagName("*")};
_.ke=function(a,b){_.wb(b,function(c,d){d=="style"?a.style.cssText=c:d=="class"?a.className=c:d=="for"?a.htmlFor=c:je.hasOwnProperty(d)?a.setAttribute(je[d],c):_.Nd(d,"aria-")||_.Nd(d,"data-")?a.setAttribute(d,c):a[d]=c})};je={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};
_.le=function(a){return a?a.defaultView:window};_.oe=function(a,b){var c=b[1],d=_.me(a,String(b[0]));c&&(typeof c==="string"?d.className=c:Array.isArray(c)?d.className=c.join(" "):_.ke(d,c));b.length>2&&ne(a,d,b,2);return d};ne=function(a,b,c,d){function e(f){f&&b.appendChild(typeof f==="string"?a.createTextNode(f):f)}for(;d<c.length;d++){let f=c[d];!_.ce(f)||_.Gb(f)&&f.nodeType>0?e(f):_.Yb(f&&typeof f.length=="number"&&typeof f.item=="function"?_.Dd(f):f,e)}};
_.pe=function(a){return _.me(document,a)};_.me=function(a,b){b=String(b);a.contentType==="application/xhtml+xml"&&(b=b.toLowerCase());return a.createElement(b)};_.qe=function(a,b){a.appendChild(b)};_.re=function(a){for(var b;b=a.firstChild;)a.removeChild(b)};_.se=function(a){return a&&a.parentNode?a.parentNode.removeChild(a):null};_.te=function(a,b){return a&&b?a==b||a.contains(b):!1};_.fe=function(a){return a.nodeType==9?a:a.ownerDocument||a.document};ee=function(a){this.j=a||_.u.document||document};
_.n=ee.prototype;_.n.H=function(a){return _.he(this.j,a)};_.n.getElementsByTagName=function(a,b){return(b||this.j).getElementsByTagName(String(a))};_.n.Wa=function(a,b,c){return _.oe(this.j,arguments)};_.n.appendChild=_.qe;_.n.append=function(a,b){ne(_.fe(a),a,arguments,1)};_.n.canHaveChildren=function(a){if(a.nodeType!=1)return!1;switch(a.tagName){case "APPLET":case "AREA":case "BASE":case "BR":case "COL":case "COMMAND":case "EMBED":case "FRAME":case "HR":case "IMG":case "INPUT":case "IFRAME":case "ISINDEX":case "KEYGEN":case "LINK":case "NOFRAMES":case "NOSCRIPT":case "META":case "OBJECT":case "PARAM":case "SCRIPT":case "SOURCE":case "STYLE":case "TRACK":case "WBR":return!1}return!0};
_.n.Ef=_.re;_.n.removeNode=_.se;_.n.contains=_.te;
}catch(e){_._DumpException(e)}
try{
_.Si=function(a,b){a.src=_.Ud(b).toString()};_.Ti=function(a){var b=_.Zd("script",a.ownerDocument);b&&a.setAttribute("nonce",b)};_.Ui=function(a,b){a.src=_.Ud(b);_.Ti(a)};_.Vi=function(a){if(!a)return null;a=_.K(a,4);var b;a===null||a===void 0?b=null:b=_.Td(a);return b};_.Wi=function(a,b){a=_.rb(a.ka,b);return a!=null&&_.ya(a)||Array.isArray(a)};_.Xi=class extends _.P{constructor(a){super(a)}};_.Yi=function(a,b){return(b||document).getElementsByTagName(String(a))};
}catch(e){_._DumpException(e)}
try{
var $i=function(a,b){a<b?Zi(a+1,b):_.Sc.log(Error("ba`"+a+"`"+b))},Zi=function(a,b){if(aj){let c=_.pe("SCRIPT");c.async=!0;c.type="text/javascript";c.charset="UTF-8";_.Ui(c,aj);c.onerror=_.Jb($i,a,b,c.src);_.Yi("HEAD")[0].appendChild(c)}},bj=class extends _.P{constructor(a){super(a)}};var cj=_.G(_.bd,bj,17)||new bj,dj,aj=(dj=_.G(cj,_.Xi,1))?_.Vi(dj):null,ej,fj=(ej=_.G(cj,_.Xi,2))?_.Vi(ej):null,gj=function(){Zi(1,2);if(fj){let a=_.pe("LINK");a.setAttribute("type","text/css");a.href=_.Ud(fj).toString();a.rel="stylesheet";let b=_.Zd("style",document);b&&a.setAttribute("nonce",b);_.Yi("HEAD")[0].appendChild(a)}};(function(){var a=_.be();if(_.S(a,18))gj();else{let b=_.$d(a,19)||0;window.addEventListener("load",()=>{window.setTimeout(gj,b)})}})();
}catch(e){_._DumpException(e)}
})(this.gbar_);
// Google Inc.
Dictate (⌘⇧D)
New chat
Search chats
Library
Images
Scheduled
Students
Activity
Settings
Switch model (⌘⇧M)
Expand text
Edit prompt
Copy prompt
More options
Good response
Bad response
Redo
Copy response
More
Google apps
Google Account
Ahmed Zayed
[REDACTED_EMAIL]
Google membership