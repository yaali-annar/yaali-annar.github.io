import { cx, css } from '@emotion/css'

const spaceSizes = [1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64]

const spaces = spaceSizes.reduce<Record<string, unknown>>(
  (lastSpaces, spaceSize) => {
    const paddingBottom = spaceSize
    const paddingLeft = spaceSize
    const paddingRight = spaceSize
    const paddingTop = spaceSize

    const marginBottom = spaceSize
    const marginLeft = spaceSize
    const marginRight = spaceSize
    const marginTop = spaceSize

    return {
      ...lastSpaces,
      [`.pb${spaceSize}`]: { paddingBottom },
      [`.pl${spaceSize}`]: { paddingLeft },
      [`.pr${spaceSize}`]: { paddingRight },
      [`.pt${spaceSize}`]: { paddingTop },

      [`.px${spaceSize}`]: { paddingLeft, paddingRight },
      [`.py${spaceSize}`]: { paddingBottom, paddingTop },
      [`.p${spaceSize}`]: {
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
      },

      [`.mb${spaceSize}`]: { marginBottom },
      [`.ml${spaceSize}`]: { marginLeft },
      [`.mr${spaceSize}`]: { marginRight },
      [`.mt${spaceSize}`]: { marginTop },

      [`.mx${spaceSize}`]: { marginLeft, marginRight },
      [`.my${spaceSize}`]: { marginBottom, marginTop },
      [`.m${spaceSize}`]: {
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
      },
    }
  },
  {},
)

const utilities = css({
  '.flex': {
    display: 'flex',
    alignItems: 'center',
    '&.column': {
      flexDirection: 'column',
    },
    '&.items-': {
      '&start': {
        alignItems: 'flex-start',
      },
    },
    '&.justify-': {
      '&center': {
        justifyContent: 'center',
      },
      '&between': {
        justifyContent: 'space-between',
      },
      '&around': {
        justifyContent: 'space-around',
      },
    },
  },
  '.text-': {
    '&center': {
      textAlign: 'center',
    },
  },
  ...spaces,
})

const aesthetic = css({
  fontFamily: "'Roboto Mono', monospace",
  'p,h1,h2,h3,h4,h5': {
    margin: 0,
  },
})

const globalStyle = cx(aesthetic, utilities)

export default globalStyle
