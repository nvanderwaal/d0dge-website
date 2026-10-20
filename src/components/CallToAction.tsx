'use client'

import { useEffect, useState } from 'react'

import { Container } from '@/components/Container'
import { DotField } from '@/components/DotField'

// The daily seed comes from the UTC date, so the page shows it in UTC too.
function useUtcDate() {
  let [date, setDate] = useState<string | null>(null)

  useEffect(() => {
    let update = () => setDate(new Date().toISOString().slice(0, 10))
    update()
    let timer = window.setInterval(update, 60_000)
    return () => window.clearInterval(timer)
  }, [])

  return date
}

const rules = [
  [
    'Same run for everyone',
    'The seed comes from the UTC date, so every player faces the same hazards that day.',
  ],
  [
    'Three runs a day',
    'Enough to learn the run, not enough to memorise it. A run counts when it starts.',
  ],
  ['No continues', 'One life per attempt. Today’s best is all yours.'],
]

export function CallToAction() {
  let date = useUtcDate()

  return (
    <section
      id="daily"
      className="relative overflow-hidden border-y border-grid py-20 sm:py-28"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <DotField spacing={28} size={900} className="h-[900px] w-[900px]" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-xl sm:text-center">
          <p className="text-sm tracking-widest text-signal uppercase">
            Daily challenge
          </p>
          <p
            className="mt-6 font-dot text-5xl tracking-wider text-phosphor sm:text-6xl"
            aria-live="polite"
          >
            {date ?? ' '}
          </p>
          <h2 className="mt-6 text-2xl font-semibold text-phosphor">
            One seed. Every player. Every day.
          </h2>
          <p className="mt-4 text-lg text-signal">
            Next to the endless Normal mode, a new daily run waits each day.
            Same stages, same rules, and the same hazards for everyone.
          </p>
        </div>
        <dl className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-px border border-grid bg-grid sm:grid-cols-3">
          {rules.map(([title, text]) => (
            <div key={title} className="bg-void p-6">
              <dt className="font-dot text-lg tracking-wider text-phosphor">
                {title}
              </dt>
              <dd className="mt-2 text-sm text-signal">{text}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
