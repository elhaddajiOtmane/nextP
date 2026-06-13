import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './Promotions.module.css';

gsap.registerPlugin(ScrollTrigger);

const promos = [
  {
    id: 'weekend',
    title: 'Escapade Weekend',
    tag: 'Limité',
    discount: '-40%',
    desc: 'Partez en weekend découvrir le Maroc à prix réduit. Disponible vendredi-dimanche.',
    validity: 'Valable jusqu\'au 30 juin 2025',
    code: 'WEEKEND40',
    color: '#C8963E',
    gradient: 'linear-gradient(135deg, #1a1000 0%, #0A0A12 100%)',
    highlight: true,
  },
  {
    id: 'group',
    title: 'Tarif Groupe',
    tag: 'Groupe',
    discount: '-30%',
    desc: 'Voyagez à 5 personnes ou plus et bénéficiez de 30% de réduction sur vos billets.',
    validity: 'Sans date limite',
    code: 'GROUPE30',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #001a0e 0%, #0A0A12 100%)',
    highlight: false,
  },
  {
    id: 'student',
    title: 'Pass Étudiant',
    tag: 'Étudiant',
    discount: '-50%',
    desc: 'Carte étudiant requise. Voyagez partout au Maroc à moitié prix toute l\'année.',
    validity: 'Avec carte étudiant valide',
    code: 'STUDENT50',
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #0d001a 0%, #0A0A12 100%)',
    highlight: false,
  },
  {
    id: 'early',
    title: 'Réservation Anticipée',
    tag: 'Early Bird',
    discount: '-25%',
    desc: 'Réservez 30 jours avant votre départ et économisez automatiquement 25%.',
    validity: 'Toujours disponible',
    code: 'EARLY25',
    color: '#0EA5E9',
    gradient: 'linear-gradient(135deg, #00101a 0%, #0A0A12 100%)',
    highlight: false,
  },
];

export default function Promotions() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.promo-heading',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
      gsap.fromTo('.promo-card',
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.promo-card', start: 'top 80%' }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code).catch(() => {});
    const el = document.querySelector(`[data-code="${code}"]`);
    if (el) {
      const original = el.textContent;
      el.textContent = 'Copié !';
      setTimeout(() => { el.textContent = original; }, 1800);
    }
  };

  return (
    <section ref={sectionRef} className={styles.section} id="promotions">
      <div className={styles.inner}>
        <div className={`promo-heading ${styles.header}`}>
          <div className={styles.badge}>Offres Spéciales</div>
          <h2 className={styles.title}>
            Voyagez plus,<br /><em>dépensez moins</em>
          </h2>
          <p className={styles.subtitle}>
            Des offres exclusives pour chaque type de voyageur — profitez-en avant qu&apos;elles expirent.
          </p>
        </div>

        <div className={styles.grid}>
          {promos.map((promo) => (
            <div
              key={promo.id}
              className={`promo-card ${styles.card} ${promo.highlight ? styles.cardHighlight : ''}`}
              style={{ background: promo.gradient }}
            >
              {promo.highlight && <div className={styles.hotBadge}>🔥 Hot Deal</div>}

              <div className={styles.cardTop}>
                <span className={styles.tag} style={{ color: promo.color, borderColor: `${promo.color}40`, background: `${promo.color}12` }}>
                  {promo.tag}
                </span>
                <div className={styles.discount} style={{ color: promo.color }}>
                  {promo.discount}
                </div>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.promoTitle}>{promo.title}</h3>
                <p className={styles.promoDesc}>{promo.desc}</p>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.validity}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M4 1v2M8 1v2M1 5h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  {promo.validity}
                </div>

                <div className={styles.codeRow}>
                  <div className={styles.codeBox} style={{ borderColor: `${promo.color}40` }}>
                    <span className={styles.codeLabel}>Code</span>
                    <span className={styles.code} style={{ color: promo.color }}>{promo.code}</span>
                  </div>
                  <button
                    className={styles.copyBtn}
                    style={{ borderColor: `${promo.color}40`, color: promo.color }}
                    data-code={promo.code}
                    onClick={() => copyCode(promo.code)}
                  >
                    Copier
                  </button>
                </div>
              </div>

              {/* Accent glow */}
              <div
                className={styles.glow}
                style={{ background: `radial-gradient(circle at 80% 20%, ${promo.color}20 0%, transparent 60%)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
