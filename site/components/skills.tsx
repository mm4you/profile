"use client"
import {useLanguage} from './language-provider'
export function Skills() {
  const {t}=useLanguage()
  const groups=[{category:t.frontend,skills:['JavaScript','TypeScript','React','Next.js','Tailwind CSS','Responsive UI']},{category:t.backend,skills:['Next.js API Routes','RESTful API','Prisma ORM','Authentication']},{category:t.databases,skills:['PostgreSQL','MySQL','Supabase']},{category:t.tools,skills:['Git','GitHub','Vercel','Cloudflare']}]
  return <section id="skills" className="space-y-6 scroll-mt-20">
    <div className="border-b border-border/60 pb-3"><h2 className="text-sm font-bold tracking-wider text-foreground uppercase font-mono">{t.skillHeading}</h2><p className="text-xs text-muted-foreground mt-0.5">{t.skillIntro}</p></div>
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">{groups.map(group=><div key={group.category} className="space-y-2"><h3 className="font-mono text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary"/><span>{group.category}</span></h3><div className="flex flex-wrap gap-1.5">{group.skills.map(skill=><span key={skill} className="font-mono text-[11px] px-2 py-0.5 rounded bg-muted/40 text-foreground/90 border border-border/40">{skill}</span>)}</div></div>)}</div>
    <div className="pt-3 border-t border-border/40 flex flex-col gap-1.5 font-mono text-xs text-muted-foreground"><p><strong className="text-foreground">{t.languageLabel}:</strong> {t.english}</p><p><strong className="text-foreground">{t.aiLabel}:</strong> {t.ai}</p></div>
  </section>
}
