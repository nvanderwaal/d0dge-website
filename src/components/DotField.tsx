// A square field of grid dots that fades out toward its edges.
export function DotField({
  spacing = 32,
  size = 1088,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  spacing?: number
  size?: number
}) {
  let count = Math.floor(size / spacing)
  let centre = size / 2

  return (
    <svg viewBox={`0 0 ${size} ${size}`} aria-hidden="true" {...props}>
      {Array.from({ length: count * count }, (_, i) => {
        let x = (i % count) * spacing + spacing / 2
        let y = Math.floor(i / count) * spacing + spacing / 2
        let distance = Math.hypot(x - centre, y - centre) / centre
        if (distance > 1) {
          return null
        }
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={2.5}
            className="fill-grid"
            style={{ opacity: 1 - distance }}
          />
        )
      })}
    </svg>
  )
}
