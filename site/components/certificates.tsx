"use client"

import * as React from "react"
import Link from "next/link"

import { useLanguage } from "./language-provider"

export function Certificates() {
  const { language } = useLanguage()
  const vi = language === "vi"

  const honors = [
    {
      date: "2025",
      title: vi
        ? "Vòng Bán kết (Top 20) — Hackathon Digiport Logistics 2025"
        : "Semifinalist (Top 20) — Digiport Logistics Hackathon 2025",
      issuer: vi
        ? "Ban tổ chức Hackathon Digiport Logistics & Đối tác Doanh nghiệp Cảng"
        : "Digiport Logistics Hackathon Committee & Port Industry Partners",
      description: vi
        ? "Giải thưởng ghi nhận dự án InnovateX Smart Port — giải pháp đặt lịch và điều phối logistics cảng biển thông minh với GreenSlot AI, vượt qua hàng chục đội thi để vào vòng Bán kết toàn cuộc thi."
        : "Recognized for InnovateX Smart Port — a smart port appointment scheduling and logistics coordination solution with GreenSlot AI, selected among the top 20 teams nationwide.",
      verifyUrl: "https://github.com/mm4you/hackathon",
    },
    {
      date: "2024 — " + (vi ? "Hiện tại" : "Present"),
      title: vi
        ? "Sinh viên Kỹ thuật phần mềm (SE) — Khóa 2024"
        : "Software Engineering Undergraduate — Class of 2024",
      issuer: vi
        ? "Trường Đại học Quản lý và Công nghệ TP. Hồ Chí Minh (UMT)"
        : "Ho Chi Minh City University of Management and Technology (UMT)",
      description: vi
        ? "Chương trình đào tạo Công nghệ thông tin theo chuẩn quốc tế, tập trung chuyên sâu vào quy trình kỹ thuật phần mềm, cấu trúc dữ liệu, giải thuật và phát triển hệ thống web hiện đại."
        : "Rigorous curriculum focused on international software engineering standards, data structures, algorithms, and modern web application development.",
    },
  ]

  return (
    <div className="space-y-5">
      <p className="label flex items-center justify-between gap-3 border-b border-border pb-2">
        <span>{vi ? "Chứng nhận & Thành tích / 02 ghi nhận" : "Records / 02 distinctions"}</span>
        <span>2024 — 2025</span>
      </p>

      <div className="divide-y divide-border">
        {honors.map((honor) => (
          <article
            key={honor.title}
            className="grid gap-3 py-5 first:pt-0 md:grid-cols-[104px_minmax(0,1fr)] md:gap-6"
          >
            <p className="label pt-0.5">{honor.date}</p>

            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-mono text-[13px] font-medium leading-snug tracking-[-0.01em] text-foreground">
                    {honor.title}
                  </h3>
                  <p className="label label-accent mt-1">
                    {honor.issuer}
                  </p>
                </div>

                {honor.verifyUrl && (
                  <div className="flex shrink-0 items-center gap-3">
                    <Link
                      href={honor.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label text-foreground transition-colors hover:text-primary"
                    >
                      {vi ? "Mã nguồn dự án" : "Project source"} ↗
                    </Link>
                  </div>
                )}
              </div>

              <p className="text-[11px] leading-relaxed text-muted-foreground">
                {honor.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
