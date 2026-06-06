import type { Translations } from "./translations"

export type FormulaEntry = {
  name: string
  formula: string
  variables?: string[]
  note?: string
}

export type FormulaGroup = {
  topic: string
  entries: FormulaEntry[]
}

/**
 * The equations themselves are language-independent (math notation),
 * while the topic / group titles are localized from the theory translations.
 */
export function getFormulaGroups(t: Translations): FormulaGroup[] {
  return [
    {
      topic: t.calculators.pressure.title,
      entries: [
        {
          name: t.theory.pressure.absolutePressure.replace(/:$/, ""),
          formula: "P_abs = P_atm + (depth / 10)   [seawater]",
          variables: [
            "P_abs = absolute pressure (bar)",
            "P_atm = 1 bar (at sea level)",
            "depth = depth in meters (use 10.3 for freshwater)",
          ],
          note: t.theory.pressure.absolutePressureDesc,
        },
        {
          name: t.theory.pressure.gaugePressure.replace(/:$/, ""),
          formula: "P_gauge = P_abs − P_atm",
          variables: ["P_gauge = pressure above atmospheric (bar)"],
          note: t.theory.pressure.gaugePressureDesc,
        },
        {
          name: t.theory.pressure.partialPressureTitle,
          formula: "P_gas = fraction_gas × P_abs",
          variables: [
            "fraction_gas = gas fraction (e.g. 0.21 for O₂ in air)",
            "P_abs = absolute pressure (bar)",
          ],
          note: t.theory.pressure.partialPressureIntro,
        },
      ],
    },
    {
      topic: t.calculators.airConsumption.title,
      entries: [
        {
          name: t.theory.airConsumption.rmvTitle,
          formula: "RMV = SAC × P_abs",
          variables: [
            "RMV = respiratory minute volume at depth (L/min)",
            "SAC = surface air consumption (L/min)",
            "P_abs = absolute pressure at depth (bar)",
          ],
          note: t.theory.airConsumption.sacRateDesc,
        },
        {
          name: "SAC",
          formula: "SAC = (ΔP × tank_volume) / (time × P_abs)",
          variables: [
            "ΔP = pressure used (bar)",
            "tank_volume = tank size (L)",
            "time = elapsed time (min)",
          ],
          note: t.theory.airConsumption.sacRateTypical,
        },
        {
          name: t.calculatorUI.airConsumption.airTimeAvailable.replace(/:$/, ""),
          formula: "air_time = (usable_pressure × tank_volume) / RMV",
          variables: [
            "usable_pressure = start − reserve (bar)",
            "tank_volume = tank size (L)",
          ],
        },
      ],
    },
    {
      topic: t.calculators.gasLaws.title,
      entries: [
        {
          name: t.theory.gasLaws.boylesLawTitle,
          formula: t.theory.gasLaws.boylesFormula,
          note: `${t.theory.gasLaws.boylesCondition}. ${t.theory.gasLaws.boylesExplanation}`,
        },
        {
          name: t.theory.gasLaws.charlesLawTitle,
          formula: t.theory.gasLaws.charlesFormula,
          note: `${t.theory.gasLaws.charlesCondition}. ${t.theory.gasLaws.charlesExplanation}`,
        },
        {
          name: t.theory.gasLaws.gayLussacsLawTitle,
          formula: t.theory.gasLaws.gayLussacsFormula,
          note: `${t.theory.gasLaws.gayLussacsCondition}. ${t.theory.gasLaws.gayLussacsExplanation}`,
        },
        {
          name: t.theory.gasLaws.daltonsLawTitle,
          formula: t.theory.gasLaws.daltonsFormula,
          note: t.theory.gasLaws.daltonsExplanation,
        },
        {
          name: t.theory.gasLaws.combinedLawTitle,
          formula: t.theory.gasLaws.combinedFormula,
          note: t.theory.gasLaws.combinedExplanation,
        },
      ],
    },
    {
      topic: t.calculators.henrysLaw.title,
      entries: [
        {
          name: t.theory.henrysLaw.basicsTitle,
          formula: t.theory.henrysLaw.formula,
          variables: [t.theory.henrysLaw.formulaExplanation],
          note: t.theory.henrysLaw.basicsDesc,
        },
      ],
    },
    {
      topic: t.calculators.liftDisplacement.title,
      entries: [
        {
          name: t.theory.liftDisplacement.archimedesTitle,
          formula: t.theory.liftDisplacement.archimedesFormula,
          variables: [
            t.theory.liftDisplacement.fbForce,
            t.theory.liftDisplacement.density,
            t.theory.liftDisplacement.gravity,
            t.theory.liftDisplacement.volume,
          ],
          note: t.theory.liftDisplacement.archimedesDesc,
        },
        {
          name: t.theory.liftDisplacement.volumeCalculationsTitle,
          formula: [
            t.theory.liftDisplacement.rectangular,
            t.theory.liftDisplacement.cylindrical,
            t.theory.liftDisplacement.spherical,
          ].join("\n"),
          variables: [
            t.theory.liftDisplacement.cubicMeterToLiter,
            t.theory.liftDisplacement.literToKgFresh,
            t.theory.liftDisplacement.literToKgSalt,
          ],
        },
      ],
    },
  ]
}
