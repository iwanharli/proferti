/** Format harga listing (IDR implisit dalam UI). */
export function formatPropertyPrice(startPrice: number): string {
  if (startPrice >= 1_000_000_000) {
    const b = startPrice / 1_000_000_000
    const rounded = Number.isInteger(b)
      ? b.toString()
      : b.toFixed(1).replace(/\.0$/, '')
    return `${rounded} M`
  }
  const jt = Math.round(startPrice / 1_000_000)
  return `${jt} Jt`
}
