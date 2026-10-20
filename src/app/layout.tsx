import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import clsx from 'clsx'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Doto by Óliver Lalan, SIL Open Font License 1.1 (src/fonts/Doto-OFL.txt).
const doto = localFont({
  src: '../fonts/Doto-VF.ttf',
  display: 'swap',
  variable: '--font-doto',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: {
    template: '%s - d0dge',
    default: 'd0dge: glyph survival',
  },
  description:
    'A minimalist monochrome survival arcade game where a single glyph dances through an evolving field of dots, and every stage tests how long you can stay one step ahead.',
}

// Restores the palette a visitor picked before the first paint.
const restorePalette = `try{var p=localStorage.getItem('d0dge-palette');if(p&&p!=='mono')document.documentElement.dataset.palette=p}catch(e){}`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx('bg-void antialiased', inter.variable, doto.variable)}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: restorePalette }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
