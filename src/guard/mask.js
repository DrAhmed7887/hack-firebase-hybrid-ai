// Union of spans from all detectors -> masked text + an in-memory vault (token -> original). The vault never leaves the page.
export function mergeSpans(spans) {
  const sorted = [...spans].sort((a, b) => a.start - b.start || b.end - b.start - (a.end - a.start));
  const out = [];
  for (const s of sorted) {
    const last = out[out.length - 1];
    if (last && s.start < last.end) {
      if (s.end > last.end) last.end = s.end; // overlap: widen
      if (last.source === 'rule' && s.source !== 'rule') last.source = s.source === 'manual' ? 'manual' : last.source;
      continue;
    }
    out.push({ ...s });
  }
  return out;
}

export function applyMask(text, spans) {
  const merged = mergeSpans(spans);
  const vault = new Map(); // token -> original
  const seen = new Map(); // type+value -> token
  const counters = {};
  let masked = '';
  let cursor = 0;
  for (const s of merged) {
    const original = text.slice(s.start, s.end);
    const key = s.type + '\u0000' + original.toLowerCase();
    let token = seen.get(key);
    if (!token) {
      counters[s.type] = (counters[s.type] || 0) + 1;
      token = `[${s.type.toUpperCase()}_${counters[s.type]}]`;
      seen.set(key, token);
      vault.set(token, original);
    }
    masked += text.slice(cursor, s.start) + token;
    cursor = s.end;
  }
  masked += text.slice(cursor);
  return { masked, vault, spans: merged };
}

export function rehydrate(value, vault) {
  if (typeof value === 'string') {
    let v = value;
    for (const [token, original] of vault) v = v.split(token).join(original);
    return v;
  }
  if (Array.isArray(value)) return value.map((x) => rehydrate(x, vault));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, x]) => [k, rehydrate(x, vault)]));
  return value;
}
