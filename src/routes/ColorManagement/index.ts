import { lazy } from 'react'
import { ROUTE_PATH } from '@constants/url'

export default {
  exact: true,
  path: ROUTE_PATH.COLOR_MANAGEMENT,
  Component: lazy(() => import('./ColorManagement')),
}
