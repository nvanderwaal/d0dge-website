import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { DotField } from '@/components/DotField'
import { Layout } from '@/components/Layout'

export default function NotFound() {
  return (
    <Layout>
      <Container className="relative isolate flex h-full flex-col items-center justify-center py-20 text-center sm:py-32">
        <DotField className="absolute top-1/2 left-1/2 -z-10 h-[1088px] w-[1088px] -translate-x-1/2 -translate-y-1/2 mask-[linear-gradient(to_bottom,white_20%,transparent_75%)]" />
        <p className="font-dot text-sm tracking-[0.3em] text-signal">404</p>
        <h1 className="mt-2 font-dot text-4xl text-phosphor">Game over</h1>
        <p className="mt-2 text-lg text-signal">
          This page dodged you. It doesn&apos;t exist.
        </p>
        <Button href="/" variant="outline" className="mt-8">
          Retry
        </Button>
      </Container>
    </Layout>
  )
}
