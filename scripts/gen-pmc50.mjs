// Builds data/pmc/pmc50.json: 50 real open-access PMC nephrology abstracts with deterministic SYNTHETIC surrogate identifiers
// injected (fake patient name, MRN, DOB, visit date, phone, clinician name, plus one free-prose relative-name sentence).
// The clinical prose is real; every identifier is fake and seeded. Same schema as data/synthetic/cases.json:
// { id, text, seeded: [{type, value}], truth: {egfr} } plus provenance fields (pmcid, pmid, doi, journal, year, egfr_ref).
// Run: node scripts/gen-pmc50.mjs [path/to/pmc_real_cases_50.json]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const DEFAULT_SRC =
  '/Users/ahmedzayed/.gemini/antigravity/brain/3abef8bc-d5da-4bbf-b11a-8cf06c7ba393/scratch/v4_research/pmc_real_cases_50.json';
const src = process.argv[2] || DEFAULT_SRC;
const real = JSON.parse(readFileSync(src, 'utf8'));

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
const pad = (n) => String(n).padStart(2, '0');

const FIRST = ['Marisol', 'Teodor', 'Anwen', 'Khalil', 'Ingrid', 'Bartholomew', 'Zainab', 'Lucan', 'Odalys', 'Piotr', 'Soledad', 'Henrik', 'Yasmin', 'Cormac', 'Delphine', 'Rashad', 'Ottilie', 'Basil', 'Imelda', 'Tarek'];
const LAST = ['Vandermeer', 'Aldecott', 'Brannigan', 'Castellanos', 'Delacroix-Hume', 'Faraday', 'Grimaldi', 'Halvorsen', 'Iwasaki', 'Kowalczyk', 'Mbeki', 'Nakashima', 'Ostrowski', 'Pellegrino', 'Quillfeather', 'Rasmussen', 'Soriano-Webb', 'Thackeray', 'Umarov', 'Villanueva'];
const RELATION_SENTENCES = [
  (rel, pt) => `${rel} drives ${pt} to every appointment and keeps the pill organiser.`,
  (rel, pt) => `${rel} sits in on each visit and helps ${pt} track the medication list.`,
  (rel, pt) => `${rel} lives nearby and checks in on ${pt} most evenings.`,
];

const cases = real.map((c, idx) => {
  const r = rng(50000 + idx);
  const first = pick(r, FIRST);
  const last = pick(r, LAST);
  const clinFirst = pick(r, FIRST.filter((f) => f !== first));
  const clinLast = pick(r, LAST);
  const relative = pick(r, FIRST.filter((f) => f !== first && f !== clinFirst));
  const name = `${first} ${last}`;
  const clinician = `${clinFirst} ${clinLast}`;
  const mrn = `ZX-${int(r, 1000000, 9999999)}`;
  const phone = `(${pick(r, [212, 415, 617, 305])}) 555-${pad(int(r, 0, 99)).padStart(4, '01')}`;
  const dob = `${int(r, 1938, 1972)}-${pad(int(r, 1, 12))}-${pad(int(r, 1, 28))}`;
  const visit = `2026-${pad(int(r, 1, 10))}-${pad(int(r, 1, 28))}`;
  const relSentence = pick(r, RELATION_SENTENCES)(relative, first);

  const text = `NEPHROLOGY CLINIC REFERRAL (open-access case text, PMC ${c.pmcid})
Patient: ${name}   MRN: ${mrn}   DOB: ${dob}
Visit date: ${visit}   Seen by: Dr. ${clinician}.

${c.prose}

Social note: ${relSentence} Call the clinic on ${phone} with questions.`;

  return {
    id: c.id,
    pmcid: c.pmcid,
    pmid: c.pmid,
    doi: c.doi,
    journal: c.journal,
    year: c.year,
    egfr_ref: c.egfr_ref,
    text,
    seeded: [
      { type: 'name', value: name },
      { type: 'mrn', value: mrn },
      { type: 'date', value: dob },
      { type: 'date', value: visit },
      { type: 'name', value: clinician },
      { type: 'name', value: relative },
      { type: 'phone', value: phone },
    ],
    truth: { egfr: c.egfr_ref },
  };
});

mkdirSync(new URL('../data/pmc/', import.meta.url), { recursive: true });
writeFileSync(new URL('../data/pmc/pmc50.json', import.meta.url), JSON.stringify(cases, null, 2) + '\n');
process.stdout.write(`wrote data/pmc/pmc50.json: ${cases.length} cases from ${src}\n`);
