import styled from "styled-components"
import { ListWrapper } from "./components/list/list.styled"
import { MapWrapper } from "../map/map.styled"
import { DetailsWrapper } from "./components/details/details.styled"

export const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-columns: auto;
  grid-template-areas: "List Map";

  ${ListWrapper} {
    grid-area: List;
    z-index: 1;
  }

  ${DetailsWrapper} {
    grid-area: List;
    z-index: 2;
  }

  ${MapWrapper} {
    grid-area: Map;
    z-index: 3;
  }
`
