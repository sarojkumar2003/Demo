import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCcw } from 'lucide-react';
import heroFallbackImg from '../../assets/Images/1.png';


export const Hero3D = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const requestRef = useRef<number | null>(null);

  // States
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasRelief, setHasRelief] = useState(false);

  // Villa Customization Style
  const [villaStyle] = useState<'minimalist' | 'obsidian' | 'biogreen' | 'hightech' | 'wireframe'>('minimalist');

  // Interactive Options for 3D Relief
  const [reliefStyle, setReliefStyle] = useState<'textured' | 'clay' | 'gold' | 'hologram'>('textured');
  const [reliefDepth, setReliefDepth] = useState<'low' | 'medium' | 'high'>('medium');

  // References for scene elements to dynamically update on style changes
  const meshesRef = useRef<{ mesh: THREE.Mesh; originalMat: THREE.Material }[]>([]);
  const lightsRef = useRef<THREE.Light[]>([]);
  const houseLightRef = useRef<THREE.PointLight | null>(null);
  const poolLightRef = useRef<THREE.PointLight | null>(null);
  const fireLightRef = useRef<THREE.PointLight | null>(null);
  const waterfallRef = useRef<THREE.Mesh | null>(null);
  const reliefMeshRef = useRef<THREE.Mesh | null>(null);
  const gridHelperRef = useRef<THREE.GridHelper | null>(null);
  
  // Image properties cache for fast updates
  const currentImgData = useRef<Uint8ClampedArray | null>(null);
  const activeTexture = useRef<THREE.Texture | null>(null);


  // Dynamically update relief geometry and materials when depth or style changes
  useEffect(() => {
    if (!reliefMeshRef.current || !currentImgData.current) return;

    const mesh = reliefMeshRef.current;
    const geom = mesh.geometry;
    const posAttr = geom.attributes.position;
    const imgData = currentImgData.current;
    
    const multiplier = reliefDepth === 'low' ? 0.6 : reliefDepth === 'medium' ? 1.5 : 2.6;
    for (let i = 0; i < posAttr.count; i++) {
      const r = imgData[i * 4];
      const g = imgData[i * 4 + 1];
      const b = imgData[i * 4 + 2];
      const brightness = (r + g + b) / 3 / 255;
      posAttr.setZ(i, brightness * multiplier);
    }
    posAttr.needsUpdate = true;
    geom.computeVertexNormals();

    let newMat: THREE.Material;
    if (reliefStyle === 'textured' && activeTexture.current) {
      newMat = new THREE.MeshStandardMaterial({
        map: activeTexture.current,
        roughness: 0.4,
        metalness: 0.1,
        side: THREE.DoubleSide
      });
    } else if (reliefStyle === 'clay') {
      newMat = new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        roughness: 0.8,
        metalness: 0.0,
        side: THREE.DoubleSide
      });
    } else if (reliefStyle === 'gold') {
      newMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        roughness: 0.18,
        metalness: 0.9,
        side: THREE.DoubleSide
      });
    } else { // hologram wireframe
      newMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });
    }

    if (Array.isArray(mesh.material)) {
      mesh.material.forEach(m => m.dispose());
    } else {
      mesh.material.dispose();
    }

    mesh.material = newMat;
  }, [reliefStyle, reliefDepth]);

  // Dynamically update the Villa materials and lights based on the selected theme (Minimalist, Obsidian, Bio-Green, High-Tech, Wireframe)
  useEffect(() => {
    if (!sceneRef.current) return;

    const schemes = {
      minimalist: {
        concrete: { color: 0xf8fafc, roughness: 0.5, metalness: 0.1 },
        darkConcrete: { color: 0x1e293b, roughness: 0.6, metalness: 0.1 },
        glass: { color: 0xe0f2fe, transparent: true, opacity: 0.25, roughness: 0.05, metalness: 0.9 },
        wood: { color: 0x7c2d12, roughness: 0.7 },
        accent: { color: 0x0f172a, roughness: 0.3 },
        led: { color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.8 },
        poolLight: { color: 0x0ea5e9, intensity: 1.5 },
        waterfall: { color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.2 },
        water: { color: 0x0284c7, roughness: 0.2, metalness: 0.8, transparent: true, opacity: 0.75 },
        greenery: { color: 0x15803d, roughness: 0.9, metalness: 0.0 },
        trunk: { color: 0x451a03, roughness: 0.9, metalness: 0.0 },
        windowFrame: { color: 0x0f172a, roughness: 0.3, metalness: 0.5 }
      },
      obsidian: {
        concrete: { color: 0x0f172a, roughness: 0.2, metalness: 0.5 }, // Black slate
        darkConcrete: { color: 0x020617, roughness: 0.1, metalness: 0.7 }, // Dark obsidian marble
        glass: { color: 0x1e293b, transparent: true, opacity: 0.45, roughness: 0.05, metalness: 0.95 },
        wood: { color: 0x451a03, roughness: 0.8 }, // Walnut
        accent: { color: 0xd4af37, roughness: 0.2, metalness: 0.9 }, // Gold
        led: { color: 0xd4af37, emissive: 0xd4af37, emissiveIntensity: 1.5 }, // Golden LED
        poolLight: { color: 0x22d3ee, intensity: 3.0 },
        waterfall: { color: 0x22d3ee, emissive: 0x0891b2, emissiveIntensity: 0.4 },
        water: { color: 0x0284c7, roughness: 0.2, metalness: 0.8, transparent: true, opacity: 0.75 },
        greenery: { color: 0x1e293b, roughness: 0.8, metalness: 0.2 },
        trunk: { color: 0x0f172a, roughness: 0.9, metalness: 0.1 },
        windowFrame: { color: 0xd4af37, roughness: 0.2, metalness: 0.9 }
      },
      biogreen: {
        concrete: { color: 0xe2e8f0, roughness: 0.6, metalness: 0.0 },
        darkConcrete: { color: 0xb45309, roughness: 0.8, metalness: 0.0 }, // Terracotta
        glass: { color: 0xf0fdf4, transparent: true, opacity: 0.15, roughness: 0.1 },
        wood: { color: 0xd97706, roughness: 0.5 }, // Light pine
        accent: { color: 0x78350f, roughness: 0.4, metalness: 0.7 }, // Bronze
        led: { color: 0xfffaf0, emissive: 0xfffaf0, emissiveIntensity: 0.7 },
        poolLight: { color: 0x34d399, intensity: 2.0 },
        waterfall: { color: 0x34d399, emissive: 0x059669, emissiveIntensity: 0.3 },
        water: { color: 0x0284c7, roughness: 0.2, metalness: 0.8, transparent: true, opacity: 0.75 },
        greenery: { color: 0x16a34a, roughness: 0.8, metalness: 0.0 },
        trunk: { color: 0x78350f, roughness: 0.9, metalness: 0.0 },
        windowFrame: { color: 0x78350f, roughness: 0.4, metalness: 0.7 }
      },
      hightech: {
        concrete: { color: 0xcbd5e1, roughness: 0.2, metalness: 0.8 }, // Titanium plates
        darkConcrete: { color: 0x0f172a, roughness: 0.4, metalness: 0.85 }, // Carbon fiber
        glass: { color: 0x06b6d4, transparent: true, opacity: 0.3, roughness: 0.0, metalness: 1.0 }, // Cyber blue glass
        wood: { color: 0x1e293b, roughness: 0.9, metalness: 0.2 },
        accent: { color: 0x06b6d4, roughness: 0.2, metalness: 0.9 }, // Cyber cyan steel
        led: { color: 0x06b6d4, emissive: 0x06b6d4, emissiveIntensity: 2.5 },
        poolLight: { color: 0xa78bfa, intensity: 2.5 },
        waterfall: { color: 0xa78bfa, emissive: 0x7c3aed, emissiveIntensity: 0.5 },
        water: { color: 0x0284c7, roughness: 0.2, metalness: 0.8, transparent: true, opacity: 0.75 },
        greenery: { color: 0x0891b2, roughness: 0.6, metalness: 0.8 },
        trunk: { color: 0x1e293b, roughness: 0.9, metalness: 0.5 },
        windowFrame: { color: 0x06b6d4, roughness: 0.1, metalness: 0.95 }
      },
      wireframe: {
        concrete: { color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.4 },
        darkConcrete: { color: 0x4f46e5, wireframe: true, transparent: true, opacity: 0.4 },
        glass: { color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.6 },
        wood: { color: 0x818cf8, wireframe: true, transparent: true, opacity: 0.3 },
        accent: { color: 0x4338ca, wireframe: true, transparent: true, opacity: 0.4 },
        led: { color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.3 },
        poolLight: { color: 0x6366f1, intensity: 0.5 },
        waterfall: { color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.4 },
        water: { color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.3 },
        greenery: { color: 0x10b981, wireframe: true, transparent: true, opacity: 0.25 },
        trunk: { color: 0xd97706, wireframe: true, transparent: true, opacity: 0.3 },
        windowFrame: { color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.5 }
      }
    };

    const scheme = schemes[villaStyle];

    // Traverse and apply style scheme colors and parameters
    sceneRef.current.traverse((object) => {
      if (object instanceof THREE.Mesh && object.userData.type) {
        const type = object.userData.type as keyof typeof scheme;
        const matProps = scheme[type];
        
        if (matProps && object.material instanceof THREE.MeshStandardMaterial) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const props = matProps as Record<string, any>;
          if ('color' in props) {
            object.material.color.setHex(props.color);
          }
          if ('roughness' in props) {
            object.material.roughness = props.roughness;
          }
          if ('metalness' in props) {
            object.material.metalness = props.metalness;
          }
          if ('emissive' in props) {
            object.material.emissive.setHex(props.emissive);
            object.material.emissiveIntensity = props.emissiveIntensity;
          } else {
            object.material.emissive.setHex(0x000000);
            object.material.emissiveIntensity = 0;
          }

          // Handle wireframe blueprint layout adjustments dynamically
          object.material.wireframe = props.wireframe || false;
          object.material.transparent = props.transparent || false;
          object.material.opacity = props.opacity !== undefined ? props.opacity : 1.0;

          object.material.needsUpdate = true;
        }
      }
    });

    // Update blueprint helper grid
    if (gridHelperRef.current) {
      gridHelperRef.current.visible = (villaStyle === 'wireframe');
    }

    // Update point lights
    if (houseLightRef.current) {
      if (villaStyle === 'wireframe') {
        houseLightRef.current.color.setHex(0x6366f1);
      } else if (villaStyle === 'hightech') {
        houseLightRef.current.color.setHex(0x06b6d4);
      } else if (villaStyle === 'obsidian') {
        houseLightRef.current.color.setHex(0xffb703);
      } else if (villaStyle === 'biogreen') {
        houseLightRef.current.color.setHex(0xf59e0b);
      } else {
        houseLightRef.current.color.setHex(0xffaa44);
      }
    }

    if (fireLightRef.current) {
      if (villaStyle === 'wireframe') {
        fireLightRef.current.color.setHex(0x6366f1);
      } else if (villaStyle === 'hightech') {
        fireLightRef.current.color.setHex(0x06b6d4);
      } else if (villaStyle === 'obsidian') {
        fireLightRef.current.color.setHex(0xffaa33);
      } else if (villaStyle === 'biogreen') {
        fireLightRef.current.color.setHex(0xfff8ee);
      } else {
        fireLightRef.current.color.setHex(0xff9922);
      }
    }

    if (poolLightRef.current) {
      poolLightRef.current.color.setHex(scheme.poolLight.color);
      poolLightRef.current.intensity = scheme.poolLight.intensity;
    }

    if (waterfallRef.current && waterfallRef.current.material instanceof THREE.MeshStandardMaterial) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const props = scheme.waterfall as Record<string, any>;
      waterfallRef.current.material.color.setHex(props.color);
      if ('emissive' in props) {
        waterfallRef.current.material.emissive.setHex(props.emissive);
        waterfallRef.current.material.emissiveIntensity = props.emissiveIntensity;
      } else {
        waterfallRef.current.material.emissive.setHex(0x000000);
        waterfallRef.current.material.emissiveIntensity = 0;
      }
      waterfallRef.current.material.wireframe = props.wireframe || false;
      waterfallRef.current.material.transparent = props.transparent || false;
      waterfallRef.current.material.opacity = props.opacity !== undefined ? props.opacity : 0.6;
      waterfallRef.current.material.needsUpdate = true;
    }
  }, [villaStyle]);


  const clearReliefMesh = () => {
    if (sceneRef.current && reliefMeshRef.current) {
      sceneRef.current.remove(reliefMeshRef.current);
      reliefMeshRef.current.geometry.dispose();
      if (Array.isArray(reliefMeshRef.current.material)) {
        reliefMeshRef.current.material.forEach(m => m.dispose());
      } else {
        reliefMeshRef.current.material.dispose();
      }
      reliefMeshRef.current = null;
    }
    if (activeTexture.current) {
      activeTexture.current.dispose();
      activeTexture.current = null;
    }
  };

  const handleClearRelief = () => {
    clearReliefMesh();
    currentImgData.current = null;
    setHasRelief(false);

    // Smoothly return focus to the villa structure
    if (cameraRef.current && controlsRef.current) {
      const duration = 800;
      const startTarget = controlsRef.current.target.clone();
      const targetTarget = new THREE.Vector3(0, 3.6, -1.0);
      const startTime = performance.now();

      const animateTransition = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        controlsRef.current!.target.lerpVectors(startTarget, targetTarget, progress);
        controlsRef.current!.update();

        if (progress < 1) {
          requestAnimationFrame(animateTransition);
        }
      };
      requestAnimationFrame(animateTransition);
    }
  };



  useEffect(() => {
    if (!containerRef.current) return;

    // --- 1. Scene setup ---
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background
    scene.fog = new THREE.Fog(0xffffff, 80, 100);
    sceneRef.current = scene;
    const villaGroup = new THREE.Group();
    villaGroup.scale.set(1.05, 1.05, 1.05); // Scale up for better visibility
    villaGroup.position.set(0, 3, 0); // Position villa for optimal view
    scene.add(villaGroup);

    // Add shadow-receiving ground plane for realistic shadows
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const groundGeo = new THREE.PlaneGeometry(40, 40);
    const groundMesh = new THREE.Mesh(groundGeo, groundMaterial);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.02;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // --- 2. Camera setup ---
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(32, 16, 18);
    cameraRef.current = camera;

    // --- 3. Renderer setup ---
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    } catch (error) {
      console.warn('WebGL is not supported or disabled in this browser. Falling back to high-res static image.', error);
      // Defer setState to avoid triggering synchronous-setState-in-effect lint rule.
      // setTimeout(0) still runs immediately after this render, which is the correct pattern.
      setTimeout(() => {
        setIsWebGLSupported(false);
        setIsLoading(false);
      }, 0);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap; // Higher quality soft shadows
    renderer.shadowMap.autoUpdate = true;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- 4. Controls setup ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 15;
    controls.maxDistance = 52;
    controls.target.set(0, 3.2, -0.8); // Adjusted lower target to center the model and avoid bottom clipping
    controls.autoRotate = true; // Auto-rotate enabled by default
    controls.autoRotateSpeed = 0.8; // Smooth, slow rotation
    controlsRef.current = controls;

    (window as Window & { debugCamera?: THREE.PerspectiveCamera }).debugCamera = camera;
    (window as Window & { debugControls?: OrbitControls }).debugControls = controls;

    // --- 5. Resize Observer to prevent 0-dimension sizing bugs on mount ---
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(containerRef.current);

    // --- 6. Lights setup ---
    const ambientLight = new THREE.AmbientLight(0xdde2ff, 0.55); // Cool blue skylight fill
    scene.add(ambientLight);
    lightsRef.current.push(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffecd2, 1.5); // Warm golden sunset sun
    sunLight.position.set(20, 15, 12);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048; // High-res shadow maps!
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;
    const d = 15;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.0005; // Prevent shadow acne
    scene.add(sunLight);
    lightsRef.current.push(sunLight);

    // Ground floor warm interior light (houseLight)
    const houseLight = new THREE.PointLight(0xffaa33, 3.0, 12);
    houseLight.position.set(1.0, 1.4, 1.5);
    houseLight.castShadow = true;
    houseLight.shadow.bias = -0.001;
    scene.add(houseLight);
    lightsRef.current.push(houseLight);
    houseLightRef.current = houseLight;

    // Middle floor warm interior light (middleLight)
    const middleLight = new THREE.PointLight(0xffb703, 3.0, 12);
    middleLight.position.set(2.0, 3.8, 1.0);
    scene.add(middleLight);
    lightsRef.current.push(middleLight);

    // Top floor suite warm interior light (fireLight - repurposed for suite glow)
    const fireLight = new THREE.PointLight(0xff9922, 3.0, 12);
    fireLight.position.set(-1.0, 6.4, 1.0);
    scene.add(fireLight);
    lightsRef.current.push(fireLight);
    fireLightRef.current = fireLight;

    // Pool glowing underwater cyan light
    const poolLight = new THREE.PointLight(0x0ea5e9, 2.0, 8);
    poolLight.position.set(-1.0, 0.3, 6.0);
    scene.add(poolLight);
    lightsRef.current.push(poolLight);
    poolLightRef.current = poolLight;

    // Additional interior fill lights for better visibility
    const interiorFillLight1 = new THREE.PointLight(0xffd4a3, 2.5, 15);
    interiorFillLight1.position.set(-2.0, 2.5, 2.0);
    scene.add(interiorFillLight1);
    lightsRef.current.push(interiorFillLight1);

    const interiorFillLight2 = new THREE.PointLight(0xffe8cc, 2.0, 12);
    interiorFillLight2.position.set(4.0, 4.0, 0.0);
    scene.add(interiorFillLight2);
    lightsRef.current.push(interiorFillLight2);

    const interiorFillLight3 = new THREE.PointLight(0xffc996, 2.5, 14);
    interiorFillLight3.position.set(2.0, 6.5, 2.0);
    scene.add(interiorFillLight3);
    lightsRef.current.push(interiorFillLight3);

    // Grid Helper for blueprint wireframe style (rendered directly below the ground)
    const gridHelper = new THREE.GridHelper(30, 30, 0x6366f1, 0x94a3b8);
    gridHelper.position.y = -0.01;
    gridHelper.visible = false;
    scene.add(gridHelper);
    gridHelperRef.current = gridHelper;

    // --- 7. Procedural Model Creation ---
    const materials = {
      concrete: new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.45, metalness: 0.1 }),
      darkConcrete: new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.55, metalness: 0.15 }),
      glass: new THREE.MeshStandardMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.25, roughness: 0.05, metalness: 0.9, side: THREE.DoubleSide }),
      wood: new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.65 }), // Rich warm teak/cedar color
      water: new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.15, metalness: 0.85, transparent: true, opacity: 0.75 }),
      greenery: new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.85 }),
      trunk: new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.9 }),
      windowFrame: new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.7 }),
      led: new THREE.MeshStandardMaterial({ color: 0xffb347, emissive: 0xffaa00, emissiveIntensity: 2.0 }),
      waterfall: new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.55, emissive: 0x0284c7, emissiveIntensity: 0.3, side: THREE.DoubleSide }),
      solar: new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.18, metalness: 0.55 }),
      metal: new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.2, metalness: 0.8 }),
      // Interior materials
      interiorWall: new THREE.MeshStandardMaterial({ color: 0xe8e8e8, roughness: 0.7, metalness: 0.0 }), // Soft white interior wall
      interiorCeiling: new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.5, metalness: 0.05 }), // Bright ceiling
      interiorFloor: new THREE.MeshStandardMaterial({ color: 0xd4d4d4, roughness: 0.6, metalness: 0.1 }), // Medium gray floor
      interiorWood: new THREE.MeshStandardMaterial({ color: 0x8b6f47, roughness: 0.5, metalness: 0.05 }), // Light wood interior
      interiorAccent: new THREE.MeshStandardMaterial({ color: 0xc9a960, roughness: 0.4, metalness: 0.3 }), // Gold accent interior
      // Furniture materials
      sofaFabric: new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.8, metalness: 0.0 }), // Dark gray sofa
      sofaPillow: new THREE.MeshStandardMaterial({ color: 0x6b5b4f, roughness: 0.7, metalness: 0.0 }), // Brown pillow
      bedFabric: new THREE.MeshStandardMaterial({ color: 0x8b7355, roughness: 0.75, metalness: 0.0 }), // Tan bed fabric
      tableTop: new THREE.MeshStandardMaterial({ color: 0x654321, roughness: 0.6, metalness: 0.15 }), // Dark wood table
      partition: new THREE.MeshStandardMaterial({ color: 0xc0a080, roughness: 0.65, metalness: 0.05 }) // Light tan partition
    };

    const addArchitecturalElement = (
      geo: THREE.BufferGeometry,
      matKey: keyof typeof materials,
      pos: [number, number, number],
      rot: [number, number, number] = [0, 0, 0],
      receiveShadow = true,
      castShadow = true
    ) => {
      const mesh = new THREE.Mesh(geo, materials[matKey]);
      mesh.position.set(...pos);
      mesh.rotation.set(...rot);
      mesh.castShadow = castShadow;
      mesh.receiveShadow = receiveShadow;
      mesh.userData.type = matKey; // Save material type tag for live traversal style updates
      villaGroup.add(mesh);

      meshesRef.current.push({
        mesh,
        originalMat: materials[matKey]
      });

      return mesh;
    };

    // 1. BASE DECK & FLOATING STEPS
    // Main base slab
    addArchitecturalElement(new THREE.BoxGeometry(22, 0.2, 16), 'concrete', [0, 0.1, 0]);
    // Plinth platform
    addArchitecturalElement(new THREE.BoxGeometry(18, 0.1, 11), 'concrete', [0.5, 0.25, 0.5]);
    
    // Front-left Planter Box & Greenery
    addArchitecturalElement(new THREE.BoxGeometry(3.0, 0.4, 0.15), 'concrete', [-6.0, 0.5, 5.5]);
    addArchitecturalElement(new THREE.BoxGeometry(0.15, 0.4, 2.0), 'concrete', [-4.5, 0.5, 4.5]);
    addArchitecturalElement(new THREE.BoxGeometry(0.15, 0.4, 2.0), 'concrete', [-7.5, 0.5, 4.5]);
    addArchitecturalElement(new THREE.BoxGeometry(2.8, 0.3, 1.8), 'greenery', [-6.0, 0.55, 4.5], [0, 0, 0], true, false);
    
    // Shrub spheres inside planter
    addArchitecturalElement(new THREE.DodecahedronGeometry(0.42, 1), 'greenery', [-6.8, 0.8, 4.5]);
    addArchitecturalElement(new THREE.DodecahedronGeometry(0.48, 1), 'greenery', [-6.0, 0.85, 4.5]);
    addArchitecturalElement(new THREE.DodecahedronGeometry(0.40, 1), 'greenery', [-5.2, 0.78, 4.5]);

    // Front-right Floating Steps (leading to the entrance)
    for (let i = 0; i < 4; i++) {
      const stepY = 0.075 + i * 0.075;
      addArchitecturalElement(
        new THREE.BoxGeometry(6.0 - i * 0.4, 0.15, 0.8),
        'concrete',
        [2.5, stepY, 5.6 - i * 0.8]
      );
    }

    // 2. GROUND FLOOR (Level 0: Y = 0.3 to 2.5)
    // Left Wood wall (thick base structure)
    addArchitecturalElement(new THREE.BoxGeometry(4.0, 2.2, 2.0), 'wood', [-5.0, 1.4, 2.0]);
    // Left Wood vertical slats detailing
    for (let x = -7.0; x <= -3.0; x += 0.25) {
      addArchitecturalElement(new THREE.BoxGeometry(0.04, 2.2, 0.04), 'wood', [x, 1.4, 3.02]);
    }

    // Right Wood wall
    addArchitecturalElement(new THREE.BoxGeometry(3.0, 2.2, 4.0), 'wood', [6.5, 1.4, 1.0]);
    // Right Wood vertical slats detailing
    for (let x = 5.0; x <= 8.0; x += 0.25) {
      addArchitecturalElement(new THREE.BoxGeometry(0.04, 2.2, 0.04), 'wood', [x, 1.4, 3.02]);
    }

    // Back concrete wall
    addArchitecturalElement(new THREE.BoxGeometry(16.0, 2.2, 0.2), 'darkConcrete', [0, 1.4, -4.5]);

    // Front glass lobby (entrance window frame and glazing)
    addArchitecturalElement(new THREE.BoxGeometry(7.0, 2.2, 0.08), 'glass', [1.0, 1.4, 3.0]);
    addArchitecturalElement(new THREE.BoxGeometry(0.08, 2.2, 4.0), 'glass', [4.5, 1.4, 1.0]);
    
    // Window mullions / columns
    addArchitecturalElement(new THREE.BoxGeometry(0.15, 2.2, 0.15), 'windowFrame', [-2.5, 1.4, 3.0]);
    addArchitecturalElement(new THREE.BoxGeometry(0.15, 2.2, 0.15), 'windowFrame', [1.0, 1.4, 3.0]);
    addArchitecturalElement(new THREE.BoxGeometry(0.15, 2.2, 0.15), 'windowFrame', [4.5, 1.4, 3.0]);
    addArchitecturalElement(new THREE.BoxGeometry(0.15, 2.2, 0.15), 'windowFrame', [4.5, 1.4, -1.0]);

    // INTERIOR GROUND FLOOR ELEMENTS
    addArchitecturalElement(new THREE.BoxGeometry(14.0, 2.0, 0.1), 'interiorWall', [0.5, 1.2, -3.8]);
    addArchitecturalElement(new THREE.BoxGeometry(0.1, 2.0, 5.0), 'interiorWall', [-4.0, 1.2, 1.0]);
    addArchitecturalElement(new THREE.BoxGeometry(0.1, 2.0, 6.0), 'interiorWall', [5.0, 1.2, 0.5]);
    addArchitecturalElement(new THREE.BoxGeometry(14.0, 0.15, 6.0), 'interiorCeiling', [0.5, 2.4, 1.0]);
    addArchitecturalElement(new THREE.BoxGeometry(12.0, 0.05, 5.0), 'interiorFloor', [1.0, 0.35, 1.0]);

    // 3. LEVEL 1 CANTILEVER SLAB (Y = 2.5 to 2.8)
    // Concrete deck slab (projects out dramatically to match image)
    addArchitecturalElement(new THREE.BoxGeometry(23, 0.3, 15), 'concrete', [0.5, 2.65, 0.5]);
    
    // Under-slab glowing LED lines
    addArchitecturalElement(new THREE.BoxGeometry(21.0, 0.04, 0.04), 'led', [1.0, 2.48, 7.9], [0, 0, 0], false, false);
    addArchitecturalElement(new THREE.BoxGeometry(0.04, 0.04, 14.8), 'led', [11.9, 2.48, 0.5], [0, 0, 0], false, false);

    // 4. MIDDLE FLOOR (Level 1: Y = 2.8 to 5.0)
    // Wrap-around floor-to-ceiling glass lounge
    addArchitecturalElement(new THREE.BoxGeometry(15.0, 2.2, 0.08), 'glass', [2.5, 3.9, 5.0]);
    addArchitecturalElement(new THREE.BoxGeometry(0.08, 2.2, 11.0), 'glass', [10.0, 3.9, -0.5]);
    addArchitecturalElement(new THREE.BoxGeometry(0.08, 2.2, 9.0), 'glass', [-5.0, 3.9, 0.5]);

    // Slender metal/window frame mullions
    for (let x = -5.0; x <= 10.0; x += 2.5) {
      addArchitecturalElement(new THREE.BoxGeometry(0.08, 2.2, 0.08), 'windowFrame', [x, 3.9, 5.02]);
    }
    for (let z = -6.0; z <= 5.0; z += 2.5) {
      addArchitecturalElement(new THREE.BoxGeometry(0.08, 2.2, 0.08), 'windowFrame', [10.02, 3.9, z]);
    }

    // SIGNATURE INTERNAL DIAGONAL STAIRCASE (visible through the front glass)
    // Starts at left-front, ascends to right-back
    for (let i = 0; i < 14; i++) {
      const t = i / 13;
      const stepX = -1.0 + t * 4.0;
      const stepY = 2.9 + t * 2.0;
      const stepZ = 4.0 - t * 2.0;
      addArchitecturalElement(
        new THREE.BoxGeometry(1.5, 0.06, 0.28),
        'wood',
        [stepX, stepY, stepZ]
      );
    }
    // Stair handrail (slender metal tube)
    addArchitecturalElement(
      new THREE.BoxGeometry(0.04, 0.04, 4.47),
      'windowFrame',
      [1.0, 4.6, 3.0],
      [-Math.atan(2.0/4.0), Math.atan(2.0/4.0), 0]
    );

    // LEFT VERTICAL WOOD BLOCK WITH RECTANGULAR OPENING
    // Construct from 4 interlocking boxes to form the cutout
    addArchitecturalElement(new THREE.BoxGeometry(0.8, 5.0, 3.0), 'wood', [-8.1, 5.3, 4.0]); // Left
    addArchitecturalElement(new THREE.BoxGeometry(0.8, 5.0, 3.0), 'wood', [-5.7, 5.3, 4.0]); // Right
    addArchitecturalElement(new THREE.BoxGeometry(1.6, 2.0, 3.0), 'wood', [-6.9, 3.8, 4.0]); // Bottom
    addArchitecturalElement(new THREE.BoxGeometry(1.6, 1.8, 3.0), 'wood', [-6.9, 6.9, 4.0]); // Top
    // Glazing inside the window cutout
    addArchitecturalElement(new THREE.BoxGeometry(1.6, 1.2, 0.1), 'glass', [-6.9, 5.4, 4.0]);
    
    // Slats detailing over the wood volume (skipping the window cutout coordinates)
    for (let x = -8.5; x <= -5.3; x += 0.22) {
      // If outside the window region, place a full height slat. Otherwise, split into top and bottom slats.
      if (x > -7.6 && x < -6.2) {
        // Top slat
        addArchitecturalElement(new THREE.BoxGeometry(0.03, 1.8, 0.03), 'wood', [x, 6.9, 5.52]);
        // Bottom slat
        addArchitecturalElement(new THREE.BoxGeometry(0.03, 2.0, 0.03), 'wood', [x, 3.8, 5.52]);
      } else {
        // Full slat
        addArchitecturalElement(new THREE.BoxGeometry(0.03, 5.0, 0.03), 'wood', [x, 5.3, 5.52]);
      }
    }

    // Cozy middle floor balcony & glass railings
    addArchitecturalElement(new THREE.BoxGeometry(12.0, 0.9, 0.04), 'glass', [4.0, 3.25, 6.4]); // Front
    addArchitecturalElement(new THREE.BoxGeometry(0.04, 0.9, 11.8), 'glass', [10.0, 3.25, 0.5]); // Right
    // Top rails
    addArchitecturalElement(new THREE.BoxGeometry(12.0, 0.04, 0.04), 'windowFrame', [4.0, 3.7, 6.4]);
    addArchitecturalElement(new THREE.BoxGeometry(0.04, 0.04, 11.8), 'windowFrame', [10.0, 3.7, 0.5]);

    // Indoor palm planter inside lounge
    addArchitecturalElement(new THREE.CylinderGeometry(0.4, 0.35, 0.6, 8), 'darkConcrete', [7.5, 3.1, 3.5]);
    addArchitecturalElement(new THREE.CylinderGeometry(0.04, 0.04, 1.2), 'trunk', [7.5, 3.8, 3.5]);
    addArchitecturalElement(new THREE.DodecahedronGeometry(0.55, 1), 'greenery', [7.5, 4.4, 3.5]);
    addArchitecturalElement(new THREE.DodecahedronGeometry(0.40, 1), 'greenery', [7.7, 4.2, 3.3]);

    // INTERIOR MIDDLE FLOOR (LOUNGE) ELEMENTS
    addArchitecturalElement(new THREE.BoxGeometry(12.0, 2.0, 0.1), 'interiorWall', [4.0, 3.5, -4.5]); // Back wall
    addArchitecturalElement(new THREE.BoxGeometry(0.1, 2.0, 10.0), 'interiorWall', [-3.0, 3.5, 1.5]); // Left wall
    addArchitecturalElement(new THREE.BoxGeometry(12.0, 0.1, 10.0), 'interiorCeiling', [4.0, 4.8, 1.5]); // Ceiling
    addArchitecturalElement(new THREE.BoxGeometry(11.0, 0.08, 9.0), 'interiorWood', [4.0, 2.8, 1.5]); // Floor accent
    
    // LOUNGE FURNITURE
    // Large L-shaped sofa - seat base
    addArchitecturalElement(new THREE.BoxGeometry(4.0, 0.35, 2.2), 'sofaFabric', [1.5, 3.05, -0.5]); // Left sofa base
    addArchitecturalElement(new THREE.BoxGeometry(2.5, 0.35, 1.8), 'sofaFabric', [4.0, 3.05, 1.5]); // Right sofa base
    // Sofa backrest
    addArchitecturalElement(new THREE.BoxGeometry(4.0, 0.8, 0.15), 'sofaFabric', [1.5, 3.5, -2.4]); // Left backrest
    addArchitecturalElement(new THREE.BoxGeometry(2.5, 0.8, 0.15), 'sofaFabric', [5.2, 3.5, 1.5]); // Right backrest
    // Sofa cushions/pillows
    addArchitecturalElement(new THREE.BoxGeometry(0.6, 0.4, 0.6), 'sofaPillow', [0.8, 3.5, -0.5]);
    addArchitecturalElement(new THREE.BoxGeometry(0.6, 0.4, 0.6), 'sofaPillow', [2.2, 3.5, -0.5]);
    addArchitecturalElement(new THREE.BoxGeometry(0.5, 0.35, 0.5), 'sofaPillow', [4.2, 3.5, 1.2]);
    
    // Coffee table
    addArchitecturalElement(new THREE.BoxGeometry(1.8, 0.35, 1.0), 'tableTop', [2.5, 3.05, 0.5]);
    
    // Room partition/divider
    addArchitecturalElement(new THREE.BoxGeometry(0.08, 1.8, 5.0), 'partition', [0.5, 3.8, -1.0]);

    // 5. LEVEL 2 SLAB (Y = 5.0 to 5.3)
    addArchitecturalElement(new THREE.BoxGeometry(20, 0.3, 14), 'concrete', [0.0, 5.15, 0.0]);
    // Glowing LED ceiling strip
    addArchitecturalElement(new THREE.BoxGeometry(18.0, 0.04, 0.04), 'led', [1.0, 4.98, 6.9]);

    // 6. TOP FLOOR (Level 2: Y = 5.3 to 7.5) & SLATTED CANOPY
    // Left side master suite
    addArchitecturalElement(new THREE.BoxGeometry(7.0, 2.2, 0.2), 'concrete', [-1.0, 6.4, -3.0]); // Back wall
    addArchitecturalElement(new THREE.BoxGeometry(0.2, 2.2, 7.0), 'concrete', [-4.4, 6.4, 0.5]);  // Left wall
    addArchitecturalElement(new THREE.BoxGeometry(0.2, 2.2, 7.0), 'concrete', [2.5, 6.4, 0.5]);   // Right wall
    addArchitecturalElement(new THREE.BoxGeometry(6.8, 2.2, 0.08), 'glass', [-1.0, 6.4, 4.0]);    // Front glass
    addArchitecturalElement(new THREE.BoxGeometry(7.2, 0.3, 7.2), 'concrete', [-1.0, 7.65, 0.5]); // Suite roof slab
    
    // Suite window frames
    addArchitecturalElement(new THREE.BoxGeometry(0.1, 2.2, 0.1), 'windowFrame', [-4.4, 6.4, 4.02]);
    addArchitecturalElement(new THREE.BoxGeometry(0.1, 2.2, 0.1), 'windowFrame', [2.5, 6.4, 4.02]);
    addArchitecturalElement(new THREE.BoxGeometry(0.1, 2.2, 0.1), 'windowFrame', [-1.0, 6.4, 4.02]);

    // INTERIOR MASTER SUITE (TOP FLOOR) ELEMENTS
    addArchitecturalElement(new THREE.BoxGeometry(7.0, 2.0, 0.1), 'interiorWall', [-1.0, 6.2, -2.5]); // Back wall
    addArchitecturalElement(new THREE.BoxGeometry(0.1, 2.0, 7.0), 'interiorWall', [-4.4, 6.2, 0.5]); // Left wall
    addArchitecturalElement(new THREE.BoxGeometry(0.1, 2.0, 7.0), 'interiorWall', [2.5, 6.2, 0.5]); // Right wall
    addArchitecturalElement(new THREE.BoxGeometry(7.0, 0.1, 7.0), 'interiorCeiling', [-1.0, 7.5, 0.5]); // Ceiling
    addArchitecturalElement(new THREE.BoxGeometry(6.5, 0.08, 6.5), 'interiorFloor', [-1.0, 5.35, 0.5]); // Floor
    // Master bed platform
    addArchitecturalElement(new THREE.BoxGeometry(3.5, 0.25, 2.5), 'interiorAccent', [-3.0, 5.4, 0.0]);

    // MASTER BEDROOM FURNITURE
    // King bed frame base
    addArchitecturalElement(new THREE.BoxGeometry(3.0, 0.35, 2.0), 'bedFabric', [-3.0, 5.5, -0.8]); // Bed base
    // Bed mattress
    addArchitecturalElement(new THREE.BoxGeometry(2.95, 0.35, 1.95), 'bedFabric', [-3.0, 5.9, -0.8]); // Mattress
    // Bed pillows
    addArchitecturalElement(new THREE.BoxGeometry(0.8, 0.3, 0.5), 'sofaPillow', [-2.0, 6.3, -1.1]); // Pillow 1
    addArchitecturalElement(new THREE.BoxGeometry(0.8, 0.3, 0.5), 'sofaPillow', [-4.0, 6.3, -1.1]); // Pillow 2
    // Bedside table
    addArchitecturalElement(new THREE.BoxGeometry(0.8, 0.35, 0.6), 'tableTop', [-1.5, 5.5, -1.5]); // Right side table
    // Bedroom partition wall (wardrobe area)
    addArchitecturalElement(new THREE.BoxGeometry(0.08, 1.8, 2.5), 'partition', [-4.3, 6.2, 2.0]);

    // Right side terrace balcony & railings
    addArchitecturalElement(new THREE.BoxGeometry(7.0, 0.9, 0.04), 'glass', [6.0, 5.75, 4.0]); // Front railing
    addArchitecturalElement(new THREE.BoxGeometry(0.04, 0.9, 8.0), 'glass', [9.5, 5.75, 0.0]);  // Right railing
    addArchitecturalElement(new THREE.BoxGeometry(7.0, 0.04, 0.04), 'windowFrame', [6.0, 6.2, 4.0]);
    addArchitecturalElement(new THREE.BoxGeometry(0.04, 0.04, 8.0), 'windowFrame', [9.5, 6.2, 0.0]);

    // SLEEK SLATTED CANTILEVER CANOPY (over the terrace)
    addArchitecturalElement(new THREE.BoxGeometry(7.0, 0.3, 8.0), 'darkConcrete', [6.0, 7.65, 0.0]); // Canopy roof
    // Wooden ceiling slats underneath canopy
    for (let z = -3.6; z <= 3.6; z += 0.6) {
      addArchitecturalElement(new THREE.BoxGeometry(6.8, 0.04, 0.15), 'wood', [6.0, 7.46, z]);
    }
    // Glowing LED canopy border strips
    addArchitecturalElement(new THREE.BoxGeometry(6.8, 0.04, 0.04), 'led', [6.0, 7.42, 4.0], [0, 0, 0], false, false);
    addArchitecturalElement(new THREE.BoxGeometry(0.04, 0.04, 8.0), 'led', [9.5, 7.42, 0.0], [0, 0, 0], false, false);

    // Terrace Lounge Furniture
    addArchitecturalElement(new THREE.BoxGeometry(3.0, 0.3, 1.0), 'darkConcrete', [5.5, 5.5, -1.0]); // Sofa base
    addArchitecturalElement(new THREE.BoxGeometry(2.8, 0.2, 0.8), 'concrete', [5.5, 5.7, -1.0]);     // Sofa seat cushion
    addArchitecturalElement(new THREE.BoxGeometry(2.8, 0.4, 0.2), 'concrete', [5.5, 6.0, -1.4]);     // Sofa back cushion
    addArchitecturalElement(new THREE.BoxGeometry(1.2, 0.35, 0.8), 'wood', [5.5, 5.5, 1.0]);         // Wood coffee table

    // 7. SWIMMING POOL & DECK (Front-middle of the structure)
    addArchitecturalElement(new THREE.BoxGeometry(10.0, 0.1, 5.0), 'darkConcrete', [-1.0, 0.02, 6.0]); // Pool border frame
    const water = addArchitecturalElement(new THREE.BoxGeometry(9.8, 0.02, 4.8), 'water', [-1.0, 0.06, 6.0], [0, 0, 0], false, false);
    const waterfall = addArchitecturalElement(new THREE.PlaneGeometry(0.8, 2.2), 'waterfall', [7.4, 1.4, 1.9], [0, 0, 0], false, false);
    waterfallRef.current = waterfall;

    const trunkGeo = new THREE.CylinderGeometry(0.08, 0.1, 1.2, 6);
    const foliageGeo1 = new THREE.DodecahedronGeometry(0.55, 1);
    const foliageGeo2 = new THREE.DodecahedronGeometry(0.45, 1);
    const bushGeo = new THREE.DodecahedronGeometry(0.28, 0);

    // Defer so the loading state update doesn't fire synchronously inside the effect body.
    setTimeout(() => { setIsLoading(false); }, 0);

    // --- 8. Animation Loop ---
    let time = 0;
    const animate = () => {
      time += 0.01;
      
      // Water movement
      if (water) {
        water.position.y = 0.05 + Math.sin(time * 2) * 0.008;
      }

      // Waterfall fluid flicker
      if (waterfall && waterfall.material instanceof THREE.MeshStandardMaterial) {
        waterfall.material.opacity = 0.5 + Math.sin(time * 10) * 0.06;
      }

      // Repurposed fireLight flicker animation as subtle interior light shimmer
      if (fireLightRef.current) {
        fireLightRef.current.intensity = 2.8 + Math.sin(time * 8) * 0.2 + Math.random() * 0.05;
      }

      // Rotate relief artwork if active; keep the villa on a stable auto-rotation otherwise.
      if (reliefMeshRef.current) {
        reliefMeshRef.current.rotation.y = time * 0.5;
        controls.autoRotate = false;
      } else if (controls) {
        controls.autoRotate = true;
      }
      
      controls.update();
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    // --- 9. Clean up ---
    const containerEl = containerRef.current;
    return () => {
      resizeObserver.disconnect();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      
      renderer.dispose();
      if (containerEl && renderer.domElement) {
        containerEl.removeChild(renderer.domElement);
      }
      
      // Clean up meshes
      meshesRef.current.forEach(({ mesh, originalMat }) => {
        mesh.geometry.dispose();
        originalMat.dispose();
      });

      if (gridHelperRef.current) {
        gridHelperRef.current.geometry.dispose();
        if (Array.isArray(gridHelperRef.current.material)) {
          gridHelperRef.current.material.forEach(m => m.dispose());
        } else {
          gridHelperRef.current.material.dispose();
        }
      }
      
      meshesRef.current = [];
      lightsRef.current = [];
      clearReliefMesh();
      

      trunkGeo.dispose();
      foliageGeo1.dispose();
      foliageGeo2.dispose();
      bushGeo.dispose();
      
      materials.concrete.dispose();
      materials.darkConcrete.dispose();
      materials.glass.dispose();
      materials.wood.dispose();
      materials.water.dispose();
      materials.greenery.dispose();
      materials.trunk.dispose();
      materials.windowFrame.dispose();
      materials.led.dispose();
      materials.waterfall.dispose();
      materials.solar.dispose();
      materials.metal.dispose();
    };
  }, []);

  // WebGL Fallback to high-res static image to prevent blank/broken screens
  if (!isWebGLSupported) {
    return (
      <div className="relative h-[220px] w-full overflow-hidden rounded-[2rem] drop-shadow-2xl sm:h-[280px] md:h-[360px] lg:h-[min(78vh,880px)] xl:h-[min(82vh,940px)]">
        <img
          src={heroFallbackImg}
          alt="Modern Architectural House"
          className="w-full h-full object-cover object-bottom"
        />
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-[220px] max-w-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 select-none group rounded-3xl sm:h-[280px] md:h-[360px] lg:h-[650px] lg:aspect-auto"
    >
      {/* 3D Canvas Container */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0 transition-transform duration-300" 
      />

      {/* Loading overlay - improved styling */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900/95 to-slate-800/95 z-20 gap-4 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-indigo-300 rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-slate-200 tracking-wider">GENERATING 3D MODEL...</span>
          <div className="h-1 w-20 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 animate-pulse rounded-full"></div>
          </div>
        </div>
      )}

      {/* Instructions watermark on hover - REMOVED */}



      {/* Option Control Panel (Appears when 3D relief artwork is active) */}
      {hasRelief && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center justify-center w-[95%] sm:w-auto">
          <div className="bg-slate-950/75 backdrop-blur-xl border border-white/10 rounded-2xl p-2.5 shadow-2xl flex items-center gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-w-full">
            
            {/* Style Selector */}
            <div className="flex items-center gap-1 bg-slate-900/60 rounded-xl p-1 border border-white/5 shrink-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-2 select-none">Art Style</span>
              {(['textured', 'clay', 'gold', 'hologram'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setReliefStyle(s)}
                  className={`text-[11px] px-3.5 py-1.5 rounded-lg capitalize font-semibold transition-all duration-150 whitespace-nowrap ${
                    reliefStyle === s 
                      ? 'bg-indigo-600 text-white shadow' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Depth Selector */}
            <div className="flex items-center gap-1 bg-slate-900/60 rounded-xl p-1 border border-white/5 shrink-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-2 select-none">Height</span>
              {(['low', 'medium', 'high'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setReliefDepth(d)}
                  className={`text-[11px] px-3.5 py-1.5 rounded-lg capitalize font-semibold transition-all duration-150 whitespace-nowrap ${
                    reliefDepth === d 
                      ? 'bg-indigo-600 text-white shadow' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {d === 'low' ? '1x' : d === 'medium' ? '2x' : '3x'}
                </button>
              ))}
            </div>

            {/* Reset Button */}
            <button
              onClick={handleClearRelief}
              className="bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 border border-rose-500/30 text-[11px] font-bold px-4 py-1.5 rounded-lg transition-all duration-150 active:scale-95 flex items-center gap-1.5 shrink-0 ml-1"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Hero3D;
