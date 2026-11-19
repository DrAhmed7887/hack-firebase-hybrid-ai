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
