import React, { FC } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import Routes from './routes'
import { AppProvider } from '@contexts/AppContext'

const App: FC = () => (
  <HelmetProvider>
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </Helmet>
    <AppProvider>
      <Routes />
    </AppProvider>
  </HelmetProvider>
)

export default App
