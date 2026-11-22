// KDIGO 2024 CKD guideline, Kidney Int 2024;105(4S):S117-S314 (same cut-points as 2012).
// GFR categories (mL/min/1.73 m2): G1 >=90, G2 60-89, G3a 45-59, G3b 30-44, G4 15-29, G5 <15.
// Albuminuria categories (mg/g): A1 <30, A2 30-300, A3 >300.
export function gfrCategory(egfr) {
  if (egfr >= 90) return 'G1';
  if (egfr >= 60) return 'G2';
  if (egfr >= 45) return 'G3a';
  if (egfr >= 30) return 'G3b';
  if (egfr >= 15) return 'G4';
  return 'G5';
}
export function albuminuriaCategory(uacr) {
  if (uacr == null) return 'not_documented';
  if (uacr < 30) return 'A1';
  if (uacr <= 300) return 'A2';
  return 'A3';
}

// KDIGO 2024 CKD prognosis heatmap (Kidney Int 2024;105(4S), Figure 1): risk of progression, CVD and mortality by GFR x albuminuria category.
export const GFR_ROWS = ['G1', 'G2', 'G3a', 'G3b', 'G4', 'G5'];
export const ALB_COLS = ['A1', 'A2', 'A3'];
const HEATMAP = {
  G1: ['Low', 'Moderate', 'High'],
  G2: ['Low', 'Moderate', 'High'],
  G3a: ['Moderate', 'High', 'Very High'],
  G3b: ['High', 'Very High', 'Very High'],
  G4: ['Very High', 'Very High', 'Very High'],
  G5: ['Very High', 'Very High', 'Very High'],
};
// Suggested monitoring frequency, times per year (KDIGO 2024 Figure 2).
const MONITOR = {
  G1: ['1 (if CKD)', '1', '2'],
  G2: ['1 (if CKD)', '1', '2'],
  G3a: ['1', '2', '3'],
  G3b: ['2', '3', '3'],
  G4: ['3', '3', '4+'],
  G5: ['4+', '4+', '4+'],
};
export const TIER_COLOR = { Low: '#2e9d5b', Moderate: '#e0b82e', High: '#e8782f', 'Very High': '#d1383d' };

export function kdigoTierAt(stage, alb) {
  const r = HEATMAP[stage];
  const c = ALB_COLS.indexOf(alb);
  return r && c >= 0 ? r[c] : null;
}

/** @returns {{tier: 'Low'|'Moderate'|'High'|'Very High'|'Indeterminate', color: string, monitoring: string, referral: string}} */
export function kdigoRiskTier(stage, alb) {
  const c = ALB_COLS.indexOf(alb);
  if (!HEATMAP[stage]) return { tier: 'Indeterminate', color: '#8a93a0', monitoring: 'Unknown stage', referral: 'Unknown' };
  if (c < 0) {
    return { tier: 'Indeterminate', color: '#8a93a0', monitoring: 'Albuminuria not documented: obtain a UACR to place the patient on the heatmap.', referral: 'Albuminuria category needed to assess referral criteria.' };
  }
  const tier = HEATMAP[stage][c];
  const times = MONITOR[stage][c];
  let referral = 'Primary-care management; no routine nephrology referral from this cell alone.';
  if (stage === 'G5' || stage === 'G4') referral = 'Refer to nephrology (GFR <30).';
  else if (alb === 'A3') referral = 'Refer to nephrology (A3 albuminuria, ACR >=300 mg/g; KDIGO 2024).';
  return { tier, color: TIER_COLOR[tier], monitoring: `${times} time(s) per year`, referral };
}

const NEPHROTOXIC = [
  ['NSAID', /\bnsaids?\b/i],
  ['ibuprofen', /\b(ibuprofen|advil|motrin)\b/i],
  ['naproxen', /\b(naproxen|aleve)\b/i],
  ['ketorolac', /\b(ketorolac|toradol)\b/i],
  ['diclofenac', /\bdiclofenac\b/i],
  ['indomethacin', /\bindomethacin\b/i],
  ['meloxicam', /\bmeloxicam\b/i],
  ['celecoxib', /\bcelecoxib\b/i],
];
/** Nephrotoxic drug mentions in the raw note (local only). Negations are not interpreted: the abstractor must read the context. */
export function findNephrotoxicMeds(text) {
  return NEPHROTOXIC.filter(([, re]) => re.test(text ?? '')).map(([name]) => name);
}
