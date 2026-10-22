"use client"
import {Trophy,ArrowUpRight} from 'lucide-react'
import {useLanguage} from './language-provider'
export function Certificates() {
  const {t}=useLanguage()
  return <section id="certificates" className="space-y-6 scroll-mt-20">
    <div className="border-b border-border/60 pb-3"><h2 className="text-sm font-bold tracking-wider text-foreground uppercase font-mono">{t.awardHeading}</h2><p className="text-xs text-muted-foreground mt-0.5">{t.awardIntro}</p></div>
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-primary"><Trophy className="w-5 h-5"/><span className="text-2xl font-bold tracking-tight">Top 20</span><span className="text-[11px] font-mono text-muted-foreground">/ {t.semifinal}</span></div>
      <div className="flex items-baseline justify-between gap-3"><h3 className="text-xs sm:text-sm font-bold">Hackathon Digiport Logistics 2025</h3><span className="text-[11px] text-muted-foreground font-mono">2025</span></div>
      <p className="text-xs text-muted-foreground leading-relaxed">{t.awardDescription}</p>
      <a href="https://github.com/mm4you/hackathon" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-mono text-primary hover:underline">GitHub<ArrowUpRight className="w-3 h-3"/></a>
    </div>
  </section>
}
