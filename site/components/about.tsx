"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useLanguage } from "./language-provider"

export function About() {
  const { language, t } = useLanguage()
  const vi = language === "vi"

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-start justify-between gap-4">
            <p className="label label-accent">{vi ? "Học vấn chính quy" : "Education"}</p>
            <span className="label shrink-0">2024—2028</span>
          </div>
          <h3
            id="education-title"
            className="mt-2 font-mono text-[17px] font-medium leading-tight tracking-[-0.02em] text-foreground"
          >
            {vi
              ? "Trường Đại học Quản lý và Công nghệ TP. Hồ Chí Minh"
              : "Ho Chi Minh City University of Management and Technology"}
          </h3>
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            {vi
              ? "Ngành Công nghệ thông tin · Chuyên ngành Kỹ thuật phần mềm (SE)"
              : "B.S. in Information Technology · Software Engineering (SE)"}
          </p>
        </CardHeader>
        <CardContent className="pt-3">
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            {vi
              ? "Chương trình đào tạo định hướng ứng dụng thực tế. Tích cực tham gia các dự án phát triển web, bài toán thi đấu Hackathon và rèn luyện kỹ năng giải quyết vấn đề bằng công nghệ."
              : "Rigorous curriculum focused on software engineering standards, database architecture, and modern full-stack web applications. Active participant in tech competitions and practical engineering projects."}
          </p>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <p className="label">{vi ? "Mục tiêu nghề nghiệp" : "Career objective"}</p>
        <p className="text-[12px] leading-relaxed text-muted-foreground">
          {vi
            ? "Tìm kiếm cơ hội thực tập phát triển Web (Web Development Intern / Frontend / Full-stack) để học hỏi quy trình làm việc chuyên nghiệp, nâng cao kỹ năng kỹ thuật và đóng góp trực tiếp vào các sản phẩm thực tế. Tinh thần tự học nhanh, chủ động và có trách nhiệm cao trong công việc."
            : "Seeking a Web Development Internship to learn industry-standard workflows, improve engineering craftsmanship, and contribute full-stack ownership to production systems. Quick, self-directed learner with high ownership and collaborative mindset."}
        </p>
      </div>

      <dl className="grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-2">
        <div>
          <dt className="label">{vi ? "Địa điểm làm việc" : "Location preference"}</dt>
          <dd className="mt-1 text-[11px] leading-relaxed text-foreground/90">
            {vi ? "TP. Hồ Chí Minh (On-site / Hybrid / Remote)" : "Ho Chi Minh City (On-site / Hybrid / Remote)"}
          </dd>
        </div>
        <div>
          <dt className="label">{vi ? "Thời gian tốt nghiệp" : "Graduation timeline"}</dt>
          <dd className="mt-1 text-[11px] leading-relaxed text-foreground/90">
            {vi ? "Dự kiến năm 2028 (Sẵn sàng thực tập từ 2026)" : "Expected 2028 (Available for internship from 2026)"}
          </dd>
        </div>
      </dl>
    </div>
  )
}
