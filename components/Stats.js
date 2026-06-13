import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './Stats.module.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 40, suffix: 'M+', label: 'Voyageurs par an', desc: 'la confiance de millions' },
  { value: 2400, suffix: 'km', label: 'Réseau ferroviaire', desc: 'à travers le Maroc' },
  { value: 98.2, suffix: '%', label: 'Ponctualité', desc: 'en 2024', decimals: 1 },
  { value: 320, suffix: 'km/h', label: 'Vitesse Al Boraq', desc: 'TGV le plus rapide d\'Afrique' },
];

export default function Stats() {
  const sectionRef = useRef(null);
  const numbersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.stats-title',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      stats.forEach((stat, i) => {
        const el = numbersRef.current[i];
        if (!el) return;
        gsap.fromTo({ val: 0 }, { val: stat.value },
          {
            duration: 2.2,
            ease: 'power2.out',
            onUpdate: function () {
              const v = stat.decimals ? this.targets()[0].val.toFixed(stat.decimals) : Math.round(this.targets()[0].val);
              el.textContent = v + stat.suffix;
            },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              once: true
            }
          }
        );
      });

      gsap.fromTo('.stat-item',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="stats">
      <div className={styles.inner}>
        <div className={`stats-title ${styles.header}`}>
          <div className={styles.badge}>Chiffres Clés</div>
          <h2 className={styles.title}>
            ONCF en <em>chiffres</em>
          </h2>
        </div>

        <div className={styles.grid}>
          {stats.map((stat, i) => (
            <div key={stat.label} className={`stat-item ${styles.item}`}>
              <div className={styles.itemInner}>
                <div
                  ref={el => numbersRef.current[i] = el}
                  className={styles.value}
                >
                  0{stat.suffix}
                </div>
                <div className={styles.label}>{stat.label}</div>
                <div className={styles.itemDesc}>{stat.desc}</div>
              </div>
              <div className={styles.divider} />
            </div>
          ))}
        </div>

        {/* Background Morocco star pattern */}
        <div className={styles.starPattern} aria-hidden>
          {[...Array(12)].map((_, i) => (
            <div key={i} className={styles.star} style={{ '--delay': `${i * 0.3}s`, '--x': `${(i % 4) * 25 + 5}%`, '--y': `${Math.floor(i / 4) * 33 + 10}%` }} />
          ))}
        </div>
      </div>
    </section>
  );
}
