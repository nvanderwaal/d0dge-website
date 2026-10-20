// A ring of grid dots, the game's take on the template's spinning circle.
export function CircleBackground({
  dots = 72,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & { dots?: number }) {
  return (
    <svg
      viewBox="0 0 558 558"
      width="558"
      height="558"
      aria-hidden="true"
      {...props}
    >
      {Array.from({ length: dots }, (_, i) => {
        let angle = (i / dots) * Math.PI * 2
        // Brightest at the top, fading around the ring like a comet tail.
        let opacity = 0.15 + 0.85 * Math.pow(1 - i / dots, 3)
        return (
          <circle
            key={i}
            cx={279 + 270 * Math.sin(angle)}
            cy={279 - 270 * Math.cos(angle)}
            r={3}
            className="fill-grid"
            style={{ opacity }}
          />
        )
      })}
    </svg>
  )
}
