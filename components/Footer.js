import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './Footer.module.css';

gsap.registerPlugin(ScrollTrigger);

const links = {
  'Voyager': ['Réserver un billet', 'Horaires & tarifs', 'Destinations', 'Carte réseau', 'Offres spéciales'],
  'Services': ['Al Boraq TGV', 'Al Atlas IC', 'Supratours', '1ère classe', 'Abonnements'],
  'Informations': ['À propos d\'ONCF', 'Actualités', 'Développement durable', 'Accessibilité', 'Presse'],
  'Aide': ['Centre d\'aide', 'Contact', 'Retards & annulations', 'Bagages', 'Réclamations'],
};

const socials = [
  {
    name: 'Facebook',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    name: 'Twitter',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--bg-primary)"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-col',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 85%' }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.topSection}>
        <div className={`footer-col ${styles.brand}`}>
          <div className={styles.logo}>
            <div className={styles.logoMark}>
              <span className={styles.logoLine} />
              <span className={styles.logoText}>ONCF</span>
              <span className={styles.logoLine} />
            </div>
            <span className={styles.logoSub}>Voyages</span>
          </div>
          <p className={styles.brandDesc}>
            L&apos;Office National des Chemins de Fer du Maroc — connecter les hommes, les villes et les rêves depuis 1963.
          </p>
          <div className={styles.socials}>
            {socials.map(s => (
              <a key={s.name} href="#" className={styles.socialBtn} aria-label={s.name}>
                {s.icon}
              </a>
            ))}
          </div>
          <div className={styles.appBadges}>
            <div className={styles.appBadge}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--gold)" stroke="none">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.07c1.33.07 2.25.73 3.03.75.96-.19 1.87-.77 3.11-.83 1.55.12 2.7.72 3.44 1.84-3.14 1.87-2.43 5.74.65 6.87-.61 1.53-1.4 3.05-2.23 4.58zM12.03 7c-.03-2.77 2.24-5.04 5-5-.1 2.77-2.24 5.06-5 5z"/>
              </svg>
              <div>
                <div className={styles.appLabel}>Disponible sur</div>
                <div className={styles.appName}>App Store</div>
              </div>
            </div>
            <div className={styles.appBadge}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--gold)">
                <path d="M3 20.5v-17c0-.83 1-1.3 1.63-.77l14 8.5c.5.3.5 1.03 0 1.33l-14 8.5C3.99 21.8 3 21.33 3 20.5z"/>
              </svg>
              <div>
                <div className={styles.appLabel}>Disponible sur</div>
                <div className={styles.appName}>Google Play</div>
              </div>
            </div>
          </div>
        </div>

        {Object.entries(links).map(([category, items]) => (
          <div key={category} className={`footer-col ${styles.linkCol}`}>
            <h4 className={styles.colTitle}>{category}</h4>
            <ul className={styles.linkList}>
              {items.map(item => (
                <li key={item}>
                  <a href="#" className={styles.link}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Bottom */}
      <div className={styles.bottom}>
        <div className={styles.bottomLeft}>
          <span>© 2025 ONCF — Office National des Chemins de Fer</span>
          <span className={styles.dot}>·</span>
          <span>Tous droits réservés</span>
        </div>
        <div className={styles.bottomRight}>
          <a href="#">Politique de confidentialité</a>
          <a href="#">Conditions d&apos;utilisation</a>
          <a href="#">Accessibilité</a>
        </div>
      </div>

      {/* Big watermark */}
      <div className={styles.watermark} aria-hidden>ONCF</div>
    </footer>
  );
}
