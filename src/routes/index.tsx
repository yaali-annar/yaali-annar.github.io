import React, { FC, Suspense } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './Home'

import ColorManagement from './ColorManagement'
import LetterFrequency from './LetterFrequency'
import Pesto from './Pesto'
import SoundChange from './SoundChange'

import globalStyle from '@styles/globalStyle'

const routes = [
  { ...Pesto },
  { ...ColorManagement },
  { ...LetterFrequency },
  { ...SoundChange },

  { ...Home },
]

const App: FC<Record<string, never>> = () => (
  <Router basename="/">
    <Suspense fallback={null}>
      <div className={globalStyle}>
        <Switch>
          {routes.map(({ exact, path, Component }, index) => (
            <Route {...{ exact }} path={`/${path}`} key={index}>
              <Component />
            </Route>
          ))}
        </Switch>
      </div>
    </Suspense>
  </Router>
)

export default App
