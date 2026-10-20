import Link from 'next/link'

import { Container } from '@/components/Container'
import { Logomark } from '@/components/Logo'
import { NavLinks } from '@/components/NavLinks'

export function Footer() {
  return (
    <footer className="border-t border-grid">
      <Container>
        <div className="flex flex-col items-start justify-between gap-y-12 pt-16 pb-6 lg:flex-row lg:items-center lg:py-16">
          <div>
            <div className="flex items-center">
              <Logomark className="h-10 w-10 flex-none" />
              <div className="ml-4">
                <p className="font-dot text-xl tracking-wider">d0dge</p>
                <p className="mt-1 text-sm text-signal">glyph survival</p>
              </div>
            </div>
            <nav className="mt-11 flex flex-wrap gap-8">
              <NavLinks />
            </nav>
          </div>
          <div className="text-sm text-signal lg:max-w-xs lg:text-right">
            <p>
              Free on iOS and Android. Coming to Steam on Windows, Linux and
              Steam Deck after the mobile release.
            </p>
            <p className="mt-4">
              <Link
                href="/privacy/"
                className="tracking-widest text-phosphor uppercase underline decoration-grid underline-offset-4 hover:decoration-phosphor"
              >
                Privacy policy
              </Link>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 border-t border-grid pt-8 pb-12 text-xs text-signal md:flex-row md:justify-between md:pt-6">
          <p>&copy; {new Date().getFullYear()} d0dge. All rights reserved.</p>
          <p>
            Set in{' '}
            <a
              href="https://github.com/oliverlalan/Doto"
              className="underline decoration-grid underline-offset-4 hover:decoration-phosphor"
            >
              Doto
            </a>{' '}
            by Óliver Lalan, SIL Open Font License 1.1.
          </p>
        </div>
      </Container>
    </footer>
  )
}
