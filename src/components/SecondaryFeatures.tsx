import { Container } from '@/components/Container'

type Brightness = (x: number, y: number) => number

// Each stage's grid pattern (GDD §11), drawn as a still 7 × 7 patch of dots.
const stages: Array<{
  number: string
  name: string
  focus: string
  length: string
  pattern: Brightness
}> = [
  {
    number: '1',
    name: 'Initiation',
    focus:
      'Learn to move. A steady stream of hazards crossing in straight lines.',
    length: '30 s',
    pattern: (x, y) => 0.5 + 0.5 * Math.sin(x * 1.1 + y * 0.35),
  },
  {
    number: '2',
    name: 'Pulse',
    focus:
      'Ripples spread across the grid. Pairs arrive side by side, with a gap to slip through.',
    length: '35 s',
    pattern: (x, y) => 0.5 + 0.5 * Math.sin(Math.hypot(x - 3, y - 3) * 1.6),
  },
  {
    number: '3',
    name: 'Drift',
    focus:
      'The grid twinkles. Quickfire shots streak straight across, faster than anything before.',
    length: '35 s',
    pattern: (x, y) => {
      let seed = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
      return (seed - Math.floor(seed)) ** 2
    },
  },
  {
    number: '4',
    name: 'Distortion',
    focus:
      'Interfering waves. Crossfire: two hazards meet at a marked crossing at the same moment.',
    length: '40 s',
    pattern: (x, y) =>
      (Math.sin(x * 1.2) + Math.sin(y * 1.2 + x * 0.4) + 2) / 4,
  },
  {
    number: '5',
    name: 'Vortex',
    focus:
      'Spiral arms turn around the arena. Curvers swing through the field in a wide arc.',
    length: '40 s',
    pattern: (x, y) =>
      0.5 +
      0.5 *
        Math.sin(Math.atan2(y - 3, x - 3) * 3 + Math.hypot(x - 3, y - 3) * 1.2),
  },
  {
    number: '6',
    name: 'Fracture',
    focus:
      'Bursts drift in, stop, signal with a ring of dots, and split into six fragments.',
    length: '45 s',
    pattern: (x, y) => {
      let seed = Math.sin(x * 4.1 + y * 9.7) * 1000
      return (
        (0.5 + 0.5 * Math.sin(x * 1.1 + y * 0.35)) * 0.6 +
        (seed - Math.floor(seed)) * 0.4
      )
    },
  },
  {
    number: '7',
    name: 'Overload',
    focus:
      'The final stage never ends. Every hazard returns in a shuffled order, faster and denser, until you break.',
    length: 'Endless',
    pattern: (x, y) =>
      (0.5 +
        0.5 *
          Math.sin(Math.atan2(y - 3, x - 3) * 3 + Math.hypot(x - 3, y - 3))) *
        0.5 +
      ((Math.sin(x * 1.2) + Math.sin(y * 1.2) + 2) / 4) * 0.5,
  },
]

function PatternIcon({ pattern }: { pattern: Brightness }) {
  return (
    <svg viewBox="0 0 70 70" aria-hidden="true" className="h-14 w-14">
      {Array.from({ length: 49 }, (_, i) => {
        let x = i % 7
        let y = Math.floor(i / 7)
        let b = Math.min(1, Math.max(0, pattern(x, y)))
        return (
          <circle
            key={i}
            cx={5 + x * 10}
            cy={5 + y * 10}
            r={1.6 + b * 1.4}
            className={b > 0.75 ? 'fill-signal' : 'fill-grid'}
            style={{ opacity: 0.45 + b * 0.55 }}
          />
        )
      })}
    </svg>
  )
}

// Hazard glyphs (GDD §7): told apart by shape and motion, never by colour alone.
const hazards: Array<{
  name: string
  description: string
  glyph: React.ReactNode
}> = [
  {
    name: 'Single',
    description: 'An empty ring that crosses the arena in a straight line.',
    glyph: <circle cx={20} cy={20} r={9} />,
  },
  {
    name: 'Pair',
    description: 'Two rings side by side. Thread the gap or go around.',
    glyph: (
      <>
        <circle cx={20} cy={20} r={9} />
        <circle cx={20} cy={20} r={2} className="fill-phosphor stroke-none" />
      </>
    ),
  },
  {
    name: 'Quickfire',
    description:
      'A fast triangle, pointing where it flies. Straight across, no tilt.',
    glyph: (
      <>
        <circle cx={20} cy={20} r={9} className="opacity-25" />
        <path d="M30 20 15 28.7V11.3Z" />
      </>
    ),
  },
  {
    name: 'Crossfire',
    description:
      'Two triangles on a collision course. A + on the grid marks where they meet.',
    glyph: (
      <>
        <path d="M30 14 17 21.5V6.5Z" />
        <path d="M14 30 6.5 17h15Z" />
        <path d="M27 27h8M31 23v8" className="stroke-signal" />
      </>
    ),
  },
  {
    name: 'Curver',
    description:
      'Enters tilted and bends through a clear C before flying straight out.',
    glyph: (
      <>
        <circle cx={20} cy={20} r={9} />
        <path d="M20 14a6 6 0 0 1 0 12" />
      </>
    ),
  },
  {
    name: 'Burst',
    description:
      'A pulsing hexagon. It stops, signals, then splits into fragments.',
    glyph: <path d="M20 9.5 29.1 14.75v10.5L20 30.5l-9.1-5.25v-10.5Z" />,
  },
]

export function SecondaryFeatures() {
  return (
    <section
      id="stages"
      aria-label="Stages and hazards"
      className="py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="font-dot text-4xl text-phosphor">
            Seven stages. One way out.
          </h2>
          <p className="mt-4 text-lg text-signal">
            The longer you survive, the faster and denser it gets. Each stage
            brings its own grid pattern and a new twist, until Overload: the
            final stage, where the run ends on skill alone.
          </p>
        </div>
        <ol
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-px border border-grid bg-grid text-sm sm:mt-20 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4"
        >
          {stages.map((stage) => (
            <li
              key={stage.name}
              className={
                stage.number === '7'
                  ? 'bg-void p-8 sm:col-span-2 lg:col-span-1'
                  : 'bg-void p-8'
              }
            >
              <PatternIcon pattern={stage.pattern} />
              <p className="mt-6 text-xs tracking-widest text-signal uppercase">
                Stage {stage.number} · {stage.length}
              </p>
              <h3 className="mt-2 font-dot text-xl tracking-wider text-phosphor">
                {stage.name}
              </h3>
              <p className="mt-2 text-signal">{stage.focus}</p>
            </li>
          ))}
          <li className="hidden bg-void p-8 lg:block" aria-hidden="true" />
        </ol>

        <div className="mx-auto mt-24 max-w-2xl sm:text-center">
          <h3 className="font-dot text-3xl text-phosphor">Know your hazards</h3>
          <p className="mt-4 text-signal">
            Every hazard reads by its shape and the way it moves, in every
            palette.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:grid-cols-2 lg:max-w-none lg:grid-cols-3"
        >
          {hazards.map((hazard) => (
            <li key={hazard.name} className="flex gap-5 border border-grid p-6">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                aria-hidden="true"
                className="h-10 w-10 flex-none stroke-phosphor"
                strokeWidth={2}
              >
                {hazard.glyph}
              </svg>
              <div>
                <h4 className="font-dot text-lg tracking-wider text-phosphor">
                  {hazard.name}
                </h4>
                <p className="mt-1 text-signal">{hazard.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
