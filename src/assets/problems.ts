export const responseRates = [
  {
    diseaseArea: 'Cancer',
    avgResponseRate: '~25%',
    notes: 'Some approved drugs have response rates >10%.'
  },
  {
    diseaseArea: 'Cardiovascular',
    avgResponseRate: '60% to 80%',
    notes: 'Good response to statins, antihypertensives.'
  },
  {
    diseaseArea: 'Diabetes (Type 2)',
    avgResponseRate: '60% to 80%',
    notes: 'Varies by drug class.'
  },
  {
    diseaseArea: 'Schizophrenia',
    avgResponseRate: '50% to 60%',
    notes: 'Antipsychotic efficacy varies widely.'
  },
  {
    diseaseArea: 'Depression',
    avgResponseRate: '40% to 60%',
    notes: 'SSRIs effective in ~50%; placebo effect high.'
  },
  {
    diseaseArea: 'Asthma',
    avgResponseRate: '60% to 70%',
    notes: 'Biologics can benefit subgroups.'
  },
  {
    diseaseArea: 'Autoimmune',
    avgResponseRate: '30% to 60%',
    notes: 'TNF inhibitors and biologics vary by patient.'
  }
];

export const safetyStats = [
  {
    category: 'Common side effects',
    summary: 'Occur in 10% to 30% of patients for many drugs.'
  },
  {
    category: 'Drug-related deaths',
    summary: 'CDC and FDA estimate ~100,000 annually in the United States.'
  },
  {
    category: 'Hospital admissions',
    summary: 'Approximately 5% of U.S. hospital admissions are due to adverse drug reactions (ADRs).'
  },
  {
    category: 'Serious adverse events',
    summary: 'Occur in ~0.1-2% of patients in clinical trials. Often include hospitalization or life-threatening events. Most common are related to anticoagulants, opioids, chemotherapy, and antipsychotics.'
  }
];

export const drugStageFailures = [
  {
    stage: 'Preclinical to Phase 1',
    failureRate: '~37%'
  },
  {
    stage: 'Phase 1 to Phase 2',
    failureRate: '~30%'
  },
  {
    stage: 'Phase 2 to Phase 3',
    failureRate: '~67%'
  },
  {
    stage: 'Phase 3 to FDA Approval',
    failureRate: '~40%'
  },
  {
    stage: 'Overall (Preclinical to FDA Approval)',
    failureRate: '88% to 90%'
  }
];

export const diseaseTreatments = [
  {
    disease: "Alzheimer's Disease",
    description: "Neurodegenerative disorder causing memory loss and cognitive decline.",
    treatmentsAvailable: "Symptom-modifying drugs (e.g., donepezil); new anti-amyloid therapies (e.g., lecanemab) may slow progression."
  },
  {
    disease: "Amyotrophic Lateral Sclerosis (ALS)",
    description: "Neurodegenerative disease leading to muscle paralysis.",
    treatmentsAvailable: "Riluzole, edaravone; modest slowing of progression."
  },
  {
    disease: "Cancer (Stage IV)",
    description: "Cancer that has spread (metastasized) to distant organs.",
    treatmentsAvailable: "Chemotherapy, immunotherapy, targeted therapy, palliative care; rarely curative."
  },
  {
    disease: "Chronic Kidney Disease (CKD)",
    description: "Gradual loss of kidney function.",
    treatmentsAvailable: "Dialysis, transplant (advanced stages); ACE inhibitors."
  },
  {
    disease: "Crohn's Disease / Ulcerative Colitis",
    description: "Inflammatory bowel diseases.",
    treatmentsAvailable: "Immunosuppressants, biologics (e.g., infliximab), surgery."
  },
  {
    disease: "Cystic Fibrosis",
    description: "Genetic disorder affecting lungs and digestion.",
    treatmentsAvailable: "CFTR modulators (e.g., Trikafta), respiratory therapy."
  },
  {
    disease: "Diabetes (Type 1)",
    description: "Autoimmune destruction of insulin-producing cells.",
    treatmentsAvailable: "Insulin therapy, CGM systems, pancreas/islet transplant (rare)."
  },
  {
    disease: "Diabetes (Type 2, late-stage)",
    description: "Metabolic disease; can often be managed or reversed early, but not cured late-stage.",
    treatmentsAvailable: "Medications (e.g., metformin, GLP-1 RAs), lifestyle management."
  }
];