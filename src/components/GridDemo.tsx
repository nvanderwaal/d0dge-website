'use client'

import { useEffect, useRef } from 'react'
import clsx from 'clsx'

/*
 * A small, self-playing imitation of a d0dge run for the website. It borrows the
 * game's look (GDD §7, §10, §11) but none of its code: the real simulation lives
 * in D0dge.Core. A simple bot steers the glyph, so the demo plays itself.
 */

type Pattern = 'wave' | 'ripple' | 'twinkle' | 'interference' | 'vortex'

const stagePatterns: Array<{ name: string; pattern: Pattern }> = [
  { name: 'STAGE 1', pattern: 'wave' },
  { name: 'STAGE 2', pattern: 'ripple' },
  { name: 'STAGE 3', pattern: 'twinkle' },
  { name: 'STAGE 4', pattern: 'interference' },
  { name: 'STAGE 5', pattern: 'vortex' },
]

type HazardKind = 'single' | 'pair' | 'quick'

interface Hazard {
  x: number
  y: number
  vx: number
  vy: number
  kind: HazardKind
  warn: number
  near: boolean
  paid: boolean
}

interface Scatter {
  x: number
  y: number
  age: number
}

interface Popup {
  x: number
  y: number
  age: number
}

export interface GridDemoProps {
  /** Cycle through the stage patterns, as a run does. */
  stages?: boolean
  /** Fixed pattern when not cycling. */
  pattern?: Pattern
  /** Seconds between spawns. */
  spawnInterval?: number
  /** Show where a thumb would be dragging (relative drag). */
  showFinger?: boolean
  /** Let the bot cut it closer, for more near misses. */
  daring?: boolean
  className?: string
}

const WARN = 0.6
const SCATTER_TIME = 0.5
const STAGE_LENGTH = 9

function readPalette(el: Element) {
  let style = getComputedStyle(el)
  let read = (name: string, fallback: string) =>
    style.getPropertyValue(name).trim() || fallback
  return {
    void: read('--void', '#080808'),
    phosphor: read('--phosphor', '#f5f5f0'),
    grid: read('--grid', '#444444'),
    signal: read('--signal', '#bdbdbd'),
  }
}

// Presentation randomness only; a fixed seed keeps the demo the same on every visit.
function makeRandom(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 4294967296
  }
}

export function GridDemo({
  stages = false,
  pattern = 'wave',
  spawnInterval = 0.75,
  showFinger = false,
  daring = false,
  className,
}: GridDemoProps) {
  let wrapperRef = useRef<HTMLDivElement>(null)
  let canvasRef = useRef<HTMLCanvasElement>(null)
  let scoreRef = useRef<HTMLSpanElement>(null)
  let stageRef = useRef<HTMLSpanElement>(null)
  let progressRef = useRef<HTMLDivElement>(null)
  let hudRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let wrapper = wrapperRef.current!
    let canvas = canvasRef.current!
    let ctx = canvas.getContext('2d')!
    let random = makeRandom(1352897)
    let reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let width = 0
    let height = 0
    let hud = 0
    let unit = 0
    let spacing = 0
    let dots: Array<[number, number]> = []

    let player = { x: 0, y: 0, vx: 0, vy: 0, hit: 0 }
    let finger = { x: 0, y: 0 }
    let hazards: Hazard[] = []
    let scatters: Scatter[] = []
    let popups: Popup[] = []
    let time = 0
    let runTime = 0
    let spawnTimer = 1.5
    let score = 0
    let palette = readPalette(wrapper)
    let paletteTimer = 0

    function resize() {
      let rect = wrapper.getBoundingClientRect()
      let ratio = window.devicePixelRatio || 1
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)

      hud = Math.max(36, width * 0.12)
      if (hudRef.current) {
        hudRef.current.style.height = `${hud}px`
      }
      unit = width
      spacing = width / 20
      dots = []
      for (let y = hud + spacing / 2; y < height; y += spacing) {
        for (let x = spacing / 2; x < width; x += spacing) {
          dots.push([x, y])
        }
      }
      if (player.x === 0) {
        player.x = width / 2
        player.y = hud + (height - hud) * 0.55
        finger.x = width / 2
        finger.y = height * 0.8
      }
    }

    let hazardRadius = () => unit * 0.028
    let glyphRadius = () => unit * 0.045
    let hitRadius = () => glyphRadius() * 0.6
    let nearMissRadius = () => unit * 0.075
    let maxSpeed = () => unit * 1.1
    let baseSpeed = () => unit * 0.38

    function currentPattern(): Pattern {
      return stages
        ? stagePatterns[
            Math.floor(runTime / STAGE_LENGTH) % stagePatterns.length
          ].pattern
        : pattern
    }

    function spawn() {
      let edge = Math.floor(random() * 4)
      let top = hud
      let r = hazardRadius()
      let speed = baseSpeed() * (1 + Math.min(runTime, 45) / 90)
      let kindRoll = random()
      let kind: HazardKind =
        kindRoll < 0.6 ? 'single' : kindRoll < 0.8 ? 'pair' : 'quick'
      if (kind === 'quick') {
        speed *= 1.2
      }
      let tilt = kind === 'quick' ? 0 : (random() - 0.5) * (Math.PI / 2.4)

      let x: number, y: number, angle: number
      for (let attempt = 0; ; attempt++) {
        let along = 0.15 + random() * 0.7
        if (edge === 0) {
          ;[x, y, angle] = [along * width, top - r, Math.PI / 2]
        } else if (edge === 1) {
          ;[x, y, angle] = [width + r, top + along * (height - top), Math.PI]
        } else if (edge === 2) {
          ;[x, y, angle] = [along * width, height + r, -Math.PI / 2]
        } else {
          ;[x, y, angle] = [-r, top + along * (height - top), 0]
        }
        // Fairness rule 1: never enter right next to the player.
        if (
          Math.hypot(x - player.x, y - player.y) > unit * 0.25 ||
          attempt > 4
        ) {
          break
        }
        edge = (edge + 2) % 4
      }
      angle += tilt
      let vx = Math.cos(angle) * speed
      let vy = Math.sin(angle) * speed
      hazards.push({ x, y, vx, vy, kind, warn: WARN, near: false, paid: false })
      if (kind === 'pair') {
        // A pair is two linear hazards side by side with a passable gap.
        let gap = unit * 0.28
        let nx = -Math.sin(angle) * gap
        let ny = Math.cos(angle) * gap
        hazards.push({
          x: x + nx,
          y: y + ny,
          vx,
          vy,
          kind,
          warn: WARN,
          near: false,
          paid: false,
        })
      }
    }

    function steer(dt: number) {
      let ax = 0
      let ay = 0
      let lookahead = 0.9
      let safe = daring ? unit * 0.11 : unit * 0.2
      for (let h of hazards) {
        // Where the hazard and player come closest, assuming the player stands still.
        let px = h.x
        let py = h.y
        let rx = player.x - px
        let ry = player.y - py
        let vv = h.vx * h.vx + h.vy * h.vy
        let t = Math.max(0, (rx * h.vx + ry * h.vy) / vv)
        if (t + h.warn > lookahead) {
          continue
        }
        let cx = px + h.vx * t - player.x
        let cy = py + h.vy * t - player.y
        let d = Math.hypot(cx, cy)
        if (d < safe) {
          let urgency = (1 - d / safe) * (1 - (t + h.warn) / lookahead)
          // Step sideways out of the hazard's path.
          let sx = -h.vy
          let sy = h.vx
          let side = sx * -cx + sy * -cy >= 0 ? 1 : -1
          let len = Math.hypot(sx, sy)
          ax += (sx / len) * side * urgency * 6
          ay += (sy / len) * side * urgency * 6
        }
      }
      // Drift back toward the middle of the arena, with a slow wander.
      let homeX = width / 2 + Math.sin(time * 0.37) * width * 0.18
      let homeY = hud + (height - hud) * (0.5 + Math.sin(time * 0.23) * 0.15)
      ax += ((homeX - player.x) / unit) * 0.9
      ay += ((homeY - player.y) / unit) * 0.9

      let targetVx = ax * maxSpeed()
      let targetVy = ay * maxSpeed()
      let speed = Math.hypot(targetVx, targetVy)
      if (speed > maxSpeed()) {
        targetVx *= maxSpeed() / speed
        targetVy *= maxSpeed() / speed
      }
      let blend = Math.min(1, dt * 10)
      player.vx += (targetVx - player.vx) * blend
      player.vy += (targetVy - player.vy) * blend
    }

    function update(dt: number) {
      time += dt
      if (player.hit > 0) {
        player.hit -= dt
        if (player.hit <= 0) {
          hazards = []
          score = 0
          runTime = 0
          spawnTimer = 1.2
        }
        return
      }
      runTime += dt
      score += 10 * dt

      spawnTimer -= dt
      if (spawnTimer <= 0) {
        spawn()
        spawnTimer = spawnInterval * (0.75 + random() * 0.5)
      }

      steer(dt)
      let g = glyphRadius()
      let dx = player.vx * dt
      let dy = player.vy * dt
      player.x = Math.min(width - g, Math.max(g, player.x + dx))
      player.y = Math.min(height - g, Math.max(hud + g, player.y + dy))
      // Relative drag: the thumb moves by the glyph's movement / sensitivity.
      finger.x += dx / 1.25
      finger.y += dy / 1.25
      finger.x += (width / 2 - finger.x) * Math.min(1, dt * 0.6)
      finger.y += (height * 0.8 - finger.y) * Math.min(1, dt * 0.6)

      let r = hazardRadius()
      for (let h of hazards) {
        if (h.warn > 0) {
          h.warn -= dt
          continue
        }
        h.x += h.vx * dt
        h.y += h.vy * dt
        let d = Math.hypot(h.x - player.x, h.y - player.y)
        if (d < r + hitRadius()) {
          player.hit = 1.1
          scatters.push({ x: player.x, y: player.y, age: 0 })
          return
        }
        if (d < r + nearMissRadius()) {
          h.near = true
        } else if (h.near && !h.paid && d > r + nearMissRadius() * 1.4) {
          // A near miss pays once, when the hazard has passed by.
          h.paid = true
          score += 25
          scatters.push({ x: player.x, y: player.y, age: 0 })
          popups.push({ x: player.x, y: player.y - g * 2, age: 0 })
        }
      }
      let margin = unit * 0.1
      hazards = hazards.filter(
        (h) =>
          h.warn > 0 ||
          (h.x > -margin &&
            h.x < width + margin &&
            h.y > hud - margin &&
            h.y < height + margin),
      )
      scatters = scatters.filter((s) => (s.age += dt) < SCATTER_TIME)
      popups = popups.filter((p) => (p.age += dt) < 0.8)
    }

    function patternAt(p: Pattern, x: number, y: number) {
      let cx = width / 2
      let cy = hud + (height - hud) / 2
      let nx = x / unit
      let ny = y / unit
      switch (p) {
        case 'wave': {
          let phase = nx * 6 + ny * 2 - time * 1.6
          return {
            bright: 0.5 + 0.5 * Math.sin(phase),
            dx: 0,
            dy: Math.sin(phase) * 2.5,
          }
        }
        case 'ripple': {
          let r = Math.hypot(x - cx, y - cy) / unit
          let s = Math.sin(r * 14 - time * 2.4)
          return { bright: 0.5 + 0.5 * s, dx: 0, dy: 0 }
        }
        case 'twinkle': {
          let seed = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
          let offset = seed - Math.floor(seed)
          let s = Math.sin(time * (1.2 + offset * 1.5) + offset * 20)
          return { bright: Math.max(0, s) ** 2, dx: 0, dy: 0 }
        }
        case 'interference': {
          let a = Math.sin(nx * 7 - time * 1.3)
          let b = Math.sin(ny * 7 + nx * 2 - time * 1.1)
          return { bright: ((a + b) / 2 + 1) / 2, dx: a * 1.5, dy: b * 1.5 }
        }
        case 'vortex': {
          let angle = Math.atan2(y - cy, x - cx)
          let r = Math.hypot(x - cx, y - cy) / unit
          let s = Math.sin(angle * 3 + r * 8 - time * 1.5)
          return {
            bright: 0.5 + 0.5 * s,
            dx: -Math.sin(angle) * s * 1.5,
            dy: Math.cos(angle) * s * 1.5,
          }
        }
      }
    }

    function warningAt(x: number, y: number) {
      // Entry warnings: a corridor along the first part of the path,
      // brightest at the entry point, pulsing as the hazard approaches.
      let strength = 0
      for (let h of hazards) {
        if (h.warn <= 0) {
          continue
        }
        let fadeIn = Math.min(1, (WARN - h.warn) / (WARN * 0.3))
        let speed = Math.hypot(h.vx, h.vy)
        let ux = h.vx / speed
        let uy = h.vy / speed
        let rx = x - h.x
        let ry = y - h.y
        let along = rx * ux + ry * uy
        let across = Math.abs(rx * -uy + ry * ux)
        let length = unit * 0.35
        let side = unit * 0.05
        if (along < 0 || along > length || across > side) {
          continue
        }
        let pulse = 0.75 + 0.25 * Math.cos(h.warn * Math.PI * 2 * 4.5)
        strength = Math.max(
          strength,
          fadeIn * pulse * (1 - along / length) * (1 - across / side),
        )
      }
      return strength
    }

    function drawDiamond(x: number, y: number, size: number, filled: boolean) {
      ctx.beginPath()
      ctx.moveTo(x, y - size)
      ctx.lineTo(x + size, y)
      ctx.lineTo(x, y + size)
      ctx.lineTo(x - size, y)
      ctx.closePath()
      if (filled) {
        ctx.fill()
      } else {
        ctx.stroke()
      }
    }

    function draw() {
      let { void: bg, phosphor, grid, signal } = palette
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, width, height)

      let p = currentPattern()
      let dotRadius = spacing * 0.13
      let stroke = glyphRadius() * 0.2
      let blendIn = stages ? Math.min(1, (runTime % STAGE_LENGTH) / 1.25) : 1
      let previous = stages
        ? stagePatterns[
            (Math.floor(runTime / STAGE_LENGTH) + stagePatterns.length - 1) %
              stagePatterns.length
          ].pattern
        : p

      for (let [x0, y0] of dots) {
        let a = patternAt(p, x0, y0)
        let { bright, dx, dy } = a
        if (blendIn < 1) {
          let b = patternAt(previous, x0, y0)
          bright = b.bright + (a.bright - b.bright) * blendIn
          dx = b.dx + (a.dx - b.dx) * blendIn
          dy = b.dy + (a.dy - b.dy) * blendIn
        }
        if (reducedMotion) {
          dx = 0
          dy = 0
        }
        let x = x0 + dx
        let y = y0 + dy

        // Near-miss scatter: nearby dots push outward for a moment.
        for (let s of scatters) {
          let rx = x - s.x
          let ry = y - s.y
          let d = Math.hypot(rx, ry)
          let reach = unit * 0.18
          if (d > 0 && d < reach) {
            let push =
              Math.sin((s.age / SCATTER_TIME) * Math.PI) *
              (1 - d / reach) *
              spacing *
              0.6
            x += (rx / d) * push
            y += (ry / d) * push
          }
        }

        let warning = warningAt(x0, y0)
        ctx.fillStyle = warning > 0.05 ? signal : grid
        ctx.globalAlpha =
          warning > 0.05 ? 0.25 + warning * 0.45 : 0.5 + bright * 0.5
        ctx.beginPath()
        ctx.arc(x, y, dotRadius * (1 + warning * 0.8), 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // Hazards.
      let r = hazardRadius()
      ctx.strokeStyle = phosphor
      ctx.fillStyle = phosphor
      ctx.lineWidth = stroke
      for (let h of hazards) {
        if (h.warn > 0) {
          continue
        }
        if (h.kind === 'quick') {
          let angle = Math.atan2(h.vy, h.vx)
          let size = r * 1.1
          ctx.globalAlpha = 0.25
          ctx.beginPath()
          ctx.arc(h.x, h.y, r, 0, Math.PI * 2)
          ctx.stroke()
          ctx.globalAlpha = 1
          ctx.beginPath()
          for (let i = 0; i < 3; i++) {
            let a = angle + (i * Math.PI * 2) / 3
            ctx.lineTo(h.x + Math.cos(a) * size, h.y + Math.sin(a) * size)
          }
          ctx.closePath()
          ctx.stroke()
        } else {
          ctx.beginPath()
          ctx.arc(h.x, h.y, r - stroke / 2, 0, Math.PI * 2)
          ctx.stroke()
          if (h.kind === 'pair') {
            ctx.beginPath()
            ctx.arc(h.x, h.y, stroke * 0.8, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      // The player: the hollow diamond. On a hit it fills in.
      ctx.lineWidth = stroke
      ctx.lineJoin = 'miter'
      drawDiamond(player.x, player.y, glyphRadius(), player.hit > 0)

      if (showFinger) {
        ctx.globalAlpha = 0.35
        ctx.strokeStyle = signal
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(finger.x, finger.y, unit * 0.07, 0, Math.PI * 2)
        ctx.stroke()
        ctx.globalAlpha = 0.15
        ctx.fillStyle = signal
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // Near-miss points.
      ctx.fillStyle = signal
      ctx.font = `${Math.round(unit * 0.045)}px ${getComputedStyle(wrapper).fontFamily}`
      ctx.textAlign = 'center'
      for (let pop of popups) {
        ctx.globalAlpha = 1 - pop.age / 0.8
        ctx.fillText('+25', pop.x, pop.y - pop.age * unit * 0.08)
      }
      ctx.globalAlpha = 1

      if (scoreRef.current) {
        scoreRef.current.textContent = String(Math.floor(score))
      }
      if (stageRef.current) {
        stageRef.current.textContent = stages
          ? stagePatterns[
              Math.floor(runTime / STAGE_LENGTH) % stagePatterns.length
            ].name
          : 'STAGE 1'
      }
      if (progressRef.current) {
        let progress = stages
          ? (runTime % STAGE_LENGTH) / STAGE_LENGTH
          : (runTime % 30) / 30
        progressRef.current.style.transform = `scaleX(${progress})`
      }
    }

    resize()
    let resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(wrapper)

    let frame = 0
    let last = 0
    let visible = false

    function loop(now: number) {
      // rAF timestamps can be a little older than performance.now().
      let dt = Math.min(0.05, Math.max(0, (now - last) / 1000))
      last = now
      paletteTimer -= dt
      if (paletteTimer <= 0) {
        palette = readPalette(wrapper)
        paletteTimer = 0.25
      }
      update(dt)
      draw()
      frame = requestAnimationFrame(loop)
    }

    let intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(frame)
      if (visible) {
        last = performance.now()
        frame = requestAnimationFrame(loop)
      }
    })

    if (reducedMotion) {
      // Play a few seconds once and hold that frame still.
      for (let i = 0; i < 240; i++) {
        update(1 / 60)
      }
      draw()
      let repaint = window.setInterval(() => {
        palette = readPalette(wrapper)
        draw()
      }, 500)
      return () => {
        window.clearInterval(repaint)
        resizeObserver.disconnect()
      }
    }

    intersectionObserver.observe(wrapper)

    return () => {
      cancelAnimationFrame(frame)
      intersectionObserver.disconnect()
      resizeObserver.disconnect()
    }
  }, [stages, pattern, spawnInterval, showFinger, daring])

  return (
    <div
      ref={wrapperRef}
      className={clsx('relative h-full w-full bg-void font-dot', className)}
      role="img"
      aria-label="A d0dge run: a hollow diamond dodges hazards over a field of animated dots."
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        ref={hudRef}
        className="absolute inset-x-0 top-0 flex h-12 items-end justify-between px-[5%] pb-2 text-[0.8rem] tracking-widest"
      >
        <div className="flex items-baseline gap-3">
          <span ref={scoreRef} className="text-base text-phosphor">
            0
          </span>
          <span ref={stageRef} className="text-signal">
            STAGE 1
          </span>
        </div>
        <svg
          viewBox="0 0 12 12"
          className="mb-1 h-3 w-3 fill-signal"
          aria-hidden="true"
        >
          <rect x="2" y="1" width="2.5" height="10" />
          <rect x="7.5" y="1" width="2.5" height="10" />
        </svg>
        <div
          ref={progressRef}
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-signal"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
      {showFinger && (
        <div className="absolute inset-x-0 bottom-[4%] text-center text-[0.7rem] tracking-[0.3em] text-signal">
          DRAG ANYWHERE
        </div>
      )}
    </div>
  )
}
