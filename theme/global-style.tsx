import { createGlobalStyle } from "styled-components"
import { theme } from "./theme-provider"

export const GlobalStyle = createGlobalStyle<{ theme: typeof theme }>`
  html {
    font-family: 'Source Sans Pro', sans-serif;
    background: ${({ theme }) => theme.color.white};
    font-size: 10px;
    font-weight: 400;
    line-height: 1.5;
  }
  
  html, body, #__next, main {
    height: 100%;
  }
`
