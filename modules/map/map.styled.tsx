import styled from "styled-components"
import { theme } from "../../theme/theme-provider"

export const MapWrapper = styled.div<{ theme: typeof theme }>`
  background: ${({ theme }) => theme.color.white};
`
