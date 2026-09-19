<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import MathText from './MathText.vue'
import {
  PhX, PhCheckCircle, PhWarningCircle, PhArrowRight,
  PhArrowClockwise, PhLightbulb, PhBrain, PhPencilSimpleLine, PhCube
} from '@phosphor-icons/vue'
import SuccessCelebration from './SuccessCelebration.vue'

/* ============================================================
   PROPS & EMITS
   ============================================================ */
const props = defineProps({
  isOpen: Boolean,
  title: { type: String, default: 'Cilinder- en Bolcoördinaten' },
  instruction: { type: String, default: '' },
  currentStep: { type: Number, default: 1 },
  totalSteps: { type: Number, default: 1 },
  fullscreen: { type: Boolean, default: false },
  icon: { type: Object, default: () => PhCube }
})
const emit = defineEmits(['close', 'complete', 'update:currentStep'])

/* ============================================================
   STATE
   ============================================================ */
const mainArea = ref(null)
const isCorrect = ref(false)
const celebrationDone = ref(false)
const attemptCount = ref(0)
const hintCount = ref(0)
const feedback = ref({ type: 'info', text: 'Verken de 3D-weergave en leer hoe coördinaten werken.' })
const currentInternalLevel = ref(0)
const totalInternalLevels = 3
const levelLabels = ['Toepassen', 'Analyseren', 'Evalueren']

/* ============================================================
   PEDAGOGICAL STATE
   ============================================================ */
const showWorkedExample = ref(true)
const showPrediction = ref(false)
const predictionAnswer = ref(null)
const predictionSubmitted = ref(false)
const predictionCorrect = ref(false)
const showWhy = ref(false)
const whyText = ref('')
const showReflection = ref(false)
const reflectionAnswer = ref('')
const reflectionDone = ref(false)
const errorDetected = ref('')

/* ============================================================
   COORDINATE STATE
   ============================================================ */
const r = ref(4)
const theta = ref(45)
const phi = ref(45)
const z = ref(2)

const xCyl = computed(() => r.value * Math.cos(theta.value * Math.PI / 180))
const yCyl = computed(() => r.value * Math.sin(theta.value * Math.PI / 180))
const rXY = computed(() => r.value * Math.sin(phi.value * Math.PI / 180))
const xSph = computed(() => rXY.value * Math.cos(theta.value * Math.PI / 180))
const ySph = computed(() => rXY.value * Math.sin(theta.value * Math.PI / 180))
const zSph = computed(() => r.value * Math.cos(phi.value * Math.PI / 180))

/* ============================================================
   THREE.JS 3D VIEW
   ============================================================ */
const canvasContainer = ref(null)
let scene, camera, renderer, controls
let cylGroup, sphGroup, pointMesh, axisLabels = []
let animId = null

function initThree() {
  const container = canvasContainer.value
  if (!container) return
  const w = container.clientWidth
  const h = container.clientHeight || 400

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf8fafc)

  camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 50)
  camera.position.set(10, 6, 10)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(w, h)
  container.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.minDistance = 3
  controls.maxDistance = 25

  // Lights
  scene.add(new THREE.AmbientLight(0x606080))
  const dl = new THREE.DirectionalLight(0xffffff, 1.0)
  dl.position.set(5, 10, 8)
  scene.add(dl)

  // Axes (colored lines + arrow cones)
  const AX = 7.5
  function addAxis(dir, color, label) {
    // Line
    const pts = [new THREE.Vector3(0,0,0), dir.clone().multiplyScalar(AX)]
    scene.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ color })
    ))
    // Arrow cone
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(0.15, 0.4, 8),
      new THREE.MeshBasicMaterial({ color })
    )
    const tip = dir.clone().multiplyScalar(AX)
    cone.position.copy(tip)
    cone.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dir.clone().normalize())
    scene.add(cone)
    // Text sprite label
    const sprite = makeTextSprite(label, '#' + color.toString(16).padStart(6,'0'), 36)
    sprite.position.copy(dir.clone().multiplyScalar(AX + 0.6))
    scene.add(sprite)
    axisLabels.push(sprite)
  }
  addAxis(new THREE.Vector3(1,0,0), 0xef4444, 'x')
  addAxis(new THREE.Vector3(0,1,0), 0x22c55e, 'y')
  addAxis(new THREE.Vector3(0,0,1), 0x3b82f6, 'z')

  // Origin sprite
  const originSpr = makeTextSprite('O', '#94a3b8', 30)
  originSpr.position.set(-0.4, -0.4, 0)
  scene.add(originSpr)
  axisLabels.push(originSpr)

  // Polar grid on xy-plane
  const gc = 0xcbd5e1
  for (let i = 1; i <= 6; i++) {
    const rr = 7 * i / 6
    const pts = []
    for (let j = 0; j <= 48; j++) {
      const a = (j / 48) * Math.PI * 2
      pts.push(new THREE.Vector3(rr * Math.cos(a), rr * Math.sin(a), 0))
    }
    scene.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ color: gc, transparent: true, opacity: 0.3 })
    ))
  }
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    scene.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0,0,0), new THREE.Vector3(7*Math.cos(a), 7*Math.sin(a), 0)
      ]),
      new THREE.LineBasicMaterial({ color: gc, transparent: true, opacity: 0.15 })
    ))
  }

  // Point sphere (shared)
  pointMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 20, 20),
    new THREE.MeshStandardMaterial({ color: 0xf97316, emissive: 0xf97316, emissiveIntensity: 0.2 })
  )
  scene.add(pointMesh)

  // ── Cylindrical construction group ──
  cylGroup = new THREE.Group()
  scene.add(cylGroup)
  const cylMat = {
    ptXY: new THREE.MeshBasicMaterial({ color: 0x3b82f6 }),
    rad: new THREE.LineBasicMaterial({ color: 0x3b82f6 }),
    vert: new THREE.LineBasicMaterial({ color: 0xf97316 }),
    arc: new THREE.LineBasicMaterial({ color: 0x8b5cf6 }),
    circ: new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.4 }),
  }
  const c = {
    ptXY: new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), cylMat.ptXY),
    rad: new THREE.Line(new THREE.BufferGeometry(), cylMat.rad),
    vert: new THREE.Line(new THREE.BufferGeometry(), cylMat.vert),
    arc: new THREE.Line(new THREE.BufferGeometry(), cylMat.arc),
    circ: new THREE.Line(new THREE.BufferGeometry(), cylMat.circ),
  }
  cylGroup.add(c.ptXY, c.rad, c.vert, c.arc, c.circ)
  // Labels
  const lblPp = makeTextSprite("P'", '#3b82f6', 28)
  cylGroup.add(lblPp)
  c.lblP = lblPp
  const lblT = makeTextSprite('θ', '#8b5cf6', 32)
  cylGroup.add(lblT)
  c.lblTheta = lblT
  cylGroup.userData = c

  // ── Spherical construction group ──
  sphGroup = new THREE.Group()
  scene.add(sphGroup)
  const sphMat = {
    rad: new THREE.LineBasicMaterial({ color: 0xf97316 }),
    proj: new THREE.LineDashedMaterial({ color: 0x3b82f6, dashSize: 0.1, gapSize: 0.07 }),
    arcT: new THREE.LineBasicMaterial({ color: 0x8b5cf6 }),
    arcP: new THREE.LineBasicMaterial({ color: 0x14b8a6 }),
    wire: new THREE.MeshBasicMaterial({ wireframe: true, color: 0x3b82f6, transparent: true, opacity: 0.15 }),
    ptXY: new THREE.MeshBasicMaterial({ color: 0x3b82f6 }),
  }
  const s = {
    ptXY: new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), sphMat.ptXY),
    rad: new THREE.Line(new THREE.BufferGeometry(), sphMat.rad),
    proj: new THREE.Line(new THREE.BufferGeometry(), sphMat.proj),
    arcT: new THREE.Line(new THREE.BufferGeometry(), sphMat.arcT),
    arcP: new THREE.Line(new THREE.BufferGeometry(), sphMat.arcP),
    wire: new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), sphMat.wire),
  }
  sphGroup.add(s.ptXY, s.rad, s.proj, s.arcT, s.arcP, s.wire)
  const lblS = makeTextSprite('P', '#f97316', 28)
  sphGroup.add(lblS)
  s.lblP = lblS
  const lblST = makeTextSprite('θ', '#8b5cf6', 32)
  sphGroup.add(lblST)
  s.lblTheta = lblST
  const lblSP = makeTextSprite('φ', '#14b8a6', 32)
  sphGroup.add(lblSP)
  s.lblPhi = lblSP
  sphGroup.userData = s

  // Start render loop
  animate()
}

function makeTextSprite(text, color = '#1e293b', fontSize = 32) {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  ctx.font = `bold ${fontSize}px "Segoe UI", system-ui, sans-serif`
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, 64, 32)
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  const mat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false })
  const sprite = new THREE.Sprite(mat)
  sprite.scale.set(1.2, 0.6, 1)
  return sprite
}

function animate() {
  animId = requestAnimationFrame(animate)
  if (controls) controls.update()
  if (renderer && scene && camera) renderer.render(scene, camera)
}

function updateScene() {
  if (!scene || !cylGroup) return

  const tRad = theta.value * Math.PI / 180
  const pRad = phi.value * Math.PI / 180
  const isCyl = currentInternalLevel.value <= 1
  const isSph = currentInternalLevel.value >= 1

  // Compute cartesian for active mode
  const cx = r.value * Math.cos(tRad), cy = r.value * Math.sin(tRad), cz = z.value
  const rxy = r.value * Math.sin(pRad)
  const sx = rxy * Math.cos(tRad), sy = rxy * Math.sin(tRad), sz = r.value * Math.cos(pRad)
  const P = isCyl ? new THREE.Vector3(cx, cy, cz) : new THREE.Vector3(sx, sy, sz)
  const Pxy = new THREE.Vector3(P.x, P.y, 0)

  // Point
  pointMesh.position.copy(P)

  // Group visibility
  cylGroup.visible = isCyl
  sphGroup.visible = isSph

  // ── Update cylindrical ──
  const c = cylGroup.userData
  // Circle on xy-plane
  const cPts = []
  for (let i = 0; i <= 48; i++) {
    const a = (i / 48) * Math.PI * 2
    cPts.push(r.value * Math.cos(a), r.value * Math.sin(a), 0)
  }
  c.circ.geometry.setAttribute('position', new THREE.Float32BufferAttribute(cPts, 3))
  c.circ.geometry.computeBoundingSphere()
  // Radial line
  c.rad.geometry.setFromPoints([new THREE.Vector3(0,0,0), Pxy])
  // Vertical line
  c.vert.geometry.setFromPoints([Pxy, P])
  // Point XY
  c.ptXY.position.copy(Pxy)
  // Label P'
  const offC = Pxy.clone().normalize().multiplyScalar(0.3)
  if (offC.length() < 0.01) offC.set(0.2, 0.2, 0)
  c.lblP.position.copy(Pxy.clone().add(offC))
  // Arc theta
  const arcR = Math.min(r.value, 1.8) * 0.5
  const arcPts = []
  for (let i = 0; i <= 20; i++) {
    const a = (i / 20) * tRad
    arcPts.push(arcR * Math.cos(a), arcR * Math.sin(a), 0)
  }
  c.arc.geometry.setAttribute('position', new THREE.Float32BufferAttribute(arcPts, 3))
  c.arc.geometry.computeBoundingSphere()
  const midA = tRad / 2, lrC = Math.min(r.value, 1.8) * 0.7
  c.lblTheta.position.set(lrC * Math.cos(midA), lrC * Math.sin(midA), 0)

  // ── Update spherical ──
  const s = sphGroup.userData
  // Radial line
  s.rad.geometry.setFromPoints([new THREE.Vector3(0,0,0), P])
  // Projection line
  s.proj.geometry.setFromPoints([P, Pxy])
  s.proj.computeLineDistances()
  // Point XY
  s.ptXY.position.copy(Pxy)
  // Wire sphere
  s.wire.scale.set(r.value, r.value, r.value)
  // Label P
  const dirS = P.clone().normalize().multiplyScalar(0.35)
  if (dirS.length() < 0.01) dirS.set(0.2, 0.2, 0.2)
  s.lblP.position.copy(P.clone().add(dirS))
  // Arc theta
  const arcRT = Math.min(rxy, 1.8) * 0.5
  const arcTPts = []
  for (let i = 0; i <= 20; i++) {
    const a = (i / 20) * tRad
    arcTPts.push(arcRT * Math.cos(a), arcRT * Math.sin(a), 0)
  }
  s.arcT.geometry.setAttribute('position', new THREE.Float32BufferAttribute(arcTPts, 3))
  s.arcT.geometry.computeBoundingSphere()
  const lrST = Math.min(rxy, 1.8) * 0.7
  s.lblTheta.position.set(lrST * Math.cos(midA), lrST * Math.sin(midA), 0)
  // Arc phi
  const arcRP = Math.min(r.value, 2.0) * 0.45
  const arcPPts = []
  for (let i = 0; i <= 20; i++) {
    const a = (i / 20) * pRad
    arcPPts.push(
      arcRP * Math.sin(a) * Math.cos(tRad),
      arcRP * Math.sin(a) * Math.sin(tRad),
      arcRP * Math.cos(a)
    )
  }
  s.arcP.geometry.setAttribute('position', new THREE.Float32BufferAttribute(arcPPts, 3))
  s.arcP.geometry.computeBoundingSphere()
  const midP = pRad / 2, lrSP = Math.min(r.value, 2.0) * 0.65
  s.lblPhi.position.set(
    lrSP * Math.sin(midP) * Math.cos(tRad),
    lrSP * Math.sin(midP) * Math.sin(tRad),
    lrSP * Math.cos(midP)
  )

  // Sub-visibility within groups (step-by-step reveal)
  updateSubVisibility()
}

function updateSubVisibility() {
  const step = currentInternalLevel.value + 1
  const isCyl = currentInternalLevel.value <= 1
  const isSph = currentInternalLevel.value >= 1
  const c = cylGroup?.userData
  const s = sphGroup?.userData

  // Cyl sub-vis
  if (c && isCyl) {
    c.circ.visible = step >= 1
    c.arc.visible = step >= 1
    c.lblTheta.visible = step >= 1
    c.rad.visible = step >= 2
    c.ptXY.visible = step >= 2
    c.lblP.visible = step >= 2
    c.vert.visible = step >= 3
    pointMesh.visible = true
  }

  // Sph sub-vis
  if (s && isSph) {
    s.arcP.visible = step >= 2
    s.lblPhi.visible = step >= 2
    s.rad.visible = step >= 2
    s.proj.visible = step >= 3
    s.ptXY.visible = step >= 3
    s.arcT.visible = step >= 4
    s.lblTheta.visible = step >= 4
    s.wire.visible = step >= 5
    s.lblP.visible = step >= 2
    pointMesh.visible = step >= 2
  }
}

function cleanupThree() {
  if (animId) cancelAnimationFrame(animId)
  if (renderer) {
    renderer.dispose()
    if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
  }
  scene = null; camera = null; renderer = null; controls = null
  cylGroup = null; sphGroup = null; pointMesh = null; axisLabels = []
}

/* ============================================================
   LEVEL GENERATION
   ============================================================ */
const levels = ref([])

function generateLevel(index) {
  if (index === 0) {
    const tr = (Math.floor(Math.random() * 3) + 3)
    const ttheta = [30, 45, 60, 120, 150][Math.floor(Math.random() * 5)]
    const tz = (Math.floor(Math.random() * 3) + 1)
    const ex = (tr * Math.cos(ttheta * Math.PI / 180)).toFixed(2)
    const ey = (tr * Math.sin(ttheta * Math.PI / 180)).toFixed(2)
    return {
      mode: 'cyl',
      goalText: `Gegeven r = ${tr}, θ = ${ttheta}°, z = ${tz}. Wat zijn x en y?`,
      answer: { x: parseFloat(ex), y: parseFloat(ey) },
      predictionQuestion: `Bij r = ${tr} en θ = ${ttheta}°: wat is x?`,
      predictionOptions: [ex, (tr * Math.sin(ttheta * Math.PI / 180)).toFixed(2), (tr * 0.5).toFixed(2)].filter((v, i, a) => a.indexOf(v) === i),
      predictionCorrect: ex,
      params: { r: tr, theta: ttheta, phi: 45, z: tz },
      worked: {
        problem: `r = ${tr}, θ = ${ttheta}°`,
        steps: [
          `x = r · cos(θ) = ${tr} · cos(${ttheta}°)`,
          `cos(${ttheta}°) = ${Math.cos(ttheta * Math.PI / 180).toFixed(3)}`,
          `x = ${tr} × ${Math.cos(ttheta * Math.PI / 180).toFixed(3)} = ${ex}`,
          `y = r · sin(θ) = ${tr} · sin(${ttheta}°) = ${ey}`
        ],
        answer: `(${ex}, ${ey})`
      },
      whyExplanation: `In het xy-vlak is de cirkel met straal r de basis. De hoek θ bepaalt de richting. Via de rechthoekige driehoek met schuine zijde r vinden we x = r·cos(θ) en y = r·sin(θ). De z-coördinaat is gewoon de hoogte.`,
      reflectionQuestion: 'Waarom gebruiken we cos voor x en sin voor y? Leg uit met de rechthoekige driehoek.'
    }
  } else if (index === 1) {
    const tr = (Math.floor(Math.random() * 3) + 4)
    const tphi = [30, 45, 60][Math.floor(Math.random() * 3)]
    const ttheta = [30, 60, 120][Math.floor(Math.random() * 3)]
    const rxyVal = (tr * Math.sin(tphi * Math.PI / 180)).toFixed(2)
    const zs = (tr * Math.cos(tphi * Math.PI / 180)).toFixed(2)
    return {
      mode: 'sph',
      goalText: `Gegeven r = ${tr}, θ = ${ttheta}°, φ = ${tphi}°. Eerst: wat is r_xy en z?`,
      answer: { x: parseFloat((tr * Math.sin(tphi * Math.PI / 180) * Math.cos(ttheta * Math.PI / 180)).toFixed(2)), y: parseFloat((tr * Math.sin(tphi * Math.PI / 180) * Math.sin(ttheta * Math.PI / 180)).toFixed(2)), z: parseFloat(zs) },
      predictionQuestion: `Bij r = ${tr} en φ = ${tphi}°: wat is r_xy = r·sin(φ)?`,
      predictionOptions: [rxyVal, zs, (tr / 2).toFixed(2)].filter((v, i, a) => a.indexOf(v) === i),
      predictionCorrect: rxyVal,
      params: { r: tr, theta: ttheta, phi: tphi, z: 2 },
      worked: {
        problem: `r = ${tr}, φ = ${tphi}°`,
        steps: [
          `r_xy = r · sin(φ) = ${tr} · sin(${tphi}°)`,
          `sin(${tphi}°) = ${Math.sin(tphi * Math.PI / 180).toFixed(3)}`,
          `r_xy = ${tr} × ${Math.sin(tphi * Math.PI / 180).toFixed(3)} = ${rxyVal}`,
          `z = r · cos(φ) = ${tr} · cos(${tphi}°) = ${zs}`
        ],
        answer: `r_xy = ${rxyVal}, z = ${zs}`
      },
      whyExplanation: `Bij bolcoördinaten splitsen we de straal r op in een horizontaal deel (r·sin(φ)) in het xy-vlak en een verticaal deel (r·cos(φ)) langs de z-as.`,
      reflectionQuestion: 'Waarom is de horizontale component r·sin(φ) en niet r·cos(φ)?'
    }
  } else {
    const tr = (Math.floor(Math.random() * 3) + 3)
    const ttheta = [30, 45, 60, 120][Math.floor(Math.random() * 4)]
    const tphi = [30, 45, 60][Math.floor(Math.random() * 3)]
    const ex = (tr * Math.sin(tphi * Math.PI / 180) * Math.cos(ttheta * Math.PI / 180)).toFixed(2)
    const ey = (tr * Math.sin(tphi * Math.PI / 180) * Math.sin(ttheta * Math.PI / 180)).toFixed(2)
    const ez = (tr * Math.cos(tphi * Math.PI / 180)).toFixed(2)
    return {
      mode: 'sph',
      goalText: `Gegeven r = ${tr}, θ = ${ttheta}°, φ = ${tphi}°. Bereken (x, y, z).`,
      answer: { x: parseFloat(ex), y: parseFloat(ey), z: parseFloat(ez) },
      predictionQuestion: `Bij r = ${tr}, θ = ${ttheta}°, φ = ${tphi}°: wat is x?`,
      predictionOptions: [ex, (tr * Math.cos(ttheta * Math.PI / 180)).toFixed(2), (tr * Math.sin(tphi * Math.PI / 180)).toFixed(2)].filter((v, i, a) => a.indexOf(v) === i),
      predictionCorrect: ex,
      params: { r: tr, theta: ttheta, phi: tphi, z: 2 },
      worked: {
        problem: `r = ${tr}, θ = ${ttheta}°, φ = ${tphi}°`,
        steps: [
          `r_xy = r · sin(φ) = ${tr} · sin(${tphi}°) = ${(tr * Math.sin(tphi * Math.PI / 180)).toFixed(2)}`,
          `x = r_xy · cos(θ) = ${(tr * Math.sin(tphi * Math.PI / 180)).toFixed(2)} · cos(${ttheta}°) = ${ex}`,
          `y = r_xy · sin(θ) = ${(tr * Math.sin(tphi * Math.PI / 180)).toFixed(2)} · sin(${ttheta}°) = ${ey}`,
          `z = r · cos(φ) = ${tr} · cos(${tphi}°) = ${ez}`
        ],
        answer: `(${ex}, ${ey}, ${ez})`
      },
      whyExplanation: `Bolcoördinaten combineren twee stappen: eerst r splitsen met φ, dan het horizontale deel met θ verder opsplitsen in x en y.`,
      reflectionQuestion: 'Vergelijk cilinder- en bolcoördinaten. Wanneer gebruik je welk stelsel?'
    }
  }
}

const currentLevelData = computed(() => levels.value[currentInternalLevel.value])

/* ============================================================
   HINTS
   ============================================================ */
function showHint() {
  hintCount.value++
  const hints = [
    ['Welke formule gebruik je voor x? x = r · cos(θ). Vul de getallen in.', 'Voorbeeld: r=4, θ=45° → x = 4·0,707 = 2,83.', 'Vul in: x = __ · cos(__°) = __.'],
    ['r_xy = r·sin(φ), z = r·cos(φ). Welke waarde van φ heb je?', 'Voorbeeld: r=6, φ=30° → r_xy = 6·0,5 = 3.', 'Bereken: r_xy = __ · sin(__°) = __.'],
    ['Eerst: r_xy = r·sin(φ). Dan: x = r_xy·cos(θ), y = r_xy·sin(θ).', 'Voorbeeld: r=6, φ=30°, θ=45° → r_xy=3, x=2,12, y=2,12.', 'Bereken stap voor stap: r_xy = __. x = __ · cos(__) = __.']
  ]
  feedback.value = { type: 'info', text: hints[currentInternalLevel.value]?.[Math.min(hintCount.value - 1, 2)] || '' }
}

/* ============================================================
   PREDICTION
   ============================================================ */
function checkPrediction() {
  if (predictionAnswer.value === null) return
  predictionCorrect.value = parseFloat(predictionAnswer.value) === parseFloat(currentLevelData.value.predictionCorrect)
  predictionSubmitted.value = true
  if (predictionCorrect.value) {
    showPrediction.value = false
    feedback.value = { type: 'success', text: 'Juist ingeschat! Verken de 3D-weergave.' }
  } else {
    attemptCount.value++
    feedback.value = { type: 'error', text: 'Niet juist. Kijk naar de formule.' }
  }
}

/* ============================================================
   CHECK ANSWER
   ============================================================ */
function checkAnswer() {
  if (isCorrect.value || !currentLevelData.value) return
  attemptCount.value++
  const data = currentLevelData.value
  const isC = currentInternalLevel.value <= 1

  let correct = false
  if (isC) {
    correct = Math.abs(xCyl.value - data.answer.x) < 0.01 && Math.abs(yCyl.value - data.answer.y) < 0.01
  } else {
    const sx = r.value * Math.sin(phi.value * Math.PI / 180) * Math.cos(theta.value * Math.PI / 180)
    const sy = r.value * Math.sin(phi.value * Math.PI / 180) * Math.sin(theta.value * Math.PI / 180)
    const sz = r.value * Math.cos(phi.value * Math.PI / 180)
    correct = Math.abs(sx - data.answer.x) < 0.01 && Math.abs(sy - data.answer.y) < 0.01 && Math.abs(sz - data.answer.z) < 0.01
  }

  if (correct) {
    isCorrect.value = true
    hintCount.value = 0
    errorDetected.value = ''
    showWhy.value = true
    whyText.value = data.whyExplanation
    const lpdText = currentInternalLevel.value === 0
      ? 'LPD: Je past cilindercoördinaten toe.'
      : currentInternalLevel.value === 1
        ? 'LPD: Je analyseert hoe φ de straal splitst.'
        : 'LPD: Je berekent bolcoördinaten (r,θ,φ) → (x,y,z).'
    feedback.value = { type: 'success', text: lpdText }
  } else {
    errorDetected.value = attemptCount.value >= 3 ? 'Kijk naar het voorbeeld. Welke formule gebruik je?' : 'Niet correct. Controleer de formule.'
    feedback.value = { type: 'error', text: errorDetected.value }
  }
}

/* ============================================================
   REFLECTION
   ============================================================ */
function checkReflection() {
  const t = reflectionAnswer.value.toLowerCase().trim()
  const hasMath = t.includes('cos') || t.includes('sin') || t.includes('hoek') || t.includes('straal') || t.includes('projectie')
  const hasReason = t.includes('omdat') || t.includes('want') || t.includes('dus') || t.includes('daarom')
  if (hasMath && hasReason && t.length > 15) {
    reflectionDone.value = true
    feedback.value = { type: 'success', text: 'Uitstekende reflectie! Je begrijpt de logica achter de coördinatensystemen.' }
    isCorrect.value = true
  } else {
    attemptCount.value++
    feedback.value = { type: 'info', text: 'Leg uit waarom de formule werkt. Gebruik termen als cos, sin, hoek.' }
  }
}

/* ============================================================
   HANDLERS
   ============================================================ */
function skipWorkedExample() {
  showWorkedExample.value = false
  showPrediction.value = true
  feedback.value = { type: 'info', text: 'Voorspel eerst het antwoord.' }
}

function resetActivityState() {
  isCorrect.value = false
  celebrationDone.value = false
  attemptCount.value = 0
  hintCount.value = 0
  predictionAnswer.value = null
  predictionSubmitted.value = false
  predictionCorrect.value = false
  errorDetected.value = ''
  showWhy.value = false
  whyText.value = ''
  showReflection.value = false
  reflectionAnswer.value = ''
  reflectionDone.value = false

  const data = currentLevelData.value
  if (data) {
    r.value = data.params.r
    theta.value = data.params.theta
    phi.value = data.params.phi
    z.value = data.params.z
  }

  showWorkedExample.value = currentInternalLevel.value === 0
  showPrediction.value = currentInternalLevel.value >= 1
  feedback.value = { type: 'info', text: currentInternalLevel.value >= 1 ? 'Voorspel eerst.' : 'Verken de 3D-weergave.' }
  nextTick(() => updateScene())
}

function handleNext() {
  if (currentInternalLevel.value === totalInternalLevels - 1 && !showReflection.value && !reflectionDone.value) {
    showReflection.value = true
    showWhy.value = false
    isCorrect.value = false
    feedback.value = { type: 'info', text: 'Reflecteer op wat je leerde.' }
    return
  }
  if (currentInternalLevel.value < totalInternalLevels - 1) {
    currentInternalLevel.value++
    resetActivityState()
    nextTick(() => { mainArea.value?.focus(); updateScene() })
  } else {
    if (props.currentStep < props.totalSteps) emit('update:currentStep', props.currentStep + 1)
    else emit('complete')
  }
}

/* ============================================================
   LIFECYCLE
   ============================================================ */
watch(() => props.isOpen, (val) => {
  if (val) {
    levels.value = [generateLevel(0), generateLevel(1), generateLevel(2)]
    currentInternalLevel.value = 0
    resetActivityState()
    nextTick(() => {
      mainArea.value?.focus()
      initThree()
      setTimeout(() => updateScene(), 50)
    })
    window.addEventListener('keydown', handleKeydown)
  } else {
    window.removeEventListener('keydown', handleKeydown)
    cleanupThree()
  }
}, { immediate: true })

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  cleanupThree()
})

function handleKeydown(e) { if (e.key === 'Escape' && props.isOpen) emit('close') }

watch([r, theta, phi, z], () => updateScene())
watch(currentInternalLevel, () => nextTick(() => updateScene()))
</script>

<template>
<div v-if="isOpen" class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 text-slate-800">
    <div class="absolute inset-0 bg-slate-900/10 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none min-w-[44px] min-h-[44px]"
         @click="emit('close')" role="button" tabindex="0"
         @keydown.enter.prevent="emit('close')" @keydown.space.prevent="emit('close')" aria-label="Sluiten"></div>
    <div ref="mainArea" tabindex="-1" class="relative flex flex-col w-screen h-screen overflow-hidden shadow-md bg-white">

      <!-- HEADER -->
      <header class="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shrink-0 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="flex items-center justify-center p-2 rounded-lg bg-amber-50">
            <component :is="props.icon" weight="fill" class="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 class="text-lg font-bold text-slate-900">{{ title }}</h2>
            <div class="flex items-center gap-3">
              <div class="flex gap-1">
                <span v-for="i in totalInternalLevels" :key="i"
                      class="w-2.5 h-2.5 rounded-full border"
                      :class="i <= currentInternalLevel + 1 ? 'bg-amber-500 border-amber-600' : 'bg-slate-200 border-slate-300'"></span>
              </div>
              <span class="text-xs font-semibold text-slate-500">{{ levelLabels[currentInternalLevel] }} — Level {{ currentInternalLevel + 1 }}</span>
            </div>
          </div>
        </div>
        <button @click="emit('close')" class="p-2 text-slate-500 transition-colors rounded-full hover:bg-slate-100 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
          <PhX class="w-6 h-6" />
        </button>
      </header>

      <!-- MAIN -->
      <main class="flex flex-1 overflow-hidden">
        <!-- LEFT SIDEBAR -->
        <div class="flex-col hidden w-full max-w-sm bg-white border-r border-slate-200 md:flex z-10">
          <div class="flex-1 p-6 overflow-y-auto">
            <h3 class="mb-2 text-sm font-bold tracking-wider text-slate-500 uppercase">Instructies</h3>
            <p class="mb-4 text-sm text-slate-600">{{ props.instruction || 'Leer hoe cilinder- en bolcoördinaten werken door stap voor stap de constructie te volgen.' }}</p>

            <!-- Focus indicator -->
            <div class="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Focus</span>
              <p class="font-bold text-slate-700 mt-1">
                <template v-if="currentInternalLevel === 0">Cilinder: (r, θ) → (x, y)</template>
                <template v-else-if="currentInternalLevel === 1">Bol: r·sin(φ) &amp; r·cos(φ)</template>
                <template v-else>Bol: (r, θ, φ) → (x, y, z)</template>
              </p>
            </div>

            <!-- Worked Example -->
            <div v-if="showWorkedExample" class="bg-amber-50 p-4 rounded-lg mb-4 border-l-4 border-amber-400 animate-fadeIn">
              <div class="flex items-center gap-2 mb-2">
                <PhBrain class="w-5 h-5 text-amber-600" weight="fill" />
                <span class="font-bold text-amber-800 text-sm">Voorbeeld — Doe ik voor</span>
              </div>
              <p class="text-sm font-mono font-bold text-slate-800 mb-3">{{ currentLevelData.worked.problem }}</p>
              <div class="space-y-1.5 text-sm text-slate-700">
                <div v-for="(step, si) in currentLevelData.worked.steps" :key="si" class="flex items-start gap-2">
                  <span class="text-amber-500 font-bold shrink-0 mt-0.5">{{ si + 1 }}.</span>
                  <span>{{ step }}</span>
                </div>
              </div>
              <div class="mt-2 p-2 bg-white rounded-lg text-center font-bold text-amber-700 border border-amber-200">
                Antwoord: {{ currentLevelData.worked.answer }}
              </div>
              <button @click="skipWorkedExample" class="mt-3 w-full py-2 text-sm font-bold text-amber-700 bg-white border-2 border-amber-300 rounded-lg hover:bg-amber-100 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                Begrepen! Zelf proberen →
              </button>
            </div>

            <!-- Prediction Gate -->
            <div v-if="showPrediction && !showWorkedExample" class="p-4 border border-amber-200 bg-amber-50 rounded-xl animate-fadeIn mb-4">
              <div class="flex items-center gap-2 mb-3">
                <PhLightbulb class="w-5 h-5 text-amber-600" weight="fill" />
                <span class="font-bold text-amber-800 text-sm">Voorspel</span>
              </div>
              <p class="text-sm text-slate-700 mb-3">{{ currentLevelData.predictionQuestion }}</p>
              <div class="flex flex-col gap-2">
                <button v-for="opt in currentLevelData.predictionOptions" :key="opt"
                        @click="predictionAnswer = opt"
                        class="w-full py-2 px-3 rounded-lg font-bold text-sm transition-colors border-2 text-left focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
                        :class="predictionAnswer === opt ? 'bg-amber-500 text-white border-amber-600' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'">
                  x = {{ opt }}
                </button>
              </div>
              <button v-if="predictionAnswer !== null && !predictionSubmitted" @click="checkPrediction"
                      class="mt-3 w-full py-2 text-sm font-bold text-white bg-amber-600 rounded-lg hover:bg-amber-500 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                Bevestig voorspelling
              </button>
            </div>

            <!-- Interactive Sliders -->
            <div v-if="!showWorkedExample && !showPrediction && !showReflection" class="p-4 border border-slate-200 bg-slate-50 rounded-xl space-y-3 shadow-inner">
              <p class="font-bold text-slate-700 mb-3 text-sm text-center">Verken de coördinaten:</p>
              <div class="space-y-2">
                <div>
                  <div class="flex justify-between text-xs text-slate-600"><span>r (straal)</span><span class="font-mono font-bold text-amber-600">{{ r.toFixed(1) }}</span></div>
                  <input type="range" v-model.number="r" min="0.5" max="8" step="0.1" class="w-full accent-amber-500" :disabled="isCorrect" />
                </div>
                <div>
                  <div class="flex justify-between text-xs text-slate-600"><span>θ (hoek)</span><span class="font-mono font-bold text-amber-600">{{ Math.round(theta) }}°</span></div>
                  <input type="range" v-model.number="theta" min="0" max="360" step="1" class="w-full accent-amber-500" :disabled="isCorrect" />
                </div>
                <div v-if="currentInternalLevel >= 1">
                  <div class="flex justify-between text-xs text-slate-600"><span>φ (polaire hoek)</span><span class="font-mono font-bold text-amber-600">{{ Math.round(phi) }}°</span></div>
                  <input type="range" v-model.number="phi" min="0" max="180" step="1" class="w-full accent-amber-500" :disabled="isCorrect" />
                </div>
                <div v-if="currentInternalLevel === 0">
                  <div class="flex justify-between text-xs text-slate-600"><span>z (hoogte)</span><span class="font-mono font-bold text-amber-600">{{ z.toFixed(1) }}</span></div>
                  <input type="range" v-model.number="z" min="-5" max="5" step="0.1" class="w-full accent-amber-500" :disabled="isCorrect" />
                </div>
              </div>

              <!-- Live coordinates -->
              <div class="bg-white p-3 rounded-lg border border-slate-200">
                <div class="grid grid-cols-2 gap-1 text-xs">
                  <span class="text-slate-500">{{ currentInternalLevel === 0 ? '(r, θ, z)' : '(r, θ, φ)' }}</span>
                  <span class="font-mono font-bold text-amber-600 text-right">
                    <template v-if="currentInternalLevel === 0">({{ r.toFixed(1) }}, {{ Math.round(theta) }}°, {{ z.toFixed(1) }})</template>
                    <template v-else>({{ r.toFixed(1) }}, {{ Math.round(theta) }}°, {{ Math.round(phi) }}°)</template>
                  </span>
                  <span class="text-slate-500">(x, y, z)</span>
                  <span class="font-mono font-bold text-blue-600 text-right">
                    <template v-if="currentInternalLevel === 0">({{ xCyl.toFixed(2) }}, {{ yCyl.toFixed(2) }}, {{ z.toFixed(2) }})</template>
                    <template v-else>({{ xSph.toFixed(2) }}, {{ ySph.toFixed(2) }}, {{ zSph.toFixed(2) }})</template>
                  </span>
                </div>
              </div>

              <button @click="checkAnswer" :disabled="isCorrect"
                      class="w-full py-3 font-bold text-white rounded-xl bg-slate-800 hover:bg-slate-900 disabled:opacity-40 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                Controleer antwoord
              </button>
            </div>

            <!-- Why -->
            <div v-if="showWhy && !showReflection" class="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl animate-fadeIn">
              <div class="flex items-center gap-2 mb-2">
                <PhBrain class="w-5 h-5 text-amber-600" weight="fill" />
                <span class="font-bold text-amber-800 text-sm">Waarom werkt dit?</span>
              </div>
              <p class="text-sm text-amber-700">{{ whyText }}</p>
            </div>

            <!-- Reflection -->
            <div v-if="showReflection" class="p-4 border border-amber-200 bg-amber-50 rounded-xl animate-fadeIn mb-4">
              <div class="flex items-center gap-2 mb-3">
                <PhPencilSimpleLine class="w-5 h-5 text-amber-600" weight="fill" />
                <span class="font-bold text-amber-800 text-sm">Reflectie</span>
              </div>
              <p class="text-sm text-slate-700 mb-3">{{ currentLevelData.reflectionQuestion }}</p>
              <textarea v-model="reflectionAnswer" :disabled="reflectionDone"
                class="w-full p-3 border-2 border-amber-200 rounded-lg text-sm bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none"
                rows="4" placeholder="De formule werkt zo omdat..."></textarea>
              <button v-if="!reflectionDone" @click="checkReflection" :disabled="!reflectionAnswer.trim()"
                      class="mt-3 w-full py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-amber-500 disabled:opacity-40 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none">
                Bevestig reflectie
              </button>
            </div>

            <!-- Error -->
            <div v-if="!isCorrect && attemptCount > 0 && errorDetected" class="mt-4 p-4 border border-red-200 bg-red-50 rounded-xl animate-fadeIn">
              <h4 class="flex items-center gap-2 text-sm font-bold text-red-800 mb-1"><PhWarningCircle weight="fill" class="w-4 h-4" /> Let op!</h4>
              <p class="text-sm text-red-700">{{ errorDetected }}</p>
            </div>
          </div>

          <!-- Bottom controls -->
          <div class="p-6 bg-slate-50 border-t border-slate-200 shrink-0">
            <div v-if="feedback.text" class="flex items-start gap-3 p-4 mb-4 text-sm font-medium rounded-lg animate-fadeIn"
                 role="status" aria-live="polite"
                 :class="{'bg-amber-50 text-amber-800 border border-amber-200': feedback.type==='success','bg-red-50 text-red-800 border border-red-200': feedback.type==='error','bg-blue-50 text-blue-800 border border-blue-200': feedback.type==='info'}">
              <component :is="feedback.type==='success' ? PhCheckCircle : feedback.type==='error' ? PhWarningCircle : PhLightbulb"
                         class="w-5 h-5 shrink-0 mt-0.5" weight="fill" />
              <span class="leading-snug">{{ feedback.text }}</span>
            </div>
            <div class="flex items-center gap-4">
              <button @click="resetActivityState" class="p-4 text-lg font-medium transition-colors rounded-lg text-slate-500 bg-white border border-slate-200 hover:bg-slate-100 shadow-sm active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                <PhArrowClockwise />
              </button>
              <button v-if="!showWorkedExample && !showPrediction && !showReflection && !isCorrect" @click="showHint"
                      class="flex-1 py-4 font-bold text-slate-600 rounded-lg border-2 border-slate-300 bg-white hover:bg-slate-50 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none flex items-center justify-center gap-2">
                <PhLightbulb weight="fill" class="w-5 h-5 text-amber-500" /> Hint
              </button>
              <button v-if="isCorrect && !showReflection" @click="handleNext"
                      class="flex items-center justify-center flex-1 gap-2 py-4 font-bold text-white transition-all rounded-lg shadow-md bg-amber-600 hover:bg-amber-500 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                <span>{{ currentInternalLevel < totalInternalLevels - 1 ? 'Volgend Level' : 'Volgende stap' }}</span>
                <PhArrowRight weight="bold" />
              </button>
              <button v-if="isCorrect && showReflection && reflectionDone" @click="handleNext"
                      class="flex items-center justify-center flex-1 gap-2 py-4 font-bold text-white transition-all rounded-lg shadow-md bg-amber-600 hover:bg-amber-500 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                <span>{{ currentInternalLevel < totalInternalLevels - 1 ? 'Volgend Level' : 'Afronden' }}</span>
                <PhArrowRight weight="bold" />
              </button>
            </div>
          </div>
        </div>

        <!-- RIGHT CONTENT -->
        <div class="flex flex-col flex-1 overflow-hidden bg-slate-50">
          <div class="flex flex-col flex-1 p-6 overflow-y-auto items-center relative pattern-grid">
            <div class="w-full max-w-4xl space-y-6">

              <!-- Goal display -->
              <div class="bg-white px-10 py-6 rounded-xl shadow-md border-2 border-slate-200 flex items-center justify-center min-h-[80px]">
                <div v-if="showWorkedExample" class="text-center">
                  <p class="text-sm text-amber-600 font-bold mb-2">VOORBEELD</p>
                  <p class="text-2xl font-mono font-black text-amber-700">{{ currentLevelData.worked.problem }}</p>
                </div>
                <div v-else-if="showPrediction" class="text-center">
                  <p class="text-sm text-amber-600 font-bold mb-2">JOUW BEURT — Voorspel eerst</p>
                  <p class="text-xl font-mono font-black text-slate-700 opacity-60">{{ currentLevelData.goalText }}</p>
                </div>
                <div v-else-if="showReflection" class="text-center">
                  <p class="text-sm text-amber-600 font-bold mb-2">REFLECTIE</p>
                  <p class="text-2xl font-bold text-amber-700">Wat heb je geleerd?</p>
                </div>
                <div v-else class="text-center">
                  <p class="text-sm text-amber-600 font-bold mb-2">JOUW BEURT</p>
                  <p class="text-xl font-mono font-black text-slate-800">{{ currentLevelData.goalText }}</p>
                </div>
              </div>

              <!-- 3D Canvas -->
              <div ref="canvasContainer"
                   class="bg-white rounded-xl border-2 border-slate-200 shadow-md overflow-hidden"
                   :class="showReflection ? 'opacity-40' : ''"
                   style="min-height: 360px; height: 420px; position: relative;"></div>

              <!-- Formulas -->
              <div class="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                <p class="font-bold text-slate-700 text-sm mb-2">
                  {{ currentInternalLevel === 0 ? 'Cilindercoördinaten' : 'Bolcoördinaten' }}
                </p>
                <div class="grid grid-cols-2 gap-3">
                  <div class="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <template v-if="currentInternalLevel === 0">
                      <MathText content="'\\( x = r \\cdot \\cos(\\theta) \\)'" class="text-xl font-mono font-bold text-amber-700" />
                      <MathText content="'\\( y = r \\cdot \\sin(\\theta) \\)'" class="text-xl font-mono font-bold text-amber-700" />
                    </template>
                    <template v-else>
                      <MathText content="'\\( r_{xy} = r \\cdot \\sin(\\phi) \\)'" class="text-xl font-mono font-bold text-amber-700" />
                      <MathText content="'\\( z = r \\cdot \\cos(\\phi) \\)'" class="text-xl font-mono font-bold text-amber-700" />
                    </template>
                  </div>
                  <div class="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <template v-if="currentInternalLevel === 0">
                      <MathText content="'\\( z = z \\)'" class="text-xl font-mono font-bold text-blue-700" />
                    </template>
                    <template v-else>
                      <MathText content="'\\( x = r_{xy} \\cdot \\cos(\\theta) \\)'" class="text-xl font-mono font-bold text-blue-700" />
                      <MathText content="'\\( y = r_{xy} \\cdot \\sin(\\theta) \\)'" class="text-xl font-mono font-bold text-blue-700" />
                    </template>
                  </div>
                </div>
                <div v-if="currentInternalLevel >= 2" class="mt-2 text-center p-2 bg-amber-50 rounded-lg border border-amber-200">
                  <MathText content="'\\( (x, y, z) = (r \\cdot \\sin(\\phi) \\cdot \\cos(\\theta), \\; r \\cdot \\sin(\\phi) \\cdot \\sin(\\theta), \\; r \\cdot \\cos(\\phi)) \\)'" class="text-base font-mono font-bold text-amber-700" />
                </div>
              </div>

            </div>
          </div>
        </div>

      </main>
    </div>
  <SuccessCelebration :show="isCorrect && !celebrationDone" @done="celebrationDone = true" :is-level-complete="currentInternalLevel >= totalInternalLevels - 1 && reflectionDone" />
</div>
</template>

<style scoped>
.pattern-grid { background-image: linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px); background-size: 2rem 2rem; }
.animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
</style>
