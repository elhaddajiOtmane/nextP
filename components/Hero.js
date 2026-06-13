import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import * as THREE from 'three';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const badgeRef = useRef(null);

  // --- Three.js particle field ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    // Particle geometry - simulates stars/motion through landscape
    const count = 5000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const goldColor = new THREE.Color('#C8963E');
    const whiteColor = new THREE.Color('#F5EDD8');
    const terracottaColor = new THREE.Color('#E05C2A');

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const colorChoice = Math.random();
      const c = colorChoice < 0.6 ? whiteColor : colorChoice < 0.85 ? goldColor : terracottaColor;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        void main() {
          vColor = color;
          vec3 pos = position;
          pos.z = mod(pos.z + uTime * 0.4, 20.0) - 10.0;
          vAlpha = smoothstep(-10.0, -2.0, pos.z);
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          if (d > 0.5) discard;
          float alpha = (1.0 - d * 2.0) * vAlpha * 0.75;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      vertexColors: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Track lines (two parallel lines suggesting rails)
    const trackMat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#C8963E'),
      transparent: true,
      opacity: 0.25,
    });
    [[-0.18, 0.18]].flat().forEach((x, i) => {
      const offset = i === 0 ? -0.18 : 0.18;
      const pts = [];
      for (let t = -20; t <= 20; t += 0.5) pts.push(new THREE.Vector3(offset, -1.0, t));
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), trackMat);
      scene.add(line);
    });

    let mouseX = 0, mouseY = 0;
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.6;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', onMouse);

    const clock = new THREE.Clock();
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      material.uniforms.uTime.value = t;
      camera.position.x += (mouseX - camera.position.x) * 0.04;
      camera.position.y += (-mouseY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      particles.rotation.y = t * 0.025;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  // --- GSAP intro animations ---
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(badgeRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 1.0 }
    )
    .fromTo('.hero-word',
      { y: '110%', opacity: 0, rotateX: -25 },
      { y: '0%', opacity: 1, rotateX: 0, duration: 1.0, stagger: 0.12 },
      '-=0.3'
    )
    .fromTo(subRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.4'
    )
    .fromTo('.hero-cta',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
      '-=0.5'
    );

    // Scroll parallax
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(headlineRef.current, { y: self.progress * 120, opacity: 1 - self.progress * 0.8 });
      }
    });
  }, []);

  const headline = ['Vivez le', 'Maroc', 'en Mouvement'];

  return (
    <section ref={heroRef} className={styles.hero} id="hero">
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Gradient overlays */}
      <div className={styles.gradientBottom} />
      <div className={styles.gradientLeft} />
      <div className={styles.vignette} />

      {/* Morocco flag-inspired accent line */}
      <div className={styles.accentStripe} />

      <div className={styles.content}>
        <div ref={badgeRef} className={styles.badge}>
          <span className={styles.badgeDot} />
          <span>Office National des Chemins de Fer</span>
        </div>

        <div ref={headlineRef} className={styles.headline} style={{ perspective: '800px' }}>
          {headline.map((word, i) => (
            <div key={i} className={styles.wordWrap} style={{ overflow: 'hidden' }}>
              <span
                className={`hero-word ${styles.word} ${i === 1 ? styles.wordGold : ''}`}
                style={{ display: 'inline-block' }}
              >
                {word}
              </span>
            </div>
          ))}
        </div>

        <p ref={subRef} className={styles.sub}>
          Découvrez les merveilles du Maroc à bord de nos trains modernes.<br />
          Confort, vitesse et authenticité à chaque voyage.
        </p>

        <div className={styles.ctas}>
          <a href="#booking" className={`hero-cta ${styles.ctaPrimary}`}>
            <span>Réserver maintenant</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#destinations" className={`hero-cta ${styles.ctaSecondary}`}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M9 6v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Explorer les destinations</span>
          </a>
        </div>

        {/* Live indicator */}
        <div className={styles.liveInfo}>
          <div className={styles.liveDot} />
          <span>Trains en temps réel • 8 liaisons actives</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span>Défiler</span>
      </div>

      {/* Route visualization */}
      <div className={styles.routeBar}>
        {['Casablanca', 'Rabat', 'Kénitra', 'Meknès', 'Fès', 'Tanger'].map((city, i) => (
          <div key={city} className={styles.routeStop}>
            <div className={styles.routeDot} />
            {i < 5 && <div className={styles.routeLine} />}
            <span>{city}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
