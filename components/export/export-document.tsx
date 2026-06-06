"use client"

import { useI18n } from "@/lib/i18n/context"
import { getFormulaGroups } from "@/lib/i18n/formulas"
import { exportStrings } from "@/lib/i18n/export-strings"
import { locales } from "@/lib/i18n/context"

// Renders text that may contain <strong> tags from the translations.
function RichText({ html, className }: { html: string; className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold text-foreground mb-4 mt-2 print-avoid-break border-b border-border pb-2">
      {children}
    </h2>
  )
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold text-foreground mt-5 mb-2 print-avoid-break">{children}</h3>
}

function Term({ term, desc }: { term: string; desc: string }) {
  return (
    <li className="mb-1.5 leading-relaxed">
      <span className="font-semibold text-foreground">{term}</span>{" "}
      <span className="text-muted-foreground print-muted">{desc}</span>
    </li>
  )
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="list-disc pl-5 mb-3 text-muted-foreground print-muted leading-relaxed">
      {items.map((item, i) => (
        <li key={i} className="mb-1">
          {item}
        </li>
      ))}
    </ul>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 mb-4 print-card print-avoid-break">{children}</div>
  )
}

export function ExportDocument() {
  const { t, locale } = useI18n()
  const e = exportStrings[locale]
  const tp = t.theory.pressure
  const ta = t.theory.airConsumption
  const tg = t.theory.gasLaws
  const th = t.theory.henrysLaw
  const tl = t.theory.liftDisplacement
  const formulaGroups = getFormulaGroups(t)

  const languageName = locales.find((l) => l.code === locale)?.name ?? "English"
  const generatedDate = new Date().toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <article className="print-document max-w-4xl mx-auto text-foreground">
      {/* Cover / header */}
      <header className="mb-8 print-avoid-break">
        <h1 className="text-3xl sm:text-4xl font-bold text-balance mb-3">{e.docTitle}</h1>
        <p className="text-muted-foreground print-muted text-pretty mb-4">{e.docSubtitle}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground print-muted">
          <span>
            {e.generated}: {generatedDate}
          </span>
          <span>
            {e.language}: {languageName}
          </span>
        </div>
      </header>

      {/* Formula quick reference */}
      <section className="mb-8">
        <SectionTitle>{e.formulaReference}</SectionTitle>
        <p className="text-muted-foreground print-muted mb-4 leading-relaxed">{e.formulaReferenceDesc}</p>
        {formulaGroups.map((group) => (
          <Card key={group.topic}>
            <SubTitle>{group.topic}</SubTitle>
            <div className="flex flex-col gap-4">
              {group.entries.map((entry, i) => (
                <div key={i} className="print-avoid-break">
                  <p className="font-semibold text-foreground mb-1">{entry.name}</p>
                  <pre className="rounded-md bg-secondary print-formula px-3 py-2 font-mono text-sm text-foreground whitespace-pre-wrap mb-1">
                    {entry.formula}
                  </pre>
                  {entry.variables && entry.variables.length > 0 && (
                    <ul className="list-disc pl-5 text-sm text-muted-foreground print-muted mb-1">
                      {entry.variables.map((v, vi) => (
                        <li key={vi}>{v}</li>
                      ))}
                    </ul>
                  )}
                  {entry.note && (
                    <p className="text-sm text-muted-foreground print-muted leading-relaxed">{entry.note}</p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </section>

      {/* Water & Pressure theory */}
      <section className="mb-8 print-break-before">
        <SectionTitle>{tp.waterPropertiesTitle}</SectionTitle>

        <Card>
          <SubTitle>{tp.waterDensityTitle}</SubTitle>
          <p className="text-muted-foreground print-muted mb-3 leading-relaxed">
            <RichText html={tp.waterDensityIntro} />
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold mb-1">{tp.freshWater}</p>
              <BulletList items={tp.freshWaterDetails} />
            </div>
            <div>
              <p className="font-semibold mb-1">{tp.seaWater}</p>
              <BulletList items={tp.seaWaterDetails} />
            </div>
          </div>
        </Card>

        <Card>
          <SubTitle>{tp.heatTitle}</SubTitle>
          <p className="text-muted-foreground print-muted mb-3 leading-relaxed">
            <RichText html={tp.heatIntro} />
          </p>
          <p className="font-semibold mb-1">{tp.heatMethods}</p>
          <ul className="mb-3">
            <Term term={tp.conduction} desc={tp.conductionDesc} />
            <Term term={tp.convection} desc={tp.convectionDesc} />
            <Term term={tp.radiation} desc={tp.radiationDesc} />
          </ul>
          <p className="leading-relaxed">
            <span className="font-semibold">{tp.heatSafetyNote}</span>{" "}
            <span className="text-muted-foreground print-muted">{tp.heatSafetyText}</span>
          </p>
        </Card>

        <Card>
          <SubTitle>{tp.lightTitle}</SubTitle>
          <p className="text-muted-foreground print-muted mb-3 leading-relaxed">{tp.lightIntro}</p>
          <p className="font-semibold mb-1">{tp.lightAbsorption}</p>
          <BulletList items={tp.lightAbsorptionDetails} />
          <p className="font-semibold mb-1">{tp.refraction}</p>
          <BulletList items={tp.refractionDetails} />
          <p className="font-semibold mb-1">{tp.turbidity}</p>
          <BulletList items={tp.turbidityDetails} />
        </Card>

        <Card>
          <SubTitle>{tp.soundTitle}</SubTitle>
          <p className="text-muted-foreground print-muted mb-3 leading-relaxed">
            <RichText html={tp.soundIntro} />
          </p>
          <p className="font-semibold mb-1">{tp.soundSpeed}</p>
          <BulletList items={tp.soundSpeedDetails} />
          <p className="leading-relaxed mb-3">
            <span className="font-semibold">{tp.soundDirectionTitle}</span>{" "}
            <span className="text-muted-foreground print-muted">{tp.soundDirectionText}</span>
          </p>
          <p className="font-semibold mb-1">{tp.soundPractical}</p>
          <BulletList items={tp.soundPracticalDetails} />
        </Card>

        <Card>
          <SubTitle>{tp.pressureTitle}</SubTitle>
          <p className="text-muted-foreground print-muted mb-3 leading-relaxed">{tp.pressureIntro}</p>
          <p className="font-semibold mb-1">{tp.pressureKey}</p>
          <ul className="mb-3">
            <Term term={tp.atmosphericPressure} desc={tp.atmosphericPressureDesc} />
            <Term term={tp.hydrostaticPressure} desc={tp.hydrostaticPressureDesc} />
            <Term term={tp.absolutePressure} desc={tp.absolutePressureDesc} />
            <Term term={tp.gaugePressure} desc={tp.gaugePressureDesc} />
          </ul>
          <p className="font-semibold mb-2">{tp.pressureTable}</p>
          <table className="w-full text-sm border-collapse mb-2">
            <thead>
              <tr>
                {tp.pressureTableHeaders.map((h) => (
                  <th key={h} className="border border-border px-3 py-2 text-left font-semibold bg-secondary">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tp.pressureTableRows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="border border-border px-3 py-2 text-muted-foreground print-muted">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <SubTitle>{tp.partialPressureTitle}</SubTitle>
          <p className="text-muted-foreground print-muted mb-3 leading-relaxed">{tp.partialPressureIntro}</p>
          <p className="leading-relaxed mb-2">
            <span className="font-semibold">{tp.partialPressureAir}</span>{" "}
            <span className="text-muted-foreground print-muted">{tp.partialPressureAirText}</span>
          </p>
          <p className="font-semibold mb-1">{tp.partialPressureExample}</p>
          <BulletList items={tp.partialPressureExampleDetails} />
          <p className="font-semibold mb-1">{tp.oxygenLimits}</p>
          <BulletList items={tp.oxygenLimitsDetails} />
          <p className="font-semibold mb-1">{tp.nitrogenNarcosis}</p>
          <BulletList items={tp.nitrogenNarcosisDetails} />
        </Card>
      </section>

      {/* Air Consumption theory */}
      <section className="mb-8 print-break-before">
        <SectionTitle>{ta.title}</SectionTitle>
        <Card>
          <SubTitle>{ta.sacRateTitle}</SubTitle>
          <p className="text-muted-foreground print-muted mb-2 leading-relaxed">{ta.sacRateDesc}</p>
          <p className="text-muted-foreground print-muted leading-relaxed">{ta.sacRateTypical}</p>
        </Card>
        <Card>
          <SubTitle>{ta.rmvTitle}</SubTitle>
          <p className="text-muted-foreground print-muted leading-relaxed">
            <RichText html={ta.rmvDesc} />
          </p>
        </Card>
        <Card>
          <SubTitle>{ta.planningRulesTitle}</SubTitle>
          <ul>
            <Term term={ta.ruleOfThirds} desc={ta.ruleOfThirdsDesc} />
            <Term term={ta.rule80} desc={ta.rule80Desc} />
            <Term term={ta.turnPressure} desc={ta.turnPressureDesc} />
            <Term term={ta.safetyReserve} desc={ta.safetyReserveDesc} />
          </ul>
        </Card>
        <Card>
          <SubTitle>{ta.factorsTitle}</SubTitle>
          <ul>
            <Term term={ta.factorExperience} desc={ta.factorExperienceDesc} />
            <Term term={ta.factorFitness} desc={ta.factorFitnessDesc} />
            <Term term={ta.factorTemperature} desc={ta.factorTemperatureDesc} />
            <Term term={ta.factorCurrent} desc={ta.factorCurrentDesc} />
            <Term term={ta.factorStress} desc={ta.factorStressDesc} />
          </ul>
        </Card>
      </section>

      {/* Gas Laws theory */}
      <section className="mb-8 print-break-before">
        <SectionTitle>{tg.title}</SectionTitle>
        <Card>
          <SubTitle>{tg.importanceTitle}</SubTitle>
          <ul>
            <Term term={tg.boylesImportance} desc={tg.boylesImportanceDesc} />
            <Term term={tg.daltonsImportance} desc={tg.daltonsImportanceDesc} />
            <Term term={tg.charlesImportance} desc={tg.charlesImportanceDesc} />
            <Term term={tg.gayLussacsImportance} desc={tg.gayLussacsImportanceDesc} />
          </ul>
        </Card>

        <SubTitle>{tg.fourLawsTitle}</SubTitle>
        {[
          {
            title: tg.boylesLawTitle,
            formula: tg.boylesFormula,
            condition: tg.boylesCondition,
            explanation: tg.boylesExplanation,
          },
          {
            title: tg.charlesLawTitle,
            formula: tg.charlesFormula,
            condition: tg.charlesCondition,
            explanation: tg.charlesExplanation,
          },
          {
            title: tg.gayLussacsLawTitle,
            formula: tg.gayLussacsFormula,
            condition: tg.gayLussacsCondition,
            explanation: tg.gayLussacsExplanation,
          },
          {
            title: tg.daltonsLawTitle,
            formula: tg.daltonsFormula,
            condition: "",
            explanation: tg.daltonsExplanation,
          },
          {
            title: tg.combinedLawTitle,
            formula: tg.combinedFormula,
            condition: "",
            explanation: tg.combinedExplanation,
          },
        ].map((law) => (
          <Card key={law.title}>
            <p className="font-semibold text-foreground mb-1">{law.title}</p>
            <pre className="rounded-md bg-secondary print-formula px-3 py-2 font-mono text-base text-foreground mb-2 whitespace-pre-wrap">
              {law.formula}
            </pre>
            {law.condition && (
              <p className="text-sm italic text-muted-foreground print-muted mb-1">{law.condition}</p>
            )}
            <p className="text-muted-foreground print-muted leading-relaxed">{law.explanation}</p>
          </Card>
        ))}

        <Card>
          <p className="font-semibold mb-2">{tg.boylesApplicationsTitle}</p>
          <ul>
            <Term term={tg.boylesApp1} desc={tg.boylesApp1Desc} />
            <Term term={tg.boylesApp2} desc={tg.boylesApp2Desc} />
            <Term term={tg.boylesApp3} desc={tg.boylesApp3Desc} />
          </ul>
          <p className="mt-3 leading-relaxed text-muted-foreground print-muted">{tg.boylesWarning}</p>
        </Card>
      </section>

      {/* Henry's Law / Decompression theory */}
      <section className="mb-8 print-break-before">
        <SectionTitle>{th.title}</SectionTitle>
        <Card>
          <SubTitle>{th.basicsTitle}</SubTitle>
          <pre className="rounded-md bg-secondary print-formula px-3 py-2 font-mono text-base text-foreground mb-2">
            {th.formula}
          </pre>
          <p className="text-sm italic text-muted-foreground print-muted mb-2">{th.formulaExplanation}</p>
          <p className="text-muted-foreground print-muted leading-relaxed">{th.basicsDesc}</p>
        </Card>
        <Card>
          <SubTitle>{th.saturationTitle}</SubTitle>
          <p className="text-muted-foreground print-muted mb-3 leading-relaxed">{th.saturationDesc}</p>
          <ul>
            <Term term={th.fastTissues} desc={th.fastTissuesDesc} />
            <Term term={th.mediumTissues} desc={th.mediumTissuesDesc} />
            <Term term={th.slowTissues} desc={th.slowTissuesDesc} />
          </ul>
        </Card>
        <Card>
          <SubTitle>{th.dcsTitle}</SubTitle>
          <p className="text-muted-foreground print-muted mb-3 leading-relaxed">{th.dcsDesc}</p>
          <ul>
            <Term term={th.dcsPrevention} desc={th.dcsPreventionDesc} />
            <Term term={th.dcsAscentRate} desc={th.dcsAscentRateDesc} />
            <Term term={th.dcsSafetyStop} desc={th.dcsSafetyStopDesc} />
            <Term term={th.dcsHydration} desc={th.dcsHydrationDesc} />
          </ul>
        </Card>
        <Card>
          <SubTitle>{th.applicationsTitle}</SubTitle>
          <p className="text-muted-foreground print-muted mb-2 leading-relaxed">{th.applicationsDesc}</p>
          <BulletList items={[th.appNDL, th.appRepetitive, th.appFlying, th.appTechnical]} />
          <p className="leading-relaxed">
            <span className="font-semibold">{th.safetyNote}: </span>
            <span className="text-muted-foreground print-muted">{th.safetyNoteText}</span>
          </p>
        </Card>
      </section>

      {/* Buoyancy & Lift theory */}
      <section className="mb-8 print-break-before">
        <SectionTitle>{tl.title}</SectionTitle>
        <Card>
          <SubTitle>{tl.archimedesTitle}</SubTitle>
          <pre className="rounded-md bg-secondary print-formula px-3 py-2 font-mono text-base text-foreground mb-2">
            {tl.archimedesFormula}
          </pre>
          <p className="text-muted-foreground print-muted mb-3 leading-relaxed">{tl.archimedesDesc}</p>
          <p className="font-semibold mb-1">{tl.keyConcepts}</p>
          <BulletList items={[tl.fbForce, tl.density, tl.gravity, tl.volume]} />
        </Card>
        <Card>
          <SubTitle>{tl.liftOperationsTitle}</SubTitle>
          <p className="font-semibold mb-1">{tl.safetyGuidelines}</p>
          <BulletList
            items={[tl.safetyFactor, tl.ascentRate, tl.gasExpansion, tl.multipleBags, tl.buoyancyControl]}
          />
          <p className="font-semibold mb-1">{tl.waterDensityTitle}</p>
          <BulletList items={[tl.freshwaterDensity, tl.saltwaterDensity, tl.temperatureEffect]} />
        </Card>
        <Card>
          <SubTitle>{tl.practicalTitle}</SubTitle>
          <p className="font-semibold mb-1">{tl.underwaterRecovery}</p>
          <BulletList items={[tl.salvageOps, tl.archaeological, tl.equipmentRetrieval, tl.scientificSampling]} />
          <p className="font-semibold mb-1">{tl.buoyancyControlTitle}</p>
          <BulletList
            items={[tl.diverBuoyancy, tl.equipmentNeutralization, tl.underwaterConstruction, tl.marineBiology]}
          />
        </Card>
        <Card>
          <SubTitle>{tl.volumeCalculationsTitle}</SubTitle>
          <p className="font-semibold mb-1">{tl.commonShapes}</p>
          <BulletList items={[tl.rectangular, tl.cylindrical, tl.spherical, tl.irregular]} />
          <p className="font-semibold mb-1">{tl.unitConversions}</p>
          <BulletList items={[tl.cubicMeterToLiter, tl.literToKgFresh, tl.literToKgSalt]} />
        </Card>
      </section>

      {/* Disclaimer */}
      <section className="print-avoid-break">
        <div className="rounded-lg border border-border bg-secondary p-5 print-card">
          <p className="font-semibold mb-1">{e.disclaimer}</p>
          <p className="text-sm text-muted-foreground print-muted leading-relaxed">{e.disclaimerText}</p>
        </div>
      </section>
    </article>
  )
}
