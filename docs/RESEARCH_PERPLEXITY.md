1
New
[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}
Automations
Artifacts
Plugins
Teammates
Hire your first teammate
Persistent agents that work for you.
Create new teammate
Projects
Laptop mess
Spanish Primary-Care Cardiovascular and CKM Case-Finding
Dental SOAP
AI agents
Spain NLV
Show more
Recents
Conduct deep research into the newly released Firebase AI Logic (formerly Vertex AI in Firebase) hybrid on-device and cloud inference architecture and its developer implementation for the Google #BuildHybridAI 2026 hackathon.

Please provide comprehensive, cited technical information on the following 5 areas:

1. Firebase AI Logic SDK API Reference & Syntax:
   - Exactly how is Firebase AI Logic imported and initialized in Web (JavaScript / TypeScript, @firebase/ai or firebase/ai) and Android (Kotlin)?
   - What is the exact API syntax for configuring hybrid execution modes (PREFER_ON_DEVICE, ONLY_ON_DEVICE, PREFER_IN_CLOUD, ONLY_IN_CLOUD)?
   - How does client-side model initialization work (e.g., initializeDeviceModel(), LanguageModel.availability(), user-gesture requirements)?
   - What structured JSON/schema parameters are supported on-device vs cloud (e.g., responseSchema, responseMimeType: application/json)?
   - What are the free-tier models and quotas on the Firebase Spark plan (e.g., Gemini Nano on-device, Gemini 3.5 Flash Lite in cloud)?

2. Hardware Limits & Local Development Workarounds:
   - Official documentation states Chrome Desktop Gemini Nano Prompt API requires 16 GB RAM, 4+ cores, and 22 GB free disk. 
   - How can developers test, build, and debug Firebase AI Logic on developer machines with 8 GB RAM (such as Apple M1 8 GB) or in CI/CD without the local download failing?
   - Are there Chrome flags (e.g., bypass hardware checks, mock providers) or Android AICore / emulator options for local hybrid testing?

3. App Check Integration:
   - How to configure Firebase App Check for Web and Android using debug tokens so client-side AI Logic calls work during local development and for hackathon judges testing a live web demo without breaking?

4. On-Device Contextual PII/Identifier Redaction State-of-the-Art:
   - What are the most effective architectures combining deterministic regex rules with on-device LLMs (Gemini Nano) to detect and redact names, dates, MRNs, locations, and healthcare staff names in unstructured notes?
   - How is local in-memory rehydration structured so that after cloud abstraction on redacted text, original IDs are safely mapped back locally?

5. Winning Patterns in Devpost Hybrid / Google AI Hackathons:
   - How have top-scoring entries in recent Google/Firebase AI hackathons demonstrated hybrid AI so that judges can verify the on-device and cloud split within 30 seconds?
   - Provide concrete examples of a visible /judge or live payload preview inspector demonstrating zero-data-leakage to the cloud.
can you check and tell me the best model setup ever?
The strongest multi-agent development setup relies on a three-tier orchestrator-worker-auditor architecture rather than a single model—splitting massive context ingestion, deep multi-file code execution, and adversarial verification across specialized frontier agents.
Because your stack already includes Antigravity (agy), Claude Code CLI, OpenAI Codex CLI, Meta Muse CLI, and Perplexity Pro, you already have every piece needed for a top-tier setup without adding new subscriptions.
RoleBest Tool & Model (Nov 2026)Why It Owns This Layer
1. Architect & Control Plane
Google Antigravity (agy) (Gemini 3.8 Flash / Gemini 4 Hydrogen)
Massive 1M-token context window for holding entire repositories, specs, and audit rules in memory at once; generates structured artifacts (PLAN.md, walkthroughs) and dispatches worker prompts.
2. Heavy Code Execution
Claude Code CLI (Claude Opus 5.5 default; Claude Fable 5.2 for hard logic/math)
Highest reliability for long-running multi-file refactors, test-driven loops, and headless background tasks. Fable 5.2 (released Nov 10, 2026) currently tops coding/science benchmarks for complex logic, while Opus 5.5 is the best all-around engineering workhorse.
3. Fast Workhorse & Second Opinion
Claude Sonnet 5.5 / OpenAI Codex CLI (GPT-5.6 Sol / GPT-6.1 Terra)
Use Sonnet 5.5 for fast everyday edits and subagents without burning Opus/Fable rate limits. Use Codex CLI in parallel git worktrees for isolated sandboxing, automated PRs, or a second-opinion diff when a bug stalls Claude.
4. Deep Literature & Grounding
Perplexity Pro (Decider v1.3)
Best for live clinical guideline lookups, official API documentation, and citation-backed research before writing specs.
Optimal Rules to Make This Setup Hum
Never let one agent grade its own homework: Have agy write the spec and acceptance tests, dispatch Claude Code headless (< /dev/null) to implement and pass pytest/UI tests, and then have agy (or Codex CLI) run a fresh diff audit against the spec before pushing to main.
Tier your Claude models inside Claude Code: Run Sonnet 5.5 for routine scaffolding, documentation (CLAIMS.md, JUDGES.md), and UI tweaks; reserve Opus 5.5 or Fable 5.2 strictly for complex clinical logic, database migrations, and tricky debugging.
Isolate parallel runs with git worktree: When running Claude Code and Codex CLI simultaneously on the same repo, give each its own git worktree so they never collide on file locks or dirty working trees.
Keep CLAUDE.md and GEMINI.md synced: Maintain a single source of truth for repo rules, test commands, and commit conventions in root markdown files so every CLI agent inherits identical guardrails automatically.
Research for a Spanish primary-care digital health pitch (Spain, 2026). For every number give the source (URL or PMID/DOI), year, and the exact quoted sentence. Use € figures. If a number isn't found, say "not found"; do not estimate. 6. Competitors in Spain for CKD / cardio-renal-metabolic case-finding in primary care: laboratory CDSS at Hospital La Fe (AlinIQ/GestLab) and Hospital San Juan de Alicante / FISABIO (PMID 41515503); EHR cohort tools (SIA ALUMBRA "Consulta de Colectivos Clínicos", ECAP, Diraya); population stratification (GMA, ACG); vendors (Savana, IQVIA, Roche navify, Abbott AlinIQ, Siemens, Renalytix KidneyIntelX, Healthy.io Minuteful Kidney); pharma-sponsored screening programmes. For each: what triggers it, who it covers, whether it pre-fills orders, reported outcomes, cost per person screened, and price if public. 7. Healthy.io Minuteful Kidney in Spain or Europe: price per test and published outcomes.
Research for a Spanish primary-care digital health pitch (Spain, 2026). For every number give the source (URL or PMID/DOI), year, and the exact quoted sentence. Use € figures. If a number isn't found, say "not found"; do not estimate. 4. Cost-effectiveness of CKD screening / early detection in people with diabetes or hypertension (Spain or Europe): cost per QALY, savings from delaying dialysis; cost-effectiveness of SGLT2 inhibitors in CKD in Spain. 5. Market: number of primary-care centres (centros de salud and consultorios) and family physicians in Spain and in Comunitat Valenciana; average GP list size (cupo); Spanish public spending on health IT/digital health; Spain clinical decision support or population-health-management market size; public tenders (licitaciones) for primary-care CDSS, population stratification or proactive-follow-up tools with contract values (Conselleria de Sanidad SIA/ALUMBRA, Catalonia ECAP, Andalucía Diraya, Madrid AP-Madrid, others).
Research for a Spanish primary-care digital health pitch (Spain, 2026). For every number give the source (URL or PMID/DOI), year, and the exact quoted sentence. Use € figures. If a number isn't found, say "not found"; do not estimate. 1. Epidemiology, Spain: adults with type 2 diabetes, hypertension, and chronic kidney disease (prevalence and absolute counts); share of CKD undiagnosed in primary care; Comunitat Valenciana counts if available. 2. Cost of CKD in Spain: annual cost per patient by stage (G3–G5); annual cost per patient on haemodialysis and peritoneal dialysis; transplant cost; total national CKD spending and share of the SNS budget; cost per episode in Spain of myocardial infarction, stroke and heart-failure hospitalisation. 3. Unit costs: public price of urine albumin/creatinine ratio and serum creatinine/eGFR in Spanish regional public price lists (e.g. Comunitat Valenciana Ley de tasas, Catalonia, Madrid); cost of a primary-care GP visit.
Stress-Test Spain Cardiovascular Case-Finding
check @Notion  @GitHub tell me if there is something needed to be improved
AI Tool Orchestration for Solo Developers
Use my connected GitHub (DrAhmed7887/claude-setup and zayed-profile if accessible) and Notion ("🗒️ Session Log" and "🧠 Memory") connectors, plus live 2026 web research, to design the cleanest, lowest-overhead alignment plan for my AI tools, agents, credits, and MacBook Air before my 1 Dec exam freeze.
What is ALREADY Done and Live (Do Not Re-Propose):
brain-sync & brain-sync-prep (Phase 3): Live in ~/.local/bin/ on the MacBook Pro with 127 passing tests. It strictly validates inbound notes from Zayed OS/Sessions/inbox/YYYY-MM-DD_<tool>_<laptop>_<slug>.md, writes to Notion Session Log (77e08776-6e05-4c1d-b3b2-2251ee0d4ff8) with a marker, routes ### Remember bullets to Memory, and refreshes RECENT.md and MEMORY.md.
/sessions-import & claude-sync.sh patches: Applied on the Pro (sessions-import now calls brain-sync instead of raw Notion tool writes; claude-sync.sh has a 12s pull timeout).
Restic backup (pro-backup): Updated and verified (snapshot 58edf232 on Extreme SSD). Covers ~/.zayed-board, ~/.agents/skills, ~/.claude/client-skills, and streams the Air's chats over LAN.
Notion Session Log cleanup: The 5 malformed rows from Nov 10–12 are fixed.
What I Need You to Audit & Design (Read-Only Analysis -> Actionable Plan for Claude Code):
Multi-Tool Alignment (Claude Code, OpenAI Codex, Gemini CLI, Antigravity agy, and Muse):
Global Instructions & zayed-profile build: My rules/common/user_profile.md is generated from ~/Projects/zayed-profile/core.md (which refuses to overwrite hand-edited managed blocks). How should ~/.gemini/GEMINI.md, ~/.codex/AGENTS.md, and Muse's global instructions be structured on both the Pro and the Air so they share my core profile and Session Summary rules without breaking profile-build or claude-setup git sync?
Muse (muse-cli) Integration: Verify the exact 2026 config paths, skill loading (~/.agents/skills/), and session wrap workflow for Muse so it matches Codex ($wrap), Gemini CLI (/wrap), and agy. Check if "Muse" should be added to the Notion Session Log Tool select schema (Claude Code, Codex, Gemini, Antigravity, agy).
Skills Deduping Across Tools: On the Pro, we removed the 3 orphaned Shanze symlinks (shanze-voice, shanze-writer, shanze-voice-workspace) from ~/.claude/skills/ because ~/.agents/skills/ held older Codex-ported copies while ~/.claude/client-skills/ held the newer Claude copies. What is the cleanest rule for which skills belong in ~/.agents/skills/ (shared by Codex, Gemini, Muse) vs ~/.claude/skills/ vs ~/.claude/client-skills/?
MacBook Air Pre-Freeze Alignment (Before 1 Dec Freeze for 8 Dec RWTH Exam):
Both Macs are M1 with 8 GB RAM (Air swap was recently 4.37 / 5.12 GB; Pro swap 1.56 / 3.07 GB).
What exact checklist should Claude Code run over Tailscale SSH (ssh air) to bring the Air to 100% parity with the Pro (claude-setup pull, removing the 3 orphaned Shanze symlinks on Air, verifying ~/.gemini/GEMINI.md, ~/.gemini/commands/wrap.toml, ~/.codex/AGENTS.md, and reconciling ~/Projects/zayed-profile/resources.md where Pro has uncommitted 10 Nov edits for ElevenLabs, GCP credits, Copilot/Codespaces, and Motion)?
Credits, Quotas & Routing Strategy (Zero-Card / Free & Credit-Backed Only):
Check my repo rules (storage-and-tools.md, performance.md, and any credit/resource notes in Notion/GitHub) and 2026 rate-limit/quota behavior across:
Claude Code (Desktop app vs CLI—noting that Desktop app can eagerly load the 91k Notion MCP schema while CLI defers it to 2.9k)
Gemini CLI & Antigravity (agy) (I hit the Gemini/Antigravity token cap today—how to prevent quota exhaustion and route fallback work cleanly)
OpenAI Codex CLI & GitHub Copilot / Codespaces (Student / entitlements)
GCP Credits, ElevenLabs, and Perplexity
Give me a crisp routing table: which tool/model handles which task type (heavy coding, RWTH exam prep, hackathon prototyping, research, session wrap) when a quota or cap hits on another tool.
Output Format:
Executive Routing & Credits Table (Tool -> Best Use -> Quota/RAM Trap to Avoid -> Fallback).
Exact File & Config Architecture for Claude, Codex, Gemini, agy, and Muse across Pro + Air.
Copy-Paste Execution Prompt for Claude Code that gives Claude clear goals and boundaries (read-only verification first, no micromanagement, never touching ~/Private or the Air's 6.4 GB ~/.gemini chat history) to align both laptops in one pass.Deep Research
AI Tool Alignment Before Exam Freeze
Please use your connected GitHub and Notion sources to inspect my AI agent setup and generate a precise status report for Claude Code.

1. GitHub Audit: Check my private config repo (zayed-ai-config or claude-setup equivalent) for the exact current paths and file contents of my global instruction files (CLAUDE.md, GEMINI.md, rules/common/).
2. Notion Audit: Query my Notion "🗒️ Session Log" database to verify the latest logged schema properties (Session, Date, Area, Tool, Summary, Open loops) and confirm how brain-sync structures inbound markdown files.
3. Output Format: Give me a clean, factual markdown summary of my current rule structures, file paths, and Notion database properties so I can hand it straight to Claude Code to align local configurations. Do not execute any writes or changes.

@Notion @GitHub @Google Drive
now I am working and you can connect to @Google Drive @notion and tell me if the buildup is right for this hackathon project Hackathon - Boehringer
Unifying AI Coding Agent Configurations
I run 4 AI coding agents (Claude Code, Gemini CLI / Antigravity, OpenAI Codex CLI, and Meta Muse Code CLI) across two M1 MacBooks (MacBook Pro and MacBook Air, both 8 GB RAM). I want the cleanest, lowest-overhead architecture to unify their instructions, skills, and session summaries without bloating startup tokens or RAM.
My Current Setup & Constraints:
Hardware & Token Budget: Both Macs have 8 GB RAM, so no heavy background daemons or local Node/Docker MCP servers. My Claude Code currently starts at ~70k tokens (CLAUDE.md + rules/common/ = 52 KB / ~13k tokens; 40 skills + 22 agents = 114 KB / ~10k tokens; MCP tool schemas = ~30k tokens). I want to shrink this startup load, not grow it.
State & Notion Pipeline (Already Working):
Notion is my canonical brain ("🗒️ Session Log" and "🧠 Memory" databases).
Tools drop session summary markdown files into Google Drive at ~/Library/CloudStorage/GoogleDrive-*/My Drive/Zayed OS/Sessions/inbox/YYYY-MM-DD_<tool>_<laptop>_<slug>.md.
A daily 07:30 job (brain-sync) moves inbox files into Notion, routes ### Remember bullets to Memory, and writes RECENT.md and MEMORY.md back to Drive.
An on-demand /snapshot command writes a 150-line SNAPSHOT.md (laptop health, repos, open loops) to Zayed OS/Sessions/SNAPSHOT.md.
Strict Guardrails:
Free or credit-backed tools only (no credit-card-backed API auto-billing or unattended paid background agents).
Nothing that sends, deletes, or shares runs without my explicit confirmation.
Never touch ~/Private, secrets, or patient details.
What I Need You to Research and Verify (with 2026 Citations):
Cross-Agent Config & Instruction Unification (via GitHub Dotfiles):
Verify the exact 2026 global instruction files, skill directories, and custom slash command paths for:
Claude Code (~/.claude/CLAUDE.md, ~/.claude/commands/, ~/.claude/skills/)
OpenAI Codex CLI (~/.codex/AGENTS.md, ~/.codex/config.toml, ~/.agents/skills/ vs ~/.codex/skills/)
Gemini CLI & Antigravity (~/.gemini/GEMINI.md, ~/.gemini/commands/*.toml)
Meta Muse Code CLI (~/.config/muse/, system message / rules file path, and bundled skills path)
Show the cleanest symlink layout using a single private GitHub repo (zayed-ai-config) and a single canonical AGENTS.md (or @AGENTS.md import) so I only maintain my core rules and SNAPSHOT.md / RECENT.md paths in one place across both Macs.
Zero-Bloat Session Wrap Trigger (/wrap or $wrap):
Compare triggering the end-of-session Drive inbox summary via a custom command (wrap.md / wrap.toml) vs. an on-demand SKILL.md (~/.agents/skills/wrap/SKILL.md).
Show the exact sandbox/permission config needed in Codex (~/.codex/config.toml writable_roots) and Muse (--approval-mode on-request) so they can write the summary file to the Google Drive inbox/ folder ONLY after asking for my confirmation.
Pruning the 70k Token Startup Bloat:
Give me a step-by-step audit method to move rarely used rules and skills out of global startup into on-demand skills (SKILL.md with tight frontmatter descriptions) across all four tools.
Format the output as an actionable blueprint with exact file paths, a symlink script, and citations to current official docs.

@Notion @GitHub
Spanish Primary Care CKM Case-Finding
Spanish Primary Care CKM Case-Finding
Winoly casino (winoly.com / winoly1.com) — who owns and operates it, what licence does it hold, when did it launch, and are there any player complaints, withdrawal problems or sister brands? Focus on Australian players, 2026.
Smokos casino operator licence company owner
Smokos casino review Australia player complaints withdrawals 2026
Smokos casino review Australia player complaints withdrawals 2026
View all
Upgrade plan
Ahmed Zayed
Free plan
Answer
Answer
Links
Links
Images
Images
Share
12:01 PM
Conduct deep research into the newly released Firebase AI Logic (formerly Vertex AI in Firebase) hybrid on-device and cloud inference architecture and its developer implementation for the Google #BuildHybridAI 2026 hackathon.
Please provide comprehensive, cited technical information on the following 5 areas:
Firebase AI Logic SDK API Reference & Syntax:
Exactly how is Firebase AI Logic imported and initialized in Web (JavaScript / TypeScript, @firebase/ai or firebase/ai) and Android (Kotlin)?
What is the exact API syntax for configuring hybrid execution modes (PREFER_ON_DEVICE, ONLY_ON_DEVICE, PREFER_IN_CLOUD, ONLY_IN_CLOUD)?
How does client-side model initialization work (e.g., initializeDeviceModel(), LanguageModel.availability(), user-gesture requirements)?
What structured JSON/schema parameters are supported on-device vs cloud (e.g., responseSchema, responseMimeType: application/json)?
What are the free-tier models and quotas on the Firebase Spark plan (e.g., Gemini Nano on-device, Gemini 3.5 Flash Lite in cloud)?
Hardware Limits & Local Development Workarounds:
Official documentation states Chrome Desktop Gemini Nano Prompt API requires 16 GB RAM, 4+ cores, and 22 GB free disk.
How can developers test, build, and debug Firebase AI Logic on developer machines with 8 GB RAM (such as Apple M1 8 GB) or in CI/CD without the local download failing?
Are there Chrome flags (e.g., bypass hardware checks, mock providers) or Android AICore / emulator options for local hybrid testing?
App Check Integration:
How to configure Firebase App Check for Web and Android using debug tokens so client-side AI Logic calls work during local development and for hackathon judges testing a live web demo without breaking?
On-Device Contextual PII/Identifier Redaction State-of-the-Art:
What are the most effective architectures combining deterministic regex rules with on-device LLMs (Gemini Nano) to detect and redact names, dates, MRNs, locations, and healthcare staff names in unstructured notes?
How is local in-memory rehydration structured so that after cloud abstraction on redacted text, original IDs are safely mapped back locally?
Winning Patterns in Devpost Hybrid / Google AI Hackathons:
How have top-scoring entries in recent Google/Firebase AI hackathons demonstrated hybrid AI so that judges can verify the on-device and cloud split within 30 seconds?
Provide concrete examples of a visible /judge or live payload preview inspector demonstrating zero-data-leakage to the cloud.
Read more
Finished
6s
Firebase AI Logic (the renamed Vertex AI in Firebase) now provides a single client SDK that routes a prompt to an on-device model when available—Chrome’s Prompt API on desktop Web or ML Kit/AICore on supported Android devices—and falls back to a cloud-hosted Gemini model otherwise. For #BuildHybridAI, the strongest implementation is a privacy-first pipeline: deterministic local redaction, on-device structured extraction when possible, and cloud abstraction only on already-redacted, schema-constrained payloads.
firebase.google
+2
1. SDK API and syntax
Web / TypeScript
Install the unified Firebase JS SDK—not a separate
@firebase/ai
package:
bash
npm
install
firebase
Firebase AI Logic is imported from
firebase/ai
; on-device inference requires Firebase AI Logic JS SDK v12.5.0+ and desktop Chrome 139+.
firebase.google
ts
import
{
initializeApp
}
from
"firebase/app"
;
import
{
initializeAppCheck
}
from
"firebase/app-check"
;
import
{
getAI
,
getGenerativeModel
,
GoogleAIBackend
,
InferenceMode
,
}
from
"firebase/ai"
;
const
firebaseApp
=
initializeApp
(
firebaseConfig
)
;
const
ai
=
getAI
(
firebaseApp
,
{
backend
:
new
GoogleAIBackend
(
)
,
// Gemini Developer API
}
)
;
const
model
=
getGenerativeModel
(
ai
,
{
mode
:
InferenceMode
.
PREFER_ON_DEVICE
,
}
)
;
The official Web guide uses
firebase/ai
,
getAI()
,
GoogleAIBackend
, and
getGenerativeModel()
. The default cloud model is
gemini-3.5-flash-lite
, but it can be overridden.
firebase.google
Execution modes
All four modes are supported on Web and Android:
Mode
Behavior
PREFER_ON_DEVICE
Uses the local model if available and supported; otherwise falls back to cloud.
firebase.google
+1
ONLY_ON_DEVICE
Uses local inference or throws; never sends the request to cloud.
firebase.google
+1
PREFER_IN_CLOUD
Prefers cloud; falls back on-device if cloud is unavailable.
firebase.google
+1
ONLY_IN_CLOUD
Requires cloud; throws if unavailable.
firebase.google
+1
ts
const
localOnly
=
getGenerativeModel
(
ai
,
{
mode
:
InferenceMode
.
ONLY_ON_DEVICE
,
}
)
;
const
cloudOnly
=
getGenerativeModel
(
ai
,
{
mode
:
InferenceMode
.
ONLY_IN_CLOUD
,
}
)
;
For Android, the mode is passed through
onDeviceConfig
:
kotlin
@OptIn
(
PublicPreviewAPI
::
class
)
val
model
=
Firebase
.
ai
(
backend
=
GenerativeBackend
.
googleAI
(
)
)
.
generativeModel
(
modelName
=
"gemini-3.5-flash-lite"
,
onDeviceConfig
=
OnDeviceConfig
(
mode
=
InferenceMode
.
PREFER_ON_DEVICE
)
)
The Android SDK requires
firebase-ai
plus the separate
firebase-ai-ondevice
artifact; the latter transitively includes ML Kit’s Prompt API and requires
minSdk
26.
firebase.google
kotlin
dependencies
{
implementation
(
"com.google.firebase:firebase-ai:18.2.0"
)
implementation
(
"com.google.firebase:firebase-ai-ondevice:16.0.0-beta08"
)
implementation
(
"com.google.firebase:firebase-appcheck-debug:20.1.0"
)
}
Local-model initialization
On Web,
initializeDeviceModel()
must be called
after or during a user gesture
—for example, a button click—and before
generateContent()
. It can report download progress and may trigger the initial Gemini Nano model download.
firebase.google
ts
await
model
.
initializeDeviceModel
(
(
progress
)
=>
{
console
.
log
(
`
Download progress:
${
(
progress
*
100
)
.
toFixed
(
2
)
}
%
`
)
;
}
)
;
You can also probe Chrome directly:
ts
const
availability
=
await
LanguageModel
.
availability
(
)
;
// "unavailable" | "downloadable" | "downloading" | "available"
if
(
availability
===
"downloadable"
)
{
await
LanguageModel
.
create
(
)
;
}
Firebase’s guide explicitly recommends
LanguageModel.availability()
and
LanguageModel.create()
for pre-downloading the Chrome model.
firebase.google
On Android, use
FirebaseAIOnDevice.checkStatus()
and
FirebaseAIOnDevice.download()
:
kotlin
when
(
val
status
=
FirebaseAIOnDevice
.
checkStatus
(
)
)
{
OnDeviceModelStatus
.
DOWNLOADABLE
->
{
FirebaseAIOnDevice
.
download
(
)
.
collect
{
download
->
// DownloadStarted / DownloadInProgress / DownloadCompleted / DownloadFailed
}
}
OnDeviceModelStatus
.
AVAILABLE
->
{
model
.
onDeviceExtension
?
.
warmUp
(
)
}
else
->
{
/* cloud path or user education */
}
}
warmUp()
loads the model into memory and initializes runtime components; it is currently Kotlin-only.
firebase.google
Structured output
This is the key hybrid pattern: configure
both
execution targets in one request.
On-device:
use
onDeviceParams.responseConstraint
, supplied as Firebase
Schema
helpers or a plain JSON Schema.
Cloud:
use
inCloudParams.generationConfig.responseMimeType
(
application/json
for JSON,
text/x.enum
for enums) plus
responseSchema
.
firebase.google
+1
ts
import
{
Schema
}
from
"firebase/ai"
;
const
redactionSchema
=
Schema
.
object
(
{
properties
:
{
redactedText
:
Schema
.
string
(
)
,
entities
:
Schema
.
array
(
{
items
:
Schema
.
object
(
{
properties
:
{
type
:
Schema
.
enumString
(
{
enum
:
[
"NAME"
,
"DATE"
,
"MRN"
,
"LOCATION"
,
"STAFF"
]
,
}
)
,
replacement
:
Schema
.
string
(
)
,
}
,
required
:
[
"type"
,
"replacement"
]
,
}
)
,
}
)
,
cloudTaskRequired
:
Schema
.
boolean
(
)
,
}
,
required
:
[
"redactedText"
,
"entities"
,
"cloudTaskRequired"
]
,
}
)
;
const
hybridModel
=
getGenerativeModel
(
ai
,
{
mode
:
InferenceMode
.
PREFER_ON_DEVICE
,
inCloudParams
:
{
model
:
"gemini-3.5-flash-lite"
,
generationConfig
:
{
responseMimeType
:
"application/json"
,
responseSchema
:
redactionSchema
,
}
,
}
,
onDeviceParams
:
{
responseConstraint
:
redactionSchema
,
}
,
}
)
;
The on-device path supports single-turn text generation, text-plus-JPEG/PNG input, and structured output including JSON and enums; it does
not
support chat, tools/function calling, audio/video/PDF inputs, URL-file inputs, or image generation.
firebase.google
+1
On Android, structured output for on-device and hybrid modes requires a Kotlin
data class
annotated with
@Generable
, processed by KSP; manual schemas and direct enum-class annotations are not the supported route.
firebase.google
Free tier and quotas
Firebase AI Logic itself is free; the billing question is the underlying Gemini provider. The Gemini Developer API has a no-cost tier usable on the Firebase Spark plan without linking Cloud Billing; Agent Platform Gemini API (formerly Vertex AI) requires Blaze.
firebase.google
+1
Item
Practical position
Firebase AI Logic SDK
Free.
firebase.google
On-device Gemini Nano / Chrome Prompt API
No Firebase cloud inference cost; Chrome states no data is sent to Google or third parties during model use.
developer.chrome
Cloud fallback on Spark
Use the Gemini Developer API free tier; limited model access and explicit rate limits.
firebase.google
+1
Default cloud model
gemini-3.5-flash-lite
.
firebase.google
Firebase AI Logic request limit
Default limit is 100 requests per user per minute.
firebase.google
On-device Web token limit
9,216 tokens.
firebase.google
On-device Android token limit
4,000 tokens; outputs over about 256 tokens are discouraged.
firebase.google
For a hackathon, keep the cloud model on
gemini-3.5-flash-lite
, use short structured prompts, and cache deterministic results so judges do not exhaust the free quota.
2. Low-RAM and CI workarounds
Chrome’s official hardware requirements are: at least 22 GB free on the volume containing the Chrome profile, either a GPU with more than 4 GB VRAM or a CPU environment with at least 16 GB RAM and 4+ cores, plus an unmetered connection only for the initial model download.
developer.chrome
+1
An 8 GB Apple M1 therefore cannot reliably run the desktop Chrome Gemini Nano path under Chrome’s stated CPU requirements. Do
not
make on-device execution a hard demo dependency on that machine.
Recommended architecture
Use a three-tier runtime strategy:
Environment
Execution policy
Demo behavior
Eligible Chrome desktop
PREFER_ON_DEVICE
Real local redaction/extraction; visible
inferenceSource: "on-device"
Ineligible browser / 8 GB M1
ONLY_IN_CLOUD
for a clearly labeled synthetic fallback, or a local non-LLM deterministic pipeline
Judge still sees the privacy boundary
CI/CD
Never download or invoke the browser model
Unit-test regex, schema validation, mapping vault, and cloud contract with mocks
Local development pattern
Implement a
RedactionEngine
interface with two implementations:
ts
type
InferenceSource
=
"on-device"
|
"cloud"
|
"deterministic-local"
;
interface
RedactionEngine
{
redact
(
input
:
string
)
:
Promise
<
RedactionResult
>
;
}
class
HybridRedactionEngine
implements
RedactionEngine
{
async
redact
(
input
:
string
)
{
const
deterministic
=
deterministicRedact
(
input
)
;
if
(
await
canUseOnDevice
(
)
)
{
try
{
const
local
=
await
localModel
.
redact
(
deterministic
.
remainingText
)
;
return
{
...
local
,
source
:
"on-device"
as
InferenceSource
}
;
}
catch
{
// fall through
}
}
const
cloud
=
await
cloudModel
.
redact
(
deterministic
.
remainingText
)
;
return
{
...
cloud
,
source
:
"cloud"
as
InferenceSource
}
;
}
}
This lets an 8 GB machine demonstrate the
privacy architecture
without pretending that Gemini Nano is running locally. The UI should explicitly distinguish:
ON-DEVICE: Gemini Nano
CLOUD: Gemini 3.5 Flash Lite
LOCAL DETERMINISTIC: regex + dictionary
BLOCKED: sensitive payload never left device
Chrome flags and mocking
Firebase’s documented Web requirement is Chrome 139+ and the flag:
text
chrome://flags/#prompt-api-for-gemini-nano-multimodal-input
There is no reliable, documented Chrome flag to bypass the RAM/CPU/storage eligibility gate. Treat “bypass hardware checks” as unsupported: it may produce inconsistent behavior, fail model download, or violate the demo’s claim of real on-device inference. Chrome’s own guidance says to use
responseConstraint
for structured output, but does not provide a mock-provider switch for the Prompt API.
developer.chrome
+1
For CI, avoid installing the Chrome model entirely. Test these layers separately:
Regex/dictionary redaction with deterministic fixtures.
JSON Schema validation and replacement-token integrity.
A fake
GenerativeModel
that returns fixture JSON.
Cloud request contract tests using a recorded request/response pair, with no real PHI.
A Playwright test that asserts the outbound network payload contains only redacted text or no network call at all in
ONLY_ON_DEVICE
mode.
Android emulator
Android on-device inference depends on supported physical devices and AICore; it is not a generic emulator feature. The official Android guide says the SDK will not automatically download the model when it is unavailable—it either falls back to cloud or throws, depending on mode.
firebase.google
For emulator development:
Use
PREFER_IN_CLOUD
or
ONLY_IN_CLOUD
for functional tests.
Use
PREFER_ON_DEVICE
only on a supported physical device.
Simulate
OnDeviceModelStatus.UNAVAILABLE
in unit tests.
Handle AICore’s
ErrorCode.BUSY
with exponential backoff and
PER_APP_BATTERY_USE_QUOTA_EXCEEDED
with a cloud or deferred path.
firebase.google
3. App Check for local and judge demos
Firebase now requires App Check enforcement for Firebase AI Logic as of November 2, 2026. The setup flow automatically enforces it; verify under
Security > App Check > APIs > Firebase AI Logic
that it says
Enforced
, not
Unenforced
.
firebase.google
+1
Web debug setup
Set the debug flag
before
initializing App Check:
ts
if
(
import
.
meta
.
env
.
DEV
)
{
(
self
as
any
)
.
FIREBASE_APPCHECK_DEBUG_TOKEN
=
true
;
}
initializeAppCheck
(
firebaseApp
,
{
provider
:
new
ReCaptchaEnterpriseProvider
(
import
.
meta
.
env
.
VITE_RECAPTCHA_SITE_KEY
)
,
isTokenAutoRefreshEnabled
:
true
,
}
)
;
Open DevTools, copy the printed token, then register it in
Firebase Console > Security > App Check > Apps > Manage debug tokens
.
firebase.google
Do not add
localhost
to reCAPTCHA allowed domains; Firebase specifically warns that this would let anyone run the app locally.
firebase.google
Android debug setup
kotlin
Firebase
.
initialize
(
context
=
this
)
Firebase
.
appCheck
.
installAppCheckProviderFactory
(
DebugAppCheckProviderFactory
.
getInstance
(
)
)
Run the app, copy the debug token from Logcat, and safelist it in the Firebase console. Keep debug builds and tokens out of source control and production releases.
firebase.google
Judge-safe live demo
For a public judge URL, use the real production attestation provider—not the debug provider:
Web: reCAPTCHA Enterprise (or the appropriate supported provider for your app).
Android: Play Integrity for Android apps.
Keep a separate local-only Firebase project or separate App Check app registration for development.
A good judge setup is a deployed demo that works with production App Check, plus a local
?demo=redacted
mode that uses synthetic clinical notes and shows the exact outbound payload. Do not expose debug tokens, Firebase config secrets that should remain private, or raw PHI in the public deployment.
4. On-device PII redaction architecture
For clinical or other sensitive unstructured notes, do not ask an LLM to “remove PII” as a single opaque step. Use a layered, auditable pipeline: deterministic detection first, local model only for ambiguous spans, cloud only for de-identified abstraction.
Pipeline
Normalize locally:
decode text, preserve offsets, remove obvious formatting noise.
Deterministic detection:
regex plus curated dictionaries for MRNs, dates, phone numbers, emails, addresses, national IDs, and known staff names.
Local-model candidate detection:
send only a short, non-sensitive
context window
—or better, a locally constructed candidate list—to Gemini Nano for classification and boundary correction.
Local replacement:
substitute each span with stable, reversible pseudonyms such as
[NAME_1]
,
[DATE_1]
,
[MRN_1]
,
[LOCATION_1]
,
[STAFF_1]
.
Local policy gate:
if confidence is low, ambiguity remains, or the note exceeds the on-device token budget, mark the case
cloudTaskRequired
and either request explicit consent or keep it local.
Cloud abstraction:
send only the redacted text and a schema-constrained task, such as “produce a clinical summary and ICD-10 candidates.”
Local rehydration:
replace cloud-generated placeholders with original values only in the browser/app memory, never persisting the mapping to cloud storage.
The on-device model should classify and normalize; it should not be the sole authority for deletion. Deterministic rules provide recall and auditability; the LLM improves precision on variants such as abbreviated names, informal date formats, and contextual staff references.
Example schema
ts
const
redactionSchema
=
Schema
.
object
(
{
properties
:
{
spans
:
Schema
.
array
(
{
items
:
Schema
.
object
(
{
properties
:
{
start
:
Schema
.
integer
(
)
,
end
:
Schema
.
integer
(
)
,
type
:
Schema
.
enumString
(
{
enum
:
[
"NAME"
,
"DATE"
,
"MRN"
,
"LOCATION"
,
"PHONE"
,
"EMAIL"
,
"STAFF"
,
"OTHER_ID"
]
,
}
)
,
confidence
:
Schema
.
number
(
)
,
replacementToken
:
Schema
.
string
(
)
,
}
,
required
:
[
"start"
,
"end"
,
"type"
,
"confidence"
,
"replacementToken"
]
,
}
)
,
}
)
,
residualRisk
:
Schema
.
enumString
(
{
enum
:
[
"LOW"
,
"MEDIUM"
,
"HIGH"
]
,
}
)
,
}
,
required
:
[
"spans"
,
"residualRisk"
]
,
}
)
;
Use character offsets, not model-generated strings, as the source of truth. The local code validates that each proposed span matches the original text before replacement; reject or downgrade any hallucinated span.
Safe local rehydration
Keep the mapping in a session-scoped, non-persisted structure:
ts
type
VaultEntry
=
{
token
:
string
;
original
:
string
;
type
:
"NAME"
|
"DATE"
|
"MRN"
|
"LOCATION"
|
"STAFF"
;
confidence
:
number
;
expiresAt
:
number
;
}
;
const
vault
=
new
Map
<
string
,
VaultEntry
>
(
)
;
function
rehydrate
(
cloudOutput
:
string
)
:
string
{
return
cloudOutput
.
replace
(
/
\[(NAME|DATE|MRN|LOCATION|STAFF)_(\d+)\]
/
g
,
(
_match
,
type
,
index
)
=>
{
const
entry
=
vault
.
get
(
`
${
type
}
_
${
index
}
`
)
;
return
entry
?.
original
??
`
[
${
type
}
_
${
index
}
]
`
;
}
)
;
}
Security rules:
Generate replacement tokens locally with a random session secret; do not use predictable IDs if the mapping could be exported.
Keep the vault in memory or IndexedDB only with explicit user consent and encryption; never write originals to Firestore, analytics, logs, or cloud-function payloads.
Expire mappings when the session ends.
Strip original values from error messages, stack traces, and Firebase Performance Monitoring custom attributes.
For the judge demo, display a “cloud egress” panel containing the exact string sent to Gemini, plus a cryptographic or visual proof that no original span appears in it.
5. Winning #BuildHybridAI demo pattern
Recent hackathon guidance and the official challenge framing emphasize showing that one hybrid SDK delivers fast, private, low-cost AI: local execution when Gemini Nano is available, cloud when it is not.  The winning demo should make the routing decision
visible, verifiable, and immediate
.
parsecailabs
+1
30-second judge flow
Build a
/judge
route with this exact sequence:
Paste or select a synthetic note.
Press
“Run private redaction.”
The UI immediately shows:
Runtime: Detecting…
It resolves to a colored badge:
ON-DEVICE
or
CLOUD FALLBACK
, sourced from the SDK response’s
inferenceSource
property.
firebase.google
A split panel shows:
Original synthetic note.
Redacted payload.
Exact outbound cloud request JSON, if any.
Cloud response JSON.
Rehydrated final result.
A “Network proof” panel shows either
0 bytes of PHI sent to cloud
or the redacted payload only.
Payload inspector
ts
const
cloudRequest
=
{
model
:
"gemini-3.5-flash-lite"
,
contents
:
[
{
role
:
"user"
,
parts
:
[
{
text
:
redactedText
,
// only placeholders and non-identifying context
}
,
]
,
}
,
]
,
generationConfig
:
{
responseMimeType
:
"application/json"
,
responseSchema
:
clinicalAbstractionSchema
,
}
,
}
;
Render this object before the call, then capture the actual request through a service worker, fetch wrapper, or Firebase callable-function boundary. The inspector should include:
inferenceSource
promptCharsSent
phiTokensDetected
redactionCoverage
cloudBytesSent
cloudCallMade: true | false
originalTextLeakCheck: PASS
mappingVaultLocation: browser-memory-only
High-scoring product framing
For a healthcare-oriented entry, position the app as
“Private Clinical Intake Summarizer”
:
On-device:
detects and masks names, dates, MRNs, locations, and staff identifiers; classifies note type; extracts structured fields.
Cloud:
receives only
[NAME_1] visited [LOCATION_1] on [DATE_1]
and returns an abstraction, care-plan draft, or coding suggestion.
Sources
46
⠼
Upgrade for a more rigorous hybrid AI implementation guide
Use stronger models to synthesize scattered docs into exact SDK syntax, constraints, and judge-friendly hybrid verification patterns.
Upgrade to Pro
Ask a follow-up
Search
Computer
Model
(function(){function c(){var b=a.contentDocument||(a.contentWindow&&a.contentWindow.document);if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'a5a581e57c7c841a',t:'MTc5NDY1Mzk3Mw=='};var l=window.parent.location,o;try{o=new URL(l.origin).origin}catch(e){try{o=new URL(new URL(l.href).origin).origin}catch(e){o=''}}var u='/cdn-cgi/challenge-platform/scripts/jsd/main.js?ray=a5a581e57c7c841a',a=document.createElement('script');a.src=o?new URL(u,o).href:u;document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();