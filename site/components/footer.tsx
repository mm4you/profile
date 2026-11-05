"use client"

import * as React from "react"
import Link from "next/link"

import { site } from "@/lib/site"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"

const weights = [
  { value: 100, name: "Thin" },
  { value: 200, name: "ExtraLight" },
  { value: 300, name: "Light" },
  { value: 400, name: "Regular" },
  { value: 500, name: "Medium" },
  { value: 600, name: "SemiBold" },
  { value: 700, name: "Bold" },
  { value: 800, name: "ExtraBold" },
  { value: 900, name: "Black" },
]

export function Footer() {
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

  const cvHref = vi ? "/cv-ung-nhut-khang.pdf" : "/cv-ung-nhut-khang-en.pdf"

  return (
    <div className="space-y-12">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <p className="label label-accent">06.1 / {vi ? "Sẵn sàng làm việc" : "Availability"}</p>

          <h3 className="max-w-2xl font-mono text-[clamp(28px,4.5vw,56px)] font-extralight uppercase leading-[0.96] tracking-[-0.04em]">
            {vi ? "Cùng xây dựng điều gì đó " : "Let's build something "}
            <span className="italic text-primary">{vi ? "chính xác & giá trị." : "precise."}</span>
          </h3>

          <p className="max-w-xl text-[12px] leading-relaxed text-muted-foreground">
            {vi
              ? "Mình đang tìm kiếm cơ hội thực tập phát triển Web (Web Development Intern / Frontend / Full-stack) cho năm 2026. Nếu bạn có vị trí phù hợp hoặc muốn trao đổi về dự án, hãy gửi email cho mình."
              : "I am actively seeking Web Development Intern / Frontend / Full-stack roles for 2026. If you have an open position, an interesting web project, or simply want to talk code, get in touch."}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <a href={`mailto:${site.email}`}>
                {vi ? "Gửi email trực tiếp" : "Send an email"} <span aria-hidden="true">↗</span>
              </a>
            </Button>

            <Button size="lg" variant="outline" type="button" onClick={copyEmail}>
              {copied ? (
                <span className="text-primary">{vi ? "Đã sao chép email" : "Email copied"}</span>
              ) : (
                vi ? "Sao chép email" : "Copy email address"
              )}
            </Button>
            <span className="sr-only" aria-live="polite">
              {copied ? "Email copied to clipboard" : ""}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <p className="label">06.2 / {vi ? "Kênh liên lạc" : "Direct channels"}</p>

          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="label">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${site.email}`}
                  className="rule-link font-mono text-[11px] text-foreground"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label">{vi ? "Điện thoại" : "Telephone"}</dt>
              <dd className="mt-1">
                <a
                  href={site.phoneHref}
                  className="rule-link font-mono text-[11px] text-foreground"
                >
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label">GitHub</dt>
              <dd className="mt-1">
                <Link
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rule-link font-mono text-[11px] text-foreground"
                >
                  github.com/mm4you <span aria-hidden="true">↗</span>
                </Link>
              </dd>
            </div>
            <div>
              <dt className="label">Resume / CV</dt>
              <dd className="mt-1">
                <Link
                  href={cvHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rule-link font-mono text-[11px] text-foreground"
                >
                  PDF / {vi ? "Tiếng Việt" : "English"} <span aria-hidden="true">↓</span>
                </Link>
              </dd>
            </div>
          </dl>

          <div className="border-t border-border pt-4">
            <p className="label">Colophon</p>
            <dl className="spec-list mt-2">
              <div className="spec-row">
                <dt>Typeface</dt>
                <dd>Obel Mono 1.001</dd>
              </div>
              <div className="spec-row">
                <dt>3D Physics</dt>
                <dd>Three.js / React Bits Lanyard</dd>
              </div>
              <div className="spec-row">
                <dt>Stack</dt>
                <dd>Next.js 16 / React 19 / Tailwind v4</dd>
              </div>
              <div className="spec-row">
                <dt>Author</dt>
                <dd>Ưng Nhựt Khang (@mm4you)</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="grid gap-8 border-t border-border pt-6 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="label flex items-center justify-between gap-3">
            <span>Type specimen</span>
            <span>Obel Mono / 09 weights</span>
          </p>

          <div className="mt-3 space-y-1">
            {weights.map((weight) => (
              <div
                key={weight.value}
                className="flex items-baseline gap-4 border-b border-border/50 pb-1"
              >
                <span className="label w-20 shrink-0 font-mono text-[10px]">
                  {weight.name}
                </span>
                <span className="label w-10 shrink-0 text-muted-foreground">
                  {weight.value}
                </span>
                <span
                  style={{ fontWeight: weight.value }}
                  className="truncate font-mono text-[13px] text-foreground/90"
                >
                  Ưng Nhựt Khang · Web Developer 2026
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6">
          <div>
            <p className="label">Location &amp; Operations</p>
            <p className="mt-2 font-mono text-[12px] leading-relaxed text-muted-foreground">
              Phường Cát Lái, TP. Hồ Chí Minh, Việt Nam. Sinh viên Kỹ thuật phần
              mềm tại Trường Đại học Quản lý và Công nghệ TP.HCM (UMT).
            </p>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[10px] text-muted-foreground">
              <p className="font-mono">
                © 2026 Ưng Nhựt Khang. Built with precision.
              </p>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="hover:text-foreground cursor-pointer print:hidden"
                >
                  {vi ? "In trang" : "Print page"}
                </button>
                <a
                  href="#top"
                  className="font-mono text-foreground hover:text-primary transition-colors"
                >
                  Back to top ↑
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
