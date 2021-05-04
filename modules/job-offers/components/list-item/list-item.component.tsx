import React, { ForwardedRef, forwardRef, FunctionComponent } from "react"
import { JobOffer } from "../../job-offers.types"
import {
  Address,
  CompanyLogo,
  EmploymentType,
  JobTitle,
  ListItemWrapper,
  Salary,
} from "./list-item.styled"
import { parseSalary } from "../../helpers/parse-salary/parse-salary"

interface Props {
  jobOffer: JobOffer
  onClick: () => void
  itemRef?: ForwardedRef<HTMLLIElement>
}

export const ListItemComponent: FunctionComponent<Props> = ({
  jobOffer: {
    title,
    company_logo_url,
    city,
    company_name,
    salary_from,
    salary_to,
    salary_currency,
    employment_type,
  },
  onClick,
  itemRef,
}) => {
  const salaryInformation = parseSalary(
    { min: salary_from, max: salary_to },
    salary_currency || undefined
  )
  return (
    <ListItemWrapper onClick={onClick} ref={itemRef}>
      <CompanyLogo role="img" src={company_logo_url} alt="" />
      <JobTitle>{title}</JobTitle>
      <Address>
        <p>{company_name}</p>
        <p>{city}</p>
      </Address>
      <Salary>{salaryInformation}</Salary>
      <EmploymentType>{employment_type}</EmploymentType>
    </ListItemWrapper>
  )
}

export const ListItem = forwardRef<HTMLLIElement, Props>((props, ref) => (
  <ListItemComponent {...props} itemRef={ref} />
))
