"use client"

import Link from "next/link"

import { site } from "@/lib/site"
import { useLanguage } from "./language-provider"
import { Subsection } from "@/components/chapter"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function OpenSource() {
  const { language } = useLanguage()
  const vi = language === "vi"

  const pinnedRepos = [
    {
      name: "ielts",
      desc: vi
        ? "Ứng dụng học từ vựng IELTS với thuật toán lặp lại ngắt quãng SM-2, mini-game luyện tập và biểu đồ tiến độ."
        : "IELTS vocabulary learning platform with spaced repetition (SM-2), practice games, and activity heatmap.",
      lang: "TypeScript / Next.js",
      url: "https://github.com/mm4you/ielts",
    },
    {
      name: "hackathon",
      desc: vi
        ? "InnovateX Smart Port: Hệ thống điều phối logistics cảng biển và gợi ý khung giờ qua AI. Top 20 Hackathon Digiport 2025."
        : "InnovateX Smart Port: Port entry scheduling and logistics coordination system. Top 20 Semifinalist at Digiport Logistics Hackathon 2025.",
      lang: "TypeScript / Prisma",
      url: "https://github.com/mm4you/hackathon",
    },
    {
      name: "thitho",
      desc: vi
        ? "Thi Thố: Gameshow thời gian thực cho 4 người chơi, đồng bộ chuông và đáp án qua Supabase Realtime Broadcast."
        : "Thi Tho: Live four-player quiz gameshow with real-time buzzer and score syncing via Supabase Realtime Broadcast.",
      lang: "TypeScript / Supabase",
      url: "https://github.com/mm4you/thitho",
    },
    {
      name: "drive-music",
      desc: vi
        ? "Trình phát nhạc FLAC trên nền web với PWA, lưu trữ Cloudflare R2 và điều khiển màn hình khóa qua Media Session API."
        : "FLAC web music player featuring installable PWA support, Cloudflare R2 storage, and lock-screen controls.",
      lang: "React / Workers",
      url: "https://github.com/mm4you/drive-music",
    },
  ]

  return (
    <Subsection
      index="01.1"
      title={vi ? "Kho mã nguồn công khai" : "Open source index"}
      meta={vi ? "12+ repositories / 04 ghim" : "12+ repositories / 04 pinned"}
    >
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]">
        <div className="min-w-0 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <span className="label">
              {vi ? "Biểu đồ đóng góp GitHub" : "Contributions stream"}
            </span>
            <span className="label text-primary">Live</span>
          </div>

          <div className="plate relative min-w-0 overflow-hidden">
            <div className="overflow-x-auto p-3">
              <div className="min-w-[420px] sm:min-w-[560px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://ghchart.rshah.org/c93400/mm4you"
                  alt="GitHub contribution chart for mm4you"
                  className="h-auto w-full opacity-90 dark:invert dark:hue-rotate-180"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/80 px-3 py-2 text-[10px] text-muted-foreground">
              <span className="label">@mm4you on GitHub</span>
              <Link
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="label text-foreground transition-colors hover:text-primary"
              >
                {vi ? "Xem trang cá nhân" : "View profile"} ↗
              </Link>
            </div>
          </div>
        </div>

        <div className="min-w-0 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <span className="label">
              {vi ? "Kho lưu trữ nổi bật" : "Pinned repositories"}
            </span>
            <span className="label text-muted-foreground">04</span>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-2.5 sm:grid-cols-2">
            {pinnedRepos.map((repo) => (
              <Card
                key={repo.name}
                className="flex flex-col justify-between p-3.5 transition-colors hover:border-border/80"
              >
                <CardHeader className="p-0">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[12px] font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {repo.name}
                    </Link>
                    <Badge variant="outline" className="text-[9px]">
                      {repo.lang}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0 pt-2">
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    {repo.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Subsection>
  )
}
