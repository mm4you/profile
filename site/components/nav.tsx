"use client"
import {useState} from 'react'
import {Download,Menu} from 'lucide-react'
import {ModeToggle} from './mode-toggle'
import {Button} from './ui/button'
import {Sheet,SheetContent,SheetHeader,SheetTitle,SheetTrigger} from './ui/sheet'
import {useLanguage} from './language-provider'
import {asset} from '@/lib/profile'
export function Navbar() {
  const {t,language,setLanguage}=useLanguage(); const [open,setOpen]=useState(false)
  const links=[['#projects',t.projects],['#github',t.github],['#certificates',t.achievement],['#skills',t.skills],['#about',t.about],['#contact',t.contact]]
  return <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md print:hidden">
    <div className="max-w-7xl mx-auto flex h-14 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
      <a href="#main" className="flex items-center gap-2 font-mono text-xs font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity shrink-0">
        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"/><span>khang</span><span className="text-muted-foreground/50">/</span><span className="text-muted-foreground font-normal hidden sm:inline">web dev</span>
      </a>
      <nav aria-label={t.menu} className="hidden lg:flex items-center gap-1 ml-auto">
        {links.map(([href,label])=><a key={href} href={href} className="px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50">{label}</a>)}
        <a href={asset(t.pdfFile)} download title={t.pdfLanguage} className="inline-flex items-center gap-1.5 px-2.5 h-8 text-xs font-medium text-foreground hover:bg-muted/50 rounded-md"><Download className="w-3.5 h-3.5 text-muted-foreground"/>{t.resume}</a>
      </nav>
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-1 font-mono text-[11px]" aria-label={language==='vi'?'Ngôn ngữ':'Language'}>
          {(['vi','en'] as const).map(lang=><button key={lang} type="button" lang={lang} aria-pressed={language===lang} onClick={()=>setLanguage(lang)} className={`px-1.5 py-2 cursor-pointer ${language===lang?'text-foreground font-bold underline underline-offset-4':'text-muted-foreground hover:text-foreground'}`}>{lang.toUpperCase()}</button>)}
        </div>
        <ModeToggle/>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild><Button className="lg:hidden" variant="ghost" size="icon" aria-label={t.menu}><Menu className="h-4 w-4"/></Button></SheetTrigger>
          <SheetContent side="right" className="max-w-xs"><SheetHeader><SheetTitle>{t.menu}</SheetTitle></SheetHeader>
            <nav className="flex flex-col gap-2 p-4">{links.map(([href,label])=><a key={href} href={href} onClick={()=>setOpen(false)} className="px-3 py-2 rounded-md hover:bg-muted text-sm">{label}</a>)}<a href={asset(t.pdfFile)} download className="px-3 py-2 text-sm text-primary">{t.download} · {t.pdfLanguage}</a></nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
}
