"use client"

import * as React from "react"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+=<>/\\|"

type ScrambleTextProps = {
  text: string
  className?: string
}

export function ScrambleText({ text, className }: ScrambleTextProps) {
  const [display, setDisplay] = React.useState(text)
  const timer = React.useRef<number | null>(null)

  React.useEffect(() => {
    return () => {
      if (timer.current) window.clearInterval(timer.current)
    }
  }, [])

  const scramble = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (timer.current) window.clearInterval(timer.current)

    let tick = 0
    const total = Math.max(18, text.length * 2)

    timer.current = window.setInterval(() => {
      tick += 1
      const revealed = Math.floor((tick / total) * text.length)

      setDisplay(
        text
          .split("")
          .map((character, index) => {
            if (character === " " || index < revealed) return character
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join("")
      )

      if (tick >= total) {
        if (timer.current) window.clearInterval(timer.current)
        timer.current = null
        setDisplay(text)
      }
    }, 22)
  }

  return (
    <span
      className={className}
      onPointerEnter={scramble}
      onFocus={scramble}
      tabIndex={-1}
    >
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </span>
  )
}
