import React, { FC } from 'react'
import { cx } from '@emotion/css'

import useAdaptiveSize from '@hooks/useAdaptiveSize'
import globalStyle from '@styles/globalStyle'
import globalMobileStyle from '@styles/globalMobileStyle'
import globalDesktopStyle from '@styles/globalDesktopStyle'

type AdaptiveProps = {
  Desktop: FC
  Mobile: FC
}

const Adaptive: FC<AdaptiveProps> = ({
  Mobile,
  Desktop,
  ...props
}: AdaptiveProps) => {
  const { mobile } = useAdaptiveSize()
  const adaptiveStyle = mobile ? globalMobileStyle : globalDesktopStyle
  const Component = mobile ? Mobile : Desktop

  return (
    <div className={adaptiveStyle}>
      <Component {...props} />
    </div>
  )
}

export default Adaptive
