import React, { Suspense, useRef, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import WatchModel from '../three/WatchModel'
import Lighting from '../three/Lighting'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { scrollPhases, cameraPositions } from '../../config/animation'

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function smoothstep(t) {
  return Math.max(0, Math.min(1, t * t * (3 - 2 * t)))
}

function lerpArr(a, b, t) {
  return a.map((v, i) => v + (b[i] - v) * t)
}

function CameraRig({ progressRef }) {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(...cameraPositions.hero.pos))
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0))

  useFrame((_, delta) => {
    const p = progressRef.current
    const phases = scrollPhases
    let pos, tgt

    if (p < phases.phase1.end) {
      const t = smoothstep(phases.phase1.end > 0 ? p / phases.phase1.end : 0)
      pos = lerpArr(cameraPositions.hero.pos, cameraPositions.phase1Close.pos, t)
      tgt = lerpArr(cameraPositions.hero.target, cameraPositions.phase1Close.target, t)
    } else if (p < phases.phase2.end) {
      const d = phases.phase2.end - phases.phase2.start
      const t = smoothstep(d > 0 ? (p - phases.phase2.start) / d : 0)
      pos = lerpArr(cameraPositions.phase1Close.pos, cameraPositions.phase2Detail.pos, t)
      tgt = lerpArr(cameraPositions.phase1Close.target, cameraPositions.phase2Detail.target, t)
    } else if (p < phases.phase3.end) {
      const d = phases.phase3.end - phases.phase3.start
      const t = smoothstep(d > 0 ? (p - phases.phase3.start) / d : 0)
      pos = lerpArr(cameraPositions.phase2Detail.pos, cameraPositions.phase3Exploded.pos, t)
      tgt = lerpArr(cameraPositions.phase2Detail.target, cameraPositions.phase3Exploded.target, t)
      const orbitAngle = t * Math.PI * 0.3
      pos[0] += Math.sin(orbitAngle) * 0.5
      pos[2] += Math.cos(orbitAngle) * 0.15
    } else if (p < phases.phase4.end) {
      const d = phases.phase4.end - phases.phase4.start
      const t = smoothstep(d > 0 ? (p - phases.phase4.start) / d : 0)
      pos = lerpArr(cameraPositions.phase3Exploded.pos, cameraPositions.phase4Movement.pos, t)
      tgt = lerpArr(cameraPositions.phase3Exploded.target, cameraPositions.phase4Movement.target, t)
      const orbitAngle = t * Math.PI * 0.5
      pos[0] += Math.sin(orbitAngle) * 0.8
      pos[2] += Math.cos(orbitAngle) * 0.4
    } else {
      const d = phases.phase5.end - phases.phase5.start
      const t = smoothstep(d > 0 ? (p - phases.phase5.start) / d : 0)
      pos = lerpArr(cameraPositions.phase4Movement.pos, cameraPositions.phase5Final.pos, t)
      tgt = lerpArr(cameraPositions.phase4Movement.target, cameraPositions.phase5Final.target, t)
    }

    targetPos.current.set(...pos)
    targetLookAt.current.set(...tgt)

    const speed = Math.min(delta * 3, 1)
    camera.position.lerp(targetPos.current, speed)
    currentLookAt.current.lerp(targetLookAt.current, speed)
    camera.lookAt(currentLookAt.current)
  })

  return null
}

function AnimatedWatch({ explosionRef, rotationRef, progressRef }) {
  useFrame(() => {
    const p = progressRef.current
    const phases = scrollPhases

    let targetExplosion = 0
    if (p < phases.phase3.start) {
      targetExplosion = 0
    } else if (p < phases.phase3.end) {
      const t = (p - phases.phase3.start) / (phases.phase3.end - phases.phase3.start)
      targetExplosion = easeInOutCubic(Math.min(Math.max(t, 0), 1))
    } else if (p < phases.phase5.start) {
      targetExplosion = 1
    } else {
      const t = (p - phases.phase5.start) / (phases.phase5.end - phases.phase5.start)
      targetExplosion = 1 - easeInOutCubic(Math.min(Math.max(t, 0), 1))
    }

    const lerpSpeed = 0.06
    explosionRef.current += (targetExplosion - explosionRef.current) * lerpSpeed
    rotationRef.current = p * 2.5
  })

  return <WatchModel explosionRef={explosionRef} rotationRef={rotationRef} />
}

const phaseTexts = {
  1: { title: 'PRECISION IN EVERY DETAIL', sub: 'Craftsmanship beyond measure' },
  2: { title: 'PRECISION IN EVERY DETAIL', sub: 'Examining the artistry within' },
  3: { title: 'ENGINEERED TO PERFECTION', sub: 'Every component, purposeful' },
  4: { title: 'ENGINEERED FOR PRECISION', sub: 'The heart of timekeeping' },
  5: { title: 'MADE TO LAST', sub: 'A legacy on your wrist' },
}

function getPhase(progress) {
  const phases = scrollPhases
  if (progress >= phases.phase5.start) return 5
  if (progress >= phases.phase4.start) return 4
  if (progress >= phases.phase3.start) return 3
  if (progress >= phases.phase2.start) return 2
  return 1
}

export default function ScrollExperience() {
  const bp = useBreakpoint()
  const progressRef = useRef(0)
  const explosionRef = useRef(0)
  const rotationRef = useRef(0)
  const sectionRef = useRef()
  const [activePhase, setActivePhase] = useState(0)

  const dpr = bp === 'mobile' ? 1.5 : bp === 'tablet' ? 2 : Math.min(window.devicePixelRatio, 2)
  const spacerHeight = bp === 'mobile' ? '400vh' : bp === 'tablet' ? '500vh' : '600vh'

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        if (!sectionRef.current) return
        const rect = sectionRef.current.getBoundingClientRect()
        const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight
        if (sectionHeight <= 0) return
        const scrolled = -rect.top
        const progress = Math.max(0, Math.min(1, scrolled / sectionHeight))
        progressRef.current = progress

        const phase = getPhase(progress)
        setActivePhase((prev) => (prev !== phase ? phase : prev))
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    const timer = setTimeout(handleScroll, 200)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  return (
    <section className="scroll-section" ref={sectionRef}>
      <div className="scroll-canvas-sticky">
        <Canvas
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
            alpha: true,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: false,
          }}
          camera={{
            fov: 35,
            near: 0.1,
            far: 100,
            position: [...cameraPositions.hero.pos],
          }}
          dpr={dpr}
          shadows
          style={{ background: 'transparent' }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0)
          }}
        >
          <Suspense fallback={null}>
            <CameraRig progressRef={progressRef} />
            <Lighting />
            <AnimatedWatch
              explosionRef={explosionRef}
              rotationRef={rotationRef}
              progressRef={progressRef}
            />
          </Suspense>
        </Canvas>

        {Object.entries(phaseTexts).map(([phase, text]) => (
          <div
            key={phase}
            style={{
              position: 'absolute',
              bottom: '12%',
              left: 0,
              right: 0,
              textAlign: 'center',
              opacity: activePhase === Number(phase) ? 1 : 0,
              transform: activePhase === Number(phase) ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          >
            <h2 className="scroll-phase-text-title">{text.title}</h2>
            <p className="scroll-phase-text-sub">{text.sub}</p>
          </div>
        ))}
      </div>
      <div className="scroll-spacer" style={{ height: spacerHeight }} />
    </section>
  )
}
