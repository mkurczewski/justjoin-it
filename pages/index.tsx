import React, { FunctionComponent } from "react"
import Head from "next/head"
import { JobOffer } from "../modules/job-offers/job-offers.types"
import { JobOffers } from "../modules/job-offers/job-offers.component"
import { storeWrapper } from "../modules/store/store-wrapper"
import { setJobOffers } from "../modules/job-offers/store/job-offers"
import { sortOffers } from "../modules/job-offers/helpers/sort-offers/sort-offers"

export const getStaticProps = storeWrapper.getStaticProps(async ({ store }) => {
  const res = await fetch(`https://test.justjoin.it/offers`)
  const jobOffers: JobOffer[] = await res.json()

  store.dispatch(setJobOffers(sortOffers(jobOffers)))
})

const Home: FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>MiniJustJoinIT</title>
        <meta name="description" content="MiniJustJoinIT - recruitment task" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <JobOffers />
      </main>
    </>
  )
}

export default Home
