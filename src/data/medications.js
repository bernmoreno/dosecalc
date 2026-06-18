export const MEDICATION_CATEGORIES = [
  {
    id: "antibiotics",
    category: "Antibiotics",
    icon: "🦠",
    medications: [
      { id: "amoxicillin", generic: "Amoxicillin", icon: "💊", commonUse: "Otitis, strep, respiratory infections", forms: ["Capsule", "Tablet", "Liquid"], strengths: ["250 mg capsule", "500 mg capsule", "500 mg tablet", "875 mg tablet", "250 mg/5 mL liquid", "400 mg/5 mL liquid"], dosingRange: "500 mg every 8 hours or 875 mg every 12 hours" },
      { id: "amoxicillin-clavulanate", generic: "Amoxicillin/Clavulanate", icon: "💊", commonUse: "Sinusitis, bite wounds, polymicrobial infections", forms: ["Tablet", "Liquid"], strengths: ["500/125 mg tablet", "875/125 mg tablet", "200/28.5 mg per 5 mL liquid", "400/57 mg per 5 mL liquid"], dosingRange: "875/125 mg every 12 hours" },
      { id: "cephalexin", generic: "Cephalexin", icon: "💊", commonUse: "Skin/soft tissue and urinary infections", forms: ["Capsule", "Tablet", "Liquid"], strengths: ["250 mg capsule", "500 mg capsule", "500 mg tablet", "250 mg/5 mL liquid"], dosingRange: "250–500 mg every 6 hours" },
      { id: "cefazolin", generic: "Cefazolin", icon: "💉", commonUse: "Surgical prophylaxis, skin infections", forms: ["IV"], strengths: ["1 g", "2 g"], dosingRange: "1–2 g IV every 8 hours" },
      { id: "ceftriaxone", generic: "Ceftriaxone", icon: "💉", commonUse: "Pneumonia, sepsis, UTIs", forms: ["IV", "IM"], strengths: ["1 g", "2 g"], dosingRange: "1–2 g IV daily" },
      { id: "cefepime", generic: "Cefepime", icon: "💉", commonUse: "Broad-spectrum severe infections", forms: ["IV"], strengths: ["1 g", "2 g"], dosingRange: "1–2 g IV every 8–12 hours" },
      { id: "vancomycin", generic: "Vancomycin", icon: "🧫", commonUse: "MRSA, severe infections", forms: ["IV", "Liquid"], strengths: ["500 mg vial", "1 g vial", "125 mg/5 mL oral liquid"], dosingRange: "15–20 mg/kg IV every 8–12 hours" },
      { id: "piperacillin-tazobactam", generic: "Piperacillin–Tazobactam", icon: "🧪", commonUse: "Sepsis, intra-abdominal infections", forms: ["IV"], strengths: ["2.25 g", "3.375 g", "4.5 g"], dosingRange: "3.375–4.5 g IV every 6 hours" },
      { id: "azithromycin", generic: "Azithromycin", icon: "💊", commonUse: "Pneumonia, atypical infections", forms: ["Tablet", "IV", "Liquid"], strengths: ["250 mg tablet", "500 mg tablet", "500 mg IV", "200 mg/5 mL liquid"], dosingRange: "500 mg IV/PO daily" },
      { id: "levofloxacin", generic: "Levofloxacin", icon: "💊", commonUse: "Pneumonia, UTIs", forms: ["Tablet", "IV"], strengths: ["250 mg tablet", "500 mg tablet", "750 mg tablet", "25 mg/mL IV"], dosingRange: "500–750 mg IV/PO daily" },
      { id: "metronidazole", generic: "Metronidazole", icon: "💊", commonUse: "Anaerobic and GI infections", forms: ["Tablet", "IV", "Liquid"], strengths: ["250 mg tablet", "500 mg tablet", "500 mg IV", "50 mg/mL liquid"], dosingRange: "500 mg IV/PO every 8 hours" },
      { id: "clindamycin", generic: "Clindamycin", icon: "💊", commonUse: "Skin and anaerobic coverage", forms: ["Capsule", "IV", "Liquid"], strengths: ["150 mg capsule", "300 mg capsule", "600 mg IV", "900 mg IV", "75 mg/5 mL liquid"], dosingRange: "600–900 mg IV every 8 hours" }
    ]
  },
  {
    id: "pain",
    category: "Pain Management",
    icon: "💉",
    medications: [
      { id: "ibuprofen", generic: "Ibuprofen", icon: "💊", commonUse: "Mild-moderate pain, fever", forms: ["Tablet", "Liquid", "IV"], strengths: ["200 mg tablet", "400 mg tablet", "600 mg tablet", "100 mg/5 mL liquid", "400 mg IV"], dosingRange: "200–800 mg every 6–8 hours" },
      { id: "oxycodone", generic: "Oxycodone", icon: "💊", commonUse: "Moderate-severe pain", forms: ["Tablet", "Liquid"], strengths: ["5 mg tablet", "10 mg tablet", "5 mg/5 mL liquid"], dosingRange: "5–10 mg every 4–6 hours" },
      { id: "tramadol", generic: "Tramadol", icon: "💊", commonUse: "Moderate pain", forms: ["Tablet", "Liquid"], strengths: ["50 mg tablet", "100 mg ER tablet", "10 mg/mL liquid"], dosingRange: "50–100 mg every 4–6 hours" },
      { id: "morphine", generic: "Morphine", icon: "🩹", commonUse: "Moderate-severe pain", forms: ["IV", "Tablet"], strengths: ["2 mg/mL", "4 mg/mL", "10 mg/mL", "15 mg tablet", "30 mg tablet"], dosingRange: "2–4 mg IV every 2–4 hours" },
      { id: "hydromorphone", generic: "Hydromorphone", icon: "🩹", commonUse: "Severe pain", forms: ["IV", "Tablet"], strengths: ["0.5 mg/mL", "1 mg/mL", "2 mg/mL", "2 mg tablet", "4 mg tablet", "8 mg tablet"], dosingRange: "0.2–1 mg IV every 2–3 hours" },
      { id: "fentanyl", generic: "Fentanyl", icon: "🧷", commonUse: "Acute severe pain", forms: ["IV"], strengths: ["50 mcg/mL"], dosingRange: "25–100 mcg IV every 1–2 hours" },
      { id: "ketorolac", generic: "Ketorolac", icon: "💊", commonUse: "Short-term non-opioid pain", forms: ["IV", "Tablet"], strengths: ["15 mg/mL", "30 mg/mL", "10 mg tablet"], dosingRange: "15–30 mg IV every 6 hours" },
      { id: "acetaminophen", generic: "Acetaminophen", icon: "🧃", commonUse: "Pain/fever", forms: ["Tablet", "Liquid", "IV"], strengths: ["325 mg tablet", "500 mg tablet", "160 mg/5 mL liquid", "1,000 mg IV"], dosingRange: "650–1,000 mg every 6 hours" }
    ]
  },
  {
    id: "cardiac-emergency",
    category: "Cardiac & Emergency",
    icon: "❤️",
    medications: [
      { id: "epinephrine", generic: "Epinephrine", icon: "⚡", commonUse: "Cardiac arrest, anaphylaxis", forms: ["IV", "IM"], strengths: ["1 mg/10 mL IV", "1 mg/mL IM"], dosingRange: "1 mg IV every 3–5 minutes (code)" },
      { id: "atropine", generic: "Atropine", icon: "⚡", commonUse: "Bradycardia", forms: ["IV"], strengths: ["1 mg/10 mL IV"], dosingRange: "1 mg IV every 3–5 minutes (max 3 mg)" },
      { id: "amiodarone", generic: "Amiodarone", icon: "🫀", commonUse: "Ventricular arrhythmias", forms: ["IV"], strengths: ["150 mg/3 mL", "450 mg/9 mL"], dosingRange: "150 mg IV bolus then infusion" },
      { id: "adenosine", generic: "Adenosine", icon: "🫀", commonUse: "SVT", forms: ["IV"], strengths: ["3 mg/mL"], dosingRange: "6 mg IV push then 12 mg if needed" },
      { id: "nitroglycerin", generic: "Nitroglycerin", icon: "💓", commonUse: "Chest pain", forms: ["Tablet", "IV"], strengths: ["0.4 mg sublingual tablet", "50 mg/250 mL IV"], dosingRange: "0.4 mg SL every 5 min × 3" },
      { id: "norepinephrine", generic: "Norepinephrine", icon: "💓", commonUse: "Shock, vasopressor support", forms: ["IV"], strengths: ["4 mg/4 mL", "8 mg/4 mL"], dosingRange: "0.01–3 mcg/kg/min infusion" },
      { id: "metoprolol", generic: "Metoprolol", icon: "💓", commonUse: "Rate control, hypertension", forms: ["Tablet", "IV"], strengths: ["25 mg tablet", "50 mg tablet", "100 mg tablet", "1 mg/mL IV"], dosingRange: "25–50 mg PO twice daily or 2.5–5 mg IV" },
      { id: "labetalol", generic: "Labetalol", icon: "💓", commonUse: "Hypertensive urgency/emergency", forms: ["Tablet", "IV"], strengths: ["100 mg tablet", "200 mg tablet", "5 mg/mL IV"], dosingRange: "10–20 mg IV then titrate" }
    ]
  },
  {
    id: "respiratory",
    category: "Respiratory",
    icon: "🫁",
    medications: [
      { id: "albuterol", generic: "Albuterol", icon: "🌬️", commonUse: "Bronchospasm", forms: ["Nebulizer", "Inhaler"], strengths: ["2.5 mg/3 mL neb", "90 mcg inhaler"], dosingRange: "2.5 mg neb every 4 hours" },
      { id: "ipratropium", generic: "Ipratropium", icon: "🌬️", commonUse: "Bronchodilation", forms: ["Nebulizer"], strengths: ["0.5 mg neb"], dosingRange: "0.5 mg neb every 6 hours" },
      { id: "duoneb", generic: "DuoNeb", icon: "🌬️", commonUse: "Combined bronchodilator", forms: ["Nebulizer"], strengths: ["2.5 mg/0.5 mg per 3 mL"], dosingRange: "Neb every 4–6 hours" },
      { id: "budesonide", generic: "Budesonide", icon: "🌬️", commonUse: "Airway inflammation", forms: ["Nebulizer"], strengths: ["0.25 mg/2 mL", "0.5 mg/2 mL"], dosingRange: "0.5–1 mg daily" },
      { id: "prednisone", generic: "Prednisone", icon: "🌬️", commonUse: "COPD/asthma exacerbation", forms: ["Tablet", "Liquid"], strengths: ["5 mg tablet", "10 mg tablet", "20 mg tablet", "5 mg/5 mL liquid"], dosingRange: "20–60 mg daily" }
    ]
  },
  {
    id: "sedation-anxiety",
    category: "Sedation & Anxiety",
    icon: "🧠",
    medications: [
      { id: "lorazepam", generic: "Lorazepam", icon: "😌", commonUse: "Anxiety, agitation", forms: ["IV", "Tablet", "Liquid"], strengths: ["2 mg/mL IV", "0.5 mg tablet", "1 mg tablet", "2 mg tablet", "2 mg/mL oral concentrate"], dosingRange: "0.5–2 mg IV/PO every 4–6 hours" },
      { id: "midazolam", generic: "Midazolam", icon: "😴", commonUse: "Procedural sedation", forms: ["IV"], strengths: ["1 mg/mL", "5 mg/mL"], dosingRange: "1–2 mg IV every 2–5 minutes until sedated" },
      { id: "diazepam", generic: "Diazepam", icon: "😌", commonUse: "Anxiety, muscle spasm", forms: ["IV", "Tablet", "Liquid"], strengths: ["5 mg/mL IV", "2 mg tablet", "5 mg tablet", "10 mg tablet", "5 mg/5 mL liquid"], dosingRange: "2–10 mg IV/PO every 6 hours" },
      { id: "haloperidol", generic: "Haloperidol", icon: "😌", commonUse: "Severe agitation/delirium", forms: ["Tablet", "Liquid", "IM", "IV"], strengths: ["0.5 mg tablet", "1 mg tablet", "2 mg tablet", "2 mg/mL liquid", "5 mg/mL injection"], dosingRange: "0.5–5 mg every 4–8 hours" }
    ]
  },
  {
    id: "blood-thinners",
    category: "Blood Thinners",
    icon: "🩸",
    medications: [
      { id: "heparin", generic: "Heparin", icon: "🩸", commonUse: "VTE prophylaxis and treatment", forms: ["IV", "SubQ"], strengths: ["1,000 units/mL", "5,000 units/mL", "10,000 units/mL"], dosingRange: "5,000 units SubQ every 8–12 hours (prophylaxis)" },
      { id: "enoxaparin", generic: "Enoxaparin", icon: "🩸", commonUse: "VTE prophylaxis", forms: ["SubQ"], strengths: ["30 mg/0.3 mL", "40 mg/0.4 mL", "80 mg/0.8 mL"], dosingRange: "40 mg daily (prophylaxis)" },
      { id: "warfarin", generic: "Warfarin", icon: "🩸", commonUse: "Long-term anticoagulation", forms: ["Tablet"], strengths: ["1 mg", "2 mg", "2.5 mg", "5 mg", "10 mg"], dosingRange: "2–10 mg daily (INR-based)" },
      { id: "apixaban", generic: "Apixaban", icon: "🩸", commonUse: "AFib, VTE", forms: ["Tablet"], strengths: ["2.5 mg", "5 mg"], dosingRange: "5 mg twice daily" },
      { id: "rivaroxaban", generic: "Rivaroxaban", icon: "🩸", commonUse: "VTE, AFib", forms: ["Tablet"], strengths: ["10 mg", "15 mg", "20 mg"], dosingRange: "10–20 mg daily" }
    ]
  },
  {
    id: "gi",
    category: "GI Medications",
    icon: "🧃",
    medications: [
      { id: "pantoprazole", generic: "Pantoprazole", icon: "🍽️", commonUse: "Stress ulcer and GERD", forms: ["Tablet", "IV"], strengths: ["40 mg tablet", "40 mg IV"], dosingRange: "40 mg daily" },
      { id: "famotidine", generic: "Famotidine", icon: "🍽️", commonUse: "GI acid suppression", forms: ["Tablet", "IV"], strengths: ["20 mg tablet", "40 mg tablet", "20 mg/2 mL IV"], dosingRange: "20 mg twice daily" },
      { id: "ondansetron", generic: "Ondansetron", icon: "🤢", commonUse: "Nausea/vomiting", forms: ["Tablet", "ODT", "Liquid", "IV"], strengths: ["4 mg tablet", "8 mg tablet", "4 mg ODT", "4 mg/5 mL liquid", "4 mg/2 mL IV"], dosingRange: "4 mg IV/PO every 6 hours" },
      { id: "metoclopramide", generic: "Metoclopramide", icon: "🤢", commonUse: "Gastroparesis, nausea", forms: ["Tablet", "Liquid", "IV"], strengths: ["5 mg tablet", "10 mg tablet", "5 mg/5 mL liquid", "5 mg/mL IV"], dosingRange: "10 mg every 6 hours" },
      { id: "loperamide", generic: "Loperamide", icon: "🍽️", commonUse: "Diarrhea control", forms: ["Capsule", "Tablet", "Liquid"], strengths: ["2 mg capsule", "2 mg tablet", "1 mg/5 mL liquid"], dosingRange: "4 mg then 2 mg after each loose stool (max per label)" }
    ]
  },
  {
    id: "electrolytes-fluids",
    category: "Electrolytes & IV Fluids",
    icon: "🧂",
    medications: [
      { id: "normal-saline", generic: "Normal Saline", icon: "💧", commonUse: "Volume resuscitation", forms: ["IV Fluid"], strengths: ["1,000 mL bag"], dosingRange: "75–150 mL/hr (maintenance context dependent)" },
      { id: "lactated-ringers", generic: "Lactated Ringers", icon: "💧", commonUse: "Fluid replacement", forms: ["IV Fluid"], strengths: ["1,000 mL bag"], dosingRange: "75–150 mL/hr (maintenance context dependent)" },
      { id: "potassium-chloride", generic: "Potassium Chloride", icon: "⚗️", commonUse: "Potassium replacement", forms: ["IV", "Tablet", "Liquid"], strengths: ["10 mEq/100 mL IV", "20 mEq/100 mL IV", "10 mEq tablet", "20 mEq/15 mL liquid"], dosingRange: "10 mEq/hr (max 20 mEq/hr monitored)" },
      { id: "magnesium-sulfate", generic: "Magnesium Sulfate", icon: "⚗️", commonUse: "Magnesium replacement", forms: ["IV"], strengths: ["1 g/100 mL", "2 g/50 mL"], dosingRange: "1–2 g over 1 hour" }
    ]
  },
  {
    id: "endocrine-diabetes",
    category: "Endocrine & Diabetes",
    icon: "🧬",
    medications: [
      { id: "insulin-glargine", generic: "Insulin Glargine", icon: "🧪", commonUse: "Basal insulin", forms: ["Vial", "Pen"], strengths: ["100 units/mL"], dosingRange: "10–40 units daily (individualized)" },
      { id: "insulin-lispro", generic: "Insulin Lispro", icon: "🧪", commonUse: "Prandial correction", forms: ["Vial", "Pen"], strengths: ["100 units/mL"], dosingRange: "2–10 units with meals (individualized)" },
      { id: "dextrose-50", generic: "Dextrose 50%", icon: "🍬", commonUse: "Severe hypoglycemia", forms: ["IV"], strengths: ["25 g/50 mL"], dosingRange: "25 g IV once" },
      { id: "metformin", generic: "Metformin", icon: "🧪", commonUse: "Type 2 diabetes", forms: ["Tablet", "Liquid"], strengths: ["500 mg tablet", "850 mg tablet", "1000 mg tablet", "500 mg/5 mL liquid"], dosingRange: "500–1000 mg twice daily" }
    ]
  },
  {
    id: "other-common",
    category: "Other Common Hospital Meds",
    icon: "🏥",
    medications: [
      { id: "diphenhydramine", generic: "Diphenhydramine", icon: "🤧", commonUse: "Allergy reactions", forms: ["Tablet", "Liquid", "IV"], strengths: ["25 mg capsule", "12.5 mg/5 mL liquid", "50 mg/mL IV"], dosingRange: "25–50 mg every 6 hours" },
      { id: "methylprednisolone", generic: "Methylprednisolone", icon: "🛡️", commonUse: "Inflammation, allergic reactions", forms: ["IV", "Tablet"], strengths: ["40 mg IV", "125 mg IV", "4 mg tablet"], dosingRange: "40–125 mg IV depending indication" },
      { id: "sodium-bicarbonate", generic: "Sodium Bicarbonate", icon: "⚗️", commonUse: "Severe acidosis", forms: ["IV"], strengths: ["50 mEq/50 mL"], dosingRange: "50 mEq IV as indicated" },
      { id: "naloxone", generic: "Naloxone", icon: "🆘", commonUse: "Opioid reversal", forms: ["IV", "IM", "Nasal"], strengths: ["0.4 mg/mL", "4 mg nasal spray"], dosingRange: "0.04–0.4 mg IV/IM; repeat as needed" },
      { id: "senna", generic: "Senna", icon: "🏥", commonUse: "Constipation regimen", forms: ["Tablet", "Liquid"], strengths: ["8.6 mg tablet", "8.8 mg/5 mL liquid"], dosingRange: "8.6–17.2 mg at bedtime" },
      { id: "docusate", generic: "Docusate", icon: "🏥", commonUse: "Stool softener", forms: ["Capsule", "Liquid"], strengths: ["100 mg capsule", "50 mg/5 mL liquid"], dosingRange: "100 mg 1–2 times daily" }
    ]
  }
];

export const AGE_GROUPS = [
  { id: "neonate", label: "Neonate (0–28 days)", icon: "👶", minAgeYears: 0, maxAgeYears: 0.08, note: "Weight-based dosing, high-alert double checks" },
  { id: "infant", label: "Infant (1–12 months)", icon: "🍼", minAgeYears: 0.08, maxAgeYears: 1, note: "Liquid forms and concentration verification" },
  { id: "child", label: "Child (1–12 years)", icon: "🧒", minAgeYears: 1, maxAgeYears: 12, note: "mg/kg dosing and max-dose caps" },
  { id: "adolescent", label: "Teens (13–17 years)", icon: "🧑‍🎓", minAgeYears: 12, maxAgeYears: 18, note: "Transition dosing can vary by weight" },
  { id: "adult", label: "Adult (18–64 years)", icon: "🧑", minAgeYears: 18, maxAgeYears: 65, note: "Standard adult protocols" },
  { id: "older-adult", label: "Senior (65+)", icon: "👴", minAgeYears: 65, maxAgeYears: 200, note: "Renal/hepatic adjustment and fall-risk review" }
];

export const PATIENT_ICON_GUIDE = [
  { id: "infant", label: "Infant", icon: "🍼" },
  { id: "teens", label: "Teens", icon: "🧑‍🎓" },
  { id: "female", label: "Female", icon: "👩" },
  { id: "male", label: "Male", icon: "👨" },
  { id: "adult", label: "Adult", icon: "🧑" },
  { id: "senior", label: "Senior", icon: "👴" }
];
