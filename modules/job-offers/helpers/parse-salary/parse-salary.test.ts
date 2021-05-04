import { formatCurrency, parseSalary } from "./parse-salary"

jest.dontMock("@formatjs/intl-numberformat/polyfill")
jest.dontMock("@formatjs/intl-numberformat/locale-data/pl")

test("Number is formatted properly", () => {
  expect(formatCurrency(10)).toBe("10")
  expect(formatCurrency(100)).toBe("100")
  expect(formatCurrency(1000)).toBe("1000")
  expect(formatCurrency(10000)).toBe("10 000")
  expect(formatCurrency(100000)).toBe("100 000")
})

test("Currency is formatted properly", () => {
  expect(formatCurrency(10, "pln")).toBe("10 PLN")
  expect(formatCurrency(100, "pln")).toBe("100 PLN")
  expect(formatCurrency(1000, "pln")).toBe("1000 PLN")
  expect(formatCurrency(10000, "pln")).toBe("10 000 PLN")
  expect(formatCurrency(100000, "pln")).toBe("100 000 PLN")
})

test("Min salary is parsed properly", () => {
  expect(parseSalary({ min: 3000 })).toBe("3000 PLN")
  expect(parseSalary({ min: 30000 })).toBe("30 000 PLN")
})

test("Max salary is parsed properly", () => {
  expect(parseSalary({ max: 5000 })).toBe("5000 PLN")
  expect(parseSalary({ max: 50000 })).toBe("50 000 PLN")
})

test("Both min & max salary are parsed properly", () => {
  expect(parseSalary({ min: 3000, max: 5000 })).toBe("3000 - 5000 PLN")
  expect(parseSalary({ min: 30000, max: 50000 })).toBe("30 000 - 50 000 PLN")
  expect(parseSalary({ min: 3000, max: 50000 })).toBe("3000 - 50 000 PLN")
})

test("No salary data is parsed properly", () => {
  expect(parseSalary({ min: null })).toBe("")
})

test("EUR currency is parsed properly", () => {
  expect(parseSalary({ min: 3000, max: 5000 }, "EUR")).toBe("3000 - 5000 EUR")
  expect(parseSalary({ min: 30000, max: 50000 }, "EUR")).toBe(
    "30 000 - 50 000 EUR"
  )
  expect(parseSalary({ min: 3000, max: 50000 }, "EUR")).toBe(
    "3000 - 50 000 EUR"
  )
})
