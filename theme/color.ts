export const color = {
  black: "#000000",
  white: "#ffffff",
  whiteAlpha: "rgba(255,255,255,.8)",
  blue: "#c8daef",
} as const

export type Color = keyof typeof color
