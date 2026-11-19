// The ONLY path from this app to the cloud model. The guard runs on the exact serialized request, then `generate` is called.
import { assertNoLeak } from '../guard/leakGuard.js';
import { gfrCategory } from '../kdigo.js';

export const INSTRUCTION =
  'You are helping a kidney registry abstractor. From the de-identified clinical note below, extract the most recent values. ' +
  'Bracketed tokens such as [NAME_1] or [DATE_2] are placeholders: never guess what they stand for. ' +
  'Return JSON with: ckd_stage (KDIGO G1, G2, G3a, G3b, G4 or G5 from the most recent eGFR), egfr (number, mL/min/1.73 m2, most recent), ' +
  'albuminuria_category (A1 <30, A2 30-300, A3 >300 mg/g urine albumin/creatinine, or not_documented), evidence (one short quote from the note).';

export const RESPONSE_SCHEMA_JSON = {
  type: 'object',
  properties: {
    ckd_stage: { type: 'string', enum: ['G1', 'G2', 'G3a', 'G3b', 'G4', 'G5'] },
    egfr: { type: 'number' },
    albuminuria_category: { type: 'string', enum: ['A1', 'A2', 'A3', 'not_documented'] },
    evidence: { type: 'string' },
  },
  required: ['ckd_stage', 'egfr', 'albuminuria_category', 'evidence'],
};

export function buildRequest(maskedText) {
  return `${INSTRUCTION}\n\nNOTE:\n${maskedText}`;
}

/**
 * @param maskedText text that is supposed to be de-identified
 * @param seeded known identifiers to check for (demo notes), may be empty
 * @param generate async (requestString) => string; the cloud backend (Firebase AI Logic, or a mock)
 */
export async function sendMaskedToCloud(maskedText, seeded, generate) {
  const request = buildRequest(maskedText);
  assertNoLeak(request, seeded); // throws LeakError: generate is never reached
  const raw = await generate(request);
  const parsed = JSON.parse(raw);
  // code cross-checks the model: stage must agree with eGFR under KDIGO cut-points
  parsed.stage_check = typeof parsed.egfr === 'number' && gfrCategory(parsed.egfr) === parsed.ckd_stage ? 'consistent' : 'inconsistent';
  return parsed;
}
