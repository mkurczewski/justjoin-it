import { useRouter } from "next/router"
import { FunctionComponent, useEffect } from "react"
import { JobOffer } from "../modules/job-offers/job-offers.types"
import { AppState } from "../modules/store/store-wrapper"
import {
  JobOffersState,
  selectJobOffer,
  setJobOffers,
} from "../modules/job-offers/store/job-offers"
import { useDispatch, useSelector } from "react-redux"
import { generateSlug } from "../modules/job-offers/helpers/parse-link/generate-slug"

const fetchOffers = async (): Promise<JobOffer[]> => {
  const res = await fetch(`https://test.justjoin.it/offers`)
  return res.json()
}

export async function getStaticPaths() {
  const jobOffers = await fetchOffers()
  const paths = jobOffers.map((jobOffer) => ({
    params: { slug: generateSlug(jobOffer) },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const jobOffers = await fetchOffers()
  const jobOffer = jobOffers.find(
    (jobOffer) => generateSlug(jobOffer) === params.slug
  )

  return {
    props: {
      jobOffer,
    },
  }
}

interface Props {
  jobOffer?: JobOffer
}

const Offer: FunctionComponent<Props> = ({ jobOffer }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const jobOffers = useSelector<AppState, JobOffersState["items"]>(
    (state) => state.jobs.items
  )

  useEffect(() => {
    if (jobOffer && jobOffers.length === 0) {
      dispatch(setJobOffers([jobOffer]))
      dispatch(selectJobOffer(generateSlug(jobOffer)))
    }
  }, [jobOffer, jobOffers])

  useEffect(() => {
    const { slug } = router.query

    if (slug) {
      router.replace(`/?slug=${slug}`, `/${slug}`)
    }
  }, [router.query.slug])

  return <></>
}

export default Offer
