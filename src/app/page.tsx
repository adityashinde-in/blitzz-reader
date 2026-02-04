'use client';

import { useRouter } from 'next/navigation';
import LandingHero from '@/components/LandingHero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function Home() {
  const router = useRouter();

  return (
    <main className="home-main">
      <LandingHero onStart={() => router.push('/upload')} />
      
      <div className="home-sections">
        <Features />
        <HowItWorks />
        <About />
        <Footer />
      </div>
    </main>
  );
}

