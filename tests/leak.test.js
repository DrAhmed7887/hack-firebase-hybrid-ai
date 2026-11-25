import { describe, it, expect, vi } from 'vitest';
import cases from '../data/synthetic/cases.json';
import { processNote, prepare } from '../src/pipeline.js';
import { sendMaskedToCloud, buildRequest } from '../src/cloud/egress.js';
import { LeakError, scanForLeaks } from '../src/guard/leakGuard.js';
import { mockGenerate } from '../src/cloud/mockCloud.js';

const allSeededValues = (c) => c.seeded.flatMap((i) => (i.type === 'name' ? [i.value, ...i.value.split(/[\s-]+/).filter((p) => p.length >= 2)] : [i.value]));
const contains = (payload, v) => payload.toLowerCase().includes(v.toLowerCase());

// Test double ONLY: stands in for a perfect on-device model by returning the seeded names. Real Nano is not exercised in CI.
const perfectDevice = (c) => c.seeded.filter((i) => i.type === 'name').map((i) => i.value);

describe('no seeded identifier ever reaches the cloud call', () => {
  it('has 20 cases', () => expect(cases).toHaveLength(20));

  for (const mode of ['rules-only', 'with test-double device model']) {
    it(`all 20 cases, ${mode}: spy never sees a seeded identifier`, async () => {
      for (const c of cases) {
        const generate = vi.fn(mockGenerate);
        const opts = mode === 'rules-only' ? {} : { deviceNames: perfectDevice(c) };
        const out = await processNote(c.text, c.seeded, generate, opts);
        for (const [request] of generate.mock.calls) for (const v of allSeededValues(c)) expect(contains(request, v), `${c.id} leaked ${v}`).toBe(false);
        expect(out.sent).toBe(generate.mock.calls.length === 1);
      }
    });
  }

  it('with a perfect device model every case passes the guard', async () => {
    for (const c of cases) {
      const out = await processNote(c.text, c.seeded, mockGenerate, { deviceNames: perfectDevice(c) });
      expect(out.sent, c.id).toBe(true);
    }
  });

  it('the guard aborts when masking is defeated (identity mask): generate is never called', async () => {
    for (const c of cases) {
      const generate = vi.fn();
      await expect(sendMaskedToCloud(c.text, c.seeded, generate)).rejects.toBeInstanceOf(LeakError);
      expect(generate).not.toHaveBeenCalled();
    }
  });

  it('the guard also catches an identifier hidden in the instruction text (whole request is scanned)', async () => {
    const c = cases[0];
    const generate = vi.fn();
    const p = prepare(c.text, { deviceNames: perfectDevice(c) });
    await expect(sendMaskedToCloud(p.masked + ' ' + c.seeded[1].value, c.seeded, generate)).rejects.toBeInstanceOf(LeakError);
    expect(generate).not.toHaveBeenCalled();
  });

  it('LeakError never carries the identifier value', async () => {
    const c = cases[0];
    try {
      await sendMaskedToCloud(c.text, c.seeded, vi.fn());
    } catch (e) {
      for (const v of allSeededValues(c)) expect(JSON.stringify(e.findings) + e.message).not.toContain(v);
    }
  });

  it('request built from masked text contains tokens, not identifiers', () => {
    const c = cases[0];
    const p = prepare(c.text, { deviceNames: perfectDevice(c) });
    expect(scanForLeaks(buildRequest(p.masked), c.seeded)).toEqual([]);
    expect(p.masked).toMatch(/\[MRN_1\]/);
  });
});
