import { FunctionComponent, useEffect, useRef, useState } from "react"
import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "../store/store-wrapper"
import { MapState, setMapCenter, setMapZoom } from "./store/map"
import { MapWrapper } from "./map.styled"
import { JobOffer } from "../job-offers/job-offers.types"

interface Props {
  jobOffers: JobOffer[]
  selectOffer: (offer: JobOffer) => void
  selectedOffer?: JobOffer
}

export const Map: FunctionComponent<Props> = ({
  selectOffer,
  jobOffers,
  selectedOffer,
}) => {
  const dispatch = useDispatch()

  const mapSettings = useSelector<AppState, MapState>((state) => state.map)

  const mapRef = useRef<GoogleMap>(null)
  const [mapLoaded, setMapLoadedState] = useState(false)

  const markerClustererOptions = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  }

  const onLoad = () => setMapLoadedState(true)

  const onZoomChange = () => {
    if (mapRef.current) {
      dispatch(setMapZoom(mapRef.current.state.map.zoom))
    }
  }

  useEffect(() => {
    if (selectedOffer && mapLoaded) {
      dispatch(setMapZoom(15))
      dispatch(
        setMapCenter({
          lat: selectedOffer.latitude,
          lng: selectedOffer.longitude,
        })
      )
    }
  }, [selectedOffer, mapLoaded])

  return (
    <MapWrapper>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      >
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={mapSettings.center}
          zoom={mapSettings.zoom}
          onZoomChanged={onZoomChange}
          onTilesLoaded={onLoad}
          ref={mapRef}
        >
          <MarkerClusterer options={markerClustererOptions} maxZoom={14}>
            {(clusterer) => {
              return jobOffers.map((jobOffer) => {
                const { id, latitude, longitude } = jobOffer
                const markerActive = id === selectedOffer?.id

                const onClick = () => {
                  selectOffer(jobOffer)
                }

                return (
                  <Marker
                    position={{ lat: latitude, lng: longitude }}
                    clusterer={clusterer}
                    animation={markerActive ? 1 : 3}
                    key={id}
                    zIndex={markerActive ? 9999 : undefined}
                    onClick={onClick}
                  />
                )
              })
            }}
          </MarkerClusterer>
        </GoogleMap>
      </LoadScript>
    </MapWrapper>
  )
}
