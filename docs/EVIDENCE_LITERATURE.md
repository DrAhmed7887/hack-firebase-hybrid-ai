# Evidence: peer-reviewed literature for Private Clinical Registry Gate

Source: `pubmed_evidence.json` (PubMed/Europe PMC fetch, 2022-2026 papers, sorted by citations within four search pillars).
Rule applied: every number below appears verbatim in the fetched abstract text of that paper. Where the fetched abstract is empty, no number is quoted. Fetched abstracts are truncated at about 2,000 characters, so only the visible text was used.

## Summary table

| # | Pillar | PMID | DOI | Journal (Year) | Verbatim figure from abstract | Relevance to Private Clinical Registry Gate |
|---|---|---|---|---|---|---|
| 1 | Registry / chart abstraction | 38281112 | 10.1093/jamia/ocad259 | JAMIA (2024) | "GPT-3.5 and GPT-4 achieved relaxed F1 scores of 0.634, 0.804 for MTSamples and 0.301, 0.593 for VAERS" (baseline prompts) | General LLMs can extract clinical entities from notes, but baseline accuracy varies widely, so extraction output needs a verification step. |
| 2 | Registry / chart abstraction | 38151192 | 10.1053/j.gastro.2023.12.019 | Gastroenterology (2024) | none (abstract not in fetched data) | Title compares an LLM with manual chart review for extracting EHR data elements, which is the registry-abstraction task the gate targets. |
| 3 | Registry / chart abstraction | 38200151 | 10.1038/s41746-023-00970-0 | NPJ Digital Medicine (2024) | "Our models identified 93.8% of patients with adverse SDoH, while ICD-10 codes captured 2.0%" | Narrative notes hold information that structured fields miss, which is why registries need text abstraction at all. |
| 4 | Registry / chart abstraction | 40360677 | 10.1038/s41746-025-01670-7 | NPJ Digital Medicine (2025) | "We observed a 1.47% hallucination rate and a 3.45% omission rate" (12,999 clinician-annotated sentences) | LLM note output can hallucinate or omit, which supports keeping a human abstractor and a code-derived stage rather than trusting model prose. |
| 5 | CKD / KDIGO 2024 | 38490803 | 10.1016/j.kint.2023.10.018 | Kidney International (2024) | none (abstract not in fetched data) | The guideline defining the GFR (G) and albuminuria (A) categories that `src/kdigo.js` applies. |
| 6 | CKD / KDIGO 2024 | 36331190 | 10.1056/nejmoa2204233 | NEJM (2023) | "432 of 3304 patients (13.1%) in the empagliflozin group and in 558 of 3305 patients (16.9%) in the placebo group (hazard ratio, 0.72; 95% confidence interval [CI], 0.64 to 0.82" | Shows that eGFR and the urinary albumin-to-creatinine ratio together define who benefits from treatment, so a wrong stage has clinical weight. |
| 7 | CKD / KDIGO 2024 | 35529086 | 10.1016/j.kisu.2021.11.003 | Kidney International Supplements (2022) | "affects >10% of the general population worldwide, amounting to >800 million individuals" | Sizes the CKD population whose notes would feed a registry. |
| 8 | LLM PHI / de-identification | 36596836 | 10.1038/s41597-022-01899-x | Scientific Data (2023) | none (descriptive: "deidentified free-text clinical notes") | Free-text notes can be shared for research only after de-identification, which is the barrier the on-device mask addresses. |
| 9 | LLM PHI / de-identification | 36572766 | 10.1038/s41746-022-00742-2 | NPJ Digital Medicine (2022) | ">82 billion words of de-identified clinical text"; "9.6% and 9.5% improvement in accuracy for NLI and MQA" | Large clinical language models are trained on de-identified text, which shows that de-identification is a prerequisite for building them. |
| 10 | LLM PHI / de-identification | 38977771 | 10.1038/s41746-024-01157-x | NPJ Digital Medicine (2024) | "796 records"; "53 records" (systematic review); concerns listed include "fairness, bias, non-maleficence, transparency, and privacy" | Privacy is a recurrent ethical concern for LLMs in healthcare, which motivates masking before any cloud call. |
| 11 | On-device / hybrid clinical NLP | 39838160 | 10.1038/s43856-024-00717-2 | Communications Medicine (2025) | "From 4349 initial records, 89 studies across 29 medical specialties were included" | Systematic review of LLM limitations in patient care; design limitations include "data transparency, and accessibility issues". |
| 12 | On-device / hybrid clinical NLP | 37516790 | 10.1038/s41746-023-00879-8 | NPJ Digital Medicine (2023) | "we examine 84 foundation models trained on non-imaging EMR data" | Finds most EHR models are small and narrowly evaluated, so a hybrid design should not assume a cloud model is validated for local notes. |

## Gaps (stated plainly)

- The fetched set contains no paper that evaluates on-device or hybrid (local mask, cloud extract) clinical NLP, and none that measures LLM de-identification recall. Rows 8-12 are indirect context only. Do not cite them as evidence that the hybrid design works.
- Rows 2 and 5 have empty fetched abstracts. Add figures only after reading the full text.
- The KDIGO 2024 guideline is cited for the category definitions; this file quotes no under-staging statistic because none is in the fetched abstracts.
- The first pillar's results also contained unrelated high-citation papers (oncology, COVID-19, sleep apnea). They were excluded.
- Our own numbers (bench and cloud eval) live in `docs/bench-100-rules-only.json` and `docs/cloud-eval.json`, not here.
