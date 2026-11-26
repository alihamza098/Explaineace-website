/**
 * Procedural MacBook-style laptop built from Three.js geometry/materials.
 * No external assets. The screen is a CanvasTexture that plays a looping
 * product-UI demo (pick a report, click Export, success toast).
 *
 * This module is imported dynamically from HeroMacbook so three.js never
 * lands in the first-load bundle.
 */
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const LIME = 0xc8f23a;
const SCREEN_W = 1280;
const SCREEN_H = 800;
const LOOP = 9; // seconds, the UI demo loop

export interface MacbookScene {
  /** Advance the scene by `dt` seconds and render one frame. */
  frame: (dt: number) => void;
  /** Render exactly one frame at a fixed pose (used for reduced motion/pause). */
  still: () => void;
  resize: (w: number, h: number) => void;
  dispose: () => void;
  canvas: HTMLCanvasElement;
}

function ease(t: number) {
  return t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t);
}
function seg(t: number, a: number, b: number) {
  return ease((t - a) / (b - a));
}

/** Draws the looping UI demo onto the laptop's screen texture. */
function drawScreen(ctx: CanvasRenderingContext2D, time: number) {
  const t = time % LOOP;
  const W = SCREEN_W;
  const H = SCREEN_H;
  ctx.clearRect(0, 0, W, H);

  // app background
  ctx.fillStyle = "#0E0F0D";
  ctx.fillRect(0, 0, W, H);

  // sidebar
  ctx.fillStyle = "#151613";
  ctx.fillRect(0, 0, 250, H);
  ctx.fillStyle = "#C8F23A";
  ctx.beginPath();
  ctx.arc(46, 54, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#F4F0E6";
  ctx.font = "700 24px system-ui, sans-serif";
  ctx.fillText("Pulse", 74, 62);
  const nav = ["Overview", "Reports", "Teams", "Billing", "Settings"];
  nav.forEach((n, i) => {
    const y = 130 + i * 64;
    if (n === "Reports") {
      ctx.fillStyle = "rgba(200,242,58,0.14)";
      ctx.fillRect(16, y - 30, 218, 48);
    }
    ctx.fillStyle = n === "Reports" ? "#C8F23A" : "#8A8678";
    ctx.font = "500 22px system-ui, sans-serif";
    ctx.fillText(n, 40, y);
  });

  // header
  ctx.fillStyle = "#F4F0E6";
  ctx.font = "700 36px system-ui, sans-serif";
  ctx.fillText("Weekly report", 290, 80);
  ctx.fillStyle = "#8A8678";
  ctx.font = "500 20px system-ui, sans-serif";
  ctx.fillText("Reports  /  Weekly report", 290, 112);

  // export button
  const bx = 1010;
  const by = 46;
  const bw = 214;
  const bh = 64;
  const press = seg(t, 4.3, 4.45) - seg(t, 4.55, 4.75);
  ctx.save();
  ctx.translate(bx + bw / 2, by + bh / 2);
  ctx.scale(1 - 0.05 * press, 1 - 0.05 * press);
  ctx.fillStyle = "#C8F23A";
  roundRect(ctx, -bw / 2, -bh / 2, bw, bh, 18);
  ctx.fill();
  ctx.fillStyle = "#1B2204";
  ctx.font = "700 26px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Export", 0, 9);
  ctx.restore();
  ctx.textAlign = "left";

  // report card
  ctx.fillStyle = "#171815";
  roundRect(ctx, 290, 150, 934, 360, 22);
  ctx.fill();
  ctx.strokeStyle = "rgba(244,240,230,0.10)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // bars grow in
  const grow = seg(t, 0.3, 2.2);
  const vals = [0.42, 0.58, 0.5, 0.74, 0.66, 0.9, 0.8];
  vals.forEach((v, i) => {
    const h = 250 * v * grow;
    const x = 340 + i * 118;
    ctx.fillStyle = i === 5 ? "#C8F23A" : "rgba(244,240,230,0.22)";
    roundRect(ctx, x, 470 - h, 74, h, 10);
    ctx.fill();
    ctx.fillStyle = "#8A8678";
    ctx.font = "500 18px system-ui, sans-serif";
    ctx.fillText(["M", "T", "W", "T", "F", "S", "S"][i], x + 28, 498);
  });

  // KPI row
  const kpi = [
    ["Active users", "12,480"],
    ["Signups", "+18%"],
    ["Retention", "91%"],
  ];
  kpi.forEach((k, i) => {
    const x = 290 + i * 316;
    ctx.fillStyle = "#171815";
    roundRect(ctx, x, 540, 300, 200, 22);
    ctx.fill();
    ctx.strokeStyle = "rgba(244,240,230,0.10)";
    ctx.stroke();
    ctx.fillStyle = "#8A8678";
    ctx.font = "500 20px system-ui, sans-serif";
    ctx.fillText(k[0], x + 28, 590);
    ctx.fillStyle = "#F4F0E6";
    ctx.font = "700 52px system-ui, sans-serif";
    ctx.fillText(k[1], x + 28, 670);
  });

  // success toast
  const toast = seg(t, 5.0, 5.4) - seg(t, 8.3, 8.8);
  if (toast > 0) {
    ctx.save();
    ctx.globalAlpha = toast;
    ctx.translate(0, (1 - toast) * 24);
    ctx.fillStyle = "#F4F0E6";
    roundRect(ctx, 780, 690, 440, 84, 20);
    ctx.fill();
    ctx.fillStyle = "#C8F23A";
    ctx.beginPath();
    ctx.arc(828, 732, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#1B2204";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(818, 733);
    ctx.lineTo(826, 741);
    ctx.lineTo(840, 724);
    ctx.stroke();
    ctx.fillStyle = "#1B2204";
    ctx.font = "700 24px system-ui, sans-serif";
    ctx.fillText("Weekly report exported", 866, 740);
    ctx.restore();
  }

  // cursor travels to Export, clicks, then glides away
  const cx0 = 520;
  const cy0 = 420;
  const cx1 = bx + bw * 0.55;
  const cy1 = by + bh * 0.6;
  const go = seg(t, 2.4, 4.2);
  const away = seg(t, 5.6, 7.4);
  let cx = cx0 + (cx1 - cx0) * go;
  let cy = cy0 + (cy1 - cy0) * go;
  cx += (cx0 + 160 - cx1) * away;
  cy += (cy0 + 120 - cy1) * away;
  // click ripple
  const rip = (t - 4.4) / 0.6;
  if (rip > 0 && rip < 1) {
    ctx.strokeStyle = `rgba(200,242,58,${1 - rip})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx1, cy1, 14 + rip * 54, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.fillStyle = "#F4F0E6";
  ctx.strokeStyle = "#0B0B0A";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx, cy + 34);
  ctx.lineTo(cx + 9, cy + 26);
  ctx.lineTo(cx + 17, cy + 42);
  ctx.lineTo(cx + 24, cy + 38);
  ctx.lineTo(cx + 16, cy + 23);
  ctx.lineTo(cx + 28, cy + 22);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function keyboardTexture() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 640;
  const g = c.getContext("2d")!;
  g.fillStyle = "#0c0c0b";
  g.fillRect(0, 0, c.width, c.height);
  const rows = [14, 14, 14, 13, 12];
  const kh = 54;
  let y = 40;
  rows.forEach((n) => {
    const kw = (c.width - 80 - (n - 1) * 8) / n;
    for (let i = 0; i < n; i++) {
      g.fillStyle = "#1c1c1a";
      roundRect(g, 40 + i * (kw + 8), y, kw, kh, 8);
      g.fill();
    }
    y += kh + 10;
  });
  // space row + trackpad
  g.fillStyle = "#1c1c1a";
  roundRect(g, 220, y, 584, kh, 8);
  g.fill();
  g.fillStyle = "#151514";
  roundRect(g, 330, y + kh + 28, 364, 190, 14);
  g.fill();
  g.strokeStyle = "rgba(244,240,230,0.07)";
  g.lineWidth = 2;
  g.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export function createMacbookScene(host: HTMLElement): MacbookScene {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.display = "block";
  host.appendChild(canvas);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.95;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 3.1, 7.2);
  camera.lookAt(0, 0.7, 0);

  // Lights: warm key, soft lime reflection low-left (tints the aluminium), cool rim.
  const key = new THREE.DirectionalLight(0xfff1dc, 1.6);
  key.position.set(3, 5, 4);
  scene.add(key);
  const limeLight = new THREE.PointLight(LIME, 13, 14, 1.6);
  limeLight.position.set(-3.4, 0.4, 2.6);
  scene.add(limeLight);
  const limeLight2 = new THREE.PointLight(LIME, 7, 10, 1.8);
  limeLight2.position.set(3.2, 2.6, -1.2);
  scene.add(limeLight2);

  const metal = new THREE.MeshStandardMaterial({
    color: 0xd2d3cf,
    metalness: 1,
    roughness: 0.27,
  });

  const group = new THREE.Group();
  scene.add(group);

  const W = 3.3;
  const D = 2.25;
  // base
  const base = new THREE.Mesh(new RoundedBoxGeometry(W, 0.14, D, 5, 0.06), metal);
  base.position.y = 0;
  group.add(base);
  // keyboard deck texture
  const deck = new THREE.Mesh(
    new THREE.PlaneGeometry(W - 0.2, D - 0.2),
    new THREE.MeshStandardMaterial({ map: keyboardTexture(), roughness: 0.8, metalness: 0.1 }),
  );
  deck.rotation.x = -Math.PI / 2;
  deck.position.y = 0.072;
  group.add(deck);

  // lid pivoting around the back edge
  const hinge = new THREE.Group();
  hinge.position.set(0, 0.07, -D / 2 + 0.05);
  hinge.rotation.x = -0.4;
  group.add(hinge);

  const LH = 2.1;
  const lid = new THREE.Mesh(new RoundedBoxGeometry(W, LH, 0.09, 5, 0.04), metal);
  lid.position.set(0, LH / 2, 0);
  hinge.add(lid);

  const bezel = new THREE.Mesh(
    new THREE.PlaneGeometry(W - 0.1, LH - 0.1),
    new THREE.MeshBasicMaterial({ color: 0x050505 }),
  );
  bezel.position.set(0, LH / 2, 0.0465);
  hinge.add(bezel);

  const screenCanvas = document.createElement("canvas");
  screenCanvas.width = SCREEN_W;
  screenCanvas.height = SCREEN_H;
  const sctx = screenCanvas.getContext("2d")!;
  const screenTex = new THREE.CanvasTexture(screenCanvas);
  screenTex.colorSpace = THREE.SRGBColorSpace;
  screenTex.anisotropy = 4;
  const sw = W - 0.26;
  const sh = sw * (SCREEN_H / SCREEN_W);
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(sw, sh), new THREE.MeshBasicMaterial({ map: screenTex }));
  screen.position.set(0, LH / 2 - 0.02, 0.0475);
  hinge.add(screen);

  // soft lime sheen across the glass: additive gradient plane
  const sheenC = document.createElement("canvas");
  sheenC.width = 256;
  sheenC.height = 160;
  const sg = sheenC.getContext("2d")!;
  const grad = sg.createLinearGradient(0, 0, 256, 160);
  grad.addColorStop(0, "rgba(200,242,58,0.22)");
  grad.addColorStop(0.35, "rgba(200,242,58,0.04)");
  grad.addColorStop(1, "rgba(200,242,58,0)");
  sg.fillStyle = grad;
  sg.fillRect(0, 0, 256, 160);
  const sheen = new THREE.Mesh(
    new THREE.PlaneGeometry(sw, sh),
    new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(sheenC),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  sheen.position.set(0, LH / 2 - 0.02, 0.0485);
  hinge.add(sheen);

  // soft contact shadow under the laptop
  const shC = document.createElement("canvas");
  shC.width = shC.height = 128;
  const shg = shC.getContext("2d")!;
  const rg = shg.createRadialGradient(64, 64, 4, 64, 64, 62);
  rg.addColorStop(0, "rgba(0,0,0,0.55)");
  rg.addColorStop(1, "rgba(0,0,0,0)");
  shg.fillStyle = rg;
  shg.fillRect(0, 0, 128, 128);
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(W * 1.6, D * 1.6),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shC), transparent: true, depthWrite: false }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -0.075;
  scene.add(shadow);

  group.position.y = -0.2;

  let clock = 0;
  const YAW_PERIOD = 18; // seconds for one full sway loop
  const pose = (t: number) => {
    const a = (t / YAW_PERIOD) * Math.PI * 2;
    group.rotation.y = Math.sin(a) * 0.62 - 0.12;
    group.rotation.x = Math.sin(a * 0.5 + 1) * 0.03;
    limeLight.position.x = -3.4 + Math.sin(a) * 0.8;
  };

  const render = () => {
    drawScreen(sctx, clock);
    screenTex.needsUpdate = true;
    renderer.render(scene, camera);
  };

  return {
    canvas,
    frame(dt: number) {
      clock += dt;
      pose(clock);
      render();
    },
    still() {
      clock = 15.8; // success toast visible, laptop angled ~30deg
      pose(clock);
      render();
    },
    resize(w: number, h: number) {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // keep the laptop fully framed on narrow hosts
      camera.position.z = camera.aspect < 1.2 ? 7.2 * (1.2 / Math.max(camera.aspect, 0.8)) * 0.92 : 7.2;
    },
    dispose() {
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else if (mat) {
          (mat as THREE.MeshBasicMaterial).map?.dispose();
          mat.dispose();
        }
      });
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
