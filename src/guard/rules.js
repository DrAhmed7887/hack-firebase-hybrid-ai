// Deterministic detectors. Each returns spans {start, end, type, source:'rule'}.
const MONTH = '(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)';
const NAME_WORD = "\\p{Lu}[\\p{Ll}'’]+(?:\\p{Lu}\\p{Ll}+)?(?:-\\p{Lu}[\\p{Ll}'’]+(?:\\p{Lu}\\p{Ll}+)?)*";
const TITLE = '(?:(?:Dr|Mr|Mrs|Ms|Prof)\\.?\\s+)?';

export const PATTERNS = {
  mrn: /\b(?:MRN|MR#|Medical Record(?: Number| No\.?)?)\s*[:#]?\s*([A-Z0-9][A-Z0-9-]{3,})/gi,
  date: new RegExp(
    [
      '\\b\\d{4}[-/.]\\d{1,2}[-/.]\\d{1,2}\\b',
      '\\b\\d{1,2}[/.]\\d{1,2}[/.]\\d{2,4}\\b',
      `\\b\\d{1,2}(?:st|nd|rd|th)?[ -]${MONTH}[ ,-]*\\d{2,4}\\b`,
      `\\b${MONTH}\\.? \\d{1,2},? \\d{4}\\b`,
    ].join('|'),
    'g',
  ),
  phone: /(?<![\d-])(?:\+\d{1,3}[\s.-]?)?(?:(?:\(\d{3}\)\s?|\d{3}[\s.-])\d{3}[\s.-]\d{4}|\d{3}[\s.-]\d{3}[\s.-]\d{3}|\d{10})(?!\d)/g,
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
  // Names after a label ("Patient:", "Name:", "Seen by:") or a title ("Dr.", "Mrs."). Names in free prose are not detectable by rules.
  name: new RegExp(
    `(?:\\b(?:Patient|Pt|Name|Seen by|Signed by|Referring|Nurse educator|nurse educator)\\s*:\\s*${TITLE}|\\b(?:Dr|Mr|Mrs|Ms|Prof)\\.?\\s+|\\b(?:Patient|nurse educator)\\s+)((?!(?:Dr|Mr|Mrs|Ms|Prof)\\b)${NAME_WORD}(?:\\s+${NAME_WORD}){0,2})`,
    'gu',
  ),
  // "<Name>, MRN" / "Spoke with First Last (" style: a capitalised pair directly before "(MRN" or ", MRN"
  nameBeforeMrn: new RegExp(`(${NAME_WORD}\\s+${NAME_WORD})(?=,?\\s*\\((?:[^)]{0,40}\\b)?MRN|,\\s*MRN)`, 'gu'),
};

// words that can follow "Patient" or a label but are not names
const STOP = new Set(['Presents', 'Seen', 'Has', 'Is', 'Was', 'Reports', 'Denies', 'History', 'Visit', 'Education', 'Plan', 'Contact', 'Date']);

function trimName(raw) {
  const parts = raw.split(/\s+/);
  while (parts.length && STOP.has(parts[parts.length - 1])) parts.pop();
  while (parts.length && STOP.has(parts[0])) parts.shift();
  return parts.join(' ');
}

function scan(text, re, type, group = 0) {
  const out = [];
  re.lastIndex = 0;
  let m;
  while ((m = re.exec(text))) {
    let value = m[group];
    if (type === 'name') {
      value = trimName(value);
      if (value.length < 3) continue;
    }
    if (!value) continue;
    const offset = group === 0 ? 0 : m[0].indexOf(m[group]);
    const start = m.index + offset;
    out.push({ start, end: start + value.length, type, source: 'rule' });
  }
  return out;
}

export function detectByRules(text) {
  const spans = [
    ...scan(text, PATTERNS.mrn, 'mrn', 1),
    ...scan(text, PATTERNS.date, 'date'),
    ...scan(text, PATTERNS.phone, 'phone'),
    ...scan(text, PATTERNS.email, 'email'),
    ...scan(text, PATTERNS.name, 'name', 1),
    ...scan(text, PATTERNS.nameBeforeMrn, 'name', 1),
  ];
  return spans;
}

// Once a name is found, mask every other occurrence of the full name and of each part (>= 3 letters).
export function propagateNames(text, spans) {
  const extra = [];
  const terms = new Set();
  for (const s of spans) {
    if (s.type !== 'name') continue;
    const v = text.slice(s.start, s.end);
    terms.add(v);
    for (const p of v.split(/[\s-]+/)) if (p.length >= 2) terms.add(p);
  }
  for (const t of terms) extra.push(...findAll(text, t, 'name', 'rule'));
  return extra;
}

export function findAll(text, term, type, source) {
  const out = [];
  if (!term || term.length < 2) return out;
  const esc = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(?<![A-Za-z0-9])${esc}(?![A-Za-z0-9])`, 'gi');
  let m;
  while ((m = re.exec(text))) out.push({ start: m.index, end: m.index + m[0].length, type, source });
  return out;
}
