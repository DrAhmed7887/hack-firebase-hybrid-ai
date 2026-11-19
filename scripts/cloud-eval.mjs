// Real cloud run (needs .env.local, free-tier Gemini via Firebase AI Logic). Masking uses the seeded names as an oracle so this
// isolates the CLOUD MODEL's extraction accuracy; it says nothing about the masker. Usage: node --env-file=.env.local scripts/cloud-eval.mjs [--write]
import { readFileSync, writeFileSync } from 'node:fs';
import { initializeApp } from 'firebase/app';
import { getAI, GoogleAIBackend, getGenerativeModel, InferenceMode, Schema } from 'firebase/ai';
import { processNote } from '../src/pipeline.js';

const e = process.env;
const app = initializeApp({ apiKey: e.VITE_FIREBASE_API_KEY, projectId: e.VITE_FIREBASE_PROJECT_ID, appId: e.VITE_FIREBASE_APP_ID });
const model = e.VITE_CLOUD_MODEL || 'gemini-3.5-flash-lite';
const m = getGenerativeModel(getAI(app, { backend: new GoogleAIBackend() }), {
  mode: InferenceMode.ONLY_IN_CLOUD,
  inCloudParams: {
    model,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: Schema.object({ properties: {
        ckd_stage: Schema.enumString({ enum: ['G1', 'G2', 'G3a', 'G3b', 'G4', 'G5'] }),
        egfr: Schema.number(),
        albuminuria_category: Schema.enumString({ enum: ['A1', 'A2', 'A3', 'not_documented'] }),
        evidence: Schema.string() } }),
    },
  },
});
const cases = JSON.parse(readFileSync(new URL('../data/synthetic/cases.json', import.meta.url)));
let sent = 0, stageModel = 0, stage = 0, egfr = 0, alb = 0, errors = 0, leaked = 0;
const wrong = [];
// retry transient 429/503 up to 4 times with backoff; the request is the same masked text each time
async function call(req) {
  for (let i = 0; ; i++) {
    try { return (await m.generateContent(req)).response.text(); } catch (err) {
      if (i >= 4 || !/\[(403|429|503)/.test(err.message)) throw err;
      await new Promise((r) => setTimeout(r, 4000 * (i + 1)));
    }
  }
}
for (const c of cases) {
  const deviceNames = c.seeded.filter((i) => i.type === 'name').map((i) => i.value); // ORACLE masking
  let out;
  try {
    out = await processNote(c.text, c.seeded, call, { deviceNames });
  } catch (err) { errors++; wrong.push(`${c.id}: ${(err.message.match(/\[(\d{3}[^\]]*)\]/) || [])[1] || err.message.slice(0, 80)}`); continue; }
  if (!out.sent) continue;
  sent++;
  const r = out.result;
  if (r.stage_by_model === c.truth.ckd_stage) stageModel++; else wrong.push(`${c.id} model stage ${r.stage_by_model} vs ${c.truth.ckd_stage}`);
  if (r.ckd_stage === c.truth.ckd_stage) stage++; else wrong.push(`${c.id} code stage ${r.ckd_stage} vs ${c.truth.ckd_stage}`);
  if (r.egfr === c.truth.egfr) egfr++; else wrong.push(`${c.id} egfr ${r.egfr} vs ${c.truth.egfr}`);
  if (r.albuminuria_category === c.truth.albuminuria_category) alb++; else wrong.push(`${c.id} alb ${r.albuminuria_category} vs ${c.truth.albuminuria_category}`);
}
const res = { when: new Date().toISOString().slice(0, 10), model, masking: 'seeded-name oracle (isolates extraction accuracy)', cases: cases.length, sent, errors, correct: { ckd_stage_by_model: stageModel, ckd_stage_derived_by_code_from_egfr: stage, egfr, albuminuria_category: alb }, disagreements: wrong };
console.log(JSON.stringify(res, null, 2));
if (process.argv.includes('--write')) writeFileSync(new URL('../docs/cloud-eval.json', import.meta.url), JSON.stringify(res, null, 2) + '\n');
