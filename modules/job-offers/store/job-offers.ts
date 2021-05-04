import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import { JobOffer } from "../job-offers.types"
import { AppState } from "../../store/store-wrapper"
import { generateSlug } from "../helpers/parse-link/generate-slug"

const hydrate = createAction<AppState>(HYDRATE)

export interface JobOffersState {
  items: JobOffer[]
  selectedOffer?: JobOffer
}

export const initialState: JobOffersState = {
  items: [],
}

export const jobOffersSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<JobOffersState["items"]>) => {
      state.items = payload
    },
    select: (state, { payload }: PayloadAction<string | undefined>) => {
      state.selectedOffer =
        payload === undefined
          ? undefined
          : state.items.find((offer) => generateSlug(offer) === payload)
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload.jobs,
      }
    })
  },
})

export const {
  set: setJobOffers,
  select: selectJobOffer,
} = jobOffersSlice.actions
