import styled, { css } from "styled-components"
import { theme } from "../../../../theme/theme-provider"

const wrapperActiveStyles = css`
  transform: translate3d(0, 0, 0);
`

export const GoBackButton = styled.span`
  font-size: 1.3rem;
  text-decoration: none;
`

export const LevelBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 2rem;
`

export const DetailsWrapper = styled.aside<{
  active?: boolean
  theme: typeof theme
}>`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: ${({ theme }) => theme.color.whiteAlpha};
  backdrop-filter: blur(0.5rem);
  transform: translate3d(100%, 0, 0);
  transition: transform 0.3s ease-in-out;

  ${({ active }) => active && wrapperActiveStyles};

  a {
    align-self: flex-end;
  }

  img {
    height: 6rem;
    width: auto;
  }

  p {
    margin: 0.5rem;
    font-size: 1.6rem;
  }
`
