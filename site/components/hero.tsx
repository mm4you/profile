"use client"

import * as React from "react"
import Link from "next/link"

import { site } from "@/lib/site"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { BinaryField } from "@/components/binary-field"
import { CodeRain } from "@/components/code-rain"
import { LocalTime } from "@/components/local-time"
import { HeroLanyard } from "@/components/hero-lanyard"

export function Hero() {
  const { language } = useLanguage()
  const vi = language === "vi"

  const [copied, setCopied] = React.useState(false)
  const timeout = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current)
    }
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)

      if (timeout.current) clearTimeout(timeout.current)
      timeout.current = setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  const trackPointer = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty(
      "--spot-x",
      `${event.clientX - rect.left}px`
    )
    event.currentTarget.style.setProperty(
      "--spot-y",
      `${event.clientY - rect.top}px`
    )
  }

  const cvHref = vi ? "/cv-ung-nhut-khang.pdf" : "/cv-ung-nhut-khang-en.pdf"

  return (
    <section
      id="top"
      aria-labelledby="cover-title"
      onPointerMove={trackPointer}
      className="hero-spotlight relative overflow-hidden border-b border-border"
    >
      <BinaryField />
      <CodeRain className="opacity-80" />

      <div className="shell relative z-10">
        {/* Top Meta Bar */}
        <div className="hero-in flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-border/70 py-3">
          <p className="label">
            ( F/01 ){" "}
            <span className="text-foreground">
              {vi ? "Hồ sơ cá nhân" : "Portfolio"}
            </span>{" "}
            · 2026
          </p>
          <p className="label flex items-center gap-2">
            <span
              aria-hidden="true"
              className="status-dot inline-block size-1.5 bg-primary"
            />
            HCMC <LocalTime /> <span className="hidden sm:inline">· GMT+7</span>
          </p>
        </div>

        {/* Hero Title & 3D Lanyard Staging */}
        <div className="relative pt-8 lg:pt-12">
          <p className="label label-accent hero-in hero-in-1">
            00 / {vi ? "Bìa hồ sơ" : "Cover"}
          </p>

          <h1
            id="cover-title"
            className="cover-name hero-in hero-in-2 mt-4 lg:mt-6"
          >
            <span className="block font-extralight">Ưng</span>
            <span className="block font-semibold">
              Nhựt Khang<span className="text-primary">.</span>
            </span>
          </h1>

          {/* Desktop 3D Lanyard: Positioned elegantly at the top right of the hero */}
          <div
            aria-label="3D Lanyard Personal Badge"
            className="hero-in hero-in-3 hidden lg:absolute lg:right-0 lg:top-[-10px] lg:block lg:h-[480px] lg:w-[380px] xl:h-[530px] xl:w-[430px]"
          >
            <HeroLanyard />
            <p className="label mt-2 flex items-center justify-between px-1 text-[9px]">
              <span className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="status-dot inline-block size-1.5 bg-primary"
                />
                {vi ? "Kéo hoặc lật thẻ" : "Drag or flip card"}
              </span>
              <span>3D PHY · REACT BITS</span>
            </p>
          </div>

          {/* Mobile 3D Lanyard: Dedicated responsive frame, natural flow without scale hack */}
          <div
            aria-label="3D Lanyard Personal Badge"
            className="hero-in hero-in-3 relative my-6 block h-[330px] w-full overflow-hidden border border-border/60 bg-secondary/30 sm:h-[380px] lg:hidden"
          >
            <HeroLanyard />
            <div className="label pointer-events-none absolute bottom-2 inset-x-2 flex items-center justify-between px-2 text-[8px] bg-background/80 py-1 backdrop-blur-sm border border-border/40">
              <span className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="status-dot inline-block size-1.5 bg-primary"
                />
                {vi ? "Chạm lật · Kéo thẻ" : "Tap to flip · Drag card"}
              </span>
              <span>3D LANYARD</span>
            </div>
          </div>
        </div>

        {/* Bio, Action Buttons & Spec Deck */}
        <div className="mt-8 grid gap-8 border-t border-border pt-6 lg:mt-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <p className="max-w-xl text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
              {vi ? (
                <>
                  Sinh viên Kỹ thuật phần mềm tại UMT, thực hành phát triển web
                  với{" "}
                  <span className="text-foreground">
                    React, Next.js, TypeScript
                  </span>
                  , cơ sở dữ liệu và tích hợp API. Chủ động tự học và hoàn thiện
                  các sản phẩm chạy được phục vụ người dùng thật.
                </>
              ) : (
                <>
                  Software Engineering student at UMT building modern{" "}
                  <span className="text-foreground">
                    full-stack web applications
                  </span>{" "}
                  and interactive tools with{" "}
                  <span className="text-foreground">
                    React, Next.js, TypeScript, and Supabase / PostgreSQL
                  </span>
                  . Independent learner focused on shipping clean, production-ready
                  systems.
                </>
              )}
            </p>

            <p className="label mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>
                {vi
                  ? "Địa chỉ: Phường Cát Lái, TP.HCM"
                  : `Based in ${site.location}`}
              </span>
              <span aria-hidden="true" className="text-primary">
                /
              </span>
              <span>
                {vi
                  ? "Đang tìm cơ hội thực tập 2026"
                  : "Available for 2026 internship"}
              </span>
            </p>

            {/* Direct Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Button asChild>
                <Link
                  href={cvHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {vi ? "Tải CV" : "Download CV"}{" "}
                  <span aria-hidden="true">↓</span>
                </Link>
              </Button>

              <Button variant="outline" type="button" onClick={copyEmail}>
                {copied ? (
                  <span className="text-primary">
                    {vi ? "Đã sao chép" : "Copied"}
                  </span>
                ) : vi ? (
                  "Sao chép email"
                ) : (
                  "Copy email"
                )}
              </Button>
              <span className="sr-only" aria-live="polite">
                {copied ? "Email copied to clipboard" : ""}
              </span>

              <Button variant="ghost" asChild>
                <Link
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub <span aria-hidden="true">↗</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="hidden lg:col-span-2 lg:col-start-7 lg:flex lg:items-end">
            <p className="label pb-1 [writing-mode:vertical-rl] rotate-180">
              {vi ? "Cuộn xuống xem nội dung ↓" : "Scroll to index / 01 Profile ↓"}
            </p>
          </div>

          {/* Micro Specs List */}
          <dl className="spec-list lg:col-span-4 lg:col-start-9">
            <div className="spec-row">
              <dt>{vi ? "Khu vực" : "Base"}</dt>
              <dd>Ho Chi Minh City, VN</dd>
            </div>
            <div className="spec-row">
              <dt>{vi ? "Trọng tâm" : "Focus"}</dt>
              <dd>Web Dev / Frontend / Full-stack</dd>
            </div>
            <div className="spec-row">
              <dt>{vi ? "Học vấn" : "Education"}</dt>
              <dd>UMT · B.S. IT, 2024—2028</dd>
            </div>
            <div className="spec-row">
              <dt>{vi ? "Trạng thái" : "Status"}</dt>
              <dd className="text-primary">
                {vi ? "Sẵn sàng thực tập 2026" : "Open for Internship"}
              </dd>
            </div>
          </dl>
        </div>

        {/* Stat metrics */}
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border py-5 md:grid-cols-4">
          <div className="group">
            <dt className="label">{vi ? "Dự án tiêu biểu" : "Selected systems"}</dt>
            <dd className="stat-value mt-2 transition-colors group-hover:text-primary">
              06
            </dd>
          </div>
          <div className="group">
            <dt className="label">{vi ? "Thành tích Hackathon" : "Hackathon distinction"}</dt>
            <dd className="stat-value mt-2 transition-colors group-hover:text-primary">
              Top 20<span className="text-primary"> · Digiport</span>
            </dd>
          </div>
          <div className="group">
            <dt className="label">{vi ? "Chuyên ngành" : "Undergraduate major"}</dt>
            <dd className="stat-value mt-2 transition-colors group-hover:text-primary">
              SE <span className="text-primary">@ UMT</span>
            </dd>
          </div>
          <div className="group">
            <dt className="label">{vi ? "Kho mã nguồn" : "Repositories"}</dt>
            <dd className="stat-value mt-2 transition-colors group-hover:text-primary">
              12<span className="text-primary">+</span>
            </dd>
          </div>
        </dl>

        {/* Footer label strip */}
        <div className="label flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-border/70 py-2.5">
          <span>(* 2026 &gt;</span>
          <span aria-hidden="true">{"//"}</span>
          <span>Web Developer · Software Engineering</span>
          <span aria-hidden="true">[ ]</span>
          <span className="hidden sm:inline">Obel Mono 1.001</span>
          <span>/ SIL OFL 1.1 )</span>
        </div>
      </div>
    </section>
  )
}
