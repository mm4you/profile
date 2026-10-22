"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "./language-provider"
import { getProjects } from "@/lib/profile"
import { Github, Eye, ArrowUpRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function Projects() {
  const { language, t } = useLanguage()
  const [filter, setFilter] = React.useState<"all" | "web" | "system" | "game">("all")

  const projects = getProjects(language)

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="space-y-6 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border/60 pb-3">
        <div>
          <h2 className="text-sm font-bold tracking-wider text-foreground uppercase font-mono">
            {t.projectHeading}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t.projectIntro}
          </p>
        </div>

        {/* Minimal Filters */}
        <div className="flex items-center gap-1 font-mono text-xs">
          {([
            { key: "all", label: t.all },
            { key: "web", label: t.web },
            { key: "system", label: t.system },
            { key: "game", label: t.game },
          ] as const).map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              aria-pressed={filter === item.key}
              className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                filter === item.key
                  ? "bg-foreground text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Flat Projects List (Zero Box, Pure Content) */}
      <div className="divide-y divide-border/40">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="py-5 first:pt-0 space-y-2.5"
          >
            {/* Header Row: Title, Period, Links */}
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-foreground hover:text-primary transition-colors">
                  {project.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-muted-foreground">{project.period}</span>
                <div className="flex items-center gap-2">
                  {project.live && (
                    <Link
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 text-foreground hover:text-primary font-medium transition-colors"
                      title={t.live}
                    >
                      <span>{t.live}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  )}
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 text-muted-foreground hover:text-foreground transition-colors"
                      title={project.id === "csvc" ? t.private : t.code}
                    >
                      <Github className="w-3 h-3" />
                      <span>{project.id === "csvc" ? t.private : t.code}</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Role */}
            <p className="font-mono text-xs text-primary font-medium">
              {project.role}
            </p>

            {/* Summary */}
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {project.summary}
            </p>

            {/* Technical Highlights */}
            <div className="space-y-1 pt-0.5">
              {project.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-xs text-foreground/85 font-mono"
                >
                  <span className="text-primary select-none">›</span>
                  <span className="leading-normal font-sans sm:font-mono">{item}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack & Optional Preview */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex flex-wrap gap-1">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] px-1.5 py-0.2 rounded bg-muted/50 text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {project.image && (
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-primary hover:underline transition-colors cursor-pointer py-0.5"
                    >
                      <Eye className="w-3 h-3" />
                      <span>{t.preview}</span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl p-4 bg-card border border-border">
                    <DialogTitle className="text-xs font-mono mb-2">
                      {project.title}
                    </DialogTitle>
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-muted border border-border/50">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 700px"
                        className="object-contain"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
