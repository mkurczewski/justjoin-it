import styled from "styled-components"

export const CompanyLogo = styled.img`
  grid-area: Logo;
  height: 100%;
  width: 100%;
  display: block;
  margin: 0;
  object-fit: contain;
  object-position: center;
`

export const JobTitle = styled.h2`
  grid-area: Title;
  font-size: 1.7rem;
  line-height: 1em;
  font-weight: bold;
  margin: 0;
  align-self: center;
`

export const Address = styled.address`
  grid-area: Address;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-style: normal;

  p {
    margin: 0 1rem 0 0;
    font-size: 1.2rem;
  }
`

export const Salary = styled.p`
  grid-area: Salary;
  font-size: 1.5rem;
  font-weight: 600;
  justify-self: end;
  margin: 0;
`

export const EmploymentType = styled.p`
  grid-area: EmploymentType;
  margin: 0;
  justify-self: end;
  font-size: 1.2rem;
`

export const ListItemWrapper = styled.li`
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: 5rem 1fr 15rem;
  grid-template-rows: 3rem 2rem;
  grid-template-areas:
    "Logo Title Salary"
    "Logo Address EmploymentType";
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.5);
  margin: 1.5rem;
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
`
