import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  ReactElement,
  FC,
} from 'react'

type State = Record<string, unknown>
type StateFunction = (prevState: State) => State

type AppContextProps = {
  state: State
  updateState: (stateFunction: StateFunction) => void
  setState: (newState: State) => void
}

const AppContext = createContext<AppContextProps>({
  state: {},
  updateState: () => {},
  setState: () => {},
})

const { Provider } = AppContext

type AppProviderProps = {
  children: ReactElement
  initialState?: State
}

const AppProvider: FC<AppProviderProps> = ({
  children,
  initialState = {},
}: AppProviderProps) => {
  /* 
   The state variable will store all the data inside the app.
   I am using 'updateState'  because I want a different behaviour for the state setter 
  */
  const [state, updateState] = useState(initialState)

  /* 
   Just like class based setState, the setState() function only replaces the field described inside it.
   For example if you have state {a: 1, b: 2} calling setState({b: 3, c: 4)) 
   will result in the state being {a:1, b:3, c:4} */
  const setState = useCallback(
    (newState) => updateState((prevState) => ({ ...prevState, ...newState })),
    [],
  )

  const appContextValue = {
    state: {
      ...initialState,
      ...state,
    },
    updateState,
    setState,
  }

  return <Provider value={appContextValue}>{children}</Provider>
}

AppProvider.defaultProps = {
  initialState: {},
}

const useAppContext = (): AppContextProps => useContext(AppContext)

export { AppProvider, useAppContext }
