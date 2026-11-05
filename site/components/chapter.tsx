import * as React from "react"

import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"

export type ChapterSpec = {
  label: string
  value: React.ReactNode
}

type ChapterProps = {
  id: string
  index: string
  title: string
  deck: string
  specs: ChapterSpec[]
  children: React.ReactNode
  className?: string
}

export function Chapter({
  id,
  index,
  title,
  deck,
  specs,
  children,
  className,
}: ChapterProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("chapter", className)}
    >
      <aside className="chapter-rail">
        <p className="chapter-index">
          {index} <span className="text-muted-foreground">/ 06</span>
        </p>
        <h2 id={`${id}-title`} className="chapter-title">
          {title}
        </h2>
        <p className="chapter-deck">{deck}</p>
        <dl className="spec-list">
          {specs.map((spec) => (
            <div key={spec.label} className="spec-row">
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>
      </aside>

      <div className="chapter-body">
        <span aria-hidden="true" className="chapter-watermark">
          {index}
        </span>
        <Reveal className="chapter-content">{children}</Reveal>
      </div>
    </section>
  )
}

type SubsectionProps = {
  index: string
  title: string
  meta?: string
  children: React.ReactNode
  className?: string
}

export function Subsection({
  index,
  title,
  meta,
  children,
  className,
}: SubsectionProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border pb-2">
        <div className="flex items-baseline gap-3">
          <span className="label label-accent">{index}</span>
          <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-foreground">
            {title}
          </h3>
        </div>
        {meta ? <span className="label">{meta}</span> : null}
      </header>
      {children}
    </section>
  )
}
