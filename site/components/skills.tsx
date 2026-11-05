"use client"

import * as React from "react"
import { useLanguage } from "./language-provider"

export function Skills() {
  const { language, t } = useLanguage()
  const vi = language === "vi"

  const groups = [
    {
      category: vi ? "Frontend & Giao diện Web" : "Frontend & Web Interface",
      skills: [
        "React 19 / Next.js 16",
        "TypeScript",
        "JavaScript (ES6+)",
        "Tailwind CSS",
        "HTML5 / CSS3",
        "Framer Motion",
        "Responsive UI / PWA",
        "Three.js (3D WebGL)",
        "Web Audio API",
      ],
    },
    {
      category: vi ? "Backend & Cơ sở dữ liệu" : "Backend & Databases",
      skills: [
        "Next.js API Routes",
        "Node.js",
        "PostgreSQL",
        "Prisma ORM",
        "Supabase (Database, Auth)",
        "Supabase Realtime Broadcast",
        "RESTful API Architecture",
        "JWT Authentication",
      ],
    },
    {
      category: vi ? "Công cụ & Triển khai" : "Tools & Deployment",
      skills: [
        "Git & GitHub Version Control",
        "Vercel Platform Deployment",
        "Cloudflare Workers",
        "Cloudflare R2 Storage",
        "Media Session API",
        "Figma (UI/UX Handoff)",
        "VS Code / Cursor / Codex",
      ],
    },
    {
      category: vi ? "Phương pháp & Kỹ năng bổ trợ" : "Methods & Core Competencies",
      skills: [
        vi ? "Tự học & Nghiên cứu tài liệu" : "Independent Research & Self-learning",
        vi ? "AI hỗ trợ lập trình & gỡ lỗi" : "AI-assisted Coding & Debugging",
        vi ? "Làm việc nhóm theo Agile" : "Agile Team Collaboration",
        vi ? "Thuật toán SM-2 (Spaced Repetition)" : "SM-2 Spaced Repetition Algorithm",
        vi ? "Tiếng Anh (B1–B2 đọc hiểu kỹ thuật)" : "English (B1–B2 Technical Reading)",
        vi ? "Tiếng Việt (Bản ngữ)" : "Vietnamese (Native)",
      ],
    },
  ]

  const total = groups.reduce((count, group) => count + group.skills.length, 0)

  return (
    <div className="space-y-6">
      <p className="label flex items-center justify-between gap-3 border-b border-border pb-2">
        <span>{vi ? "Phân loại / 04 nhóm kỹ năng" : "Taxonomy / 04 groups"}</span>
        <span>{total} {vi ? "công nghệ & phương pháp" : "tools & methods"}</span>
      </p>

      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {groups.map((group, index) => (
          <section key={group.category} className="space-y-3">
            <div className="flex items-baseline justify-between gap-3 border-b border-border pb-2">
              <h3 className="font-mono text-[11px] font-medium uppercase leading-tight tracking-[0.06em] text-foreground">
                <span className="mr-2 text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {group.category}
              </h3>
              <span className="label shrink-0">{group.skills.length}</span>
            </div>

            <ul className="grid grid-cols-1 gap-x-6 xl:grid-cols-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-baseline justify-between gap-3 border-b border-border/50 py-1.5 text-[11px] leading-snug text-foreground/85"
                >
                  <span>{skill}</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-[9px] text-muted-foreground"
                  >
                    +
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <dl className="grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-2">
        <div>
          <dt className="label">{vi ? "Ngoại ngữ" : "Languages"}</dt>
          <dd className="mt-1 text-[11px] leading-relaxed text-foreground/90">
            {vi ? "Tiếng Việt (Bản ngữ) · Tiếng Anh (B1–B2 tự đánh giá, đọc hiểu tài liệu)" : "Vietnamese (Native) · English (B1–B2 self-assessed, technical reading)"}
          </dd>
        </div>
        <div>
          <dt className="label">{vi ? "AI hỗ trợ phát triển" : "AI-Assisted Engineering"}</dt>
          <dd className="mt-1 text-[11px] leading-relaxed text-foreground/90">
            {vi ? "Tra cứu tài liệu, hỗ trợ viết mã, gỡ lỗi và tối ưu hóa giải thuật" : "Documentation research, code generation, debugging and optimization"}
          </dd>
        </div>
      </dl>
    </div>
  )
}
