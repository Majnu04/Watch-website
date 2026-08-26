# Watch Model Asset

Place your GLB/GLTF watch model file here as `watch.glb`.

## Expected Object Structure

The model should contain the following named objects for scroll-driven animation:

```
watch
├── case           — Main watch case body
├── caseBack       — Back cover
├── bezel          — Rotating bezel ring
├── crystal        — Sapphire crystal glass
├── dial           — Watch face/dial
├── hourHand       — Hour hand
├── minuteHand     — Minute hand
├── secondHand     — Second hand
├── crown          — Winding crown
├── movement       — Mechanical movement
├── rotor          — Automatic winding rotor
├── strap          — Strap/bracelet (or split into strapTop/strapBottom)
├── clasp          — Buckle/clasp
└── [any extra components]
```

## How to Use

1. Export your model as `.glb` (binary GLTF) for best performance.
2. Place it in this directory as `watch.glb`.
3. In `WatchModel.jsx`, replace the procedural geometry with:

```jsx
import { useGLTF } from '@react-three/drei'

function WatchModel({ explosionProgress = 0, rotationProgress = 0 }) {
  const { scene } = useGLTF('/models/watch.glb')
  // ... animate individual nodes
}
```

4. The explosion offsets in `src/config/animation.js` control how far each component separates.

## Compression

For production, compress your GLB with:
- **gltf-transform**: `npx @gltf-transform/cli optimize input.glb output.glb --compress draco`
- **Draco compression** reduces file size by 80-90%.
- **Meshopt compression** is an alternative for better runtime decode.

## Textures

Keep textures under 2048x2048 for mobile performance.
Use JPEG texture format for diffuse, PNG for normal/roughness maps.
