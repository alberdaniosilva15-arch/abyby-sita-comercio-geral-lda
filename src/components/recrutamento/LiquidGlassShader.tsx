import React, { useEffect, useRef, useCallback } from 'react';

// ─── GLSL Shaders ───────────────────────────────────────────────────────────

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;

  varying vec2 v_uv;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  // ── Simplex-style hash noise ──
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  // ── Fractal Brownian Motion (Optimized to 3 octaves) ──
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 3; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = v_uv;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 uvAspect = vec2(uv.x * aspect, uv.y);

    float t = u_time * 0.15;

    // ── Liquid distortion via fBm ──
    float distortion = fbm(uvAspect * 3.0 + t) * 0.02;
    float distortion2 = fbm(uvAspect * 5.0 - t * 0.7) * 0.012;

    // ── Mouse proximity influence ──
    vec2 mouseNorm = u_mouse / u_resolution;
    float mouseDist = distance(uv, mouseNorm);
    float mouseInfluence = smoothstep(0.4, 0.0, mouseDist) * 0.015;
    distortion += mouseInfluence * sin(t * 3.0 + mouseDist * 10.0);

    // ── Chromatic aberration (RGB channel separation) ──
    float aberration = 0.006 + distortion * 0.5;
    vec2 uvR = uv + vec2(aberration + distortion, distortion2);
    vec2 uvG = uv + vec2(distortion, distortion2 + aberration * 0.5);
    vec2 uvB = uv + vec2(-aberration + distortion2, distortion + aberration);

    // ── Base colour from distorted UVs ──
    float r = smoothstep(0.0, 1.0, fbm(uvR * 4.0 + t * 0.5)) * 0.15 + 0.02;
    float g = smoothstep(0.0, 1.0, fbm(uvG * 4.0 + t * 0.3)) * 0.18 + 0.04;
    float b = smoothstep(0.0, 1.0, fbm(uvB * 4.0 + t * 0.4)) * 0.25 + 0.08;

    vec3 color = vec3(r, g, b);

    // ── Specular highlights ──
    float spec1 = pow(max(0.0, fbm(uvAspect * 8.0 + t * 0.8)), 3.0);
    float spec2 = pow(max(0.0, fbm(uvAspect * 12.0 - t * 0.6 + 3.14)), 4.0);
    vec3 specular = vec3(0.5, 0.8, 1.0) * (spec1 * 0.3 + spec2 * 0.15);

    color += specular;

    // ── Iridescence at edges ──
    float edge = pow(1.0 - abs(uv.x - 0.5) * 2.0, 2.0) * pow(1.0 - abs(uv.y - 0.5) * 2.0, 2.0);
    float iridescence = sin(uv.x * 20.0 + t * 2.0) * 0.5 + 0.5;
    vec3 iriColor = mix(
      vec3(0.0, 0.6, 1.0),
      vec3(0.0, 1.0, 0.8),
      iridescence
    );
    color += iriColor * (1.0 - edge) * 0.08;

    // ── Vignette ──
    float vignette = 1.0 - pow(length(uv - 0.5) * 1.2, 2.5);
    color *= vignette;

    // ── Final alpha ──
    float alpha = 0.25 + spec1 * 0.15 + mouseInfluence * 2.0;
    alpha *= smoothstep(0.0, 0.3, vignette);

    gl_FragColor = vec4(color, alpha);
  }
`;

// ─── WebGL Helpers ──────────────────────────────────────────────────────────

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

// ─── Component ──────────────────────────────────────────────────────────────

interface LiquidGlassShaderProps {
  className?: string;
}

export const LiquidGlassShader: React.FC<LiquidGlassShaderProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      preserveDrawingBuffer: false,
      depth: false, // optimize
    });
    if (!gl) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;
    const program = createProgram(gl, vs, fs);
    if (!program) return;

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1,  -1, 1,
      -1,  1,  1, -1,   1, 1,
    ]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'a_position');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    const resize = () => {
      // Limit DPR to 1 to drastically improve performance and fix scroll crash
      const dpr = 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const startTime = performance.now();
    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouseRef.current.x, window.innerHeight - mouseRef.current.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(posBuffer);
    };
  }, [handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none ${className}`}
      style={{ mixBlendMode: 'screen', zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

