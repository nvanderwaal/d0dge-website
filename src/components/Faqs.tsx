import Link from 'next/link'

import { Container } from '@/components/Container'
import { closedTestUrl } from '@/app/site'

const faqs = [
  [
    {
      question: 'When can I play?',
      answer:
        'd0dge is in development. It will launch on iOS and Android at the same time, after a TestFlight beta and a Google Play closed test.',
    },
    {
      question: 'How do I join the Android test?',
      answer: (
        <>
          Join the{' '}
          <a
            href={closedTestUrl}
            className="text-phosphor underline decoration-grid underline-offset-4 hover:decoration-phosphor"
          >
            d0dge tester group
          </a>{' '}
          on Google Groups with the Google account you use on your phone. The
          pinned post there walks you through getting the game from Google Play.
        </>
      ),
    },
    {
      question: 'Which devices are supported?',
      answer:
        'iPhone and Android phones running Android 13 or later. Steam on Windows and Linux, with Steam Deck support, follows after the mobile release.',
    },
    {
      question: 'How do the controls work?',
      answer:
        'Drag anywhere on the screen and the glyph follows your finger’s movement, like a trackpad. Lift your finger and it stops. On desktop you’ll use the keyboard, the mouse or a controller.',
    },
  ],
  [
    {
      question: 'Are there ads?',
      answer:
        'Only if you choose to watch one: to continue a run, or for a once-a-day glyphy bonus in the shop. There are no banners, no interstitials and never an ad between you and RETRY.',
    },
    {
      question: 'Can I pay to win?',
      answer:
        'No. Purchases are cosmetic. Every glyph has the same hitbox, and a continued run doesn’t count toward your personal best.',
    },
    {
      question: 'Does it need an internet connection?',
      answer:
        'No. Runs, the daily challenge, earning and spending glyphies all work offline. Only ads and purchases need a connection.',
    },
  ],
  [
    {
      question: 'Is d0dge accessible?',
      answer:
        'Hazards are told apart by shape, never by colour alone. There’s a reduced-motion setting, no full-screen flashes, adjustable drag sensitivity, and separate toggles for sound, music and haptics.',
    },
    {
      question: 'Who is it for?',
      answer: 'd0dge is rated for players aged 13 and older, in both stores.',
    },
    {
      question: 'What data do you collect?',
      answer: (
        <>
          Your progress lives on your device. Read the{' '}
          <Link
            href="/privacy/"
            className="text-phosphor underline decoration-grid underline-offset-4 hover:decoration-phosphor"
          >
            privacy policy
          </Link>{' '}
          for the details on ads and purchases.
        </>
      ),
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="border-t border-grid py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 id="faq-title" className="font-dot text-4xl text-phosphor">
            Frequently asked questions
          </h2>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg/6 font-semibold text-phosphor">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-signal">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
