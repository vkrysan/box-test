import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface ThreeDSceneProps {
  width: number;
  height: number;
  depth: number;
  isDarkMode: boolean;
}

const ThreeDScene: React.FC<ThreeDSceneProps> = ({ width, height, depth, isDarkMode }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current!.clientWidth / mountRef.current!.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
    mountRef.current!.appendChild(renderer.domElement);

    renderer.setClearColor(isDarkMode ? '#000000' : '#e6e6e6');

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true; 
    controls.enableDamping = true; 
    controls.dampingFactor = 0.05;
    controls.enableRotate = true;
    controls.rotateSpeed = 0.5; 

    // Создаем куб из треугольников
    const vertices: number[] = [
      // Передняя грань
      -width / 2, -height / 2, depth / 2,
      width / 2, -height / 2, depth / 2,
      width / 2, height / 2, depth / 2,
      -width / 2, height / 2, depth / 2,
      
      // Задняя грань
      -width / 2, -height / 2, -depth / 2,
      width / 2, -height / 2, -depth / 2,
      width / 2, height / 2, -depth / 2,
      -width / 2, height / 2, -depth / 2,
    ];

    // Индексы треугольников
    const indices: number[] = [
      // Передняя грань (два треугольника)
      0, 1, 2,
      0, 2, 3,

      // Задняя грань (два треугольника)
      4, 5, 6,
      4, 6, 7,

      // Верхняя грань
      3, 2, 6,
      3, 6, 7,

      // Нижняя грань
      0, 1, 5,
      0, 5, 4,

      // Левая грань
      0, 3, 7,
      0, 7, 4,

      // Правая грань
      1, 2, 6,
      1, 6, 5,
    ];

    const geometry = new THREE.BufferGeometry();
    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.MeshBasicMaterial({ color: isDarkMode ? 0x00ff00 : 0x000000, wireframe: true });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); 
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current!.removeChild(renderer.domElement);
      controls.dispose(); 
    };
  }, [width, height, depth, isDarkMode]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default ThreeDScene;

