import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const NebulaMaterial = shaderMaterial(
  {
    iTime: 0,
    resolution: new THREE.Vector2(800, 600),
    hueShift: 0.12,
  },
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
  `,
  `
  precision highp float;
  varying vec2 vUv;
  uniform float iTime;
  uniform float hueShift;

  float hash(vec2 p) { return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453123); }
  float noise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0,0.0));
    float c = hash(i + vec2(0.0,1.0));
    float d = hash(i + vec2(1.0,1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  vec3 hsl2rgb(vec3 hsl){
    float c = (1.0 - abs(2.0*hsl.z - 1.0)) * hsl.y;
    float x = c * (1.0 - abs(mod(hsl.x*6.0, 2.0) - 1.0));
    float m = hsl.z - c/2.0;
    vec3 rgb;
    if (hsl.x < 1.0/6.0) rgb = vec3(c, x, 0.0);
    else if (hsl.x < 2.0/6.0) rgb = vec3(x, c, 0.0);
    else if (hsl.x < 3.0/6.0) rgb = vec3(0.0, c, x);
    else if (hsl.x < 4.0/6.0) rgb = vec3(0.0, x, c);
    else if (hsl.x < 5.0/6.0) rgb = vec3(x, 0.0, c);
    else rgb = vec3(c, 0.0, x);
    return rgb + vec3(m);
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * vec2(1.7,1.0) - 0.5;
    float t = iTime * 0.07;

    float n = fbm(p * 3.0 + vec2(t, t*0.3));
    float n2 = fbm(p * 6.0 - vec2(t*0.6, t*0.2));

    float intensity = smoothstep(0.2, 0.8, n * 0.7 + n2 * 0.3);

    vec3 c1 = hsl2rgb(vec3(0.62 + hueShift, 0.6, 0.45));
    vec3 c2 = hsl2rgb(vec3(0.95 + hueShift, 0.75, 0.55));
    vec3 color = mix(c1, c2, n2);

    float stars = step(0.9985, fract(sin(dot(uv * 1234.0, vec2(12.9898,78.233))) * 43758.5453));
    vec3 starColor = vec3(1.0, 0.95, 0.9) * stars;

    vec3 final = color * intensity + starColor * 1.2;

    float vignette = smoothstep(0.8, 0.3, length(uv - 0.5));
    final *= mix(1.0, 0.6, vignette);

    gl_FragColor = vec4(final, 1.0);
  }
  `
);

function NebulaPlane() {
  const ref = useRef<any>();
  useFrame(({ clock, size }) => {
    if (ref.current) {
      ref.current.iTime = clock.getElapsedTime();
      ref.current.resolution = new THREE.Vector2(size.width, size.height);
    }
  });
  return (
    <mesh>
      <planeBufferGeometry args={[2, 2]} />
      {/* @ts-ignore */}
      <nebulaMaterial ref={ref} hueShift={0.11} />
    </mesh>
  );
}

export default function HighFidelityBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      <Canvas
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1], fov: 50 }}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <NebulaPlane />
      </Canvas>
    </div>
  );
}
