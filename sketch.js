// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three');

// Include any additional ThreeJS examples below
require('three/examples/js/controls/OrbitControls');

const canvasSketch = require('canvas-sketch');

const settings = {
  // dimensions: 'A4',
  // dimensions: [,12],
  // pixelsPerInch: 70,
  // scaleToView: true,
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas,
  });

  // WebGL background color
  renderer.setClearColor('#000', 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(12, 2, -14);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  const geometry = new THREE.SphereGeometry(1, 32, 16);

  const loader = new THREE.TextureLoader();
  const textureEarth = loader.load('earth.jpg');
  const moonTexture = loader.load('moon.jpg');
  const sunTexture = loader.load('sun.jpg');
  const marsTexture = loader.load('mars.jpg');
  const jupiterTexture = loader.load('jupiter.jpg');

  const milkywayTexture = loader.load('milky_way.jpg');
  // milkywayTexture.wrapS = milkywayTexture.wrapT = THREE.RepeatWrapping;
  // milkywayTexture.repeat.set(1, 3);

  scene.background = milkywayTexture;

  // Setup a material
  const earthMaterial = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: textureEarth,
  });
  const earthGroup = new THREE.Group();

  const moonMaterial = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: moonTexture,
  });
  const moonGroup = new THREE.Group();

  const sunMaterial = new THREE.MeshBasicMaterial({
    roughness: 1,
    metalness: 0,
    map: sunTexture,
  });

  const marsMaterial = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: marsTexture,
  });
  const marsGroup = new THREE.Group();

  const jupiterMaterial = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    map: jupiterTexture,
  });
  const jupiterGroup = new THREE.Group();

  // Setup a mesh with geometry + material
  const earthMesh = new THREE.Mesh(geometry, earthMaterial);
  earthMesh.position.set(10, 1, 0);
  earthGroup.add(earthMesh);
  // scene.add(earthMesh);

  const moonMesh = new THREE.Mesh(geometry, moonMaterial);
  moonMesh.position.set(1.4, 0.4, 0);
  moonMesh.scale.setScalar(0.25);
  moonGroup.add(moonMesh);
  earthMesh.add(moonGroup);

  const marsMesh = new THREE.Mesh(geometry, marsMaterial);
  marsMesh.position.set(15, 1.2, 0);
  marsGroup.add(marsMesh);

  const jupiterMesh = new THREE.Mesh(geometry, jupiterMaterial);
  jupiterMesh.position.set(22, -1, 0);
  jupiterMesh.scale.setScalar(1.5);
  jupiterGroup.add(jupiterMesh);

  const sunMesh = new THREE.Mesh(geometry, sunMaterial);
  sunMesh.position.set(0, 0, 0);
  sunMesh.scale.setScalar(4);
  scene.add(sunMesh);
  scene.add(earthGroup);
  scene.add(marsGroup);
  scene.add(jupiterGroup);

  const light = new THREE.PointLight('white', 2);
  light.position.set(0, 0, 0);
  scene.add(light);

  // scene.add(new THREE.GridHelper(5, 50));
  // scene.add(new THREE.PointLightHelper(light, 0.1));

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      console.log(time);
      earthMesh.rotation.y = time * 0.4;
      earthGroup.rotation.y = time * 0.3;
      moonMesh.rotation.y = time * 0.2;
      moonGroup.rotation.y = time * 0.7;
      marsMesh.rotation.y = time * 0.4;
      marsGroup.rotation.y = time * 0.15;
      jupiterMesh.rotation.y = time * 0.7;
      jupiterGroup.rotation.y = time * 0.04;
      sunMesh.rotation.y = time * 0.02;

      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    },
  };
};

canvasSketch(sketch, settings);
