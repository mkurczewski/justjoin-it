import "@formatjs/intl-numberformat/polyfill"
import "@formatjs/intl-numberformat/locale-data/pl"
import { JobOffer } from "../../job-offers.types"

interface SalaryProps {
  min?: JobOffer["salary_from"]
  max?: JobOffer["salary_to"]
}

export const formatCurrency = (value: number, currency?: string): string => {
  return new Intl.NumberFormat("pl-PL", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    ...(currency
      ? {
          style: "currency",
          currency,
          currencyDisplay: "code",
        }
      : {}),
  })
    .format(value)
    .replace(/\s/g, " ")
}

export const parseSalary = (
  { min, max }: SalaryProps,
  currency: string = "pln"
): string => {
  const salary = [min, max].filter(Boolean) as number[]

  switch (salary.length) {
    case 2:
      return `${formatCurrency(salary[0])} - ${formatCurrency(
        salary[1],
        currency
      )}`
    case 1:
      return formatCurrency(salary[0], currency)
    default:
      return ""
  }
}
