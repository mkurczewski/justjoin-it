/*
  Below interfaces are only covering the test data!

  To generate the closest possible types for the data coming from API, I just
  slightly modified the results from https://jvilk.com/MakeTypes/. In real
  application this would be probably more advanced and have better typing.
 */
interface JobSkills {
  name: string
  level: number
}

export interface JobOffer {
  id: string
  title: string
  street: string | null
  city: string
  country_code: string | null
  marker_icon: string
  remote: boolean
  experience_level: string
  salary_from: number | null
  salary_to: number | null
  salary_currency: string | null
  latitude: number
  longitude: number
  employment_type: string
  published_at: string
  company_name: string
  company_url: string
  company_size: string | null
  company_logo_url: string
  skills: JobSkills[]
}
