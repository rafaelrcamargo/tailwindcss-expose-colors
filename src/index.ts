import type { PluginAPI } from "tailwindcss/types/config"

import { parseColor } from "./utils"

/**
 * Exposes Tailwind colors as CSS variables.
 *
 * @param props An object with the following properties:
 * - colors: The colors to expose.
 * - shades: The shades to expose.
 * - prefix: The prefix to use for the CSS variables.
 * @returns A Tailwind plugin API function.
 */
export const exposeColors = ({
  colors: COLORS = ["red"],
  shades: SHADES = ["500"],
  prefix = "--tw"
}) =>
  function ({ addBase, theme }: PluginAPI) {
    const colors = theme("colors")

    const filtered = toArray(colors!)
      .filter(([color, _]) => COLORS.includes(color))
      .map(([color, shades]) => [
        String(color),
        toArray(shades)
          .filter(([shade, _]) => SHADES.includes(shade))
          .map(([shade, color]) => [shade, color])
      ]) as [string, [[string, string]]][]

    addBase({
      ":root": Object.assign(
        {},
        ...filtered
          .map(([name, shades]) =>
            shades.map(([shade, color]) => ({
              [`${prefix}-${name}${shade === "DEFAULT" ? "" : "-" + shade}`]:
                parseColor(color)?.color.join(", ")
            }))
          )
          .flat()
      )
    })
  }

const toArray = <T extends Record<string, any>>(obj: T) =>
  Object.keys(obj).map(key => [key, obj[key]])
