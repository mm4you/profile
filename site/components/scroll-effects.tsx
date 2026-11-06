"use client"

import * as React from "react"

/**
 * Lightweight scroll motion for decorative elements.
 * Elements opt in with `data-parallax="<speed>"` and receive a
 * `--parallax-y` custom property that CSS can translate with.
 */
export function ScrollEffects() {
  React.useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    )

    if (!elements.length) return

    let frame = 0

    const clear = () => {
      for (const element of elements) {
        element.style.removeProperty("--parallax-y")
      }
    }

    const update = () => {
      frame = 0
      if (motionQuery.matches) return

      const viewport = window.innerHeight || 1

      for (const element of elements) {
        const rect = element.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > viewport) continue

        const speed = Number.parseFloat(element.dataset.parallax ?? "0")
        if (!speed) continue

        const center = rect.top + rect.height / 2
        const progress = Math.max(-0.5, Math.min(0.5, 0.5 - center / viewport))
        const shift = progress * speed * 100

        element.style.setProperty("--parallax-y", `${shift.toFixed(2)}px`)
      }
    }

    const schedule = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    const onMotionPreference = () => {
      if (!motionQuery.matches) {
        schedule()
        return
      }

      if (frame) window.cancelAnimationFrame(frame)
      frame = 0
      clear()
    }

    schedule()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    motionQuery.addEventListener("change", onMotionPreference)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      motionQuery.removeEventListener("change", onMotionPreference)
    }
  }, [])

  return null
}
