import { Provider } from "react-redux"
import RoutesApp from "./routes/RoutesApp"
import { persistor, store } from "./store"
import { PersistGate } from "redux-persist/integration/react"
import './App.css'

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RoutesApp />
        </PersistGate>
      </Provider>
    </>
  )
}

export default App

