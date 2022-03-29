const fetchUsers = async (results: number, gender: string) => {
  try {
    const request = await fetch(
      `https://randomuser.me/api/?results=${results}&gender=${gender}`
    )

    const data: any = await request.json()

    return data.results
  } catch (err: any) {
    console.log(err)
  }
}

export { fetchUsers }
