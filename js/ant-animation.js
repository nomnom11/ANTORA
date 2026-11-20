import * as THREE from '../node_modules/three/build/three.module.js';

(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'antora-ant-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'fixed',
    inset: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: '50'
  });
  document.body.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-8, 8, 8, -8, 0.1, 100);
  camera.position.z = 30;

  scene.add(new THREE.AmbientLight(0xffd98a, 1.5));

  const goldLight = new THREE.DirectionalLight(0xffc34d, 3.2);
  goldLight.position.set(-5, 8, 12);
  scene.add(goldLight);

  const rimLight = new THREE.DirectionalLight(0xffffff, 2);
  rimLight.position.set(5, -4, 8);
  scene.add(rimLight);

  const gold = new THREE.MeshPhysicalMaterial({
    color: 0xc58a24,
    metalness: 0.88,
    roughness: 0.24,
    clearcoat: 0.8,
    clearcoatRoughness: 0.18
  });

  const darkGold = new THREE.MeshPhysicalMaterial({
    color: 0x70430e,
    metalness: 0.82,
    roughness: 0.3
  });

  const black = new THREE.MeshStandardMaterial({
    color: 0x17100a,
    metalness: 0.35,
    roughness: 0.3
  });

  const ant = new THREE.Group();
  scene.add(ant);

  function sphere(parent, x, y, z, sx, sy, sz, material = gold) {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 24),
      material
    );
    mesh.position.set(x, y, z);
    mesh.scale.set(sx, sy, sz);
    parent.add(mesh);
    return mesh;
  }

  function rod(parent, start, end, radius, material = gold) {
    const a = new THREE.Vector3(...start);
    const b = new THREE.Vector3(...end);
    const direction = new THREE.Vector3().subVectors(b, a);
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 0.72, radius, direction.length(), 12),
      material
    );
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    parent.add(mesh);
    return mesh;
  }

  // Abdomen, thorax, and head
  sphere(ant, 1.12, 0, 0, 0.88, 0.59, 0.48);
  sphere(ant, 0.12, 0, 0, 0.43, 0.34, 0.32);
  sphere(ant, -0.72, 0.03, 0, 0.53, 0.47, 0.42);

  // Abdomen highlights and body connection
  sphere(ant, 1.12, 0.48, 0, 0.48, 0.07, 0.28, darkGold);
  rod(ant, [-0.25, 0, 0], [-0.42, 0, 0], 0.13, darkGold);

  // Eyes
  sphere(ant, -0.98, 0.17, 0.34, 0.105, 0.105, 0.07, black);
  sphere(ant, -0.98, 0.17, -0.34, 0.105, 0.105, 0.07, black);

  // Mandibles
  rod(ant, [-1.1, -0.22, 0.16], [-1.42, -0.43, 0.2], 0.055, darkGold);
  rod(ant, [-1.1, -0.22, -0.16], [-1.42, -0.43, -0.2], 0.055, darkGold);

  // Antennae
  const antennae = [];
  for (const side of [-1, 1]) {
    const antenna = new THREE.Group();
    antenna.position.set(-0.98, 0.37, side * 0.16);
    ant.add(antenna);
    rod(antenna, [0, 0, 0], [-0.22, 0.38, side * 0.04], 0.035);
    rod(antenna, [-0.22, 0.38, side * 0.04], [-0.42, 0.48, side * 0.07], 0.027, darkGold);
    sphere(antenna, -0.42, 0.48, side * 0.07, 0.045, 0.045, 0.045);
    antennae.push(antenna);
  }

  // Six articulated legs
  const legs = [];
  for (let i = 0; i < 3; i++) {
    const x = [-0.48, 0.08, 0.55][i];

    for (const side of [-1, 1]) {
      const leg = new THREE.Group();
      leg.position.set(x, -0.12, side * 0.22);
      ant.add(leg);

      const kneeX = i === 1 ? 0.12 : (i === 0 ? -0.23 : 0.28);
      const kneeY = -0.48;
      const footX = kneeX + (i === 0 ? -0.2 : 0.2);
      const footY = -0.98;

      rod(leg, [0, 0, 0], [kneeX, kneeY, side * 0.18], 0.075);
      sphere(leg, kneeX, kneeY, side * 0.18, 0.09, 0.09, 0.09, darkGold);
      rod(
        leg,
        [kneeX, kneeY, side * 0.18],
        [footX, footY, side * 0.3],
        0.045,
        darkGold
      );
      rod(
        leg,
        [footX, footY, side * 0.3],
        [footX + 0.13, footY - 0.04, side * 0.32],
        0.027
      );

      legs.push({ group: leg, phase: i * 2.1 + (side === 1 ? 0 : Math.PI) });
    }
  }

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    const aspect = window.innerWidth / window.innerHeight;
    const viewHeight = 8;
    camera.left = -viewHeight * aspect;
    camera.right = viewHeight * aspect;
    camera.top = viewHeight;
    camera.bottom = -viewHeight;
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', resize);
  resize();

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Rounded rectangular perimeter path.
    const travel = t * 0.18;
    const aspect = window.innerWidth / window.innerHeight;
    const halfWidth = Math.min(7, aspect * 5.5);
    const halfHeight = 4.8;
    const exponent = 0.45;

    const roundedRectPoint = (angle) => {
      const c = Math.cos(angle);
      const sn = Math.sin(angle);
      return {
        x: halfWidth * Math.sign(c) * Math.pow(Math.abs(c), exponent),
        y: halfHeight * Math.sign(sn) * Math.pow(Math.abs(sn), exponent)
      };
    };

    const point = roundedRectPoint(travel);
    const nextPoint = roundedRectPoint(travel + 0.001);

    ant.position.set(point.x, point.y, 0);

    const velocityX = nextPoint.x - point.x;
    const velocityY = nextPoint.y - point.y;
    ant.rotation.z = Math.atan2(velocityY, velocityX) + Math.PI;

    ant.scale.setScalar(window.innerWidth < 600 ? 0.68 : 0.88);

    legs.forEach(({ group, phase }) => {
      group.rotation.z = Math.sin(t * 9 + phase) * 0.24;
    });

    antennae.forEach((antenna, i) => {
      antenna.rotation.z = Math.sin(t * 4 + i) * 0.12;
    });

    renderer.render(scene, camera);
  }

  animate();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clock.stop();
    else clock.start();
  });
})();
