import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './Services.module.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'alboraq',
    name: 'Al Boraq',
    subtitle: 'Train à Grande Vitesse',
    speed: '320 km/h',
    desc: 'Le premier TGV africain. Une révolution ferroviaire reliant Casablanca à Tanger en moins de 2 heures.',
    features: ['Wi-Fi haut débit', 'Restauration à bord', 'Sièges premium', '2 classes de confort'],
    color: '#C8963E',
    accent: 'rgba(200,150,62,0.12)',
    tag: 'TGV',
    tagColor: '#C8963E',
  },
  {
    id: 'alatlas',
    name: 'Al Atlas',
    subtitle: 'Train Intercités',
    speed: '200 km/h',
    desc: 'Un service confortable et ponctuel desservant les grandes villes du Maroc avec élégance.',
    features: ['Climatisation', 'Bar restaurant', 'Prises USB', 'Espaces famille'],
    color: '#0EA5E9',
    accent: 'rgba(14,165,233,0.10)',
    tag: 'IC',
    tagColor: '#0EA5E9',
  },
  {
    id: 'supratours',
    name: 'Supratours',
    subtitle: 'Cars & Connexions',
    speed: '150+ km/h',
    desc: 'Prolongez votre voyage au-delà du réseau ferroviaire vers Agadir, Essaouira et plus encore.',
    features: ['Complémentaire au train', 'Confort autocar', 'Lignes étendues', 'Tarifs combinés'],
    color: '#10B981',
    accent: 'rgba(16,185,129,0.10)',
    tag: 'Car',
    tagColor: '#10B981',
  },
  {
    id: 'premium',
    name: 'Première Classe',
    subtitle: 'Expérience Exclusive',
    speed: '',
    desc: 'Profitez d\'un service haut de gamme avec des espaces privatifs, champagne et service attentionné.',
    features: ['Lounge privé', 'Champagne offert', 'Repas gastronomiques', 'Conciergerie'],
    color: '#8B5CF6',
    accent: 'rgba(139,92,246,0.10)',
    tag: '1ère',
    tagColor: '#8B5CF6',
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.section-title-services',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      gsap.fromTo('.service-card',
        { y: 70, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.service-card', start: 'top 80%' }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="services">
      <div className={styles.inner}>
        <div className={`section-title-services ${styles.sectionHeader}`}>
          <div className={styles.badge}>Nos Trains</div>
          <h2 className={styles.title}>
            Une flotte moderne<br /><em>pour chaque voyage</em>
          </h2>
          <p className={styles.desc}>
            Du TGV Al Boraq aux cars Supratours, ONCF vous offre une gamme complète de services adaptés à tous vos besoins.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((svc) => (
            <div key={svc.id} className={`service-card ${styles.card}`} style={{ '--card-accent': svc.accent, '--card-color': svc.color }}>
              <div className={styles.cardInner}>
                <div className={styles.cardTop}>
                  <div className={styles.tag} style={{ color: svc.tagColor, borderColor: `${svc.tagColor}40`, background: `${svc.tagColor}10` }}>
                    {svc.tag}
                  </div>
                  {svc.speed && (
                    <div className={styles.speed}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1 6h10M8 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {svc.speed}
                    </div>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.name} style={{ color: svc.color }}>{svc.name}</h3>
                  <p className={styles.subtitle}>{svc.subtitle}</p>
                  <p className={styles.cardDesc}>{svc.desc}</p>
                </div>

                <ul className={styles.features}>
                  {svc.features.map(f => (
                    <li key={f} className={styles.feature}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="6" stroke={svc.color} strokeWidth="1.2" opacity="0.4"/>
                        <path d="M4.5 7l2 2 3-3" stroke={svc.color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a href="#booking" className={styles.cardBtn} style={{ '--btn-color': svc.color }}>
                  <span>En savoir plus</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>

              {/* Decorative orb */}
              <div className={styles.orb} style={{ background: `radial-gradient(circle at center, ${svc.color}30 0%, transparent 70%)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
