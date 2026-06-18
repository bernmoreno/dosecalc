import { AGE_GROUPS } from "../data/medications";

export const DOSING_PROFILES = {
  amoxicillin: { pediatricMgPerKgPerDay: 45, maxDailyMg: 3000, adultMgPerDay: 1500, defaultFrequencyPerDay: 3, tabletMg: 500, liquidMgPerMl: 80 },
  "amoxicillin-clavulanate": { pediatricMgPerKgPerDay: 45, maxDailyMg: 4000, adultMgPerDay: 1750, defaultFrequencyPerDay: 2, tabletMg: 875, liquidMgPerMl: 80 },
  cephalexin: { pediatricMgPerKgPerDay: 50, maxDailyMg: 4000, adultMgPerDay: 2000, defaultFrequencyPerDay: 4, tabletMg: 500, liquidMgPerMl: 50 },
  cefazolin: { pediatricMgPerKgPerDay: 75, maxDailyMg: 6000, adultMgPerDay: 3000, defaultFrequencyPerDay: 3 },
  ceftriaxone: { pediatricMgPerKgPerDay: 50, maxDailyMg: 2000, adultMgPerDay: 2000, defaultFrequencyPerDay: 1 },
  cefepime: { pediatricMgPerKgPerDay: 100, maxDailyMg: 6000, adultMgPerDay: 4000, defaultFrequencyPerDay: 2 },
  vancomycin: { pediatricMgPerKgPerDay: 60, maxDailyMg: 4000, adultMgPerDay: 3000, defaultFrequencyPerDay: 3, liquidMgPerMl: 25 },
  azithromycin: { pediatricMgPerKgPerDay: 10, maxDailyMg: 500, adultMgPerDay: 500, defaultFrequencyPerDay: 1, tabletMg: 500, liquidMgPerMl: 40 },
  levofloxacin: { pediatricMgPerKgPerDay: 10, maxDailyMg: 750, adultMgPerDay: 500, defaultFrequencyPerDay: 1, tabletMg: 500 },
  metronidazole: { pediatricMgPerKgPerDay: 30, maxDailyMg: 2000, adultMgPerDay: 1500, defaultFrequencyPerDay: 3, tabletMg: 500, liquidMgPerMl: 50 },
  clindamycin: { pediatricMgPerKgPerDay: 25, maxDailyMg: 2700, adultMgPerDay: 1800, defaultFrequencyPerDay: 3, tabletMg: 300, liquidMgPerMl: 15 },
  morphine: { adultMgPerDay: 24, defaultFrequencyPerDay: 6, tabletMg: 15 },
  hydromorphone: { adultMgPerDay: 6, defaultFrequencyPerDay: 6, tabletMg: 2 },
  ketorolac: { adultMgPerDay: 60, defaultFrequencyPerDay: 4, tabletMg: 10 },
  acetaminophen: { pediatricMgPerKgPerDay: 60, maxDailyMg: 4000, adultMgPerDay: 3000, defaultFrequencyPerDay: 4, tabletMg: 500, liquidMgPerMl: 32 },
  ibuprofen: { pediatricMgPerKgPerDay: 30, maxDailyMg: 3200, adultMgPerDay: 1600, defaultFrequencyPerDay: 4, tabletMg: 400, liquidMgPerMl: 20 },
  oxycodone: { adultMgPerDay: 30, defaultFrequencyPerDay: 4, tabletMg: 5, liquidMgPerMl: 1 },
  tramadol: { adultMgPerDay: 200, defaultFrequencyPerDay: 4, tabletMg: 50, liquidMgPerMl: 10 },
  metoprolol: { adultMgPerDay: 100, defaultFrequencyPerDay: 2, tabletMg: 50 },
  labetalol: { adultMgPerDay: 400, defaultFrequencyPerDay: 2, tabletMg: 200 },
  prednisone: { pediatricMgPerKgPerDay: 1, maxDailyMg: 60, adultMgPerDay: 40, defaultFrequencyPerDay: 1, tabletMg: 20, liquidMgPerMl: 1 },
  pantoprazole: { adultMgPerDay: 40, defaultFrequencyPerDay: 1, tabletMg: 40 },
  famotidine: { adultMgPerDay: 40, defaultFrequencyPerDay: 2, tabletMg: 20 },
  ondansetron: { adultMgPerDay: 16, defaultFrequencyPerDay: 4, tabletMg: 4, liquidMgPerMl: 0.8 },
  metoclopramide: { adultMgPerDay: 40, defaultFrequencyPerDay: 4, tabletMg: 10, liquidMgPerMl: 1 },
  loperamide: { adultMgPerDay: 16, defaultFrequencyPerDay: 4, tabletMg: 2, liquidMgPerMl: 0.2 },
  lorazepam: { adultMgPerDay: 4, defaultFrequencyPerDay: 2, tabletMg: 1, liquidMgPerMl: 2 },
  diazepam: { adultMgPerDay: 20, defaultFrequencyPerDay: 2, tabletMg: 5, liquidMgPerMl: 1 },
  haloperidol: { adultMgPerDay: 10, defaultFrequencyPerDay: 2, tabletMg: 2, liquidMgPerMl: 2 },
  "potassium-chloride": { adultMgPerDay: 1500, defaultFrequencyPerDay: 2 },
  "insulin-glargine": { pediatricMgPerKgPerDay: 0.3, maxDailyMg: 80, adultMgPerDay: 20, defaultFrequencyPerDay: 1 },
  "insulin-lispro": { pediatricMgPerKgPerDay: 0.2, maxDailyMg: 60, adultMgPerDay: 12, defaultFrequencyPerDay: 3 },
  metformin: { adultMgPerDay: 2000, defaultFrequencyPerDay: 2, tabletMg: 500, liquidMgPerMl: 100 },
  diphenhydramine: { pediatricMgPerKgPerDay: 5, maxDailyMg: 300, adultMgPerDay: 100, defaultFrequencyPerDay: 4, tabletMg: 25, liquidMgPerMl: 2.5 },
  senna: { adultMgPerDay: 17.2, defaultFrequencyPerDay: 1, tabletMg: 8.6, liquidMgPerMl: 1.76 },
  docusate: { adultMgPerDay: 200, defaultFrequencyPerDay: 2, tabletMg: 100, liquidMgPerMl: 10 }
};

export function lbToKg(lb) {
  return Number.isFinite(lb) ? lb / 2.2 : NaN;
}

export function kgToLb(kg) {
  return Number.isFinite(kg) ? kg * 2.2 : NaN;
}

export function calculateBSA(weightKg, heightCm) {
  if (!Number.isFinite(weightKg) || !Number.isFinite(heightCm) || weightKg <= 0 || heightCm <= 0) {
    return NaN;
  }
  return Math.sqrt((weightKg * heightCm) / 3600);
}

export function calculateClarksRuleDose({ weightLb, adultDoseMg }) {
  if (!Number.isFinite(weightLb) || !Number.isFinite(adultDoseMg) || weightLb <= 0 || adultDoseMg <= 0) return NaN;
  return (weightLb / 150) * adultDoseMg;
}

export function calculateFriedsRuleDose({ ageMonths, adultDoseMg }) {
  if (!Number.isFinite(ageMonths) || !Number.isFinite(adultDoseMg) || ageMonths < 0 || adultDoseMg <= 0) return NaN;
  return (ageMonths / 150) * adultDoseMg;
}

export function calculateYoungsRuleDose({ ageYears, adultDoseMg }) {
  if (!Number.isFinite(ageYears) || !Number.isFinite(adultDoseMg) || ageYears < 0 || adultDoseMg <= 0) return NaN;
  return (ageYears / (ageYears + 12)) * adultDoseMg;
}

function roundTo(value, places = 2) {
  if (!Number.isFinite(value)) return 0;
  const p = 10 ** places;
  return Math.round(value * p) / p;
}

export function flattenMedications(categories) {
  return categories.flatMap((category) =>
    category.medications.map((medication) => ({ ...medication, categoryId: category.id, categoryName: category.category }))
  );
}

export function getAgeGroup(ageYears) {
  if (!Number.isFinite(ageYears) || ageYears < 0) return null;
  return AGE_GROUPS.find((group) => ageYears >= group.minAgeYears && ageYears < group.maxAgeYears) ?? AGE_GROUPS[AGE_GROUPS.length - 1];
}

export function getDosingProfile(medicationId) {
  return DOSING_PROFILES[medicationId] ?? null;
}

function parseTabletStrengthMg(medication) {
  const strengths = medication?.strengths ?? [];
  const candidate = strengths.find((value) => /tablet|capsule/i.test(value) && /\d+(\.\d+)?\s*mg/i.test(value));
  if (!candidate) return null;
  const match = candidate.match(/(\d+(\.\d+)?)\s*mg/i);
  return match ? Number(match[1]) : null;
}

function parseLiquidConcentrationMgPerMl(medication) {
  const strengths = medication?.strengths ?? [];
  const candidate = strengths.find((value) => /\d+(\.\d+)?\s*mg\s*\/\s*(\d+(\.\d+)?)\s*mL/i.test(value));
  if (!candidate) return null;
  const match = candidate.match(/(\d+(\.\d+)?)\s*mg\s*\/\s*(\d+(\.\d+)?)\s*mL/i);
  if (!match) return null;
  const mg = Number(match[1]);
  const ml = Number(match[3]);
  if (!Number.isFinite(mg) || !Number.isFinite(ml) || ml <= 0) return null;
  return mg / ml;
}

export function calculateRecommendedDose({
  medication,
  weightKg,
  ageYears,
  frequencyPerDay,
  tabletStrengthMgOverride,
  liquidConcentrationMgPerMlOverride
}) {
  if (!medication) {
    return { ok: false, reason: "Select a medication first." };
  }

  const profile = getDosingProfile(medication.id);
  if (!profile) {
    return {
      ok: false,
      reason: "No structured dose profile for this medication yet. You can still use manual conversion in the Convert tab."
    };
  }

  const ageGroup = getAgeGroup(ageYears);
  const safeFrequency = Number.isFinite(frequencyPerDay) && frequencyPerDay > 0
    ? frequencyPerDay
    : (profile.defaultFrequencyPerDay ?? 1);

  let totalDailyDoseMg = null;
  const useWeightBased = ageYears < 18 && Number.isFinite(weightKg) && weightKg > 0 && Number.isFinite(profile.pediatricMgPerKgPerDay);

  if (useWeightBased) {
    totalDailyDoseMg = weightKg * profile.pediatricMgPerKgPerDay;
  } else if (Number.isFinite(profile.adultMgPerDay)) {
    totalDailyDoseMg = profile.adultMgPerDay;
  } else if (Number.isFinite(profile.pediatricMgPerKgPerDay) && Number.isFinite(weightKg) && weightKg > 0) {
    totalDailyDoseMg = weightKg * profile.pediatricMgPerKgPerDay;
  }

  if (!Number.isFinite(totalDailyDoseMg) || totalDailyDoseMg <= 0) {
    return {
      ok: false,
      reason: "Not enough numeric dosing data. Provide weight and choose a medication with a dosing profile."
    };
  }

  if (Number.isFinite(profile.maxDailyMg)) {
    totalDailyDoseMg = Math.min(totalDailyDoseMg, profile.maxDailyMg);
  }
  if (Number.isFinite(profile.minDailyMg)) {
    totalDailyDoseMg = Math.max(totalDailyDoseMg, profile.minDailyMg);
  }

  const dosePerAdministrationMg = totalDailyDoseMg / safeFrequency;
  const inferredTabletMg = parseTabletStrengthMg(medication);
  const inferredLiquidMgPerMl = parseLiquidConcentrationMgPerMl(medication);
  const tabletStrengthMg = Number.isFinite(tabletStrengthMgOverride) && tabletStrengthMgOverride > 0
    ? tabletStrengthMgOverride
    : (profile.tabletMg ?? inferredTabletMg);
  const liquidConcentrationMgPerMl = Number.isFinite(liquidConcentrationMgPerMlOverride) && liquidConcentrationMgPerMlOverride > 0
    ? liquidConcentrationMgPerMlOverride
    : (profile.liquidMgPerMl ?? inferredLiquidMgPerMl);

  const tabletPerDose = Number.isFinite(tabletStrengthMg) ? dosePerAdministrationMg / tabletStrengthMg : null;
  const liquidMlPerDose = Number.isFinite(liquidConcentrationMgPerMl) ? dosePerAdministrationMg / liquidConcentrationMgPerMl : null;

  const adultDoseForRule = profile.adultMgPerDay;
  const weightLb = kgToLb(weightKg);
  const ageMonths = ageYears * 12;
  const clarkMg = calculateClarksRuleDose({ weightLb, adultDoseMg: adultDoseForRule });
  const friedMg = calculateFriedsRuleDose({ ageMonths, adultDoseMg: adultDoseForRule });
  const youngMg = calculateYoungsRuleDose({ ageYears, adultDoseMg: adultDoseForRule });

  return {
    ok: true,
    profile,
    ageGroup,
    usedWeightBased: useWeightBased,
    frequencyPerDay: safeFrequency,
    totalDailyDoseMg: roundTo(totalDailyDoseMg, 2),
    dosePerAdministrationMg: roundTo(dosePerAdministrationMg, 2),
    tabletStrengthMg: tabletStrengthMg ?? null,
    tabletsPerDose: tabletPerDose == null ? null : roundTo(tabletPerDose, 2),
    tabletsPerDay: tabletPerDose == null ? null : roundTo(tabletPerDose * safeFrequency, 2),
    liquidConcentrationMgPerMl: liquidConcentrationMgPerMl ?? null,
    liquidMlPerDose: liquidMlPerDose == null ? null : roundTo(liquidMlPerDose, 2),
    liquidMlPerDay: liquidMlPerDose == null ? null : roundTo(liquidMlPerDose * safeFrequency, 2),
    pediatricRules: {
      clarkRuleDailyMg: Number.isFinite(clarkMg) ? roundTo(clarkMg, 2) : null,
      friedRuleDailyMg: Number.isFinite(friedMg) ? roundTo(friedMg, 2) : null,
      youngRuleDailyMg: Number.isFinite(youngMg) ? roundTo(youngMg, 2) : null
    }
  };
}

export function convertDoseToForms({ totalDailyDoseMg, frequencyPerDay, tabletStrengthMg, liquidConcentrationMgPerMl }) {
  const safeFrequency = Number.isFinite(frequencyPerDay) && frequencyPerDay > 0 ? frequencyPerDay : 1;
  const dosePerAdministrationMg = totalDailyDoseMg / safeFrequency;

  const tabletsPerDose = Number.isFinite(tabletStrengthMg) && tabletStrengthMg > 0
    ? dosePerAdministrationMg / tabletStrengthMg
    : null;

  const liquidMlPerDose = Number.isFinite(liquidConcentrationMgPerMl) && liquidConcentrationMgPerMl > 0
    ? dosePerAdministrationMg / liquidConcentrationMgPerMl
    : null;

  return {
    frequencyPerDay: safeFrequency,
    totalDailyDoseMg: roundTo(totalDailyDoseMg, 2),
    dosePerAdministrationMg: roundTo(dosePerAdministrationMg, 2),
    tabletsPerDose: tabletsPerDose == null ? null : roundTo(tabletsPerDose, 2),
    tabletsPerDay: tabletsPerDose == null ? null : roundTo(tabletsPerDose * safeFrequency, 2),
    liquidMlPerDose: liquidMlPerDose == null ? null : roundTo(liquidMlPerDose, 2),
    liquidMlPerDay: liquidMlPerDose == null ? null : roundTo(liquidMlPerDose * safeFrequency, 2)
  };
}
