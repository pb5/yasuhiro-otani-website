import * as THREE from './vendor/three.module.min.js';

const VERT = `
uniform float uTime;
uniform float uIntensity;
uniform vec2 uMouse;
varying vec3 vNormal;
varying float vDisp;

// simplex-ish noise (cheap, no external deps)
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

void main(){
  vNormal = normal;
  float n = snoise(position * 1.1 + uTime * 0.2 + vec3(uMouse * 1.6, 0.0));
  float disp = n * uIntensity;
  vDisp = disp;
  vec3 newPos = position + normal * disp;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}
`;

const FRAG = `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uGlitch;
varying vec3 vNormal;
varying float vDisp;

float rand(vec2 co){ return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453); }

void main(){
  float mixF = smoothstep(-0.4, 0.4, vDisp);
  vec3 base = mix(uColorA, uColorB, mixF);
  float rim = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0,0.0,1.0))), 2.0);
  base += rim * 0.3;

  if (uGlitch > 0.0) {
    float band = step(0.5, fract(gl_FragCoord.y * 0.05 + uGlitch * 10.0));
    float shift = (rand(vec2(uGlitch, gl_FragCoord.y)) - 0.5) * uGlitch;
    base.r += shift * band * 2.0;
    base.b -= shift * band * 2.0;
  }

  gl_FragColor = vec4(base, 1.0);
}
`;

export function initBlobBackground(canvas, options) {
  if (!canvas || !window.WebGLRenderingContext) return;
  const opts = Object.assign({
    colorA: 0x4dd8e8,
    colorB: 0xff5fa2,
    intensity: 0.22,
    speed: 1,
    glitch: true,
  }, options || {});

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.z = 4.2;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const geometry = new THREE.IcosahedronGeometry(1.5, 18);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uIntensity: { value: opts.intensity },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color(opts.colorA) },
      uColorB: { value: new THREE.Color(opts.colorB) },
      uGlitch: { value: 0 },
    },
    vertexShader: VERT,
    fragmentShader: FRAG,
    wireframe: true,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  let mouseX = 0, mouseY = 0, targetGlitch = 0;

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('pointermove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  });

  function randomGlitchBurst() {
    targetGlitch = 0.6;
    setTimeout(() => { targetGlitch = 0; }, 120 + Math.random() * 160);
    setTimeout(randomGlitchBurst, 2800 + Math.random() * 4200);
  }
  if (opts.glitch) setTimeout(randomGlitchBurst, 1800);

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime() * opts.speed;
    material.uniforms.uTime.value = t;
    material.uniforms.uMouse.value.set(mouseX, mouseY);
    material.uniforms.uGlitch.value += (targetGlitch - material.uniforms.uGlitch.value) * 0.2;
    mesh.rotation.y = t * 0.12 + mouseX * 0.4;
    mesh.rotation.x = t * 0.07 + mouseY * 0.3;
    renderer.render(scene, camera);
  }
  animate();
}
