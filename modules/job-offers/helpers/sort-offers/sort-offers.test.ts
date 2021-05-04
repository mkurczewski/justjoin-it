import { sortOffers } from "./sort-offers"
import { JobOffer } from "../../job-offers.types"

const testOffers = [
  {
    published_at: new Date("2021-03-10").toISOString(),
    city: "A",
    company_name: "B",
    title: "C",
  },
  {
    published_at: new Date("2021-03-09").toISOString(),
    city: "A",
    company_name: "B",
    title: "A",
  },
  {
    published_at: new Date("2021-03-09").toISOString(),
    city: "A",
    company_name: "A",
    title: "B",
  },
  {
    published_at: new Date("2021-03-11").toISOString(),
    city: "B",
    company_name: "B",
    title: "C",
  },
  {
    published_at: new Date("2021-03-11").toISOString(),
    city: "B",
    company_name: "A",
    title: "A",
  },
  {
    published_at: new Date("2021-03-09").toISOString(),
    city: "B",
    company_name: "B",
    title: "A",
  },
] as JobOffer[]

test("Offers are sorted by city, company name and title properly", () => {
  expect(sortOffers(testOffers)).toMatchInlineSnapshot(`
    Array [
      Object {
        "city": "B",
        "company_name": "A",
        "published_at": "2021-03-11T00:00:00.000Z",
        "title": "A",
      },
      Object {
        "city": "B",
        "company_name": "B",
        "published_at": "2021-03-11T00:00:00.000Z",
        "title": "C",
      },
      Object {
        "city": "A",
        "company_name": "B",
        "published_at": "2021-03-10T00:00:00.000Z",
        "title": "C",
      },
      Object {
        "city": "A",
        "company_name": "A",
        "published_at": "2021-03-09T00:00:00.000Z",
        "title": "B",
      },
      Object {
        "city": "A",
        "company_name": "B",
        "published_at": "2021-03-09T00:00:00.000Z",
        "title": "A",
      },
      Object {
        "city": "B",
        "company_name": "B",
        "published_at": "2021-03-09T00:00:00.000Z",
        "title": "A",
      },
    ]
  `)
})
