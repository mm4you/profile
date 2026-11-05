"use client"

import * as React from "react"

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Ho_Chi_Minh",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
})

export function LocalTime() {
  const [time, setTime] = React.useState("--:--:--")

  React.useEffect(() => {
    const update = () => setTime(formatter.format(new Date()))
    update()

    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time}
    </span>
  )
}
