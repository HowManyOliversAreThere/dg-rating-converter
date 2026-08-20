export type FormulaType = 'generic' | 'short' | 'long' | 'ruleOfThumb'

export type Direction = 'udiscToPdga' | 'pdgaToUdisc'

interface FormulaInfo {
  label: string
  shortLabel: string
  description: string
  slope: number
  intercept: number
}

// PDGA = slope * UDisc + intercept
export const FORMULAS: Record<FormulaType, FormulaInfo> = {
  generic: {
    label: 'Generic',
    shortLabel: 'Generic',
    description: 'Best all-purpose formula when you don’t know (or can’t easily categorize) the layout.',
    slope: 1.445,
    intercept: 633.7,
  },
  short: {
    label: 'Short / Normal Layout',
    shortLabel: 'Short',
    description: 'Standard-length, standard-difficulty layouts — UDisc tends to under-penalize these relative to PDGA.',
    slope: 1.445,
    intercept: 640.6,
  },
  long: {
    label: 'Long / Difficult Layout',
    shortLabel: 'Long',
    description: 'Long or tough tournament layouts — UDisc tends to over-penalize these relative to PDGA.',
    slope: 1.445,
    intercept: 624.5,
  },
  ruleOfThumb: {
    label: 'Rule of Thumb',
    shortLabel: 'Old Rule',
    description: 'The old mental-math rule (PDGA = 2 × UDisc + 500) for comparison — it systematically understates lower- and mid-tier ratings.',
    slope: 2,
    intercept: 500,
  },
}

export function udiscToPdga(udiscRating: number, formula: FormulaType): number {
  const { slope, intercept } = FORMULAS[formula]
  return slope * udiscRating + intercept
}

export function pdgaToUdisc(pdgaRating: number, formula: FormulaType): number {
  const { slope, intercept } = FORMULAS[formula]
  return (pdgaRating - intercept) / slope
}

export function convert(rating: number, direction: Direction, formula: FormulaType): number {
  return direction === 'udiscToPdga' ? udiscToPdga(rating, formula) : pdgaToUdisc(rating, formula)
}
