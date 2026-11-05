"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { chapters, site } from "@/lib/site"
import {useLanguage} from './language-provider'
import {asset} from '@/lib/profile'
import { cn } from "@/lib/utils"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"

const sections = [
  { id: "top", no: "00", label: "Cover" },
  ...chapters,
]

export function Navbar() {
  const {language,t,setLanguage}=useLanguage()
  const [active, setActive] = React.useState<string>("top")
  const [menuOpen, setMenuOpen] = React.useState(false)
  const progressRef = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    const onScroll = () => {
      const marker = window.scrollY + window.innerHeight * 0.3
      let current = "top"

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (!element) continue

        const top = element.getBoundingClientRect().top + window.scrollY
        if (top <= marker) current = section.id
      }

      setActive(current)

      if (progressRef.current) {
        const distance =
          document.documentElement.scrollHeight - window.innerHeight
        const progress =
          distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0
        progressRef.current.style.transform = `scaleX(${progress})`
      }
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md">
        <div className="shell flex h-14 items-center justify-between gap-4">
          <Link
            href="#top"
            className="group flex shrink-0 items-center gap-2"
            aria-label={`${site.name} — back to cover`}
          >
            <img
              src={asset('umt-wordmark.svg')}
              alt=""
              aria-hidden="true"
              width={160}
              height={28}
              className="block h-auto w-[136px] shrink-0 dark:hidden sm:w-40"
            />
            <img
              src={asset('umt-wordmark-dark.svg')}
              alt=""
              aria-hidden="true"
              width={160}
              height={28}
              className="hidden h-auto w-[136px] shrink-0 dark:block sm:w-40"
            />
            <span className="hidden font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-foreground sm:inline">
              {site.shortName}
            </span>
            <span aria-hidden="true" className="label hidden 2xl:inline">
              /
            </span>
            <span className="label hidden 2xl:inline">web developer</span>
          </Link>

          <nav
            aria-label="Chapters"
            className="hidden items-center gap-5 xl:flex"
          >
            {chapters.map((chapter) => {
              const isActive = active === chapter.id

              return (
                <a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "label relative py-1 transition-colors hover:text-foreground",
                    isActive && "text-foreground"
                  )}
                >
                  <span className={isActive ? "text-primary" : undefined}>
                    {chapter.no}
                  </span>{" "}
                  {language==='vi'?({profile:'Hồ sơ',work:'Dự án',achievement:'Thành tích',toolkit:'Kỹ năng',education:'Học vấn',contact:'Liên hệ'} as Record<string,string>)[chapter.id]:chapter.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-primary transition-transform duration-200",
                      isActive ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </a>
              )
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={asset(t.pdfFile)}
              target="_blank"
              rel="noopener noreferrer"
              className="label hidden items-center gap-1 py-2 text-primary transition-colors hover:text-foreground sm:inline-flex"
            >
              CV <span aria-hidden="true">↓</span>
            </Link>

            <div className="flex gap-2 label">{(['vi','en'] as const).map(l=><button key={l} type="button" aria-pressed={language===l} onClick={()=>setLanguage(l)} className={language===l?'text-primary underline underline-offset-4':'hover:text-foreground'}>{l.toUpperCase()}</button>)}</div><ModeToggle />

            <Button
              variant="outline"
              size="icon-sm"
              className="xl:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
            >
              <Menu />
            </Button>
          </div>
        </div>
        <span
          ref={progressRef}
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary"
        />
      </header>

      <MobileNav
        open={menuOpen}
        onOpenChange={setMenuOpen}
        active={active}
      />
    </>
  )
}
