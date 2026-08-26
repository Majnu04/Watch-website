import { useEffect, useRef, useCallback } from 'react'

export function useScrollProgress(containerRef) {
  const progress = useRef(0)
  const listeners = useRef([])

  const subscribe = useCallback((cb) => {
    listeners.current.push(cb)
    return () => {
      listeners.current = listeners.current.filter((l) => l !== cb)
    }
  }, [])

  useEffect(() => {
    const container = containerRef?.current || document.documentElement
    let ticking = false

    const update = () => {
      const scrollTop = container === document.documentElement
        ? window.scrollY
        : container.scrollTop
      const scrollHeight = container === document.documentElement
        ? document.documentElement.scrollHeight - window.innerHeight
        : container.scrollHeight - container.clientHeight
      const p = Math.min(Math.max(scrollTop / scrollHeight, 0), 1)
      progress.current = p
      listeners.current.forEach((cb) => cb(p))
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => window.removeEventListener('scroll', onScroll)
  }, [containerRef])

  return { progress, subscribe }
}
