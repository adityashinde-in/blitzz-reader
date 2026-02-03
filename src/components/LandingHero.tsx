'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface LandingHeroProps {
  onStart: () => void;
}

// Demo words for the animated preview
const demoWords = ['Stop', 'skimming.', 'Start', 'absorbing.', 'Read', '3x', 'faster', 'with', 'guided', 'focus.'];

export default function LandingHero({ onStart }: LandingHeroProps) {
  const router = useRouter();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // Animated word display for hero preview
  useEffect(() => {
    if (!isAnimating) return;
    
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % demoWords.length);
    }, 400);
    
    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <section id="home" className="section flex flex-col items-center justify-center min-h-screen text-center relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 right-0 h-screen bg-gradient-hero -z-10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10 animate-pulse" style={{ animationDuration: '4s' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight leading-[1.1]">
          Blitz <br className="hidden md:block" />
          <span className="text-gradient-primary">Reader.</span>
        </h1>

        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-6 leading-relaxed">
          Reach flowstate while reading. Read <span className="text-primary font-semibold">better</span> and <span className="text-primary font-semibold">faster</span>.
        </p>
        
        <p className="text-sm text-muted/70 mb-12">
          Speed reading reimagined for students, professionals, and lifelong learners.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="group btn-primary flex items-center gap-2 px-8 py-4 text-lg"
          >
            Start Reading Free
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
             onClick={() => router.push('/library')}
             className="px-8 py-4 rounded-full text-lg font-medium text-muted hover:text-white transition-colors flex items-center gap-2"
          >
            <Play size={20} className="text-primary" />
            My Library
          </button>
        </div>
      </motion.div>

      {/* Animated Reader Preview */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="mt-16 w-full max-w-4xl rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl p-6 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        {/* Mode Labels */}
        <div className="flex justify-center gap-4 mb-6">
          <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">Flash Mode</span>
          <span className="px-3 py-1 rounded-full bg-white/5 text-muted text-xs font-medium">Flow Mode</span>
          <span className="px-3 py-1 rounded-full bg-white/5 text-muted text-xs font-medium">Book Mode</span>
        </div>
        
        {/* Animated Word Display */}
        <div 
          className="rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/5 h-[200px] md:h-[300px] flex items-center justify-center relative cursor-pointer"
          onClick={() => setIsAnimating(!isAnimating)}
        >
          <motion.div 
            key={currentWordIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.15 }}
            className="text-4xl md:text-7xl font-bold text-white select-none"
          >
            {demoWords[currentWordIndex]}
          </motion.div>
          
          {/* Speed indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted text-sm">
            <span className="text-primary font-mono">150 WPM</span>
            <span>·</span>
            <span>{isAnimating ? 'Click to pause' : 'Click to play'}</span>
          </div>
           
          {/* Fake UI Elements */}
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
        </div>
      </motion.div>

    </section>
  );
}
