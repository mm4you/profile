"use client"

import * as React from "react"

const BINARY = "01010101010101010101"
const GLYPHS = "01{}[]()<>/=+*;:constasyncawaitSELECTFROMWHERE=>#$%&|^~"

const COLUMN_WIDTH = 16
const FONT_SIZE = 11

export function CodeRain({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    let width = 0
    let height = 0
    let columns = 0
    let drops: number[] = []
    let lastFrame = 0
    let animation: number | null = null
    let visible = true
    let colors = { primary: "#ff3c05", foreground: "#f1f1ef" }

    const readColors = () => {
      const styles = window.getComputedStyle(document.documentElement)
      colors = {
        primary: styles.getPropertyValue("--primary").trim() || colors.primary,
        foreground:
          styles.getPropertyValue("--foreground").trim() || colors.foreground,
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        rect.width < 768 ? 1.5 : 2
      )

      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))

      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, width, height)

      columns = Math.ceil(width / COLUMN_WIDTH)
      drops = Array.from(
        { length: columns },
        () => Math.random() * height * -1.2
      )
    }

    const paint = () => {
      context.clearRect(0, 0, width, height)
      context.font = `500 ${FONT_SIZE}px ui-monospace, SFMono-Regular, Menlo, monospace`
      context.shadowColor = colors.primary
      context.shadowBlur = width < 768 ? 0 : 3

      const trail = width < 640 ? 12 : 16
      const step = FONT_SIZE + 3

      for (let column = 0; column < columns; column += 1) {
        const x = column * COLUMN_WIDTH
        const head = drops[column]
        const source = column % 4 === 0 ? BINARY : GLYPHS

        for (let offsetIndex = 0; offsetIndex < trail; offsetIndex += 1) {
          const y = head - offsetIndex * step
          if (y < -FONT_SIZE || y > height + FONT_SIZE) continue

          const glyph = source[Math.floor(Math.random() * source.length)]

          if (offsetIndex === 0) {
            context.fillStyle =
              Math.random() > 0.78 ? colors.foreground : colors.primary
            context.globalAlpha = 0.95
          } else {
            context.fillStyle = colors.primary
            context.globalAlpha = 0.55 * (1 - offsetIndex / trail)
          }

          context.fillText(glyph, x, y)
        }

        drops[column] = head + step

        if (head - trail * step > height + 24) {
          drops[column] = -Math.random() * 320
        }
      }

      context.globalAlpha = 1
    }

    const tick = (time: number) => {
      if (!visible) return

      if (time - lastFrame > 48) {
        lastFrame = time
        paint()
      }

      animation = window.requestAnimationFrame(tick)
    }

    const start = () => {
      if (animation !== null) return
      animation = window.requestAnimationFrame(tick)
    }

    const stop = () => {
      if (animation === null) return
      window.cancelAnimationFrame(animation)
      animation = null
    }

    readColors()
    resize()

    if (reduceMotion) {
      paint()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) start()
        else stop()
      },
      { rootMargin: "120px" }
    )

    const onVisibilityChange = () => {
      visible = document.visibilityState === "visible"
      if (visible) start()
      else stop()
    }

    const themeObserver = new MutationObserver(readColors)

    observer.observe(canvas)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    document.addEventListener("visibilitychange", onVisibilityChange)
    window.addEventListener("resize", resize)

    start()

    return () => {
      stop()
      observer.disconnect()
      themeObserver.disconnect()
      document.removeEventListener("visibilitychange", onVisibilityChange)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={
        className
          ? `code-rain pointer-events-none absolute inset-0 size-full ${className}`
          : "code-rain pointer-events-none absolute inset-0 size-full"
      }
    />
  )
}
