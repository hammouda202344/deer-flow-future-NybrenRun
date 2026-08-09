// Fragment shader (nebula.frag)

precision highp float;
varying vec2 vUv;
uniform float iTime;
uniform float hueShift;

// (Full shader inlined in the React material for portability)

void main() {
  // Placeholder: the main procedural nebula logic lives in the React material.
  gl_FragColor = vec4(vUv, 0.5 + 0.5 * sin(iTime * 0.1), 1.0);
}
