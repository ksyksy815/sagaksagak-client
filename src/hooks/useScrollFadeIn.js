import { useRef, useEffect, useCallback } from 'react'

export function useScrollFadeIn( direction = 'up', duration = 1, delay = 0 ) {
  const dom = useRef ()

  const handleDirection = ( name ) => {
    switch (name) {
      case 'up':
        return 'translate3d(0, 50%, 0)'
      case 'down':
        return 'translate3d(0, -50%, 0)'
      case 'left':
        return 'translate3d(50%, 0, 0)'
      case 'right':
        return 'translate3d(-50%, 0, 0)'
      default:
        return;
    }
  }

  const handleScroll = useCallback(( [entry] ) => {
    const { current } = dom

    if (entry.isIntersecting) {
      // desired event
      current.style.transitionProperty = 'all'
      current.style.transitionDuration = `${duration}s`
      current.style.transitionTimingFunction = 'cubic-bexier(0, 0, 0.2, 1)'
      current.style.transitionDelay = `${delay}s`
      current.style.opacity = 1
      current.style.transform = 'translate3d(0, 0, 0)'
    }
  }, [delay, duration])

  useEffect(() => {
    let observer;
    const { current } = dom;

    if ( current ) {
      observer = new IntersectionObserver(handleScroll, { threashold: 0.7})
      observer.observe(current)

      return () => observer && observer.disconnect()
    }
  }, [handleScroll])

  return {
    ref: dom,
    style: {
      opacity: 0,
      transform: handleDirection(direction),
    }
  }
}