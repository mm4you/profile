"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { useLanguage } from "./language-provider"

const Lanyard = dynamic(() => import("@/components/lanyard"), { ssr: false })

export function HeroLanyard() {
  const { language } = useLanguage()
  const vi = language === "vi"

  const [textures, setTextures] = React.useState<{
    front: string
    back: string
    strap: string
  } | null>(null)

  React.useEffect(() => {
    let alive = true
    const img = new Image()
    img.src = "/profile.jpg"

    const generateArt = async () => {
      try {
        await Promise.all([
          img.decode().catch(() => {}),
          document.fonts?.load('600 24px "Obel Mono"').catch(() => {}),
          document.fonts?.load("600 24px Obel").catch(() => {}),
        ])
      } catch {
        // fallback
      }

      if (!alive) return

      const W = 1024
      const H = 1440

      /* ====================================================================
         1. FRONT CARD CANVAS (Color portrait 4:6, no distortion, no dark grad)
         ==================================================================== */
      const fc = document.createElement("canvas")
      fc.width = W
      fc.height = H
      const fg = fc.getContext("2d")

      if (fg) {
        // Charcoal black background
        fg.fillStyle = "#0c0c0e"
        fg.fillRect(0, 0, W, H)

        // Outer hairline frame
        fg.strokeStyle = "#242426"
        fg.lineWidth = 2
        fg.strokeRect(24, 24, W - 48, H - 48)

        // Subtle burnt orange corner accent tick
        fg.fillStyle = "#007f9e"
        fg.fillRect(24, 60, 4, 60)

        // Top technical labels flanking lanyard slot hole
        fg.fillStyle = "#737370"
        fg.font = '500 20px "Obel Mono", "Obel", monospace'
        fg.fillText("FIG. 01 // IDENTITY", 52, 92)
        fg.fillText("UMT · 2024—2028", 780, 92)

        // Portrait Image (Original Color, 4:6 ratio = 740 x 1110)
        const pw = 740
        const ph = 1110
        const px = Math.round((W - pw) / 2) // 142
        const py = 126

        if (img.complete && img.naturalWidth > 0) {
          fg.save()
          // Ensure zero filtering or darkening
          fg.filter = "none"
          fg.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, px, py, pw, ph)
          fg.restore()
        } else {
          fg.fillStyle = "#161618"
          fg.fillRect(px, py, pw, ph)
        }

        // Clean hairline border around photo plate
        fg.strokeStyle = "#28282b"
        fg.lineWidth = 1.5
        fg.strokeRect(px, py, pw, ph)

        // Text below portrait — never covering face or shoulders
        // Line 1: Name
        fg.fillStyle = "#f0f0ed"
        fg.font =
          '700 44px "Obel Mono", "Obel", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        fg.fillText("Ưng Nhựt Khang", 52, 1285)

        // Line 2: Role
        fg.fillStyle = "#007f9e"
        fg.font = '600 23px "Obel Mono", "Obel", monospace'
        fg.fillText(
          vi
            ? "Web Developer · Kỹ thuật phần mềm (UMT)"
            : "Web Developer / Software Engineering Student at UMT",
          52,
          1326
        )

        // Line 3: Email & GitHub
        fg.fillStyle = "#8a8a86"
        fg.font = '400 20px "Obel Mono", "Obel", monospace'
        fg.fillText("contact@ungnhutkhang.id.vn   ·   github.com/mm4you", 52, 1368)

        // Line 4: Small technical status
        fg.fillStyle = "#007f9e"
        fg.beginPath()
        fg.arc(58, 1405, 3.5, 0, Math.PI * 2)
        fg.fill()

        fg.fillStyle = "#5c5c58"
        fg.font = '500 15px "Obel Mono", "Obel", monospace'
        fg.fillText(
          vi
            ? "SẴN SÀNG THỰC TẬP 2026 // TP. HỒ CHÍ MINH · VIỆT NAM"
            : "OPEN FOR INTERNSHIP 2026 // HCMC · VIETNAM",
          72,
          1410
        )
      }

      /* ====================================================================
         2. BACK CARD CANVAS (Editorial Ink / Charcoal black, honest profile)
         ==================================================================== */
      const bc = document.createElement("canvas")
      bc.width = W
      bc.height = H
      const bg = bc.getContext("2d")

      if (bg) {
        bg.fillStyle = "#0c0c0e"
        bg.fillRect(0, 0, W, H)

        bg.strokeStyle = "#242426"
        bg.lineWidth = 2
        bg.strokeRect(24, 24, W - 48, H - 48)

        // Header
        bg.fillStyle = "#f0f0ed"
        bg.font =
          '700 44px "Obel Mono", "Obel", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        bg.fillText("Ưng Nhựt Khang", 56, 195)

        bg.fillStyle = "#007f9e"
        bg.font = '600 22px "Obel Mono", "Obel", monospace'
        bg.fillText(
          vi
            ? "Web Developer / Kỹ thuật phần mềm · UMT"
            : "Web Developer / Software Engineering Student at UMT",
          56,
          235
        )

        bg.strokeStyle = "#242426"
        bg.lineWidth = 1.5
        bg.beginPath()
        bg.moveTo(56, 275)
        bg.lineTo(W - 56, 275)
        bg.stroke()

        // Real bio statements
        bg.fillStyle = "#cfcfcc"
        bg.font =
          '400 25px "Obel Mono", "Obel", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        if (vi) {
          bg.fillText("Sinh viên Kỹ thuật phần mềm tại UMT.", 56, 340)
          bg.fillText("Thực hành phát triển web với React, Next.js,", 56, 385)
          bg.fillText("TypeScript, cơ sở dữ liệu và tích hợp API.", 56, 430)
          bg.fillText("Chủ động tự học và hoàn thiện sản phẩm thực tế.", 56, 475)
        } else {
          bg.fillText("Software Engineering student at UMT.", 56, 340)
          bg.fillText("Building web applications with React, Next.js,", 56, 385)
          bg.fillText("TypeScript, databases and API integration.", 56, 430)
          bg.fillText("Independent learner focused on production-ready code.", 56, 475)
        }

        // Spec / Capability plates
        const pills = vi
          ? [
              "STACK // NEXT.JS 16 · REACT 19 · TYPESCRIPT · TAILWIND",
              "DATA  // POSTGRESQL · PRISMA ORM · SUPABASE · REST API",
              "AWARD // TOP 20 HACKATHON DIGIPORT LOGISTICS 2025",
              "ROLE  // TÌM KIẾM CƠ HỘI THỰC TẬP PHÁT TRIỂN WEB",
            ]
          : [
              "STACK // NEXT.JS 16 · REACT 19 · TYPESCRIPT · TAILWIND",
              "DATA  // POSTGRESQL · PRISMA ORM · SUPABASE · REST API",
              "AWARD // TOP 20 DIGIPORT LOGISTICS HACKATHON 2025",
              "ROLE  // SEEKING WEB DEVELOPMENT INTERNSHIP (2026)",
            ]

        bg.font = '500 20px "Obel Mono", "Obel", monospace'
        pills.forEach((pill, i) => {
          const y = 560 + i * 86
          bg.fillStyle = "#141417"
          bg.fillRect(56, y, W - 112, 64)
          bg.strokeStyle = "#262629"
          bg.lineWidth = 1.5
          bg.strokeRect(56, y, W - 112, 64)
          bg.fillStyle = i === 2 ? "#007f9e" : i === 3 ? "#e87348" : "#deded8"
          bg.fillText(pill, 80, y + 40)
        })

        // Contact info
        bg.strokeStyle = "#242426"
        bg.lineWidth = 1.5
        bg.beginPath()
        bg.moveTo(56, 970)
        bg.lineTo(W - 56, 970)
        bg.stroke()

        bg.fillStyle = "#b0b0ac"
        bg.font = '400 22px "Obel Mono", "Obel", monospace'
        bg.fillText("Email:    contact@ungnhutkhang.id.vn", 56, 1030)
        bg.fillText("GitHub:   github.com/mm4you", 56, 1075)
        bg.fillText("Phone:    0393 331 566", 56, 1120)
        bg.fillText("Location: Phường Cát Lái, TP. Hồ Chí Minh", 56, 1165)

        // Footer call to action
        bg.fillStyle = "#007f9e"
        bg.font = '600 20px "Obel Mono", "Obel", monospace'
        bg.fillText(
          vi ? "CHẠM HOẶC CLICK ĐỂ LẬT THẺ ↻" : "CLICK OR TAP TO FLIP CARD ↻",
          56,
          1360
        )
      }

      /* ====================================================================
         3. STRAP CANVAS (Charcoal black with signal burnt-orange stitching)
         ==================================================================== */
      const sc = document.createElement("canvas")
      sc.width = 1000
      sc.height = 160
      const sg = sc.getContext("2d")

      if (sg) {
        sg.fillStyle = "#141416"
        sg.fillRect(0, 0, 1000, 160)

        // Burnt orange / dark crimson edge stitching
        sg.fillStyle = "#941f0c"
        sg.fillRect(0, 10, 1000, 4)
        sg.fillRect(0, 146, 1000, 4)

        sg.fillStyle = "#007f9e"
        sg.font = '600 34px "Obel Mono", "Obel", monospace'
        sg.fillText("UNG NHUT KHANG   *   WEB DEVELOPER   *   UMT   *   MM4YOU   *   ", 16, 95)
      }

      setTextures({
        front: fc.toDataURL("image/png"),
        back: bc.toDataURL("image/png"),
        strap: sc.toDataURL("image/png"),
      })
    }

    generateArt()
    return () => {
      alive = false
    }
  }, [vi])

  if (!textures) {
    return (
      <div className="relative aspect-[4/5] w-full max-w-[240px] animate-pulse overflow-hidden bg-secondary">
        <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-muted-foreground">
          INITIALIZING CARD // 3D
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full select-none cursor-grab active:cursor-grabbing">
      <Lanyard
        frontImage={textures.front}
        backImage={textures.back}
        strapImage={textures.strap}
        size={0.62}
        strapLength={0.22}
        strapWidth={0.58}
        finish="glossy"
        metal="graphite"
        cardColor="#0c0c0e"
        strapColor="#141416"
        breeze={0.12}
        damping={0.58}
        elasticity={0.5}
        cornerRadius={0.18}
        interactive={true}
        intro={true}
        className="block h-full w-full"
      />
    </div>
  )
}
