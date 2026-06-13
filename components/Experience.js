import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './Experience.module.css';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 14h20M14 4v20M7 7l14 14M21 7L7 21" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Wi-Fi Gratuit',
    desc: 'Connexion haut débit incluse dans tous nos trains grande vitesse.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M7 14h14M7 9h14M7 19h10" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="2" y="4" width="24" height="20" rx="3" stroke="var(--gold)" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'E-Billet',
    desc: 'Réservez en ligne, voyagez avec votre smartphone — sans files d\'attente.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4C8.48 4 4 8.48 4 14s4.48 10 10 10 10-4.48 10-10S19.52 4 14 4z" stroke="var(--gold)" strokeWidth="1.5"/>
        <path d="M14 9v5l3 3" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Ponctualité',
    desc: 'Plus de 98% de trains à l\'heure. Votre temps est précieux pour nous.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5 14l6 6 12-12" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Durabilité',
    desc: 'Le train émet 9× moins de CO₂ que l\'avion. Voyagez responsable.',
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      );
      gsap.fromTo('.exp-feature',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 75%' }
        }
      );
      gsap.fromTo('.exp-visual-card',
        { scale: 0.92, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
        }
      );

      // Parallax on visual
      gsap.to('.exp-parallax', {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="experience">
      <div className={styles.inner}>
        {/* Left – Visual */}
        <div ref={leftRef} className={styles.visual}>
          <div className={`exp-visual-card ${styles.visualCard}`}>
            {/* Animated train window simulation */}
            <div className={`exp-parallax ${styles.trainWindow}`}>
              <div className={styles.windowGlow} />
              <div className={styles.trackLines}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={styles.trackLine} style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
              <div className={styles.windowContent}>
                <div className={styles.windowCity}>Casablanca</div>
                <div className={styles.windowArrow}>→</div>
                <div className={styles.windowCity}>Tanger</div>
              </div>
              <div className={styles.speedometer}>
                <div className={styles.speedValue}>320</div>
                <div className={styles.speedUnit}>km/h</div>
                <div className={styles.speedLabel}>Al Boraq TGV</div>
              </div>
            </div>

            {/* Floating info cards */}
            <div className={styles.floatCard1}>
              <div className={styles.fcDot} style={{ background: '#4ADE80' }} />
              <div>
                <div className={styles.fcLabel}>Prochain départ</div>
                <div className={styles.fcValue}>Casa Voyageurs → Tanger</div>
                <div className={styles.fcTime}>08:35 — Dans 12 min</div>
              </div>
            </div>

            <div className={styles.floatCard2}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2l1.8 3.6L14 6.2l-3 2.9.7 4.1L8 11.1l-3.7 2.1.7-4.1L2 6.2l4.2-.6z" fill="var(--gold)" stroke="var(--gold)" strokeWidth="0.5"/>
              </svg>
              <div>
                <div className={styles.fcLabel}>Note de confort</div>
                <div className={styles.fcValue}>4.9 / 5 étoiles</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right – Content */}
        <div ref={rightRef} className={styles.content}>
          <div className={styles.badge}>L&apos;Expérience ONCF</div>
          <h2 className={styles.title}>
            Plus qu&apos;un voyage,<br /><em>une expérience</em>
          </h2>
          <p className={styles.desc}>
            ONCF redéfinit le voyage ferroviaire au Maroc. Chaque trajet est conçu pour vous offrir confort, connexion et liberté — tout au long de votre parcours.
          </p>

          <div className={styles.features}>
            {features.map((f, i) => (
              <div key={f.title} className={`exp-feature ${styles.feature}`}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <div className={styles.featureText}>
                  <h4 className={styles.featureTitle}>{f.title}</h4>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <a href="#booking" className={styles.cta}>
            <span>Découvrir tous les services</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
