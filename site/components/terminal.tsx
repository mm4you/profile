"use client"

import * as React from "react"
import { useLanguage } from "./language-provider"

type LineKind = "command" | "output" | "code"

type TerminalLine = {
  kind: LineKind
  text: string
}

const lineClass: Record<LineKind, string> = {
  command: "text-foreground",
  output: "text-muted-foreground",
  code: "text-foreground/85",
}

export function Terminal() {
  const { language } = useLanguage()
  const vi = language === "vi"

  const lines: TerminalLine[] = [
    { kind: "command", text: "whoami" },
    { kind: "output", text: "ung-nhut-khang // web developer" },
    { kind: "command", text: "cat profile.json" },
    { kind: "code", text: "{" },
    { kind: "code", text: '  "name": "Ưng Nhựt Khang",' },
    { kind: "code", text: '  "role": "Web Developer / SE Student at UMT",' },
    {
      kind: "code",
      text: '  "stack": ["React 19", "Next.js 16", "TypeScript", "Tailwind CSS", "PostgreSQL", "Supabase", "Prisma"],',
    },
    { kind: "code", text: '  "email": "contact@ungnhutkhang.id.vn",' },
    { kind: "code", text: '  "github": "https://github.com/mm4you",' },
    { kind: "code", text: '  "status": "open_for_internship_2026"' },
    { kind: "code", text: "}" },
    { kind: "output", text: "// build passed · 0 errors · 0 warnings · ready to collaborate" },
  ]

  const total = lines.reduce((length, line) => length + line.text.length, 0)

  const offsets = lines.map((_, index) =>
    lines.slice(0, index).reduce((length, line) => length + line.text.length, 0)
  )

  const ref = React.useRef<HTMLDivElement>(null)
  const timer = React.useRef<number | null>(null)
  const [typed, setTyped] = React.useState(0)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(total)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        let progress = 0
        if (timer.current) window.clearInterval(timer.current)

        timer.current = window.setInterval(() => {
          progress += 2
          setTyped(Math.min(progress, total))

          if (progress >= total) {
            if (timer.current) window.clearInterval(timer.current)
            timer.current = null
          }
        }, 16)

        observer.disconnect()
      },
      { threshold: 0.25 }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      if (timer.current) window.clearInterval(timer.current)
    }
  }, [total])

  return (
    <div
      ref={ref}
      className="plate relative min-w-0 font-mono text-[11px] leading-relaxed"
    >
      <div className="flex items-center justify-between border-b border-border/70 px-3.5 py-2">
        <span className="label flex items-center gap-2">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-primary"
          />
          khang@umt-se: ~
        </span>
        <span className="label text-[9px] text-muted-foreground">
          {vi ? "Nhật ký dòng lệnh" : "Interactive Terminal"}
        </span>
      </div>

      <div className="overflow-x-auto p-4">
        <div className="min-w-[420px] space-y-1">
          {lines.map((line, index) => {
            const start = offsets[index]
            const end = start + line.text.length
            const visible = Math.max(0, Math.min(typed - start, line.text.length))
            if (typed < start) return null

            const isCurrent = typed >= start && typed < end
            const slice = line.text.slice(0, visible)

            return (
              <p key={index} className={lineClass[line.kind]}>
                {line.kind === "command" && (
                  <span className="mr-2 text-primary">$</span>
                )}
                <span>{slice}</span>
                {isCurrent && (
                  <span
                    aria-hidden="true"
                    className="ml-0.5 inline-block h-3 w-1.5 bg-primary align-middle"
                  />
                )}
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}
