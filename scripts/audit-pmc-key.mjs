// Audit of the 50-text PMC answer key, scored against the recorded model outputs. Zero cloud calls.
//
// Question audited: "most recent single patient eGFR value in mL/min/1.73 m2".
// The automatic key in data/pmc/pmc50.json (egfr_ref) was built from each abstract without a clinical read.
// AUDIT below is the manual, case-by-case clinical read of all 50 texts (done 25 Nov 2026 by an AI agent, not clinician-adjudicated):
//   value = the patient's most recent single documented eGFR (approximate values such as '~9' count);
//   null  = no single patient eGFR is documented (cohort mean/median, inclusion threshold or range,
//           a percentage, a protocol, or no eGFR number), so 'not documented' is the clinically right answer.
// Model outputs are rebuilt from docs/cloud-eval-pmc-v2.json: the file lists every case whose answer differed
// from egfr_ref as "<id> egfr <model answer|not_documented> vs <egfr_ref>"; all other cases equal egfr_ref.
// Run: node scripts/audit-pmc-key.mjs            (print the audit, fail if docs/pmc50-key-audit.json is stale)
//      node scripts/audit-pmc-key.mjs --write    (rewrite docs/pmc50-key-audit.json)
import { readFileSync, writeFileSync } from 'node:fs';

const rel = (p) => new URL(p, import.meta.url);
const cases = JSON.parse(readFileSync(rel('../data/pmc/pmc50.json')));
const v2 = JSON.parse(readFileSync(rel('../docs/cloud-eval-pmc-v2.json')));

// [id, audited value or null, basis]
const AUDIT = [
  ['pmc-01', 42.48, 'serial patient values: 28.00 (May 2023) then 42.48 (Jan 2026); most recent 42.48'],
  ['pmc-02', 9, "single patient value written as approximate: 'estimated glomerular filtration rate ~9'"],
  ['pmc-03', 46.3, 'single patient value: eGFR nadir 46.3 on 24 Dec, last eGFR in the text'],
  ['pmc-04', 42.34, 'serial patient values: baseline 73.2, then 42.34; later only a fluctuation range (24.65-57.3); most recent single value 42.34'],
  ['pmc-05', 19, 'single patient value 19'],
  ['pmc-06', null, 'cohort mean eGFR 79.7 +/- 20.7 (cross-sectional study)'],
  ['pmc-07', null, 'cohort median eGFR 52 (IQR 38-68) at COVID-19 diagnosis'],
  ['pmc-08', 62.6, 'serial patient values: 113.28, 63.58, then 62.6 at last follow-up; most recent 62.6'],
  ['pmc-09', null, "baseline eGFR 'below 30' only (threshold)"],
  ['pmc-10', 80, 'serial patient values: 65 then 80'],
  ['pmc-11', 15, 'serial patient values: 9 then 15'],
  ['pmc-12', null, "cohort result: 'early eGFR dip in 21% of patients'; no patient value"],
  ['pmc-13', 35.69, 'serial patient values: 26.95 then 35.69'],
  ['pmc-14', null, "cohort outcome ('eGFR remained stable'); no patient value"],
  ['pmc-15', 44.9, 'serial patient values: 36.4 then 44.9'],
  ['pmc-16', 49, 'single patient value 49'],
  ['pmc-17', null, 'donor cohort means (GFR 74.6 to 89.8 on renography); inclusion range 60-89'],
  ['pmc-18', 10, 'serial patient values: 19 then 10 at discharge'],
  ['pmc-19', 42, 'serial patient values: 68, 34, then 42 at 3 months'],
  ['pmc-20', null, "inclusion threshold 'baseline eGFR greater than 50'"],
  ['pmc-21', 128.1, 'serial patient values: 58.86 on admission, 128.1 at discharge'],
  ['pmc-22', 29.4, 'serial patient values: 79.2 then 29.4'],
  ['pmc-23', 107, 'single patient value 107'],
  ['pmc-24', null, "donor cohort: 'decline below 60 in 8 donors' (threshold)"],
  ['pmc-25', null, 'eGFRdiff (cystatin C minus creatinine eGFR) cohort strata; no patient eGFR'],
  ['pmc-26', 12.1, 'single patient value 12.1'],
  ['pmc-27', null, 'cohort medians (SPK 45.4 to 55.5; LK 38.8 to 46.3)'],
  ['pmc-28', 18, "serial patient values: 57 then 'approximately 18' (written as approximate)"],
  ['pmc-29', 38, 'serial patient values: 28 then 38 at 8 months'],
  ['pmc-30', null, "cohort percentage: '50% had CKD (eGFR < 60)'"],
  ['pmc-31', null, 'inclusion threshold (baseline eGFR >= 15)'],
  ['pmc-32', null, 'trial protocol; eGFR only as an endpoint definition (decline >= 40%)'],
  ['pmc-33', null, 'cohort split point (eGFR <= 66)'],
  ['pmc-34', null, 'cohort baseline mean 82.0 +/- 22.0'],
  ['pmc-35', 114, 'single patient value 114'],
  ['pmc-36', null, 'four-patient chart review; no eGFR value stated (eGFR = 10 is only the dialysis projection point)'],
  ['pmc-37', 79, "single patient value written as approximate: 'approximately 79' (CKD-EPI 2021)"],
  ['pmc-38', null, 'cohort percentages (19% had >30% decline); no patient value'],
  ['pmc-39', 4, 'single patient value 4'],
  ['pmc-40', null, "range only: 'remained between 41 and 50' (borderline: a bounded range, not a single value)"],
  ['pmc-41', 61, 'serial patient values: 32.5 then 61 after recovery'],
  ['pmc-42', 48.12, 'serial patient values: 20.27 then 48.12 after 36 weeks'],
  ['pmc-43', null, 'cohort means 40.1, 41.3, 40.7; inclusion range 15-60'],
  ['pmc-44', null, "background statistic: 'discharge eGFR below 60' (threshold)"],
  ['pmc-45', 16, 'single patient value 16'],
  ['pmc-46', null, "lower bound only: 'eGFR: >80' at 20 weeks (borderline: a censored lab value, not a single measured number)"],
  ['pmc-47', 9, 'single patient value 9 (creatinine clearance 12 is a different quantity)'],
  ['pmc-48', null, "percentage: 'eGFR 25% below baseline'; no value"],
  ['pmc-49', null, 'trial protocol inclusion range 25-90'],
  ['pmc-50', 67.2, 'serial patient values: 55 (2023), 69 (2024), 67.2 (2025); most recent 67.2'],
];

const auditById = new Map(AUDIT.map(([id, value, basis]) => [id, { value, basis }]));
if (AUDIT.length !== 50 || auditById.size !== 50) throw new Error('audit table must hold 50 unique cases');

// Model outputs from the disagreement list; every case not listed equals egfr_ref.
const model = new Map();
for (const d of v2.disagreements) {
  const m = /^(pmc-\d+) egfr (\S+) vs (\S+)$/.exec(d);
  if (!m) throw new Error(`cannot parse disagreement: ${d}`);
  model.set(m[1], m[2] === 'not_documented' ? null : Number(m[2]));
}
const same = (a, b) => (a === null || b === null ? a === b : Math.abs(a - b) < 0.005);
const numRe = (n) => new RegExp(`(?<![\\d.])${String(n).replace('.', '\\.')}(?![\\d])`);

const rows = [];
for (const c of cases) {
  const a = auditById.get(c.id);
  if (!a) throw new Error(`no audit row for ${c.id}`);
  const out = model.has(c.id) ? model.get(c.id) : c.egfr_ref;
  if (a.value !== null && !numRe(a.value).test(c.text)) throw new Error(`${c.id}: audited value ${a.value} is not in the text`);
  const documented = a.value !== null;
  const correct = same(out, a.value);
  let error = null;
  if (!correct) error = documented ? (out === null ? 'missed_documented_value' : 'wrong_number') : 'number_for_cohort_or_threshold';
  rows.push({
    id: c.id,
    class: documented ? 'single_patient_egfr_documented' : 'no_single_patient_egfr',
    audited_key: a.value,
    egfr_ref_automatic: c.egfr_ref,
    key_changed: !same(a.value, c.egfr_ref),
    model_output: out,
    correct,
    error,
    basis: a.basis,
  });
}

const count = (f) => rows.filter(f).length;
const doc = rows.filter((r) => r.audited_key !== null);
const nul = rows.filter((r) => r.audited_key === null);
const summary = {
  cases: rows.length,
  audited_key: {
    single_patient_egfr_documented: doc.length,
    no_single_patient_egfr: nul.length,
    borderline_ids: ['pmc-40', 'pmc-46'],
  },
  automatic_key_vs_audited: {
    entries_that_are_not_the_audited_answer: count((r) => r.key_changed),
    automatic_key_gave_a_number_where_audit_is_null: count((r) => r.audited_key === null && r.egfr_ref_automatic !== null),
    automatic_key_number_differs_from_audited_number: count((r) => r.audited_key !== null && r.key_changed),
    model_matches_automatic_key: count((r) => same(r.model_output, r.egfr_ref_automatic)),
  },
  model_outputs: {
    number: count((r) => r.model_output !== null),
    not_documented: count((r) => r.model_output === null),
  },
  audited_accuracy: {
    correct: count((r) => r.correct),
    of: rows.length,
    percent: Math.round((count((r) => r.correct) / rows.length) * 1000) / 10,
    documented_cases: { correct: doc.filter((r) => r.correct).length, of: doc.length },
    null_cases_answered_not_documented: { correct: nul.filter((r) => r.correct).length, of: nul.length },
  },
  errors: {
    missed_documented_value: rows.filter((r) => r.error === 'missed_documented_value').map((r) => r.id),
    wrong_number: rows.filter((r) => r.error === 'wrong_number').map((r) => r.id),
    number_for_cohort_or_threshold: rows.filter((r) => r.error === 'number_for_cohort_or_threshold').map((r) => r.id),
  },
  sensitivity: {
    if_pmc40_and_pmc46_counted_as_documented: `${count((r) => r.correct && !['pmc-40', 'pmc-46'].includes(r.id))} of 50 (the model answered 'not documented' for both)`,
  },
};

const out = {
  audited: '2026-11-25',
  question: 'most recent single patient eGFR value in mL/min/1.73 m2 (null = no single patient eGFR documented)',
  data: 'data/pmc/pmc50.json',
  model_outputs_from: 'docs/cloud-eval-pmc-v2.json (gemini-3.5-flash-lite via Firebase AI Logic, 22 Nov 2026, one run, seeded-name oracle masking)',
  method: 'Manual clinical read of all 50 texts into the AUDIT table in scripts/audit-pmc-key.mjs; the script rebuilds each model output from the recorded disagreement list, checks every audited number occurs in its text, and scores. No cloud call.',
  caveats: [
    "pmc-40 (range 'between 41 and 50') and pmc-46 ('eGFR: >80') are bounded values, audited as no single value; a different reader could call them documented.",
    'Single reader (an AI agent, with script checks that each audited number occurs in its text); no clinician or second-rater adjudication. Treat the key as audited, not adjudicated.',
    'Model outputs are one run of one model; no repeat.',
  ],
  summary,
  cases: rows,
};
const text = JSON.stringify(out, null, 2) + '\n';

console.log(JSON.stringify(summary, null, 2));
const file = rel('../docs/pmc50-key-audit.json');
if (process.argv.includes('--write')) {
  writeFileSync(file, text);
  console.log('wrote docs/pmc50-key-audit.json');
} else {
  let committed = '';
  try { committed = readFileSync(file, 'utf8'); } catch { /* missing */ }
  if (committed !== text) {
    console.error('FAIL: docs/pmc50-key-audit.json is missing or stale; run with --write');
    process.exit(1);
  }
  console.log('OK: docs/pmc50-key-audit.json matches the recomputed audit');
}
