import clsx from 'clsx'

// The app icon (game/icon.svg): twelve grid dots and the hollow diamond. The
// four dots the diamond's corners point at are missing, pushed away by a near miss.
const iconDots = [
  [192, 192],
  [352, 192],
  [672, 192],
  [832, 192],
  [192, 352],
  [832, 352],
  [192, 672],
  [832, 672],
  [192, 832],
  [352, 832],
  [672, 832],
  [832, 832],
]

export function Logomark({
  withBackground = false,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & { withBackground?: boolean }) {
  return (
    <svg viewBox="0 0 1024 1024" aria-hidden="true" {...props}>
      {withBackground && (
        <rect width="1024" height="1024" className="fill-void" />
      )}
      <g className="fill-grid">
        {iconDots.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="18" />
        ))}
      </g>
      <path
        d="M512 300 L724 512 L512 724 L300 512 Z"
        fill="none"
        className="stroke-phosphor"
        strokeWidth="44"
      />
    </svg>
  )
}

export function Logo({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={clsx('flex items-center gap-3', className)} {...props}>
      <Logomark className="h-10 w-10 flex-none" />
      <span className="font-dot text-2xl tracking-wider text-phosphor">
        d0dge
      </span>
    </div>
  )
}
