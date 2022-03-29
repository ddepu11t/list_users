interface UserInterfece {
  email: string
  mobileNumber: string
  gender: string
  dob: string
  dpURL: string
  fullName: string
}

interface InitialStateType {
  users: UserInterfece[]
  loading: boolean
  setUsers: (users: UserInterfece[]) => void
}

export { UserInterfece, InitialStateType }
