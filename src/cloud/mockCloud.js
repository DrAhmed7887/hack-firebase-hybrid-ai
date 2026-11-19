// MOCK backend, used only when no Firebase project is configured. It is a regex stand-in, NOT a model, and the UI labels it so.
import { gfrCategory, albuminuriaCategory } from '../kdigo.js';

export async function mockGenerate(request) {
  const note = request.split('NOTE:\n')[1] || '';
  const m =
    note.match(/(?:today eGFR|Most recent eGFR|Latest eGFR) (\d{1,3})/i) ||
    note.match(/to (\d{1,3}) mL\/min/i) ||
    note.match(/eGFR (\d{1,3}) mL\/min/i);
  const egfr = m ? Number(m[1]) : NaN;
  const u = note.match(/ratio (\d+) mg\/g/i);
  return JSON.stringify({
    ckd_stage: gfrCategory(egfr),
    egfr,
    albuminuria_category: albuminuriaCategory(u ? Number(u[1]) : null),
    evidence: (note.match(/[^.\n]*eGFR[^.\n]*/i) || [''])[0].trim().slice(0, 160),
  });
}
