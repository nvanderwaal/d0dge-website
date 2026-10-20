import clsx from 'clsx'

function AppleIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M16.37 12.62a4.09 4.09 0 0 1 1.95-3.43 4.19 4.19 0 0 0-3.3-1.79c-1.39-.14-2.73.83-3.44.83-.72 0-1.81-.81-2.98-.79a4.39 4.39 0 0 0-3.7 2.25c-1.6 2.77-.4 6.84 1.13 9.08.77 1.1 1.66 2.32 2.83 2.27 1.15-.05 1.58-.73 2.96-.73 1.37 0 1.77.73 2.97.7 1.23-.02 2-1.1 2.75-2.2a9.06 9.06 0 0 0 1.25-2.56 3.95 3.95 0 0 1-2.42-3.63ZM14.1 5.93a4.03 4.03 0 0 0 .92-2.89 4.1 4.1 0 0 0-2.65 1.37 3.83 3.83 0 0 0-.95 2.78 3.39 3.39 0 0 0 2.68-1.26Z"
      />
    </svg>
  )
}

function PlayIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M4.3 2.4a1 1 0 0 0-.3.73v17.74a1 1 0 0 0 .3.73L14.1 12 4.3 2.4Zm10.86 10.65 2.6 2.6-11.2 6.37 8.6-8.97Zm0-2.1L6.56 1.98l11.2 6.37-2.6 2.6Zm3.95 4.03-2.88-2.88 2.88-2.98 3.07 1.75c.88.5.88 1.77 0 2.27l-3.07 1.84Z"
      />
    </svg>
  )
}

const stores = {
  apple: { label: 'App Store', icon: AppleIcon },
  google: { label: 'Google Play', icon: PlayIcon },
}

// d0dge isn't in the stores yet. Once it is, give each badge its store URL.
export function AppStoreLink({
  store,
  href,
  className,
}: {
  store: keyof typeof stores
  href?: string
  className?: string
}) {
  let { label, icon: Icon } = stores[store]
  let content = (
    <>
      <Icon className="h-6 w-6 flex-none" />
      <span className="flex flex-col text-left leading-tight">
        <span className="text-[0.625rem] tracking-widest text-signal uppercase">
          {href ? 'Get it on' : 'Coming soon to'}
        </span>
        <span className="text-sm font-semibold">{label}</span>
      </span>
    </>
  )
  let styles = clsx(
    'inline-flex items-center gap-3 border border-signal px-4 py-2 text-phosphor transition-colors',
    href && 'hover:border-phosphor',
    className,
  )

  return href ? (
    <a href={href} className={styles}>
      {content}
    </a>
  ) : (
    <div className={styles} aria-label={`Coming soon to the ${label}`}>
      {content}
    </div>
  )
}
