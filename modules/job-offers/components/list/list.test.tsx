import React, { ComponentProps } from "react"
import { renderWithThemeAndStore } from "../../../../utlis/render-with-theme-and-store"
import { List } from "./list.component"
import { JobOffer } from "../../job-offers.types"
import { getAllByRole } from "@testing-library/dom"

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: {
      slug: "test-offer-id",
    },
  }),
}))

const testOffers: JobOffer[] = [
  {
    id: "react-developer-30362ea8-5172-4ee1-8dd7-1848f39f12ae",
    title: "React Developer",
    street: "Wojskowa 6",
    city: "Poznań",
    country_code: "PL",
    marker_icon: "javascript",
    remote: true,
    experience_level: "mid",
    salary_from: 6500,
    salary_to: 9750,
    salary_currency: "pln",
    latitude: 52.4017923,
    longitude: 16.8928083,
    employment_type: "b2b",
    published_at: "2019-01-07T17:24:36.196Z",
    company_name: "Dalttechnology",
    company_url: "http://dalttechnology.com",
    company_size: "350",
    company_logo_url:
      "https://test.justjoin.it/samples/offers/company_logos/original/178f36540e8dad10cdbe69f64da7bcf591571d40.png",
    skills: [
      {
        name: "React",
        level: 4,
      },
      {
        name: "HTML5 API",
        level: 3,
      },
      {
        name: "ES 2015+",
        level: 3,
      },
    ],
  },
  {
    id: "frontend-tech-lead-d41eed3e-cf9f-482f-9ae9-896f90c4b26f",
    title: "Frontend Tech Lead",
    street: "al. Jana Pawła II 29",
    city: "Warszawa",
    country_code: "PL",
    marker_icon: "javascript",
    remote: true,
    experience_level: "senior",
    salary_from: 14500,
    salary_to: 18000,
    salary_currency: "pln",
    latitude: 52.2389356,
    longitude: 20.9952166,
    employment_type: "b2b",
    published_at: "2019-01-07T17:24:26.423Z",
    company_name: "Ganjaflex",
    company_url: "http://ganjaflex.com",
    company_size: "450",
    company_logo_url:
      "https://test.justjoin.it/samples/offers/company_logos/original/01a3db957383e608b9a64f162feb56ad266eb658.png",
    skills: [
      {
        name: "frontend",
        level: 4,
      },
      {
        name: "team leadership",
        level: 4,
      },
    ],
  },
  {
    id: "senior-product-designer-b3c2439c-4b4b-4907-816f-dcb2cb5d0e7f",
    title: "Senior Product Designer",
    street: "al. Jana Pawła II 29",
    city: "Warszawa",
    country_code: "PL",
    marker_icon: "ux",
    remote: true,
    experience_level: "senior",
    salary_from: 10000,
    salary_to: 16250,
    salary_currency: "pln",
    latitude: 52.2389356,
    longitude: 20.9952166,
    employment_type: "b2b",
    published_at: "2019-01-07T17:17:55.506Z",
    company_name: "Codehow",
    company_url: "http://codehow.com",
    company_size: "500",
    company_logo_url:
      "https://test.justjoin.it/samples/offers/company_logos/original/646ad773eb729e500fb60baea1896590b7eb31eb.png",
    skills: [
      {
        name: "Product design",
        level: 4,
      },
      {
        name: "English",
        level: 3,
      },
    ],
  },
]
const selectOffer = jest.fn()

const render = (
  props: ComponentProps<typeof List> = {
    jobOffers: [],
    selectOffer: jest.fn,
  }
) => {
  return renderWithThemeAndStore(<List {...props} />)
}

test("List shows loading state when no job offers are passed", () => {
  const { getByText } = render()
  expect(getByText("loading offers...")).toBeVisible()
})

test("List shows offers when some offers are passed", () => {
  const { getAllByRole } = render({ jobOffers: testOffers, selectOffer })
  expect(getAllByRole("listitem")).toHaveLength(testOffers.length)
})

test("Item 'click' is handled properly", () => {
  const testFn = jest.fn()
  const { getAllByRole } = render({
    jobOffers: testOffers,
    selectOffer: testFn,
  })

  expect(testFn).not.toBeCalled()
  getAllByRole("listitem")[0].click()
  expect(testFn).toBeCalledWith(testOffers[0])
})
