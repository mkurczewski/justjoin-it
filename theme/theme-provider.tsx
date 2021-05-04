import React, { FunctionComponent } from "react"
import { ThemeProvider } from "styled-components"
import { Normalize } from "styled-normalize"
import { GlobalStyle } from "./global-style"
import { color } from "./color"

export const theme = {
  color,
} as const

export const AppThemeProvider: FunctionComponent = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Normalize />
    <GlobalStyle />
    {children}
  </ThemeProvider>
)
