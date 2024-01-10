const SHORT_HEX = /^#([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i
const HEX = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i
const VALUE = /(?:\d+|\d*\.\d+)%?/
const SEP = /(?:\s*,\s*|\s+)/
const ALPHA_SEP = /\s*[,/]\s*/
const PROPERTY = /var\(--(?:[^ )]*?)(?:,(?:[^ )]*?|var\(--[^ )]*?\)))?\)/
const RGB = new RegExp(
  `^(rgba?)\\(\\s*(${VALUE.source}|${PROPERTY.source})(?:${SEP.source}(${VALUE.source}|${PROPERTY.source}))?(?:${SEP.source}(${VALUE.source}|${PROPERTY.source}))?(?:${ALPHA_SEP.source}(${VALUE.source}|${PROPERTY.source}))?\\s*\\)$`
)
const HSL = new RegExp(
  `^(hsla?)\\(\\s*((?:${VALUE.source})(?:deg|rad|grad|turn)?|${PROPERTY.source})(?:${SEP.source}(${VALUE.source}|${PROPERTY.source}))?(?:${SEP.source}(${VALUE.source}|${PROPERTY.source}))?(?:${ALPHA_SEP.source}(${VALUE.source}|${PROPERTY.source}))?\\s*\\)$`
)

/**
 * Parses a color string and extracts color components.
 *
 * @param value - The color string to parse.
 * @returns An object with information about the parsed color, or null if parsing fails.
 */
export function parseColor(value: string) {
  value = value.trim()

  const hex = value
    .replace(SHORT_HEX, (_, r, g, b, a) =>
      ["#", r, r, g, g, b, b, a ? a + a : ""].join("")
    )
    .match(HEX)

  if (hex !== null)
    return {
      mode: "rgb",
      color: hex.splice(1, 3).map(v => parseInt(v, 16).toString()),
      alpha: hex[4] ? (parseInt(hex[4], 16) / 255).toString() : undefined
    }

  const match = value.match(RGB) ?? value.match(HSL)
  if (match === null) return null

  const color = [match[2], match[3], match[4]]
    .filter(Boolean)
    .map(v => v!.toString())

  if (color.length === 2 && color[0]!.startsWith("var("))
    return { mode: match[1], color: [color[0]], alpha: color[1] }

  if (color.length < 3 && !color.some(part => /^var\(.*?\)$/.test(part)))
    return null

  return { mode: match[1], color, alpha: match[5]?.toString?.() }
}
