"use client"

import * as React from "react"
import { useLanguage } from "./language-provider"

export function Experience() {
  const { language } = useLanguage()
  const vi = language === "vi"

  const milestones = [
    {
      period: "2025",
      location: "Ho Chi Minh City",
      role: vi ? "Lập trình viên chính · Vòng Bán kết" : "Lead Developer · Semifinalist",
      company: vi ? "Hackathon Digiport Logistics 2025" : "Digiport Logistics Hackathon 2025",
      bullets: vi
        ? [
            "Đảm nhiệm toàn bộ phần lập trình và kiến trúc hệ thống đặt lịch vào cảng thông minh InnovateX Smart Port.",
            "Tích hợp thuật toán GreenSlot AI gợi ý khung giờ, hệ thống tích điểm xanh và bảng điều khiển điều phối thời gian thực.",
            "Đạt thành tích Top 20 Vòng Bán kết toàn cuộc thi, giải quyết bài toán logistics thực tế cho tài xế và cảng biển.",
          ]
        : [
            "Engineered the full-stack architecture for InnovateX Smart Port logistics appointment and coordination system.",
            "Integrated GreenSlot AI time-slot recommendations, green credit rewards, and realtime operations dashboards.",
            "Awarded Top 20 Semifinalist standing, presenting a viable digital solution to port logistics congestion.",
          ],
    },
    {
      period: "2024 — " + (vi ? "Hiện tại" : "Present"),
      location: "Ho Chi Minh City",
      role: vi ? "Lập trình viên Web độc lập" : "Independent Web Developer",
      company: vi ? "Dự án cá nhân & Ứng dụng nguồn mở" : "Personal & Open Source Projects",
      bullets: vi
        ? [
            "Xây dựng và phát hành nhiều sản phẩm web hoàn chỉnh: IELTS Vocabulary (thuật toán lặp lại ngắt quãng SM-2), Thi Thố (gameshow 4 người chơi với Supabase Realtime), Drive Music (trình phát FLAC PWA qua Cloudflare R2).",
            "Thực hành sâu với React, Next.js 16, TypeScript, Tailwind CSS, Prisma ORM, cơ sở dữ liệu PostgreSQL và tích hợp API RESTful.",
            "Chủ động tự học công nghệ mới, rèn luyện tư duy sản phẩm và hoàn thiện các chi tiết trải nghiệm người dùng.",
          ]
        : [
            "Architected and deployed diverse production web apps: IELTS Vocabulary (SM-2 spaced repetition), Thi Tho (4-player realtime quiz via Supabase Realtime), Drive Music (FLAC PWA on Cloudflare R2).",
            "Deep hands-on experience with React, Next.js 16, TypeScript, Tailwind CSS, Prisma ORM, PostgreSQL, and RESTful APIs.",
            "Self-directed learner passionate about clean architecture, performance optimization, and intuitive user experiences.",
          ],
    },
    {
      period: "2024 — " + (vi ? "Hiện tại" : "Present"),
      location: "Ho Chi Minh City",
      role: vi ? "Thành viên phát triển" : "Development Team Member",
      company: vi ? "CSVC UMT — Quản lý cơ sở vật chất" : "CSVC UMT — Facilities Management Project",
      bullets: vi
        ? [
            "Tham gia phát triển dự án nhóm phục vụ quản lý thiết bị và cơ sở vật chất tại Trường Đại học Quản lý và Công nghệ TP.HCM (UMT).",
            "Thực hiện phân tích luồng nghiệp vụ, xây dựng giao diện người dùng và kiểm thử chức năng theo kế hoạch nhóm.",
            "Rèn luyện kỹ năng làm việc nhóm, trao đổi kỹ thuật và quản lý phiên bản mã nguồn qua Git.",
          ]
        : [
            "Collaborating in a student development team building the facilities and equipment management platform for UMT.",
            "Implementing user interfaces, business logic flows, and testing modules in an agile team workflow.",
            "Strengthening version control discipline via Git, technical communication, and collaborative development.",
          ],
    },
  ]

  return (
    <div className="space-y-5">
      <p className="label flex items-center justify-between gap-3 border-b border-border pb-2">
        <span>{vi ? "Nhật ký hoạt động / 03 cột mốc" : "Ledger / 03 milestones"}</span>
        <span>2024 — {new Date().getFullYear()}</span>
      </p>

      <div className="divide-y divide-border">
        {milestones.map((milestone) => (
          <article
            key={`${milestone.company}-${milestone.period}`}
            className="grid gap-4 py-7 first:pt-0 md:grid-cols-[156px_minmax(0,1fr)] md:gap-8"
          >
            <div className="space-y-1">
              <p className="font-mono text-[11px] font-medium tracking-[0.02em] text-foreground">
                {milestone.period}
              </p>
              <p className="label">{milestone.location}</p>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="font-mono text-[16px] font-medium leading-tight tracking-[-0.02em] text-foreground sm:text-[18px]">
                  {milestone.role}
                </h3>
                <p className="label label-accent mt-1.5">
                  {milestone.company}
                </p>
              </div>

              <ul className="space-y-1.5">
                {milestone.bullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-px shrink-0 text-primary"
                    >
                      +
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
