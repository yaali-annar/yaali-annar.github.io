import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_PATH } from '@constants/url'

const Home: FC<Record<string, never>> = () => (
  <>
    <h1>Experiments</h1>
    <ul>
      <li>
        <Link to={ROUTE_PATH.PESTO}>Pesto</Link>
      </li>
    </ul>
  </>
)

export default Home
