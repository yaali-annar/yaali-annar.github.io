import { lazy } from 'react'
import { ROUTE_PATH } from '@constants/url'

export default {
  exact: true,
  path: ROUTE_PATH.HOME,
  Component: lazy(() => import('./Home')),
}
