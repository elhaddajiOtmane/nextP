import Head from 'next/head';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Booking from '@/components/Booking';
import Services from '@/components/Services';
import Stats from '@/components/Stats';
import Promotions from '@/components/Promotions';
import Footer from '@/components/Footer';

// Dynamic imports for components with Three.js / heavy animations (SSR off)
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const Destinations = dynamic(() => import('@/components/Destinations'), { ssr: false });
const Experience = dynamic(() => import('@/components/Experience'), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>ONCF Voyages — Voyagez à travers le Maroc</title>
        <meta name="description" content="Réservez vos billets de train au Maroc. Al Boraq TGV, trains intercités, destinations inoubliables. ONCF — L'Office National des Chemins de Fer." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="ONCF Voyages" />
        <meta property="og:description" content="Vivez le Maroc en mouvement." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <Booking />
        <Destinations />
        <Services />
        <Stats />
        <Experience />
        <Promotions />
      </main>

      <Footer />
    </>
  );
}
