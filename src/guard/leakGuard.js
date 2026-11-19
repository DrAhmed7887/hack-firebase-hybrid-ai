import { PATTERNS, findAll } from './rules.js';

export class LeakError extends Error {
  constructor(findings) {
    super(`Cloud call aborted: ${findings.length} identifier(s) still present in the outgoing text.`);
    this.name = 'LeakError';
    this.findings = findings; // {type, how} only, never the identifier value
  }
}

// Returns findings without throwing. `seeded` = known identifiers [{type, value}] (the demo notes carry them).
export function scanForLeaks(payload, seeded = []) {
  const findings = [];
  for (const id of seeded) {
    const terms = id.type === 'name' ? [id.value, ...id.value.split(/[\s-]+/).filter((p) => p.length >= 2)] : [id.value];
    if (terms.some((t) => findAll(payload, t, id.type, 'guard').length)) findings.push({ type: id.type, how: 'seeded' });
  }
  for (const [type, re] of Object.entries(PATTERNS)) {
    re.lastIndex = 0;
    const m = payload.match(re);
    if (m) findings.push({ type: type === 'nameBeforeMrn' ? 'name' : type, how: 'pattern', count: m.length });
  }
  return findings;
}

export function assertNoLeak(payload, seeded = []) {
  const findings = scanForLeaks(payload, seeded);
  if (findings.length) throw new LeakError(findings);
}
