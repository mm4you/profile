"use client"
import {Download,ArrowUpRight,ArrowUp} from 'lucide-react'
import {useLanguage} from './language-provider'
import {CopyEmail} from './copy-email'
import {asset,identity} from '@/lib/profile'
export function Footer() {
  const {t}=useLanguage()
  return <footer id="contact" className="pt-8 pb-8 border-t border-border/60 space-y-6 scroll-mt-20">
    <div className="space-y-2"><h2 className="text-sm font-bold tracking-wider text-foreground uppercase font-mono">{t.contactHeading}</h2><p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">{t.contactIntro}</p></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 font-mono text-xs pt-1">
      <div className="flex flex-wrap items-center justify-between gap-2 py-2 border-b border-border/40"><span className="text-muted-foreground">Email:</span><div className="flex items-center gap-2 min-w-0"><a href={`mailto:${identity.email}`} className="text-foreground font-medium break-all hover:text-primary">{identity.email}</a><CopyEmail compact/></div></div>
      <div className="flex flex-wrap items-center justify-between gap-2 py-2 border-b border-border/40"><span className="text-muted-foreground">{t.phoneLabel}:</span><a href={`tel:${identity.tel}`} className="text-foreground hover:text-primary inline-flex items-center gap-0.5 font-medium">{identity.phone}<ArrowUpRight className="w-3 h-3"/></a></div>
      <div className="flex flex-wrap items-center justify-between gap-2 py-2 border-b border-border/40"><span className="text-muted-foreground">GitHub:</span><a href={identity.github} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary inline-flex items-center gap-0.5 font-medium">github.com/mm4you<ArrowUpRight className="w-3 h-3"/></a></div>
      <div className="flex flex-wrap items-center justify-between gap-2 py-2 border-b border-border/40"><span className="text-muted-foreground">{t.resume} (PDF):</span><a href={asset('cv-ung-nhut-khang.pdf')} download className="text-primary hover:underline inline-flex items-center gap-1 font-semibold"><Download className="w-3 h-3"/>{t.download}<span className="text-[10px] text-muted-foreground">· {t.pdfLanguage}</span></a></div>
    </div>
    <p className="text-[11px] font-mono text-muted-foreground">{t.locationLabel}: {t.location}</p>
    <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-muted-foreground"><span>© 2026 {identity.name}</span><div className="flex gap-4"><button type="button" onClick={()=>window.print()} className="hover:text-foreground cursor-pointer print:hidden">{t.print}</button><a href="#main" className="inline-flex items-center gap-1 hover:text-foreground">{t.backTop}<ArrowUp className="w-3 h-3"/></a></div></div>
  </footer>
}
