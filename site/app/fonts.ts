import localFont from "next/font/local"

/**
 * Obel Mono 1.001 — Typographic Systems
 * Variable monospace, weights 100–900, roman + italic.
 * Self-hosted through next/font/local; license in public/fonts/OFL.txt.
 */
export const obelMono = localFont({
  src: [
    {
      path: "./fonts/ObelMono-VF.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/ObelMono-Italic-VF.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-obel",
  display: "swap",
  preload: true,
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "monospace",
  ],
})
