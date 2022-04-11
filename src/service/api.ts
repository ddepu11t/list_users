import { CountriesType, FilterType } from '../types'

const fetchUsers = async (filters: FilterType, initialResults?: number) => {
  const { countries, gender, results } = filters

  try {
    let nationalities = []

    if (countries) {
      let property: keyof CountriesType

      for (property in countries) {
        if (countries[property]) {
          nationalities.push(property)
        }
      }
    }

    const request = await fetch(
      `https://randomuser.me/api/?results=${
        initialResults ? initialResults : results
      }&gender=${gender}${
        nationalities.length > 0 ? `&nat=${nationalities.join(',')}` : ''
      }`
    )

    const data: any = await request.json()

    const newUsers = data.results.map((item: any) => {
      return {
        email: item.email,
        mobileNumber: item.phone,
        gender: item.gender,
        dob: item.dob.date,
        dpURL: item.picture.medium,
        fullName: `${item.name.title} ${item.name.first} ${item.name.last}`,
      }
    })

    return newUsers
  } catch (err: any) {
    console.log(err)
  }
}

export { fetchUsers }
