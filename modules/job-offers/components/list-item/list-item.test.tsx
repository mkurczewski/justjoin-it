import { ListItem } from "./list-item.component"
import { JobOffer } from "../../job-offers.types"
import { renderWithThemeAndStore } from "../../../../utlis/render-with-theme-and-store"
import React, { ComponentProps } from "react"
import { parseSalary } from "../../helpers/parse-salary/parse-salary"

/*
  Normally, I would use a mocked data with random/fake values but for demo purposes
  I just copied one of the entry from test API response
 */
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

const testFn = jest.fn()

const render = (
  props: ComponentProps<typeof ListItem> = {
    jobOffer: testOffer,
    onClick: testFn,
  }
) => {
  return renderWithThemeAndStore(<ListItem {...props} />)
}

test("List item component renders job title properly", () => {
  const { getByText } = render()

  expect(getByText(testOffer.title)).toBeVisible()
})

test("List item component renders company logo properly", () => {
  const { getByRole } = render()

  expect(getByRole("img")).toHaveProperty("src", testOffer.company_logo_url)
})

test("List item component renders company name properly", () => {
  const { getByText } = render()

  expect(getByText(testOffer.company_name)).toBeVisible()
})

test("List item component renders location properly", () => {
  const { getByText } = render()

  expect(getByText(testOffer.city)).toBeVisible()
})

test("List item component renders salary information properly", () => {
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

test("List item component handles 'click' properly", () => {
  const { getByRole } = render()

  expect(testFn).not.toBeCalled()
  getByRole("listitem").click()
  expect(testFn).toBeCalled()
})
