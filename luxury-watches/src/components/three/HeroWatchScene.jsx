import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import WatchModel from './WatchModel'
import Lighting from './Lighting'
import { useBreakpoint } from '../../hooks/useBreakpoint'

function HeroWatch() {
  const groupRef = useRef()
  const explosionRef = useRef(0)
  const rotationRef = useRef(0)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
    rotationRef.current = state.clock.elapsedTime * 0.05
  })

  return (
    <group ref={groupRef}>
      <WatchModel explosionRef={explosionRef} rotationRef={rotationRef} />
    </group>
  )
}

export default function HeroWatchScene({ style, className }) {
  const bp = useBreakpoint()
  const dpr = bp === 'mobile' ? 1.5 : bp === 'tablet' ? 2 : Math.min(window.devicePixelRatio, 2)

  return (
    <div className={className} style={style}>
      <Canvas
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          alpha: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false,
        }}
        camera={{
          fov: 32,
          near: 0.1,
          far: 100,
          position: [0, 0.3, 4.5],
        }}
        dpr={dpr}
        shadows
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <HeroWatch />
        </Suspense>
      </Canvas>
    </div>
  )
}
