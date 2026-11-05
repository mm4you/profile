"use client"

import * as React from "react"
import Link from "next/link"

import { useLanguage } from "./language-provider"
import { getProjects, type Project } from "@/lib/profile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrambleText } from "@/components/scramble-text"

type FilterKey = "all" | "web" | "system" | "game"

export function Projects() {
  const { language, t } = useLanguage()
  const vi = language === "vi"

  const [filter, setFilter] = React.useState<FilterKey>("all")
  const projects = getProjects(language)

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter)

  const filters: Array<{ key: FilterKey; label: string }> = [
    { key: "all", label: vi ? "Tất cả" : "All" },
    { key: "web", label: vi ? "Ứng dụng Web" : "Web" },
    { key: "system", label: vi ? "Hệ thống" : "Systems" },
    { key: "game", label: vi ? "Trò chơi" : "Games" },
  ]

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <p className="label">
          {vi ? "Mục lục" : "Index"} /{" "}
          {String(filteredProjects.length).padStart(2, "0")}{" "}
          {vi ? "dự án" : "entries"}
        </p>

        <div className="no-scrollbar -mx-1 w-full min-w-0 overflow-x-auto px-1 sm:mx-0 sm:w-auto sm:px-0">
          <Tabs
            value={filter}
            onValueChange={(value) => setFilter(value as FilterKey)}
          >
            <TabsList aria-label="Filter projects by category">
              {filters.map((item) => {
                const count =
                  item.key === "all"
                    ? projects.length
                    : projects.filter((p) => p.category === item.key).length

                return (
                  <TabsTrigger
                    key={item.key}
                    value={item.key}
                    className="gap-2 text-[11px]"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-[9px] text-muted-foreground">
                      {count}
                    </span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="divide-y divide-border border-y border-border">
        {filteredProjects.map((project, index) => (
          <article
            key={project.id}
            className="group grid grid-cols-1 gap-4 py-6 transition-colors md:grid-cols-[100px_minmax(0,1fr)_auto] md:items-start md:gap-8"
          >
            {/* Index & Category */}
            <div className="space-y-1">
              <span className="font-mono text-[11px] font-medium text-primary">
                {String(index + 1).padStart(2, "0")} / {project.category.toUpperCase()}
              </span>
              {project.period && (
                <p className="label">{project.period}</p>
              )}
            </div>

            {/* Title, Role & Summary */}
            <div className="space-y-3 min-w-0">
              <div>
                <h3 className="font-mono text-[17px] font-medium leading-tight tracking-[-0.02em] text-foreground sm:text-[19px]">
                  <ScrambleText text={project.title} />
                </h3>
                <p className="label label-accent mt-1.5">{project.role}</p>
              </div>

              <p className="max-w-2xl text-[12px] leading-relaxed text-muted-foreground">
                {project.summary}
              </p>

              {/* Highlights */}
              <ul className="space-y-1 pt-1">
                {project.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-[11px] leading-relaxed text-foreground/80"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-primary"
                    >
                      +
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tech.map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className="border-border/70 text-[10px]"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions / Links */}
            <div className="flex flex-wrap items-center gap-2 pt-2 md:flex-col md:items-end md:pt-0">
              {project.live && (
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {vi ? "Trải nghiệm" : "Live"} ↗
                  </Link>
                </Button>
              )}

              {project.github && (
                <Button variant="ghost" size="sm" asChild>
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub ↗
                  </Link>
                </Button>
              )}

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="label text-[10px]">
                    {vi ? "Chi tiết" : "Inspect"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl">
                  <DialogHeader>
                    <div className="flex items-center gap-2">
                      <span className="label text-primary">
                        {project.category.toUpperCase()}
                      </span>
                      {project.period && (
                        <span className="label">· {project.period}</span>
                      )}
                    </div>
                    <DialogTitle className="font-mono text-xl font-medium tracking-tight mt-1">
                      {project.title}
                    </DialogTitle>
                    <DialogDescription className="label label-accent mt-0.5">
                      {project.role}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 pt-3">
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {project.summary}
                    </p>

                    <div>
                      <h4 className="label mb-2">
                        {vi ? "Điểm nổi bật kỹ thuật" : "Technical Highlights"}
                      </h4>
                      <ul className="space-y-1.5">
                        {project.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs leading-relaxed text-foreground/90"
                          >
                            <span className="text-primary shrink-0">+</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="label mb-2">
                        {vi ? "Công nghệ sử dụng" : "Technology Stack"}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <Badge key={t} variant="secondary" className="text-xs">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-border">
                      {project.live && (
                        <Button asChild>
                          <Link
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {vi ? "Trải nghiệm sản phẩm" : "Open Live System"} ↗
                          </Link>
                        </Button>
                      )}
                      {project.github && (
                        <Button variant="outline" asChild>
                          <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            GitHub Repository ↗
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
