// FHIR R4 collection Bundle for one registry row. Built locally from the rehydrated result; synthetic/surrogate identifiers only.
const SNOMED_CKD = {
  G1: ['431855005', 'Chronic kidney disease stage 1'],
  G2: ['431856006', 'Chronic kidney disease stage 2'],
  G3a: ['700378005', 'Chronic kidney disease stage 3A'],
  G3b: ['700379002', 'Chronic kidney disease stage 3B'],
  G4: ['431857002', 'Chronic kidney disease stage 4'],
  G5: ['433146000', 'Chronic kidney disease stage 5'],
};
const ALB_TEXT = { A1: 'A1 (<30 mg/g)', A2: 'A2 (30-300 mg/g)', A3: 'A3 (>300 mg/g)' };
const LOINC = 'http://loinc.org';
const OBS_CAT = [{ coding: [{ system: 'http://terminology.hl7.org/CodeSystem/observation-category', code: 'laboratory' }] }];

export function buildFhirBundle(result, mrn) {
  const subject = { reference: 'Patient/patient-1' };
  const patient = { resourceType: 'Patient', id: 'patient-1', identifier: [{ system: 'urn:example:synthetic-mrn', value: String(mrn ?? '') }] };

  const egfr = {
    resourceType: 'Observation', id: 'egfr-1', status: 'final', category: OBS_CAT,
    code: { coding: [{ system: LOINC, code: '98979-8', display: 'Glomerular filtration rate/1.73 sq M.predicted [Volume Rate/Area] in Serum, Plasma or Blood by Creatinine-based formula (CKD-EPI 2021)' }], text: 'eGFR' },
    subject,
    valueQuantity: { value: Number(result.egfr), unit: 'mL/min/1.73m2', system: 'http://unitsofmeasure.org', code: 'mL/min/{1.73_m2}' },
  };
  if (result.evidence) egfr.note = [{ text: String(result.evidence) }];

  const uacr = {
    resourceType: 'Observation', id: 'uacr-1', status: 'final', category: OBS_CAT,
    code: { coding: [{ system: LOINC, code: '9318-7', display: 'Albumin/Creatinine [Mass Ratio] in Urine' }], text: 'Albuminuria category (KDIGO)' },
    subject,
  };
  if (ALB_TEXT[result.albuminuria_category]) uacr.valueString = ALB_TEXT[result.albuminuria_category];
  else uacr.dataAbsentReason = { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/data-absent-reason', code: 'unknown' }] };

  const resources = [patient, egfr, uacr];
  const sn = SNOMED_CKD[result.ckd_stage];
  if (sn) {
    resources.push({
      resourceType: 'Condition', id: 'ckd-1',
      clinicalStatus: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-clinical', code: 'active' }] },
      verificationStatus: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status', code: 'provisional' }] },
      code: { coding: [{ system: 'http://snomed.info/sct', code: sn[0], display: sn[1] }], text: `KDIGO GFR category ${result.ckd_stage}` },
      subject,
      evidence: [{ detail: [{ reference: 'Observation/egfr-1' }] }],
    });
  }

  return {
    resourceType: 'Bundle',
    type: 'collection',
    timestamp: new Date().toISOString(),
    entry: resources.map((resource) => ({ fullUrl: `urn:uuid:${resource.resourceType.toLowerCase()}-${resource.id}`, resource })),
  };
}
