import {
  Route, Routes, BrowserRouter,
} from 'react-router-dom'
import { useMemo } from 'react'
import { Authorization } from './components/Authorization'
import { ROUTES } from './utils/constants'
import { PrivateRoute } from './components/PrivateRoute'
import { Home } from './components/Home'
import { Store, storeContext } from './store'

export const App = () => {
  const storeValue = useMemo(() => new Store(), [Store])

  return (
    <storeContext.Provider value={storeValue}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.signIn} element={<Authorization />} />
          <Route
            path={ROUTES.home}
            element={(
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            )}
          />
        </Routes>
      </BrowserRouter>
    </storeContext.Provider>
  )
}
