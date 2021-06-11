import { useEffect, useCallback } from 'react'
import { useAppContext } from '@contexts/AppContext'

type AdaptiveSizeReturn = {
  mobile: boolean
  loading: boolean
}

type AdaptiveSizeState = {
  windowIsMobile: boolean
  windowIsLoaded: boolean
}

const useAdaptiveSize = (breakpoint = 720): AdaptiveSizeReturn => {
  const { state, setState } = useAppContext()
  const { windowIsMobile = false, windowIsLoaded = false } =
    state as AdaptiveSizeState

  const handleWindowSizeChange = useCallback(() => {
    setState({ windowIsMobile: window.innerWidth <= breakpoint })
  }, [breakpoint, setState])

  useEffect(() => {
    if (windowIsLoaded) {
      return
    }
    window.addEventListener('resize', handleWindowSizeChange)
    handleWindowSizeChange()
    setState({ windowIsLoaded: true, windowIsLoading: false })
  }, [handleWindowSizeChange, setState, windowIsLoaded])

  return {
    mobile: windowIsMobile,
    loading: !windowIsLoaded,
  }
}

export default useAdaptiveSize
