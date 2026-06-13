import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './Destinations.module.css';

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    name: 'Marrakech',
    tagline: 'La Ville Ocre',
    duration: '3h20',
    price: '89',
    desc: 'Perdez-vous dans les souks envoûtants et la majesté de la place Jemaa el-Fna.',
    gradient: 'from-amber to-red',
    icon: '🕌',
    color: '#E05C2A',
    temp: '28°C',
  },
  {
    name: 'Fès',
    tagline: 'La Cité Médiévale',
    duration: '4h30',
    price: '75',
    desc: 'Explorez la plus ancienne medina du monde, classée au patrimoine de l\'UNESCO.',
    gradient: 'from-blue to-purple',
    icon: '🏛️',
    color: '#3A7BD5',
    temp: '22°C',
  },
  {
    name: 'Tanger',
    tagline: 'La Porte de l\'Europe',
    duration: '5h45',
    price: '120',
    desc: 'Où le détroit de Gibraltar sépare deux continents dans un panorama époustouflant.',
    gradient: 'from-teal to-blue',
    icon: '⚓',
    color: '#0EA5E9',
    temp: '20°C',
  },
  {
    name: 'Rabat',
    tagline: 'La Capitale Royale',
    duration: '1h00',
    price: '35',
    desc: 'Découvrez la magnificence du palais royal et les murailles de la kasbah des Oudaïas.',
    gradient: 'from-green to-teal',
    icon: '👑',
    color: '#10B981',
    temp: '21°C',
  },
  {
    name: 'Meknès',
    tagline: 'La Ville Impériale',
    duration: '3h45',
    price: '65',
    desc: 'Une cité impériale hors du temps, avec ses remparts monumentaux et son grenier royal.',
    gradient: 'from-purple to-pink',
    icon: '🏰',
    color: '#8B5CF6',
    temp: '23°C',
  },
  {
    name: 'El Jadida',
    tagline: 'La Cité Portugaise',
    duration: '2h15',
    price: '55',
    desc: 'Un héritage lusitanien entre la mer et la citadelle, d\'une beauté intemporelle.',
    gradient: 'from-gold to-amber',
    icon: '🌊',
    color: '#F59E0B',
    temp: '19°C',
  },
];

export default function Destinations() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    // Horizontal scroll
    const totalScroll = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      // Title entrance
      gsap.fromTo(headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          }
        }
      );

      // Horizontal scroll with pin
      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScroll + 200}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Card stagger entrance
      gsap.fromTo('.dest-card',
        { y: 60, opacity: 0, scale: 0.92 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="destinations">
      <div ref={headingRef} className={styles.heading}>
        <div className={styles.headingBadge}>Explorez</div>
        <h2 className={styles.title}>
          Destinations<br />
          <em>Inoubliables</em>
        </h2>
        <p className={styles.subtitle}>
          Des paysages envoûtants aux medinas millénaires — chaque destination vous offre une expérience unique.
        </p>
        <div className={styles.scrollHint}>
          <span>Faites défiler</span>
          <div className={styles.scrollArrow}>
            <span />
            <span />
          </div>
        </div>
      </div>

      <div ref={trackRef} className={styles.track}>
        {destinations.map((dest, i) => (
          <div key={dest.name} className={`dest-card ${styles.card}`}>
            <div
              className={styles.cardBg}
              style={{
                background: `radial-gradient(ellipse at 60% 40%, ${dest.color}22 0%, transparent 70%),
                             linear-gradient(180deg, ${dest.color}15 0%, rgba(4,6,15,0.95) 100%)`
              }}
            />
            <div className={styles.cardContent}>
              <div className={styles.cardTop}>
                <div className={styles.cardIcon} style={{ background: `${dest.color}22`, borderColor: `${dest.color}44` }}>
                  {dest.icon}
                </div>
                <div className={styles.cardTemp}>
                  <span className={styles.tempDot} style={{ background: dest.color }} />
                  {dest.temp}
                </div>
              </div>

              <div className={styles.cardBody}>
                <span className={styles.cardTagline}>{dest.tagline}</span>
                <h3 className={styles.cardName}>{dest.name}</h3>
                <p className={styles.cardDesc}>{dest.desc}</p>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.cardMeta}>
                  <div className={styles.metaItem}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M6 3.5v2.5l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <span>{dest.duration}</span>
                  </div>
                </div>
                <div className={styles.cardPrice}>
                  <span className={styles.priceFrom}>À partir de</span>
                  <span className={styles.priceAmount} style={{ color: dest.color }}>{dest.price} MAD</span>
                </div>
              </div>

              <button className={styles.cardBtn} style={{ borderColor: `${dest.color}55`, color: dest.color }}>
                <span>Réserver</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Number label */}
            <div className={styles.cardNumber}>0{i + 1}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
