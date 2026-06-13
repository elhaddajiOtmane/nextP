import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'Nos Trains', href: '#services' },
  { label: 'Offres', href: '#promotions' },
  { label: 'Expérience', href: '#experience' },
  { label: 'Infos', href: '#stats' },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);

    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.4 }
    );

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(menuRef.current,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.6, ease: 'power4.out' }
      );
      gsap.fromTo('.mobile-link',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.15 }
      );
    }
  }, [menuOpen]);

  return (
    <>
      <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <a href="#" className={styles.logo}>
            <div className={styles.logoMark}>
              <span className={styles.logoLine} />
              <span className={styles.logoText}>ONCF</span>
              <span className={styles.logoLine} />
            </div>
            <span className={styles.logoSub}>Voyages</span>
          </a>

          <ul className={styles.links}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={styles.link}>
                  <span>{link.label}</span>
                  <span className={styles.linkUnderline} />
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <a href="#booking" className={styles.btnOutline}>Connexion</a>
            <a href="#booking" className={styles.btnFill}>
              <span>Réserver</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div ref={menuRef} className={styles.mobileMenu}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.label} className="mobile-link">
                <a href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
              </li>
            ))}
          </ul>
          <div className={`${styles.mobileActions} mobile-link`}>
            <a href="#booking" className={styles.btnFill} onClick={() => setMenuOpen(false)}>
              Réserver un billet
            </a>
          </div>
        </div>
      )}
    </>
  );
}
