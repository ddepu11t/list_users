import { createContext, ReactElement, useContext, useReducer } from 'react'
import { InitialStateType, UserInterfece } from '../interfaces'
import reducer from '../reducers/reducer'

const initialState: InitialStateType = {
  users: [],
  loading: true,
  setUsers: (users) => {},
}

const AppContext = createContext(initialState)

const AppProvider = ({ children }: { children: ReactElement }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setUsers = (users: UserInterfece[]) => {
    dispatch({ type: 'SET_USERS', payload: users })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        setUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppProvider, useGlobalContext }
