"use client"

import * as React from "react"
import Link from "next/link"

import { chapters, site } from "@/lib/site"
import {useLanguage} from './language-provider'
import {asset} from '@/lib/profile'
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

type MobileNavProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  active: string
}

export function MobileNav({ open, onOpenChange, active }: MobileNavProps) {
  const {language,t,setLanguage}=useLanguage()
  const close = () => onOpenChange(false)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[min(92vw,420px)] gap-0 sm:max-w-[420px]"
      >
        <SheetHeader className="pr-14">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Chapters and contact links for {site.name}.
          </SheetDescription>
          <div className="flex items-center gap-3">
            <Avatar className="size-11 border border-border">
              <AvatarImage
                src={asset("profile.jpg")}
                alt=""
                className="object-cover "
              />
              <AvatarFallback>KH</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-foreground">
                {site.name}
              </p>
              <p className="label mt-1 truncate">
                {site.role} / {site.focus}
              </p>
            </div>
          </div>
        </SheetHeader>

        <nav aria-label="Chapters" className="flex-1 overflow-y-auto py-2">
          <ol>
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  onClick={close}
                  className={cn(
                    "group flex items-baseline justify-between border-b border-border/60 px-5 py-4 transition-colors hover:bg-secondary",
                    active === chapter.id && "bg-secondary"
                  )}
                >
                  <span className="flex items-baseline gap-3">
                    <span
                      className={cn(
                        "font-mono text-[10px] tracking-[0.08em]",
                        active === chapter.id
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {chapter.no}
                    </span>
                    <span className="font-mono text-[15px] font-light uppercase tracking-[0.02em] text-foreground">
                      {language==='vi'?({profile:'Hồ sơ',work:'Dự án',achievement:'Thành tích',toolkit:'Kỹ năng',education:'Học vấn',contact:'Liên hệ'} as Record<string,string>)[chapter.id]:chapter.label}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "text-xs transition-transform group-hover:translate-x-0.5",
                      active === chapter.id
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <SheetFooter className="gap-3">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${site.email}`}>Email ↗</a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={site.github} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </Link>
            </Button>
          </div>
          <Separator />
          <Button asChild>
            <Link href={asset(t.pdfFile)} target="_blank" rel="noopener noreferrer">
              Download CV ↓
            </Link>
          </Button>
          <p className="label text-center">
            {site.location} · GMT+7
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
