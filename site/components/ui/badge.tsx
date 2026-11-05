import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-none border px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase leading-[1.35] tracking-[0.08em] whitespace-nowrap transition-colors [&>svg]:pointer-events-none [&>svg]:size-2.5 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
  {
    variants: {
      variant: {
        default: "border-foreground bg-foreground text-background",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        outline:
          "border-border bg-transparent text-muted-foreground [a&]:hover:border-foreground [a&]:hover:text-foreground",
        accent:
          "border-primary/40 bg-primary/10 text-primary [a&]:hover:bg-primary [a&]:hover:text-primary-foreground",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/80",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
)

function Badge({
  className,
  variant = "outline",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
