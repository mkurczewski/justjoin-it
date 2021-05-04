import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppState } from "../../store/store-wrapper"
import { HYDRATE } from "next-redux-wrapper"

const hydrate = createAction<AppState>(HYDRATE)

export interface MapState {
  center: {
    lat: number
    lng: number
  }
  zoom: number
}

export const initialState: MapState = {
  center: {
    lat: 52,
    lng: 19,
  },
  zoom: 7,
}

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setCenter: (state, { payload }: PayloadAction<MapState["center"]>) => {
      state.center = payload
    },
    setZoom: (state, { payload }: PayloadAction<MapState["zoom"]>) => {
      state.zoom = payload
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload[mapSlice.name],
      }
    })
  },
})

export const { setZoom: setMapZoom, setCenter: setMapCenter } = mapSlice.actions
