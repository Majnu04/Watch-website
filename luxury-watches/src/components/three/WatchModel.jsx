import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { componentExplosionOffsets } from '../../config/animation'

function createMaterial(type) {
  switch (type) {
    case 'steel':
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color('#b8b8b8'),
        metalness: 0.95,
        roughness: 0.15,
      })
    case 'darkSteel':
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color('#2a2a2a'),
        metalness: 0.9,
        roughness: 0.2,
      })
    case 'gold':
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color('#c9a96e'),
        metalness: 0.95,
        roughness: 0.1,
      })
    case 'hand':
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color('#e0d5c0'),
        metalness: 0.9,
        roughness: 0.2,
      })
    case 'black':
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color('#111111'),
        metalness: 0.3,
        roughness: 0.7,
      })
    case 'rubber':
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1a1a1a'),
        metalness: 0.0,
        roughness: 0.9,
      })
    case 'red':
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color('#c62828'),
        metalness: 0.7,
        roughness: 0.3,
      })
    default:
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color('#888888'),
        metalness: 0.5,
        roughness: 0.5,
      })
  }
}

function WatchFace({ hourRadius }) {
  const mat = useMemo(() => createMaterial('gold'), [])
  const hourMarkers = useMemo(() => {
    const markers = []
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
      const r = hourRadius || 0.52
      const isMain = i % 3 === 0
      markers.push({
        pos: [Math.cos(angle) * r, Math.sin(angle) * r, 0.02],
        scale: isMain ? [0.04, 0.08, 0.01] : [0.025, 0.05, 0.01],
        rot: [0, 0, angle + Math.PI / 2],
      })
    }
    return markers
  }, [hourRadius])

  return (
    <group>
      {hourMarkers.map((m, i) => (
        <mesh key={i} position={m.pos} rotation={m.rot} scale={m.scale} material={mat}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      ))}
    </group>
  )
}

/**
 * WatchModel accepts explosionRef and rotationRef as React refs.
 * It reads .current in useFrame, avoiding stale prop issues.
 * To swap in a GLB model: replace the JSX below with useGLTF('/models/watch.glb')
 */
export default function WatchModel({ explosionRef, rotationRef }) {
  const groupRef = useRef()
  const crystalRef = useRef()
  const bezelRef = useRef()
  const caseRef = useRef()
  const dialRef = useRef()
  const hourHandRef = useRef()
  const minuteHandRef = useRef()
  const secondHandRef = useRef()
  const crownRef = useRef()
  const movementRef = useRef()
  const rotorRef = useRef()
  const caseBackRef = useRef()
  const strapTopRef = useRef()
  const strapBottomRef = useRef()

  const steelMat = useMemo(() => createMaterial('steel'), [])
  const darkSteelMat = useMemo(() => createMaterial('darkSteel'), [])
  const goldMat = useMemo(() => createMaterial('gold'), [])
  const handMat = useMemo(() => createMaterial('hand'), [])
  const blackMat = useMemo(() => createMaterial('black'), [])
  const rubberMat = useMemo(() => createMaterial('rubber'), [])
  const redMat = useMemo(() => createMaterial('red'), [])
  const movementMat = useMemo(() => createMaterial('darkSteel'), [])

  const componentRefs = useRef([
    { ref: crystalRef, name: 'crystal' },
    { ref: bezelRef, name: 'bezel' },
    { ref: caseRef, name: 'case' },
    { ref: dialRef, name: 'dial' },
    { ref: hourHandRef, name: 'hourHand' },
    { ref: minuteHandRef, name: 'minuteHand' },
    { ref: secondHandRef, name: 'secondHand' },
    { ref: crownRef, name: 'crown' },
    { ref: movementRef, name: 'movement' },
    { ref: rotorRef, name: 'rotor' },
    { ref: caseBackRef, name: 'caseBack' },
    { ref: strapTopRef, name: 'strapTop' },
    { ref: strapBottomRef, name: 'strapBottom' },
  ])

  const basePositions = useRef({})
  const initialized = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      componentRefs.current.forEach(({ ref, name }) => {
        if (ref.current) {
          basePositions.current[name] = ref.current.position.clone()
        }
      })
      initialized.current = true
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useFrame((_, delta) => {
    const ep = explosionRef ? explosionRef.current : 0
    const rp = rotationRef ? rotationRef.current : 0
    const offset = componentExplosionOffsets

    if (initialized.current) {
      componentRefs.current.forEach(({ ref, name }) => {
        if (!ref.current || !basePositions.current[name]) return
        const base = basePositions.current[name]
        const off = offset[name] || { x: 0, y: 0, z: 0 }
        const tx = base.x + off.x * ep
        const ty = base.y + off.y * ep
        const tz = base.z + off.z * ep
        const lerpFactor = Math.min(delta * 4, 1)
        ref.current.position.x += (tx - ref.current.position.x) * lerpFactor
        ref.current.position.y += (ty - ref.current.position.y) * lerpFactor
        ref.current.position.z += (tz - ref.current.position.z) * lerpFactor
      })
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = rp * Math.PI * 2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Case - main body */}
      <group ref={caseRef}>
        <mesh material={steelMat} castShadow receiveShadow>
          <cylinderGeometry args={[0.7, 0.7, 0.28, 64]} />
        </mesh>
        {[[-0.35, 0, -0.5], [0.35, 0, -0.5], [-0.35, 0, 0.5], [0.35, 0, 0.5]].map((pos, i) => (
          <mesh key={i} position={pos} material={steelMat} castShadow>
            <boxGeometry args={[0.12, 0.12, 0.25]} />
          </mesh>
        ))}
      </group>

      {/* Case Back */}
      <group ref={caseBackRef} position={[0, -0.16, 0]}>
        <mesh material={darkSteelMat} castShadow>
          <cylinderGeometry args={[0.68, 0.68, 0.03, 64]} />
        </mesh>
      </group>

      {/* Bezel */}
      <group ref={bezelRef} position={[0, 0.14, 0]}>
        <mesh material={steelMat} castShadow>
          <torusGeometry args={[0.7, 0.04, 16, 64]} />
        </mesh>
        <mesh material={darkSteelMat}>
          <torusGeometry args={[0.65, 0.015, 16, 64]} />
        </mesh>
      </group>

      {/* Crystal */}
      <group ref={crystalRef} position={[0, 0.18, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.62, 0.62, 0.02, 64]} />
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0}
            roughness={0}
            transmission={0.92}
            thickness={0.5}
            ior={1.52}
            clearcoat={1}
            clearcoatRoughness={0}
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>

      {/* Dial */}
      <group ref={dialRef} position={[0, 0.12, 0]}>
        <mesh material={blackMat} receiveShadow>
          <cylinderGeometry args={[0.6, 0.6, 0.015, 64]} />
        </mesh>
        <WatchFace hourRadius={0.5} />
        <mesh position={[0, 0, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.35, 0.003, 8, 64]} />
          <meshStandardMaterial color="#c9a96e" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, -0.2, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.12, 0.003, 8, 32]} />
          <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Hour Hand */}
      <group ref={hourHandRef} position={[0, 0.135, 0]}>
        <mesh position={[0, 0.15, 0.015]} material={goldMat} castShadow>
          <boxGeometry args={[0.03, 0.3, 0.008]} />
        </mesh>
        <mesh position={[0, -0.05, 0.015]} material={goldMat}>
          <boxGeometry args={[0.025, 0.1, 0.008]} />
        </mesh>
      </group>

      {/* Minute Hand */}
      <group ref={minuteHandRef} position={[0, 0.14, 0]}>
        <mesh position={[0, 0.22, 0.02]} material={handMat} castShadow>
          <boxGeometry args={[0.022, 0.42, 0.006]} />
        </mesh>
        <mesh position={[0, -0.05, 0.02]} material={handMat}>
          <boxGeometry args={[0.018, 0.1, 0.006]} />
        </mesh>
      </group>

      {/* Second Hand */}
      <group ref={secondHandRef} position={[0, 0.145, 0]}>
        <mesh position={[0, 0.15, 0.025]} material={redMat} castShadow>
          <boxGeometry args={[0.008, 0.45, 0.003]} />
        </mesh>
        <mesh position={[0, -0.12, 0.025]} material={redMat}>
          <cylinderGeometry args={[0.02, 0.02, 0.003, 16]} />
        </mesh>
        <mesh position={[0, 0, 0.028]} material={goldMat}>
          <cylinderGeometry args={[0.025, 0.025, 0.008, 16]} />
        </mesh>
      </group>

      {/* Crown */}
      <group ref={crownRef} position={[0.78, 0, 0]}>
        <mesh material={steelMat} castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.12, 32]} />
        </mesh>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          return (
            <mesh key={i} position={[0, Math.cos(angle) * 0.065, Math.sin(angle) * 0.065]} rotation={[Math.PI / 2, 0, 0]} material={darkSteelMat}>
              <boxGeometry args={[0.11, 0.008, 0.008]} />
            </mesh>
          )
        })}
      </group>

      {/* Movement */}
      <group ref={movementRef} position={[0, -0.1, 0]}>
        <mesh material={movementMat} castShadow>
          <cylinderGeometry args={[0.45, 0.45, 0.06, 32]} />
        </mesh>
        {[0, Math.PI / 3, Math.PI * 2 / 3].map((angle, i) => (
          <mesh key={i} position={[Math.cos(angle) * 0.15, 0.005, Math.sin(angle) * 0.15]} rotation={[0, angle, 0]} material={goldMat}>
            <boxGeometry args={[0.2, 0.008, 0.06]} />
          </mesh>
        ))}
        {[
          { pos: [0.1, -0.01, 0.1], r: 0.06, teeth: 16 },
          { pos: [-0.12, -0.01, -0.08], r: 0.08, teeth: 20 },
          { pos: [0.05, -0.01, -0.15], r: 0.04, teeth: 12 },
        ].map((g, i) => (
          <mesh key={`gear-${i}`} position={g.pos} rotation={[Math.PI / 2, 0, 0]} material={goldMat}>
            <torusGeometry args={[g.r, 0.005, 8, g.teeth]} />
          </mesh>
        ))}
      </group>

      {/* Rotor */}
      <group ref={rotorRef} position={[0, -0.14, 0]}>
        <mesh material={goldMat} castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.015, 64, 1, false, 0, Math.PI]} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={goldMat}>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 32]} />
        </mesh>
      </group>

      {/* Strap Top */}
      <group ref={strapTopRef} position={[0, 0, -0.62]}>
        <mesh material={rubberMat} castShadow receiveShadow>
          <boxGeometry args={[0.35, 0.08, 0.6]} />
        </mesh>
        <mesh position={[0, 0.035, -0.1]} material={darkSteelMat}>
          <boxGeometry args={[0.32, 0.01, 0.15]} />
        </mesh>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} position={[0, 0.042, -0.2 + i * 0.08]} material={darkSteelMat}>
            <boxGeometry args={[0.28, 0.003, 0.02]} />
          </mesh>
        ))}
      </group>

      {/* Strap Bottom */}
      <group ref={strapBottomRef} position={[0, 0, 0.62]}>
        <mesh material={rubberMat} castShadow receiveShadow>
          <boxGeometry args={[0.35, 0.08, 0.6]} />
        </mesh>
        <mesh position={[0, 0.035, 0.1]} material={darkSteelMat}>
          <boxGeometry args={[0.32, 0.01, 0.15]} />
        </mesh>
        <mesh position={[0, 0.05, 0.38]} material={steelMat} castShadow>
          <boxGeometry args={[0.38, 0.04, 0.08]} />
        </mesh>
        <mesh position={[0, 0.05, 0.42]} material={goldMat}>
          <boxGeometry args={[0.36, 0.005, 0.005]} />
        </mesh>
      </group>
    </group>
  )
}
