import { useMemo, useState } from 'react'
import { ArrowLeftRight, Code2 } from 'lucide-react'

import { DiscIcon } from '@/components/DiscIcon'
import { ExternalLink } from '@/components/ExternalLink'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  FORMULAS,
  convert,
  type Direction,
  type FormulaType,
} from '@/lib/conversion'

const FORMULA_ORDER: FormulaType[] = ['generic', 'short', 'long', 'ruleOfThumb']

const REDDIT_POST_URL = 'https://redd.it/1vt0svx'
const REPO_URL = 'https://github.com/HowManyOliversAreThere/dg-rating-converter'

function formatRating(value: number) {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })
}

function App() {
  const [direction, setDirection] = useState<Direction>('udiscToPdga')
  const [formulaType, setFormulaType] = useState<FormulaType>('generic')
  const [rawInput, setRawInput] = useState('')

  const parsed = parseFloat(rawInput)
  const hasValue = rawInput.trim() !== '' && !Number.isNaN(parsed)
  const result = hasValue ? convert(parsed, direction, formulaType) : null

  const inputLabel = direction === 'udiscToPdga' ? 'UDisc Rating' : 'PDGA Rating'
  const outputLabel = direction === 'udiscToPdga' ? 'PDGA Rating' : 'UDisc Rating'
  const inputPlaceholder = direction === 'udiscToPdga' ? 'e.g. 160' : 'e.g. 866'

  const formulaText = useMemo(() => {
    const { slope, intercept } = FORMULAS[formulaType]
    const sign = intercept >= 0 ? '+' : '−'
    if (direction === 'udiscToPdga') {
      return `PDGA = ${slope} × UDisc ${sign} ${Math.abs(intercept)}`
    }
    return `UDisc = (PDGA − ${intercept}) ÷ ${slope}`
  }, [direction, formulaType])

  function handleSwap() {
    setDirection((d) => (d === 'udiscToPdga' ? 'pdgaToUdisc' : 'udiscToPdga'))
    setRawInput(result !== null ? result.toFixed(1) : '')
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 px-4 py-10">
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>

      <header className="flex max-w-xs flex-col items-center gap-3 text-center">
        <DiscIcon className="h-16 w-16" />
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
          DG Rating Converter
        </h1>
        <p className="text-sm text-muted-foreground">
          Approximately convert UDisc &harr; PDGA ratings using the regression formula from{' '}
          <ExternalLink
            href={REDDIT_POST_URL}
            className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
          >
            u/HucknPluck&rsquo;s analysis on r/discgolf
          </ExternalLink>
          , more accurate than the old &times;2 + 500 rule of thumb.
        </p>
      </header>

      <main className="w-full max-w-sm">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <ToggleGroup
            type="single"
            value={direction}
            onValueChange={(value) => value && setDirection(value as Direction)}
            className="mb-6 w-full"
          >
            <ToggleGroupItem value="udiscToPdga" className="flex-1">
              UDisc &rarr; PDGA
            </ToggleGroupItem>
            <ToggleGroupItem value="pdgaToUdisc" className="flex-1">
              PDGA &rarr; UDisc
            </ToggleGroupItem>
          </ToggleGroup>

          <label htmlFor="rating-input" className="mb-1 block text-xs font-medium text-muted-foreground">
            {inputLabel}
          </label>
          <input
            id="rating-input"
            type="number"
            inputMode="decimal"
            placeholder={inputPlaceholder}
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            className="mb-4 w-full rounded-xl border border-border bg-background px-4 py-3 text-2xl font-semibold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />

          <div className="mb-6 flex items-center justify-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Swap direction"
              onClick={handleSwap}
              className="border-border text-muted-foreground hover:text-foreground"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-6 rounded-2xl bg-secondary px-4 py-5 text-center">
            <p className="text-xs font-medium text-secondary-foreground/70">{outputLabel}</p>
            <p className="font-display text-4xl font-semibold text-secondary-foreground">
              {result !== null ? formatRating(result) : '—'}
            </p>
          </div>

          <p className="mb-2 text-xs font-medium text-muted-foreground">Conversion type</p>
          <ToggleGroup
            type="single"
            value={formulaType}
            onValueChange={(value) => value && setFormulaType(value as FormulaType)}
            className="w-full"
          >
            {FORMULA_ORDER.map((key) => (
              <ToggleGroupItem
                key={key}
                value={key}
                className="min-h-11 flex-1 whitespace-normal px-1.5 text-center text-xs leading-tight"
              >
                {FORMULAS[key].shortLabel}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <p className="mt-2 text-xs text-muted-foreground">{FORMULAS[formulaType].description}</p>

          <p className="mt-4 border-t border-border pt-4 text-center font-mono text-xs text-muted-foreground">
            {formulaText}
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Fit on ~25 tracked rounds (r&sup2; = 0.81) &mdash; a community estimate, not an
          official PDGA/UDisc conversion.
        </p>
      </main>

      <footer className="text-center text-xs text-muted-foreground">
        <ExternalLink
          href={REPO_URL}
          className="justify-center underline underline-offset-2 hover:text-foreground"
        >
          <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
          Source Code
        </ExternalLink>
      </footer>
    </div>
  )
}

export default App
