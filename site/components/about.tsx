"use client"
import {useLanguage} from './language-provider'
export function About() {
  const {t}=useLanguage()
  return <section id="about" className="space-y-4 scroll-mt-20">
    <div className="border-b border-border/60 pb-3"><h2 className="text-sm font-bold tracking-wider text-foreground uppercase font-mono">{t.educationHeading}</h2><p className="text-xs text-muted-foreground mt-0.5">{t.educationIntro}</p></div>
    <div className="space-y-4"><div className="space-y-1.5">
      <div className="flex flex-wrap items-start justify-between gap-2"><h3 className="text-xs sm:text-sm font-bold text-foreground">{t.university}</h3><span className="shrink-0 font-mono text-[11px] text-muted-foreground">{t.educationPeriod}</span></div>
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs"><span className="text-primary font-medium">{t.degree}</span><span className="text-muted-foreground/60">•</span><span className="text-foreground/90 font-medium">{t.major}</span></div>
      <p className="text-xs text-muted-foreground leading-relaxed">{t.gpa}: <strong className="text-foreground">3.31</strong>. {t.graduation}</p>
    </div><div className="pt-3 border-t border-border/40 space-y-1 text-xs text-muted-foreground leading-relaxed"><h3 className="font-mono text-xs font-semibold text-foreground">{t.objectiveHeading}</h3><p>{t.objective}</p></div><div className="pt-3 border-t border-border/40 space-y-1 text-xs text-muted-foreground leading-relaxed"><h3 className="font-mono text-xs font-semibold text-foreground">{t.interestsHeading}</h3><p>{t.interests}</p></div></div>
  </section>
}
