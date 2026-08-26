export const scrollPhases = {
  hero: { start: 0, end: 0.05 },
  phase1: { start: 0.0, end: 0.2 },
  phase2: { start: 0.2, end: 0.35 },
  phase3: { start: 0.35, end: 0.65 },
  phase4: { start: 0.65, end: 0.8 },
  phase5: { start: 0.8, end: 1.0 },
}

export const cameraPositions = {
  hero: { pos: [0, 0, 5], target: [0, 0, 0] },
  phase1Close: { pos: [0, 0.3, 3.5], target: [0, 0, 0] },
  phase2Detail: { pos: [1.5, 0.5, 2.5], target: [0, 0.1, 0] },
  phase3Exploded: { pos: [3, 1.5, 4], target: [0, 0, 0] },
  phase4Movement: { pos: [1.2, 0.8, 2], target: [0, 0.2, 0] },
  phase5Final: { pos: [0, 0.2, 4.5], target: [0, 0, 0] },
}

export const componentExplosionOffsets = {
  crystal:      { x: 0,    y: 2.8,  z: 0 },
  bezel:        { x: 0,    y: 2.0,  z: 0 },
  dial:         { x: 0,    y: 1.2,  z: 0 },
  hourHand:     { x: -0.8, y: 1.0,  z: 0.5 },
  minuteHand:   { x: 0.8,  y: 1.3,  z: 0.5 },
  secondHand:   { x: 0,    y: 1.5,  z: 0.8 },
  crown:        { x: 2.5,  y: 0.2,  z: 0 },
  movement:     { x: 0,    y: -1.5, z: 0 },
  rotor:        { x: 0.6,  y: -2.0, z: 0.3 },
  case:         { x: 0,    y: -0.5, z: -0.5 },
  caseBack:     { x: 0,    y: -2.5, z: 0 },
  strapTop:     { x: 0,    y: 3.5,  z: -0.5 },
  strapBottom:  { x: 0,    y: -3.5, z: -0.5 },
}

export const watchScale = {
  desktop: 1.0,
  tablet: 0.85,
  mobile: 0.65,
}
