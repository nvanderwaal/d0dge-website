import { AppStoreLink } from '@/components/AppStoreLink'
import { Button } from '@/components/Button'
import { CircleBackground } from '@/components/CircleBackground'
import { Container } from '@/components/Container'
import { DotField } from '@/components/DotField'
import { GridDemo } from '@/components/GridDemo'
import { PhoneFrame } from '@/components/PhoneFrame'

const facts = [
  ['1', 'finger'],
  ['7', 'stages'],
  ['3', 'daily runs'],
  ['0', 'forced ads'],
]

export function Hero() {
  return (
    <div
      id="download"
      className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36"
    >
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <p className="font-dot text-sm tracking-[0.3em] text-signal uppercase">
              d0dge: glyph survival
            </p>
            <h1 className="mt-4 font-dot text-5xl text-phosphor sm:text-6xl">
              Stay one step ahead.
            </h1>
            <p className="mt-6 text-lg text-signal">
              A minimalist monochrome survival arcade game. One glyph, one
              finger, and a living field of dots that warns you of what is
              coming. Survive the stages, chase your best, and see how long you
              last once Overload begins.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-4 gap-y-4">
              <AppStoreLink store="apple" />
              <AppStoreLink store="google" />
            </div>
            <div className="mt-6">
              <Button href="/#gameplay" variant="outline">
                How it plays
              </Button>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <DotField className="absolute top-4 left-1/2 h-[1088px] w-[1088px] -translate-x-1/3 mask-[linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
            <div className="absolute top-1/3 left-1/2 hidden -translate-x-1/2 sm:block lg:top-1/2 lg:-translate-y-1/2">
              <CircleBackground className="animate-spin-slower" />
            </div>
            <div className="-mx-4 h-[448px] mask-[linear-gradient(to_bottom,white_60%,transparent)] px-9 sm:mx-0 lg:absolute lg:-inset-x-10 lg:-top-10 lg:-bottom-20 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32">
              <PhoneFrame className="mx-auto max-w-[366px]" priority>
                <GridDemo stages />
              </PhoneFrame>
            </div>
          </div>
          <div className="relative -mt-4 lg:col-span-7 lg:mt-0 xl:col-span-6">
            <p className="text-center text-sm tracking-widest text-signal uppercase lg:text-left">
              At a glance
            </p>
            <ul
              role="list"
              className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-px border border-grid bg-grid sm:grid-cols-4 lg:mx-0"
            >
              {facts.map(([value, label]) => (
                <li key={label} className="bg-void px-4 py-5 text-center">
                  <p className="font-dot text-4xl text-phosphor">{value}</p>
                  <p className="mt-2 text-xs tracking-widest text-signal uppercase">
                    {label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  )
}
