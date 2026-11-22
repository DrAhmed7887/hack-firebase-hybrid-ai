"""Reads the Firebase AI Logic request logs that Google itself stored (AI monitoring, Cloud Logging) and checks them
against the seeded identifiers of the synthetic cases. Independent of the app's own leak guard: this is what reached Google.
Usage: gcloud logging read 'logName:"firebasevertexai.googleapis.com"' --project PROJECT --freshness=1d --format=json \
         | python3 scripts/check-ai-logs.py [--write]"""
import json, re, sys, datetime, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
entries = json.load(sys.stdin)
cases = json.loads((root / 'data/synthetic/cases.json').read_text())
seeded = sorted({i['value'] for c in cases for i in c['seeded']})
hits, tokens = [], set()
for e in entries:
    s = json.dumps(e, ensure_ascii=False)
    tokens |= set(re.findall(r'\[(?:NAME|MRN|DATE|PHONE|EMAIL)_\d+\]', s))
    hits += [v for v in seeded if v in s]
res = {'checked': datetime.date.today().isoformat(), 'source': 'Cloud Logging, log firebasevertexai.googleapis.com/activity (Firebase AI monitoring)',
       'log_entries': len(entries), 'entries_with_placeholder_tokens': sum(1 for e in entries if re.search(r'\[(?:NAME|MRN|DATE|PHONE|EMAIL)_\d+\]', json.dumps(e))),
       'placeholder_tokens_seen': sorted(tokens), 'seeded_identifiers_checked': len(seeded), 'seeded_identifiers_found_in_logs': sorted(set(hits))}
print(json.dumps(res, indent=2))
if '--write' in sys.argv: (root / 'docs/ai-monitoring-log-check.json').write_text(json.dumps(res, indent=2) + '\n')
