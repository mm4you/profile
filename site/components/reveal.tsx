"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type RevealDirection = "up" | "left" | "right" | "fade"

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: RevealDirection
  as?: "div" | "article" | "aside" | "section"
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  as = "div",
}: RevealProps) {
  const elementRef = React.useRef<HTMLElement | null>(null)
  const setElement = React.useCallback((node: HTMLElement | null) => {
    elementRef.current = node
  }, [])

  React.useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.classList.add("is-visible")
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        element.classList.add("is-visible")
        observer.disconnect()
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const classes = cn(
    "reveal",
    direction !== "up" && `reveal-${direction}`,
    className
  )
  const style = delay ? { transitionDelay: `${delay}ms` } : undefined

  if (as === "aside") {
    return (
      <aside ref={setElement} className={classes} style={style}>
        {children}
      </aside>
    )
  }

  if (as === "section") {
    return (
      <section ref={setElement} className={classes} style={style}>
        {children}
      </section>
    )
  }

  if (as === "article") {
    return (
      <article ref={setElement} className={classes} style={style}>
        {children}
      </article>
    )
  }

  return (
    <div ref={setElement} className={classes} style={style}>
      {children}
    </div>
  )
}
