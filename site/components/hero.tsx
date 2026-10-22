"use client"

import * as React from "react"
import Image from "next/image"
import { useLanguage } from "./language-provider"
import { CopyEmail } from "./copy-email"
import { asset } from "@/lib/profile"
import {
  Download,
  Github,
  Mail,
  Phone,
  Check,
  ArrowUpRight,
  GitCommit,
  BookOpen,
} from "lucide-react"

export function Hero() {
  const { t } = useLanguage()
  const [graphError, setGraphError] = React.useState(false)
  const pinnedRepos = [
    { name: 'ielts', desc: t.repoIelts, lang: 'TypeScript', langColor: '#3178c6', url: 'https://github.com/mm4you/ielts' },
    { name: 'hackathon', desc: t.repoPort, lang: 'TypeScript', langColor: '#3178c6', url: 'https://github.com/mm4you/hackathon' },
    { name: 'drive-music', desc: t.repoMusic, lang: 'TypeScript', langColor: '#3178c6', url: 'https://github.com/mm4you/drive-music' },
    { name: 'csvc-umt', desc: t.repoCsvc, lang: t.private, langColor: '#8b949e', url: 'https://github.com/qminh77/csvc-umt' },
  ]

  return (
    <section className="space-y-6 pt-1">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* 1. LEFT ZONE: PROFILE IDENTITY & DIRECT ACTIONS */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-start gap-4">
            {/* Portrait Image (Balanced, Flat, Golden Ratio) */}
            <div className="relative w-24 h-32 shrink-0 overflow-hidden rounded-xl border border-border/70 bg-muted/20">
              <Image
                src={asset("profile.jpg")}
                alt="Ưng Nhựt Khang"
                fill
                sizes="120px"
                priority
                className="object-cover object-center"
              />
            </div>

            {/* Name, Handle & Title */}
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground truncate">
                  Ưng Nhựt Khang
                </h1>
              </div>

              <p className="text-xs sm:text-sm font-medium text-foreground/90">
                {t.role}
              </p>

              <p className="text-[11px] font-mono text-muted-foreground">
                {t.department}
              </p>

              {/* Status Indicator */}
              <div className="pt-1 font-mono text-xs flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>{t.available}</span>
              </div>
            </div>
          </div>

          {/* Bio Text (Flat, professional) */}
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {t.bio}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
            <a
              href={asset("cv-ung-nhut-khang.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-foreground text-background hover:opacity-90 transition-opacity font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.download}</span><span className="sr-only"> ({t.pdfLanguage})</span>
            </a>

            <CopyEmail />

            <a
              href="tel:+84393331566"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border/70 hover:bg-muted/50 text-foreground transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-muted-foreground" />
              <span>0393 331 566</span>
            </a>

            <a
              href="https://github.com/mm4you"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border/70 hover:bg-muted/50 text-foreground transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-muted-foreground" />
              <span>@mm4you</span>
            </a>
          </div>
        </div>

        {/* 2. RIGHT ZONE: GITHUB COMMAND CENTER */}
        <div
          id="github"
          className="lg:col-span-7 space-y-3.5 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-border/60 lg:pl-8 scroll-mt-20"
        >
          {/* Header */}
          <div className="flex items-baseline justify-between gap-2 border-b border-border/40 pb-2">
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4 text-foreground" />
              <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                {t.githubHeading}
              </h2>
              <span className="text-muted-foreground font-mono text-xs hidden sm:inline">@mm4you</span>
            </div>

            <a
              href="https://github.com/mm4you"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-primary hover:underline inline-flex items-center gap-0.5"
            >
              <span>{t.viewAll}</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* Flat Contribution Graph */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1">
                <GitCommit className="w-3 h-3 text-primary" />
                <span>{t.contribution}</span>
              </span>
              <span>{t.publicActivity}</span>
            </div>

            <div className="overflow-x-auto py-1" hidden={graphError}>
              <div className="min-w-[580px] p-2 rounded-md bg-muted/20 border border-border/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset("github-activity.svg")}
                  width={730}
                  height={130}
                  alt={t.graphAlt}
                  onError={() => setGraphError(true)}
                  className="w-full h-auto dark:invert dark:hue-rotate-180 opacity-90"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {graphError && <a href="https://github.com/mm4you" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">{t.graphUnavailable} ↗</a>}

          {/* Pinned Repos Grid (2-columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {pinnedRepos.map((repo, idx) => (
              <a
                key={idx}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2.5 rounded-md hover:bg-muted/40 transition-colors border border-border/40 space-y-1"
              >
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <BookOpen className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    <span className="font-mono text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                      {repo.name}
                    </span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </div>

                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-snug">
                  {repo.desc}
                </p>

                <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground pt-0.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: repo.langColor }}
                  />
                  <span>{repo.lang}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
