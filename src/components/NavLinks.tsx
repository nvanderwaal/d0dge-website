'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

export const navigation = [
  ['Gameplay', '/#gameplay'],
  ['Stages', '/#stages'],
  ['Daily', '/#daily'],
  ['Shop', '/#shop'],
  ['FAQ', '/#faq'],
]

export function NavLinks() {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  let timeoutRef = useRef<number | null>(null)

  return navigation.map(([label, href], index) => (
    <Link
      key={label}
      href={href}
      className="relative -mx-3 -my-2 px-3 py-2 text-sm tracking-widest text-signal uppercase transition-colors delay-150 hover:text-phosphor hover:delay-0"
      onMouseEnter={() => {
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current)
        }
        setHoveredIndex(index)
      }}
      onMouseLeave={() => {
        timeoutRef.current = window.setTimeout(() => {
          setHoveredIndex(null)
        }, 200)
      }}
    >
      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.span
            className="absolute inset-0 border border-grid"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15 },
            }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10">{label}</span>
    </Link>
  ))
}
