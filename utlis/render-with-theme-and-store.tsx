import React from "react"
import {
  Queries,
  render,
  RenderOptions,
  RenderResult,
} from "@testing-library/react"
import "@testing-library/jest-dom"
import { AppThemeProvider } from "../theme/theme-provider"
import { Provider } from "react-redux"
import { makeStore } from "../modules/store/store-wrapper"

export function renderWithThemeAndStore(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
): RenderResult
export function renderWithThemeAndStore<Q extends Queries>(
  ui: React.ReactElement,
  options: RenderOptions<Q>
): RenderResult
export function renderWithThemeAndStore<Q extends Queries>(
  ui: React.ReactElement,
  options?: RenderOptions<Q>
): RenderResult {
  return render(
    <Provider store={makeStore()}>
      <AppThemeProvider>{ui}</AppThemeProvider>
    </Provider>,
    options
  )
}
