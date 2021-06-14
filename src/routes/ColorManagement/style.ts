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

  table: {
    borderCollapse: 'collapse',
    td: {
      padding: 8,
      input: {
        width: 80,
      },
      '.color-box': {
        width: 32,
        height: 32,
        border: '2px solid black',
      },
    },
    '.selected': {
      td: {
        color: 'white',
        backgroundColor: 'black',
        '.color-box': {
          border: '2px solid white',
        },
      },
    },
  },
})

export { rybStyle }
