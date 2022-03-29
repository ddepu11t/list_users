const reducer = (state: any, action: any) => {
  const users = action.payload

  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users,
        loading: false,
      }
      break
  }
}
export default reducer
