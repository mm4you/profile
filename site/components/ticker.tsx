import { cn } from "@/lib/utils"

const items = [
  "Available for 2026 internships",
  "Web Development",
  "React 19 / Next.js 16",
  "TypeScript & Tailwind CSS",
  "PostgreSQL / Supabase / Prisma",
  "Top 20 Digiport Hackathon",
  "UMT Software Engineering",
  "HCMC · GMT+7",
]

export function Ticker({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "ticker flex items-center border-y border-border bg-background py-2.5",
        className
      )}
      aria-hidden="true"
    >
      <div className="ticker-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="ticker-group">
            {items.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center gap-7">
                <span>{item}</span>
                <span className="text-primary">*</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
