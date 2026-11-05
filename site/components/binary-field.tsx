const ROWS = Array.from({ length: 64 }, (_, row) =>
  Array.from({ length: 360 }, (_, column) => {
    const value = (row * 131 + column * 17) % 7 === 0 ? "1" : "0"
    return column > 0 && column % 4 === 0 ? ` ${value}` : value
  }).join("")
)

export function BinaryField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={className ? `binary-field ${className}` : "binary-field"}
    >
      {ROWS.map((row, index) => (
        <span key={index}>{row}</span>
      ))}
    </div>
  )
}
