import cases from '../data/synthetic/cases.json';
import { prepare } from './pipeline.js';
import { scanForLeaks } from './guard/leakGuard.js';
import { sendMaskedToCloud } from './cloud/egress.js';
import { rehydrate } from './guard/mask.js';
import { mockGenerate } from './cloud/mockCloud.js';
import { runBench } from './bench.js';
import { status, cloudGenerate, hasCloud, CLOUD_MODEL } from './firebase.js';
import { nanoAvailability, initNano, detectNames } from './guard/nano.js';

const $ = (id) => document.getElementById(id);
const demo = cases.filter((c) => c.demo);
const backend = hasCloud() ? cloudGenerate : mockGenerate;
const backendLabel = hasCloud() ? `Firebase AI Logic, ${CLOUD_MODEL}, PREFER_IN_CLOUD` : 'MOCK regex stand-in (no Firebase project configured). Not a model.';

let nano = 'unavailable'; // availability string from the Prompt API
let nanoReady = false; // true once the device model can be called
let current = null; // { prepared, seeded, text }

function chip(text, kind) {
  const li = document.createElement('li');
  li.textContent = text;
  li.dataset.k = kind;
  return li;
}
function renderChips() {
  const el = $('chips');
  el.replaceChildren(
    chip(nanoReady ? 'On-device model: Gemini Nano ready' : `On-device model: not available (${nano}). Rules-only mode`, nanoReady ? 'ok' : 'warn'),
    chip(`Cloud: ${backendLabel}`, hasCloud() ? 'ok' : 'warn'),
    chip(status.appCheck ? 'App Check: on (reCAPTCHA)' : 'App Check: off (no Firebase config in this build)', status.appCheck ? 'ok' : 'warn'),
  );
}

async function setupNano() {
  nano = await nanoAvailability();
  nanoReady = nano === 'available';
  const btn = $('btn-nano');
  if (nano === 'downloadable' || nano === 'downloading') {
    btn.hidden = false;
    btn.textContent = 'Download on-device model (Gemini Nano)';
    btn.onclick = async () => {
      btn.disabled = true;
      try {
        await initNano((p) => ($('nano-msg').textContent = `Downloading on-device model: ${Math.round(p * 100)}%`));
        nano = await nanoAvailability();
        nanoReady = nano === 'available';
        $('nano-msg').textContent = nanoReady ? 'On-device model ready.' : 'Model did not become available. Staying rules-only.';
      } catch (e) {
        $('nano-msg').textContent = `On-device model failed (${e.name}). Staying rules-only.`;
      }
      btn.hidden = nanoReady;
      btn.disabled = false;
      renderChips();
    };
  }
  if (!nanoReady) {
    $('nano-msg').textContent =
      'Rules-only mode: MRNs, dates, phones, emails and names after a title or label are masked. Names that appear only in free prose are not detected without the on-device model; ' +
      'if one is left, the guard blocks the cloud call. You can add such terms above.';
  }
  renderChips();
}

function termsFromInput() {
  return $('extra-terms').value.split(',').map((s) => s.trim()).filter(Boolean);
}
function seededFor(text) {
  const c = demo.find((d) => d.text === text) || cases.find((d) => d.text === text);
  return c ? c.seeded : [];
}

function highlight(text, spans) {
  const frag = document.createDocumentFragment();
  let cur = 0;
  for (const s of spans) {
    frag.append(text.slice(cur, s.start));
    const m = document.createElement('mark');
    m.dataset.s = s.source;
    m.title = s.type;
    m.textContent = text.slice(s.start, s.end);
    frag.append(m);
    cur = s.end;
  }
  frag.append(text.slice(cur));
  return frag;
}

async function runGuard() {
  const text = $('note').value;
  let deviceNames = [];
  if (nanoReady) {
    $('nano-msg').textContent = 'Asking the on-device model for names in prose (raw text never leaves this device)...';
    try {
      deviceNames = await detectNames(text);
      $('nano-msg').textContent = `On-device model found ${deviceNames.length} name(s).`;
    } catch (e) {
      nanoReady = false;
      renderChips();
      $('nano-msg').textContent = `On-device model failed (${e.name}). Continuing rules-only; nothing was sent anywhere.`;
    }
  }
  const prepared = prepare(text, { deviceNames, manualTerms: termsFromInput() });
  const seeded = seededFor(text);
  const findings = scanForLeaks(prepared.masked, seeded);
  current = { prepared, seeded, text };
  $('preview').hidden = false;
  $('result').hidden = true;
  $('orig').replaceChildren(highlight(text, prepared.spans));
  $('masked').textContent = prepared.masked;
  const v = $('verdict');
  if (findings.length) {
    const kinds = [...new Set(findings.map((f) => f.type))].join(', ');
    v.dataset.k = 'bad';
    v.textContent = `Blocked: the masked text still contains ${findings.length} identifier(s) (${kinds}). Nothing will be sent. Add the missing term above and run the guard again.`;
    $('btn-send').disabled = true;
  } else {
    v.dataset.k = 'ok';
    v.textContent = `Guard passed: ${prepared.vault.size} identifier(s) masked, no leftovers found${seeded.length ? ' (checked against the note’s seeded identifiers and patterns)' : ' (pattern check only; this is not a seeded demo note)'}.`;
    $('btn-send').disabled = false;
  }
}

async function send() {
  if (!current) return;
  const btn = $('btn-send');
  btn.disabled = true;
  try {
    const parsed = await sendMaskedToCloud(current.prepared.masked, current.seeded, backend);
    const out = rehydrate(parsed, current.prepared.vault);
    const mrn = current.prepared.vault.get('[MRN_1]') ?? '';
    renderResult({ mrn, ...out });
  } catch (e) {
    $('verdict').dataset.k = 'bad';
    $('verdict').textContent = e.name === 'LeakError' ? e.message : `Cloud call failed: ${e.message}`;
  }
  btn.disabled = false;
}

let lastRow = null;
function renderResult(row) {
  lastRow = row;
  $('result').hidden = false;
  $('backend-note').textContent = `Backend: ${backendLabel}`;
  const tb = $('result-table').tBodies[0];
  tb.replaceChildren();
  const labels = { mrn: 'MRN (from local vault)', ckd_stage: 'CKD stage (KDIGO GFR category)', egfr: 'eGFR, mL/min/1.73 m²', albuminuria_category: 'Albuminuria category', evidence: 'Evidence quote', stage_check: 'Stage vs eGFR check (code)' };
  for (const [k, label] of Object.entries(labels)) {
    const tr = tb.insertRow();
    tr.insertCell().textContent = label;
    tr.insertCell().textContent = String(row[k] ?? '');
  }
}

function download(name, type, content) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
const csvCell = (v) => `"${String(v ?? '').replaceAll('"', '""')}"`;

async function benchmark() {
  const out = $('bench-out');
  out.textContent = 'Running...';
  const r = await runBench(cases, backend, nanoReady ? detectNames : undefined);
  const mode = nanoReady ? 'on-device model + rules' : 'rules-only';
  const summary = document.createElement('p');
  summary.className = 'hl';
  summary.textContent =
    `Mode: ${mode}. ${r.identifiersMasked} of ${r.seededIdentifiers} seeded identifiers masked. ${r.casesSent} of ${r.cases} notes passed the guard and were sent; ${r.casesBlocked} were blocked. ` +
    `Cloud payloads containing a seeded identifier: ${r.cloudPayloadsWithSeededIdentifier}. Backend: ${hasCloud() ? 'real cloud model' : 'MOCK (extraction results below are not a model result)'}.`;
  const table = document.createElement('table');
  const head = table.createTHead().insertRow();
  for (const h of ['Case', 'Seeded', 'Masked', 'Left unmasked', 'Guard', 'Stage', 'eGFR', 'Albuminuria']) head.insertCell().textContent = h;
  const tb = table.createTBody();
  for (const row of r.rows) {
    const tr = tb.insertRow();
    const res = row.result;
    const cells = [row.id, row.seeded, row.maskedOk, row.unmaskedTypes.join(', ') || '-', row.sent ? 'sent' : 'blocked',
      res ? `${res.ckd_stage}${res.ckd_stage === row.truth.ckd_stage ? '' : ' (truth ' + row.truth.ckd_stage + ')'}` : '-',
      res ? `${res.egfr}${res.egfr === row.truth.egfr ? '' : ' (truth ' + row.truth.egfr + ')'}` : '-',
      res ? `${res.albuminuria_category}${res.albuminuria_category === row.truth.albuminuria_category ? '' : ' (truth ' + row.truth.albuminuria_category + ')'}` : '-'];
    for (const c of cells) tr.insertCell().textContent = c;
  }
  out.replaceChildren(summary, table);
}

function init() {
  const sel = $('case-select');
  for (const c of demo) sel.add(new Option(`${c.id}: note style ${c.template + 1}`, c.id));
  const load = () => ($('note').value = demo.find((d) => d.id === sel.value).text);
  sel.onchange = () => { load(); $('preview').hidden = true; $('result').hidden = true; };
  load();
  $('btn-guard').onclick = runGuard;
  $('btn-send').onclick = send;
  $('btn-bench').onclick = benchmark;
  $('btn-json').onclick = () => download('registry-row.json', 'application/json', JSON.stringify(lastRow, null, 2));
  $('btn-csv').onclick = () => {
    const keys = Object.keys(lastRow);
    download('registry-row.csv', 'text/csv', keys.join(',') + '\n' + keys.map((k) => csvCell(lastRow[k])).join(',') + '\n');
  };
  renderChips();
  setupNano();
}
init();
