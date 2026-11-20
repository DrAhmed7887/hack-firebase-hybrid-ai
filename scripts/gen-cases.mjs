// Reproducible synthetic CKD notes. 5 templates x 4 seeds = 20 cases (the first seed of each template is a demo note).
// Every identifier is fake and seeded. Run: node scripts/gen-cases.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { gfrCategory, albuminuriaCategory } from '../src/kdigo.js';

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
const int = (r, lo, hi) => lo + Math.floor(r() * (hi - lo + 1));

const FIRST = ['Marisol', 'Teodor', 'Anwen', 'Khalil', 'Ingrid', 'Bartholomew', 'Zainab', 'Lucan', 'Odalys', 'Piotr', 'Soledad', 'Henrik', 'Yasmin', 'Cormac', 'Delphine', 'Rashad', 'Ottilie', 'Basil', 'Imelda', 'Tarek'];
const LAST = ['Vandermeer', 'Aldecott', 'Brannigan', 'Castellanos', 'Delacroix-Hume', 'Faraday', 'Grimaldi', 'Halvorsen', 'Iwasaki', 'Kowalczyk', 'Mbeki', 'Nakashima', 'Ostrowski', 'Pellegrino', 'Quillfeather', 'Rasmussen', 'Soriano-Webb', 'Thackeray', 'Umarov', 'Villanueva'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const pad = (n) => String(n).padStart(2, '0');

function fmtDate(style, y, m, d) {
  switch (style) {
    case 0: return `${y}-${pad(m)}-${pad(d)}`;
    case 1: return `${pad(m)}/${pad(d)}/${y}`;
    case 2: return `${d} ${MONTHS[m - 1]} ${y}`;
    default: return `${MONTHS[m - 1].slice(0, 3)} ${d}, ${y}`;
  }
}

function person(r) {
  return { first: pick(r, FIRST), last: pick(r, LAST) };
}

function ids(r, tag) {
  const mrn = `ZX-${int(r, 1000000, 9999999)}`;
  const phone = `(${pick(r, [212, 415, 617, 305])}) 555-${pad(int(r, 0, 99)).padStart(4, '01')}`;
  return { mrn, phone };
}

function build(templateIdx, seed) {
  const r = rng(templateIdx * 1000 + seed);
  const pt = person(r);
  const daughter = pick(r, FIRST.filter((f) => f !== pt.first));
  const nephro = person(r);
  const pcp = person(r);
  const { mrn, phone } = ids(r);
  const dstyle = int(r, 0, 3);
  const dob = fmtDate(dstyle, int(r, 1938, 1972), int(r, 1, 12), int(r, 1, 28));
  const visit = fmtDate(dstyle, 2026, int(r, 1, 10), int(r, 1, 28));
  const prior = fmtDate(dstyle, 2025, int(r, 1, 12), int(r, 1, 28));
  const egfr = int(r, 8, 78);
  const priorEgfr = Math.min(120, egfr + int(r, 2, 12));
  const hasUacr = r() > 0.2;
  const uacr = hasUacr ? pick(r, [12, 22, 48, 95, 180, 260, 410, 780, 1450, 2300]) : null;
  const email = `${pt.first.toLowerCase()}.${pt.last.toLowerCase().replace(/[^a-z]/g, '')}@example.org`;
  const age = 2026 - Number(dob.match(/\d{4}/)[0]);
  const proseNameInProse = r() > 0.35; // a name that only appears in free prose, no title or label before it
  const uacrTxt = hasUacr ? `Urine albumin/creatinine ratio ${uacr} mg/g.` : 'Urine albumin was not repeated this visit.';
  const K = (5 + r() * 0.9).toFixed(1);
  const cr = (60 / egfr * 1.2 + 0.4).toFixed(1);
  const name = `${pt.first} ${pt.last}`;
  let text;
  const idList = [
    { type: 'name', value: name },
    { type: 'mrn', value: mrn },
    { type: 'date', value: dob },
    { type: 'date', value: visit },
    { type: 'date', value: prior },
    { type: 'name', value: `${nephro.first} ${nephro.last}` },
  ];
  const addProse = () => {
    idList.push({ type: 'name', value: daughter });
    return proseNameInProse ? `${daughter} drives ${pt.first} to every appointment and keeps the pill organiser.` : 'Family support at home is adequate.';
  };
  switch (templateIdx) {
    case 0:
      idList.push({ type: 'phone', value: phone });
      text = `NEPHROLOGY CLINIC FOLLOW-UP
Patient: ${name}   MRN: ${mrn}   DOB: ${dob}
Visit date: ${visit}   Seen by: Dr. ${nephro.first} ${nephro.last}

HPI: ${age}-year-old with chronic kidney disease and type 2 diabetes, last seen ${prior}. ${addProse()}
Labs: creatinine ${cr} mg/dL, potassium ${K} mmol/L. eGFR was ${priorEgfr} mL/min/1.73 m2 on ${prior}; today eGFR ${egfr} mL/min/1.73 m2. ${uacrTxt}
Plan: continue ACE inhibitor, repeat labs in 3 months. Call the clinic on ${phone} with questions.`;
      break;
    case 1:
      idList.push({ type: 'phone', value: phone });
      text = `TELEPHONE ENCOUNTER ${visit}
Spoke with ${pt.first} ${pt.last} (MRN ${mrn}, date of birth ${dob}) at ${phone} about results.
Most recent eGFR ${egfr} (previous ${priorEgfr} on ${prior}). ${uacrTxt} Potassium ${K}.
${addProse()}
Advised to avoid NSAIDs and keep the nephrology follow-up with Dr. ${nephro.last}. Message routed to ${nephro.first} ${nephro.last}.`;
      break;
    case 2:
      idList.push({ type: 'email', value: email });
      text = `DISCHARGE SUMMARY (extract)
Name: ${name}
Medical Record Number: ${mrn}
Admitted for volume overload on ${prior}; discharged ${visit}. Date of birth ${dob}.
Kidney function at discharge: eGFR ${egfr} mL/min/1.73 m2 (admission ${priorEgfr}). ${uacrTxt}
${addProse()}
Discharge instructions emailed to ${email}. Follow up with Dr. ${nephro.last}; primary care Dr. ${pcp.first} ${pcp.last}.`;
      idList.push({ type: 'name', value: `${pcp.first} ${pcp.last}` });
      break;
    case 3:
      idList.push({ type: 'email', value: email });
      text = `Dear Dr. ${nephro.last},

Thank you for seeing Mrs. ${pt.last} (${name}, MRN: ${mrn}), born ${dob}, referred on ${visit} for progressive CKD.
Her eGFR has fallen from ${priorEgfr} (${prior}) to ${egfr} mL/min/1.73 m2. ${uacrTxt} Blood pressure is controlled.
${addProse()} She can be reached at ${email}.

Sincerely,
Dr. ${pcp.first} ${pcp.last}`;
      idList.push({ type: 'name', value: `${pcp.first} ${pcp.last}` });
      break;
    default:
      idList.push({ type: 'phone', value: phone });
      text = `PRE-DIALYSIS EDUCATION NOTE ${visit}
${name}, MRN ${mrn}, DOB ${dob}. Contact ${phone}.
Reviewed options: conservative care, home dialysis, transplant evaluation. Latest eGFR ${egfr} mL/min/1.73 m2, earlier ${priorEgfr} (${prior}). ${uacrTxt}
${addProse()}
Education provided by nurse educator ${nephro.first} ${nephro.last}.`;
  }
  // de-duplicate identifiers that did not end up in the text
  const seeded = [...new Map(idList.filter((i) => text.includes(i.value)).map((i) => [i.type + i.value, i])).values()];
  return {
    id: `case-${String(templateIdx * 4 + seed).padStart(2, '0')}`,
    demo: seed === 0,
    template: templateIdx,
    text,
    seeded,
    truth: { ckd_stage: gfrCategory(egfr), egfr, albuminuria_category: albuminuriaCategory(uacr) },
  };
}

const cases = [];
for (let t = 0; t < 5; t++) for (let s = 0; s < 4; s++) cases.push(build(t, s));
mkdirSync(new URL('../data/synthetic/', import.meta.url), { recursive: true });
writeFileSync(new URL('../data/synthetic/cases.json', import.meta.url), JSON.stringify(cases, null, 2) + '\n');
console.log(`wrote ${cases.length} cases`);

// Larger set for the benchmark only: same templates, 20 seeds each = 100 notes (seeds 0-3 equal the 20 above).
const big = [];
for (let t = 0; t < 5; t++) for (let s = 0; s < 20; s++) big.push({ ...build(t, s), id: `b100-${String(t * 20 + s).padStart(3, '0')}` });
writeFileSync(new URL('../data/synthetic/bench100.json', import.meta.url), JSON.stringify(big, null, 2) + '\n');
console.log(`wrote ${big.length} bench cases`);
