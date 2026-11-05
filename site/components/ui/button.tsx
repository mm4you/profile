import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-none font-mono text-[10px] font-medium uppercase tracking-[0.08em] transition-[background-color,border-color,color,opacity] outline-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
  {
    variants: {
      variant: {
        default:
          "border border-foreground bg-foreground text-background hover:border-primary hover:bg-primary hover:text-primary-foreground",
        accent:
          "border border-primary bg-primary text-primary-foreground hover:border-foreground hover:bg-foreground hover:text-background",
        outline:
          "border border-border bg-transparent text-foreground hover:border-foreground hover:bg-secondary",
        secondary:
          "border border-transparent bg-secondary text-secondary-foreground hover:border-border",
        ghost:
          "border border-transparent text-muted-foreground hover:bg-secondary hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        destructive:
          "border border-destructive bg-destructive text-white hover:border-destructive/80 hover:bg-destructive/80",
      },
      size: {
        default: "h-9 px-4 py-2",
        xs: "h-7 px-2.5 text-[9px]",
        sm: "h-8 px-3 text-[10px]",
        lg: "h-10 px-6",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
