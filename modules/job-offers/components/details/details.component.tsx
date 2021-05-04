import React, { FunctionComponent } from "react"
import { DetailsWrapper, GoBackButton, LevelBar } from "./details.styled"
import { JobOffer } from "../../job-offers.types"
import Link from "next/link"
import { parseSalary } from "../../helpers/parse-salary/parse-salary"

interface Props {
  jobOffer?: JobOffer
}

export const OfferDetails: FunctionComponent<Props> = ({ jobOffer }) => {
  return (
    <DetailsWrapper active={Boolean(jobOffer)}>
      <Link href="/">
        <GoBackButton>&lt; Go back</GoBackButton>
      </Link>
      <a href={jobOffer?.company_url}>
        <img src={jobOffer?.company_logo_url} alt="" />
      </a>
      <p>
        {jobOffer?.title} at {jobOffer?.company_name} needed.
      </p>
      <p>
        <strong>Remote work:</strong> {jobOffer?.remote ? "yes" : "no"}
      </p>
      <p>
        <strong>Employment type:</strong> {jobOffer?.employment_type}
      </p>
      <p>
        <strong>Company location:</strong> {jobOffer?.city} (
        {jobOffer?.company_size} employees)
      </p>
      <p>
        <strong>Experience level:</strong> {jobOffer?.experience_level}
      </p>
      <div>
        <p>
          <strong>Required skills:</strong>
        </p>
        {jobOffer?.skills.map(({ name, level }) => (
          <LevelBar key={name} data-testid="skill">
            <p>{name}</p>
            <progress max="5" value={level} />
          </LevelBar>
        ))}
      </div>
      <p>
        <strong>Salary:</strong>{" "}
        {parseSalary(
          { min: jobOffer?.salary_from, max: jobOffer?.salary_to },
          jobOffer?.salary_currency || undefined
        )}
      </p>
    </DetailsWrapper>
  )
}
