import { generateSlug } from "./generate-slug"
import { JobOffer } from "../../job-offers.types"

test.each([
  [
    {
      company_name: "Company",
      city: "City",
      title: "C++ Developer",
    },
    "City-Cpp-Developer-at-Company",
  ],
  [
    {
      company_name: "Company",
      city: "City",
      title: "C# Developer",
    },
    "City-C-sharp-Developer-at-Company",
  ],
  [
    {
      company_name: "Company",
      city: "City",
      title: "C/C++ Developer",
    },
    "City-C-Cpp-Developer-at-Company",
  ],
  [
    {
      company_name: "Company",
      city: "City",
      title: "Fullstack Developer (Node/React)",
    },
    "City-Fullstack-Developer-Node-React-at-Company",
  ],
])("Offer slug is generated properly", (data, expected) => {
  expect(generateSlug(data as JobOffer)).toBe(expected)
})
