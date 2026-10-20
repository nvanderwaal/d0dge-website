'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useDebouncedCallback } from 'use-debounce'

import { CircleBackground } from '@/components/CircleBackground'
import { Container } from '@/components/Container'
import { GridDemo, type GridDemoProps } from '@/components/GridDemo'
import { PhoneFrame } from '@/components/PhoneFrame'

function DragIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <path
        d="M16 5 27 16 16 27 5 16Z"
        className="stroke-phosphor"
        strokeWidth={2}
      />
      <circle cx={16} cy={16} r={2} className="fill-signal" />
    </svg>
  )
}

function WarningIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={5 + col * 7.33}
            cy={5 + row * 7.33}
            r={col === 0 ? 2.6 - row * 0.4 : 1.6}
            className={col === 0 ? 'fill-signal' : 'fill-grid'}
          />
        )),
      )}
    </svg>
  )
}

function NearMissIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <path
        d="M11 9 18 16 11 23 4 16Z"
        className="stroke-phosphor"
        strokeWidth={2}
      />
      <circle
        cx={24}
        cy={10}
        r={4}
        className="stroke-phosphor"
        strokeWidth={2}
      />
      <circle cx={27} cy={24} r={1.5} className="fill-grid" />
      <circle cx={19} cy={27} r={1.5} className="fill-grid" />
    </svg>
  )
}

const features: Array<{
  name: string
  description: string
  icon: React.ComponentType<React.ComponentPropsWithoutRef<'svg'>>
  demo: GridDemoProps
}> = [
  {
    name: 'Drag anywhere',
    description:
      'The glyph moves with your finger like a trackpad, from wherever you touch. Your thumb never covers it, it never jumps, and either hand works. Lift your finger and the glyph stops where it is.',
    icon: DragIcon,
    demo: { showFinger: true, pattern: 'wave' },
  },
  {
    name: 'The grid warns you',
    description:
      'Every hazard is announced. Dots light up and pulse where it will enter, a beat before it arrives, so a sharp eye always gets a fair chance. The grid never hurts you; it only helps.',
    icon: WarningIcon,
    demo: { pattern: 'twinkle', spawnInterval: 0.6 },
  },
  {
    name: 'Near misses pay',
    description:
      'Score climbs every second you survive, and every hazard you graze adds a bonus. Cut it close and the dots around you scatter. Play it safe or play it bold: the best scores take risks.',
    icon: NearMissIcon,
    demo: { pattern: 'ripple', daring: true, spawnInterval: 0.55 },
  },
]

function usePrevious<T>(value: T) {
  let ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  // eslint-disable-next-line react-hooks/refs
  return ref.current
}

function FeaturesDesktop() {
  let [selectedIndex, setSelectedIndex] = useState(0)
  let prevIndex = usePrevious(selectedIndex)
  let isForwards = prevIndex === undefined ? true : selectedIndex > prevIndex

  let onChange = useDebouncedCallback(
    (selectedIndex) => {
      setSelectedIndex(selectedIndex)
    },
    100,
    { leading: true },
  )

  return (
    <TabGroup
      className="grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24"
      selectedIndex={selectedIndex}
      onChange={onChange}
      vertical
    >
      <TabList className="relative z-10 order-last col-span-6 space-y-6">
        {features.map((feature, featureIndex) => (
          <div
            key={feature.name}
            className="relative border border-transparent transition-colors hover:border-grid"
          >
            {featureIndex === selectedIndex && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 border border-signal"
              />
            )}
            <div className="relative z-10 p-8">
              <feature.icon className="h-8 w-8" />
              <h3 className="mt-6 font-dot text-xl tracking-wider text-phosphor">
                <Tab className="text-left data-selected:not-data-focus:outline-hidden">
                  <span className="absolute inset-0" />
                  {feature.name}
                </Tab>
              </h3>
              <p className="mt-2 text-sm text-signal">{feature.description}</p>
            </div>
          </div>
        ))}
      </TabList>
      <div className="relative col-span-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <CircleBackground className="animate-spin-slower" />
        </div>
        <PhoneFrame className="z-10 mx-auto w-full max-w-[366px]">
          <TabPanels as={Fragment}>
            <AnimatePresence initial={false} mode="popLayout">
              {features.map((feature, featureIndex) =>
                selectedIndex === featureIndex ? (
                  <TabPanel
                    static
                    as={motion.div}
                    key={feature.name}
                    initial={{ y: isForwards ? '100%' : '-100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: isForwards ? '-100%' : '100%' }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="col-start-1 row-start-1 flex focus:outline-offset-32 data-selected:not-data-focus:outline-hidden"
                  >
                    <GridDemo {...feature.demo} />
                  </TabPanel>
                ) : null,
              )}
            </AnimatePresence>
          </TabPanels>
        </PhoneFrame>
      </div>
    </TabGroup>
  )
}

function FeaturesMobile() {
  let [activeIndex, setActiveIndex] = useState(0)
  let slideContainerRef = useRef<React.ElementRef<'div'>>(null)
  let slideRefs = useRef<Array<React.ElementRef<'div'>>>([])

  useEffect(() => {
    let observer = new window.IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLDivElement) {
            setActiveIndex(slideRefs.current.indexOf(entry.target))
            break
          }
        }
      },
      {
        root: slideContainerRef.current,
        threshold: 0.6,
      },
    )

    for (let slide of slideRefs.current) {
      if (slide) {
        observer.observe(slide)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [slideContainerRef, slideRefs])

  return (
    <>
      <div
        ref={slideContainerRef}
        className="-mb-4 flex snap-x snap-mandatory scrollbar-none -space-x-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 sm:-space-x-6 [&::-webkit-scrollbar]:hidden"
      >
        {features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            ref={(ref) => {
              if (ref) {
                slideRefs.current[featureIndex] = ref
              }
            }}
            className="w-full flex-none snap-center px-4 sm:px-6"
          >
            <div className="relative transform overflow-hidden border border-grid px-5 py-6">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <CircleBackground
                  className={featureIndex % 2 === 1 ? 'rotate-180' : undefined}
                />
              </div>
              <PhoneFrame className="relative mx-auto w-full max-w-[366px]">
                <GridDemo {...feature.demo} />
              </PhoneFrame>
              <div className="absolute inset-x-0 bottom-0 border-t border-grid bg-void/95 p-6 sm:p-10">
                <feature.icon className="h-8 w-8" />
                <h3 className="mt-6 font-dot text-lg tracking-wider text-phosphor">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-signal">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-3">
        {features.map((_, featureIndex) => (
          <button
            type="button"
            key={featureIndex}
            className={clsx(
              'relative h-1.5 w-1.5 rounded-full',
              featureIndex === activeIndex ? 'bg-phosphor' : 'bg-grid',
            )}
            aria-label={`Go to slide ${featureIndex + 1}`}
            onClick={() => {
              slideRefs.current[featureIndex].scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
              })
            }}
          >
            <span className="absolute -inset-x-1.5 -inset-y-3" />
          </button>
        ))}
      </div>
    </>
  )
}

export function PrimaryFeatures() {
  return (
    <section
      id="gameplay"
      aria-label="How d0dge plays"
      className="border-y border-grid py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
          <h2 className="font-dot text-4xl text-phosphor">
            Learn it in seconds. Master it for weeks.
          </h2>
          <p className="mt-4 text-lg text-signal">
            One rule: don&apos;t get hit. Every run is fair by design. Hazards
            never spawn on top of you, gaps are always wide enough to slip
            through, and nothing reaches you without warning.
          </p>
        </div>
      </Container>
      <div className="mt-16 md:hidden">
        <FeaturesMobile />
      </div>
      <Container className="hidden md:mt-20 md:block">
        <FeaturesDesktop />
      </Container>
    </section>
  )
}
