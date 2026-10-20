'use client'

import { useSyncExternalStore } from 'react'
import clsx from 'clsx'

import { Container } from '@/components/Container'

// The shop's palettes (D0dge.Core/Presentation/Palettes.cs). Picking one here
// recolours the site through the same four roles the game uses.
const palettes = [
  {
    id: 'mono',
    name: 'Mono',
    price: 'Free',
    colors: ['#080808', '#f5f5f0', '#444444', '#bdbdbd'],
  },
  {
    id: 'amber',
    name: 'Amber',
    price: '200',
    colors: ['#0a0703', '#ffb547', '#45311a', '#d9a35a'],
  },
  {
    id: 'terminal',
    name: 'Terminal',
    price: '300',
    colors: ['#040805', '#7dffa0', '#22472d', '#63c27e'],
  },
  {
    id: 'rose',
    name: 'Rose',
    price: '400',
    colors: ['#0a0507', '#ffb8cb', '#4a3038', '#d495a7'],
  },
  {
    id: 'ice',
    name: 'Ice',
    price: '500',
    colors: ['#04070c', '#a6d4ff', '#2d3b4e', '#7fa6d6'],
  },
]

const glyphs: Array<{ name: string; price: string; shape: React.ReactNode }> = [
  {
    name: 'Diamond',
    price: 'Free',
    shape: <path d="M20 8 32 20 20 32 8 20Z" />,
  },
  {
    name: 'Star',
    price: '150',
    shape: <path d="M20 8 23 17 32 20 23 23 20 32 17 23 8 20 17 17Z" />,
  },
  {
    name: 'Nest',
    price: '250',
    shape: (
      <>
        <path d="M20 8 32 20 20 32 8 20Z" />
        <path d="M20 14 26 20 20 26 14 20Z" />
      </>
    ),
  },
  {
    name: 'Twin',
    price: '300',
    shape: (
      <g className="origin-center animate-spin-slow [animation-duration:3s]">
        <path d="M20 20c0-5 5-9 10-6M20 20c0 5-5 9-10 6" />
      </g>
    ),
  },
  {
    name: 'Whirl',
    price: '500',
    shape: (
      <g className="origin-center animate-spin-slow [animation-duration:3s]">
        <path d="M20 20c0-5 5-9 10-6M20 20c0 5-5 9-10 6M20 20c5 0 9 5 6 10M20 20c-5 0-9-5-6-10" />
      </g>
    ),
  },
  {
    name: 'Spark',
    price: 'Supporters',
    shape: (
      <g className="fill-phosphor stroke-none">
        <circle cx={20} cy={10} r={2.5} />
        <circle cx={30} cy={20} r={2.5} />
        <circle cx={20} cy={30} r={2.5} />
        <circle cx={10} cy={20} r={2.5} />
      </g>
    ),
  },
]

const bundles = [
  ['200', '€0.99'],
  ['700', '€2.99'],
  ['1,300', '€4.99'],
]

function CheckIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 6 18 12 12 18 6 12Z"
        fill="none"
        strokeWidth={2}
        className="stroke-phosphor"
      />
    </svg>
  )
}

function subscribeToPalette(onChange: () => void) {
  let observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-palette'],
  })
  return () => observer.disconnect()
}

function usePalette() {
  return useSyncExternalStore(
    subscribeToPalette,
    () => document.documentElement.getAttribute('data-palette') ?? 'mono',
    () => 'mono',
  )
}

function PaletteSwitcher() {
  let active = usePalette()

  function choose(id: string) {
    if (id === 'mono') {
      document.documentElement.removeAttribute('data-palette')
    } else {
      document.documentElement.setAttribute('data-palette', id)
    }
    try {
      localStorage.setItem('d0dge-palette', id)
    } catch {
      // Storage can be unavailable; the palette then lasts until reload.
    }
  }

  return (
    <div className="grid grid-cols-1 gap-px border border-grid bg-grid sm:grid-cols-5">
      {palettes.map((palette) => (
        <button
          key={palette.id}
          type="button"
          onClick={() => choose(palette.id)}
          aria-pressed={active === palette.id}
          className={clsx(
            'group flex items-center gap-4 bg-void p-4 text-left outline-offset-[-2px] transition-colors sm:flex-col sm:items-start',
            active === palette.id && 'outline-2 outline-phosphor',
          )}
        >
          <span className="flex flex-none">
            {palette.colors.map((color) => (
              <span
                key={color}
                className="h-6 w-6 border border-grid"
                style={{ backgroundColor: color }}
              />
            ))}
          </span>
          <span>
            <span className="block font-dot text-lg tracking-wider text-phosphor">
              {palette.name}
            </span>
            <span className="text-xs tracking-widest text-signal uppercase">
              {palette.price === 'Free'
                ? 'Default'
                : `${palette.price} glyphies`}
            </span>
          </span>
        </button>
      ))}
    </div>
  )
}

export function Pricing() {
  return (
    <section id="shop" aria-labelledby="shop-title" className="py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 id="shop-title" className="font-dot text-4xl text-phosphor">
            Free to play. Fair by design.
          </h2>
          <p className="mt-4 text-lg text-signal">
            Nothing you buy changes difficulty, hitboxes or score. Ads are only
            ever your choice, never forced. Earn glyphies from every run and
            spend them on looks.
          </p>
        </div>

        <div className="mt-16">
          <h3 className="text-sm tracking-widest text-signal uppercase">
            Palettes · try one on this page
          </h3>
          <div className="mt-4">
            <PaletteSwitcher />
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-sm tracking-widest text-signal uppercase">
            Glyphs
          </h3>
          <ul
            role="list"
            className="mt-4 grid grid-cols-2 gap-px border border-grid bg-grid sm:grid-cols-3 lg:grid-cols-6"
          >
            {glyphs.map((glyph) => (
              <li
                key={glyph.name}
                className="flex flex-col items-center bg-void p-6"
              >
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  aria-hidden="true"
                  className="h-12 w-12 stroke-phosphor"
                  strokeWidth={2.4}
                >
                  {glyph.shape}
                </svg>
                <p className="mt-4 font-dot text-lg tracking-wider text-phosphor">
                  {glyph.name}
                </p>
                <p className="text-xs tracking-widest text-signal uppercase">
                  {glyph.price === 'Free' || glyph.price === 'Supporters'
                    ? glyph.price
                    : `${glyph.price} glyphies`}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-signal">
            Every glyph has the same hitbox.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <section className="flex flex-col border border-grid p-8">
            <h3 className="font-dot text-2xl tracking-wider text-phosphor">
              The game
            </h3>
            <p className="mt-4 font-dot text-4xl text-phosphor">Free</p>
            <ul role="list" className="mt-8 space-y-3 text-sm text-signal">
              {[
                'Normal mode and the daily challenge',
                'Glyphies from every run you play',
                'Continue once per Normal run, with an ad or 30 glyphies',
                'An optional ad bonus once a day in the shop',
                'Plays fully offline',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckIcon className="h-6 w-6 flex-none" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="flex flex-col border border-phosphor p-8">
            <h3 className="font-dot text-2xl tracking-wider text-phosphor">
              Supporter pack
            </h3>
            <p className="mt-4 font-dot text-4xl text-phosphor">€2.99</p>
            <p className="mt-2 text-sm text-signal">
              One-time purchase, restorable.
            </p>
            <ul role="list" className="mt-8 space-y-3 text-sm text-signal">
              {[
                'The exclusive Spark glyph',
                'The rainbow grid, over any palette',
                '300 glyphies',
                'Support an independent game',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckIcon className="h-6 w-6 flex-none" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="flex flex-col border border-grid p-8">
            <h3 className="font-dot text-2xl tracking-wider text-phosphor">
              Glyphy bundles
            </h3>
            <p className="mt-4 text-sm text-signal">
              For when you want a look right now.
            </p>
            <dl className="mt-8 divide-y divide-grid border-y border-grid text-sm">
              {bundles.map(([amount, price]) => (
                <div key={amount} className="flex justify-between py-3">
                  <dt className="font-dot text-lg text-phosphor">
                    {amount} glyphies
                  </dt>
                  <dd className="text-signal">{price}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
        <p className="mt-6 text-xs text-signal">
          Prices before launch; they may change.
        </p>
      </Container>
    </section>
  )
}
