import { JobOffer } from "../../job-offers.types"

export const sortOffers = (jobOffers: JobOffer[]): JobOffer[] => {
  return jobOffers.sort((a, b) => {
    if (a && b) {
      return (
        new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime() ||
        a.city.localeCompare(b.city) ||
        a.company_name.localeCompare(b.company_name) ||
        a.title.localeCompare(b.title)
      )
    }
    return 0
  })
}
