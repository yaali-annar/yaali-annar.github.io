import { css } from '@emotion/css'
import { CANVAS_DIMENSION } from './data'

const rybStyle = css({
  '.wrapper': {
    position: 'relative',
    width: CANVAS_DIMENSION,
    height: CANVAS_DIMENSION,
  },
  '.wrapper canvas, .wrapper div': {
    position: 'absolute',
    width: CANVAS_DIMENSION,
    height: CANVAS_DIMENSION,
    inset: 0,
  },
  '.color-box': {
    display: 'inline',
    width: 30,
    height: 30,
  },
})

export { rybStyle }
