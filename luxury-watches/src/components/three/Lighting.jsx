import React from 'react'
import { Environment, Lightformer } from '@react-three/drei'

export default function Lighting() {
  return (
    <>
      {/* Key Light - large soft source from top-right */}
      <directionalLight
        position={[5, 8, 3]}
        intensity={1.8}
        color="#fff8f0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0001}
      />

      {/* Fill Light - soft from left */}
      <directionalLight
        position={[-4, 3, 2]}
        intensity={0.6}
        color="#e8e0f0"
      />

      {/* Rim Light - back edge definition */}
      <directionalLight
        position={[0, 2, -5]}
        intensity={1.2}
        color="#c0d0ff"
      />

      {/* Accent light from below */}
      <pointLight
        position={[0, -3, 2]}
        intensity={0.4}
        color="#c9a96e"
        distance={10}
      />

      {/* Ambient base */}
      <ambientLight intensity={0.15} color="#d0d0d0" />

      {/* HDR Environment with custom lightformers for reflections */}
      <Environment resolution={256} background={false}>
        {/* Large warm key */}
        <Lightformer
          form="rect"
          intensity={2}
          color="#fff5e6"
          position={[3, 4, 2]}
          rotation={[0, 0, 0]}
          scale={[6, 3, 1]}
        />
        {/* Cool fill */}
        <Lightformer
          form="rect"
          intensity={0.8}
          color="#d0e0ff"
          position={[-3, 2, 1]}
          rotation={[0, Math.PI / 4, 0]}
          scale={[4, 2, 1]}
        />
        {/* Gold accent */}
        <Lightformer
          form="ring"
          intensity={1.5}
          color="#c9a96e"
          position={[0, 0, 3]}
          rotation={[0, 0, 0]}
          scale={[3, 3, 1]}
        />
        {/* Back rim */}
        <Lightformer
          form="rect"
          intensity={1.2}
          color="#ffffff"
          position={[0, 3, -4]}
          rotation={[0, Math.PI, 0]}
          scale={[8, 2, 1]}
        />
        {/* Bottom bounce */}
        <Lightformer
          form="rect"
          intensity={0.3}
          color="#ffffff"
          position={[0, -3, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[10, 10, 1]}
        />
      </Environment>
    </>
  )
}
