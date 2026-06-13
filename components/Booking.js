import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './Booking.module.css';

gsap.registerPlugin(ScrollTrigger);

const cities = ['Casablanca', 'Rabat', 'Kénitra', 'Salé', 'Meknès', 'Fès', 'Tanger', 'Marrakech', 'Oujda', 'Agadir'];

export default function Booking() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const [tripType, setTripType] = useState('roundtrip');
  const [from, setFrom] = useState('Casablanca');
  const [to, setTo] = useState('Marrakech');
  const [date, setDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  const swap = () => {
    gsap.to(cardRef.current.querySelectorAll(`.${styles.swapIcon}`), {
      rotation: '+=180',
      duration: 0.4,
      ease: 'power2.inOut'
    });
    setFrom(to);
    setTo(from);
  };

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(sectionRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
        );
      },
      once: true
    });
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="booking">
      <div ref={cardRef} className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 10h16M2 10l4-4M2 10l4 4M18 10l-4-4M18 10l-4 4" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Rechercher un billet</span>
          </div>
          <div className={styles.tripType}>
            {['roundtrip', 'oneway'].map((t) => (
              <button
                key={t}
                className={`${styles.tripBtn} ${tripType === t ? styles.tripBtnActive : ''}`}
                onClick={() => setTripType(t)}
              >
                {t === 'roundtrip' ? 'Aller-Retour' : 'Aller Simple'}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.form}>
          <div className={styles.routeRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="4" stroke="var(--gold)" strokeWidth="1.5"/>
                  <circle cx="6" cy="6" r="1.5" fill="var(--gold)"/>
                </svg>
                Départ
              </label>
              <div className={styles.selectWrap}>
                <select
                  value={from}
                  onChange={e => setFrom(e.target.value)}
                  className={styles.select}
                >
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <svg className={styles.selectArrow} width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 5l4 4 4-4" stroke="var(--warm-muted)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            <button className={styles.swapBtn} onClick={swap} title="Inverser">
              <svg className={styles.swapIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12M13 6l4 4-4 4M7 14l-4-4 4-4" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="4" stroke="var(--terracotta)" strokeWidth="1.5"/>
                  <circle cx="6" cy="6" r="1.5" fill="var(--terracotta)"/>
                </svg>
                Arrivée
              </label>
              <div className={styles.selectWrap}>
                <select
                  value={to}
                  onChange={e => setTo(e.target.value)}
                  className={styles.select}
                >
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <svg className={styles.selectArrow} width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 5l4 4 4-4" stroke="var(--warm-muted)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.detailsRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="var(--gold)" strokeWidth="1.2"/>
                  <path d="M4 1v2M8 1v2M1 5h10" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Date de départ
              </label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className={styles.input}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {tripType === 'roundtrip' && (
              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="var(--gold)" strokeWidth="1.2"/>
                    <path d="M4 1v2M8 1v2M1 5h10" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  Date de retour
                </label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={e => setReturnDate(e.target.value)}
                  className={styles.input}
                  min={date || new Date().toISOString().split('T')[0]}
                />
              </div>
            )}

            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="4" r="2" stroke="var(--gold)" strokeWidth="1.2"/>
                  <path d="M2 10c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Voyageurs
              </label>
              <div className={styles.counter}>
                <button onClick={() => setPassengers(Math.max(1, passengers - 1))} className={styles.counterBtn}>−</button>
                <span className={styles.counterVal}>{passengers}</span>
                <button onClick={() => setPassengers(Math.min(9, passengers + 1))} className={styles.counterBtn}>+</button>
              </div>
            </div>
          </div>

          <button className={styles.searchBtn}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M12 12l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            <span>Rechercher des trains</span>
          </button>
        </div>

        {/* Popular routes */}
        <div className={styles.popularRoutes}>
          <span className={styles.popularLabel}>Trajets populaires :</span>
          {[
            { from: 'Casa', to: 'Marrakech', duration: '3h' },
            { from: 'Casa', to: 'Fès', duration: '4h30' },
            { from: 'Rabat', to: 'Tanger', duration: '3h15' },
          ].map(r => (
            <button
              key={r.from + r.to}
              className={styles.popularRoute}
              onClick={() => { setFrom(r.from.replace('Casa', 'Casablanca')); setTo(r.to); }}
            >
              {r.from} → {r.to} <span className={styles.routeDuration}>{r.duration}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
