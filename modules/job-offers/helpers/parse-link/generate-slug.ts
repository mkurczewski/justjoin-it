import slugify from "slugify"
import { JobOffer } from "../../job-offers.types"

export const generateSlug = ({
  company_name,
  title,
  city,
}: Pick<JobOffer, "company_name" | "title" | "city">): string => {
  const slug = `${city}-${title}-at-${company_name}`
    .replace(/C\+\+/g, "Cpp")
    .replace(/C#/g, "C sharp")
    .replace(/[/\\]/g, "-")
  return slugify(slug, {
    remove: /[*+~.,()'"!:@\/\\\[\]]/g,
  })
}
