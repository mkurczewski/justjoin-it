import { createWrapper } from "next-redux-wrapper"
import { jobOffersSlice } from "../job-offers/store/job-offers"
import { configureStore } from "@reduxjs/toolkit"
import { mapSlice } from "../map/store/map"

export const makeStore = () => {
  return configureStore({
    reducer: {
      [jobOffersSlice.name]: jobOffersSlice.reducer,
      [mapSlice.name]: mapSlice.reducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type AppState = ReturnType<AppStore["getState"]>

export const storeWrapper = createWrapper<AppState>(makeStore)
