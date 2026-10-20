import Link from 'next/link'
import clsx from 'clsx'

// Buttons follow the game's look: thin outlines, square corners, no glow.
const baseStyles = {
  solid:
    'inline-flex items-center justify-center py-2 px-4 text-sm font-semibold uppercase tracking-widest transition-colors',
  outline:
    'inline-flex items-center justify-center border py-[calc(--spacing(2)-1px)] px-[calc(--spacing(4)-1px)] text-sm uppercase tracking-widest transition-colors',
}

const variantStyles = {
  solid: {
    phosphor: 'bg-phosphor text-void hover:bg-signal active:bg-signal/80',
  },
  outline: {
    signal:
      'border-signal text-signal hover:border-phosphor hover:text-phosphor active:text-phosphor/80',
  },
}

type ButtonProps = (
  | {
      variant?: 'solid'
      color?: keyof typeof variantStyles.solid
    }
  | {
      variant: 'outline'
      color?: keyof typeof variantStyles.outline
    }
) &
  (
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'color'>
    | (Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> & {
        href?: undefined
      })
  )

export function Button({ className, ...props }: ButtonProps) {
  props.variant ??= 'solid'

  className = clsx(
    baseStyles[props.variant],
    props.variant === 'outline'
      ? variantStyles.outline[props.color ?? 'signal']
      : variantStyles.solid[props.color ?? 'phosphor'],
    className,
  )

  // Keep the styling props off the DOM element.
  let { variant: _variant, color: _color, ...rest } = props

  return typeof rest.href === 'undefined' ? (
    <button
      className={className}
      {...(rest as React.ComponentPropsWithoutRef<'button'>)}
    />
  ) : (
    <Link
      className={className}
      {...(rest as React.ComponentPropsWithoutRef<typeof Link>)}
    />
  )
}
