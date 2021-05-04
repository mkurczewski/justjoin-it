import React, { ComponentProps } from "react"
import { renderWithThemeAndStore } from "../../../../utlis/render-with-theme-and-store"
import { JobOffer } from "../../job-offers.types"
import { OfferDetails } from "./details.component"
import { parseSalary } from "../../helpers/parse-salary/parse-salary"

const testOffer: JobOffer = {
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
}

const render = (
  props: ComponentProps<typeof OfferDetails> = {
    jobOffer: testOffer,
  }
) => {
  return renderWithThemeAndStore(<OfferDetails {...props} />)
}

test("Offer details shows 'go back' link properly", () => {
  const { getByText } = render()
  expect(getByText("< Go back")).toBeInTheDocument()
})

test("Offer details shows description properly", () => {
  const { getByText } = render()
  expect(
    getByText(`${testOffer.title} at ${testOffer.company_name} needed.`)
  ).toBeInTheDocument()
})

test("Offer details shows remote status properly", () => {
  const { container } = render()
  expect(container).toHaveTextContent(
    `Remote work: ${testOffer.remote ? "yes" : "no"}`
  )
})

test("Offer details shows employment status properly", () => {
  const { container } = render()
  expect(container).toHaveTextContent(
    `Employment type: ${testOffer.employment_type}`
  )
})

test("Offer details shows company location properly", () => {
  const { container } = render()
  expect(container).toHaveTextContent(
    `Company location: ${testOffer.city} (${testOffer.company_size} employees)`
  )
})

test("Offer details shows required experience level properly", () => {
  const { container } = render()
  expect(container).toHaveTextContent(
    `Experience level: ${testOffer.experience_level}`
  )
})

test("Offer details shows required skills properly", () => {
  const { getByText, getAllByTestId, getAllByRole } = render()
  expect(getByText("Required skills:")).toBeInTheDocument()
  expect(getAllByTestId("skill")).toHaveLength(testOffer.skills.length)

  getAllByTestId("skill").forEach((skill, index) => {
    const { name, level } = testOffer.skills[index]
    expect(skill).toHaveTextContent(name)
    expect(getAllByRole("progressbar")[index]).toHaveAttribute("max", "5")
    expect(getAllByRole("progressbar")[index]).toHaveAttribute(
      "value",
      level.toString()
    )
  })
})

test("Offer details component renders salary information properly", () => {
  const { container } = render()

  expect(container).toHaveTextContent(
    parseSalary(
      {
        min: testOffer.salary_from,
        max: testOffer.salary_to,
      },
      testOffer.salary_currency || undefined
    ) as string
  )
})
