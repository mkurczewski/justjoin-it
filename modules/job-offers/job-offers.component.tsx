import React, { FunctionComponent, useEffect } from "react"
import { Wrapper } from "./job-offers.styled"
import { List } from "./components/list/list.component"
import { Map } from "../map/map.component"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "../store/store-wrapper"
import { JobOffersState, selectJobOffer } from "./store/job-offers"
import { OfferDetails } from "./components/details/details.component"
import { useRouter } from "next/router"
import { generateSlug } from "./helpers/parse-link/generate-slug"
import { JobOffer } from "./job-offers.types"

export const JobOffers: FunctionComponent = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const jobOffers = useSelector<AppState, JobOffersState["items"]>(
    (state) => state.jobs.items
  )
  const selectedOffer = useSelector<AppState, JobOffersState["selectedOffer"]>(
    (state) => state.jobs.selectedOffer
  )

  const selectOffer = (offer: JobOffer) => {
    const slug = generateSlug(offer)
    /*
      Links can be more sexy by joining the job title with company name and city,
      just like it's done on real justjoin.it. I used the `id` only for demo purposes.
    */
    router.push(`/?slug=${slug}`, `/${slug}`, {
      shallow: true,
    })
  }

  useEffect(() => {
    if (router.query.slug && jobOffers.length) {
      dispatch(selectJobOffer(router.query.slug as string))
    } else if (selectedOffer) {
      dispatch(selectJobOffer())
    }
  }, [router.query.slug, jobOffers])

  return (
    <Wrapper>
      <List
        jobOffers={jobOffers}
        selectedOffer={selectedOffer}
        selectOffer={selectOffer}
      />
      <OfferDetails jobOffer={selectedOffer} />
      <Map
        jobOffers={jobOffers}
        selectedOffer={selectedOffer}
        selectOffer={selectOffer}
      />
    </Wrapper>
  )
}
