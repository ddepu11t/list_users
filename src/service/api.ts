const fetchUsers = async (results: number, gender: string) => {
  try {
    const request = await fetch(
      `https://randomuser.me/api/?results=${results}&gender=${gender}`
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
