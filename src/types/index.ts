type CountriesType = {
  US: boolean
  FR: boolean
  GB: boolean
}

type FilterType = {
  gender: string
  results: number
  countries: CountriesType
}

export { CountriesType, FilterType }
