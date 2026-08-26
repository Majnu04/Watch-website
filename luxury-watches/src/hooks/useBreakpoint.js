import { useState, useEffect } from 'react'

export function useBreakpoint() {
  const [bp, setBp] = useState('desktop')

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth
      if (w < 768) setBp('mobile')
      else if (w < 1024) setBp('tablet')
      else setBp('desktop')
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return bp
}
