'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import LandingHero from '@/components/LandingHero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function Home() {
  const router = useRouter();

  return (
    <main className="bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />
      
      <LandingHero onStart={() => router.push('/upload')} />
      
      <div className="relative z-10 bg-background/95 backdrop-blur-3xl">
        <Features />
        <HowItWorks />
        <About />
        <Footer />
      </div>
    </main>
  );
}

