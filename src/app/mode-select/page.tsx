'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useReaderContext } from '@/context/ReaderContext';
import { ReaderMode } from '@/hooks/useReaderEngine';
import { Zap, Waves, BookOpen } from 'lucide-react';

export default function ModeSelectPage() {
  const { words, setMode } = useReaderContext();
  const router = useRouter();

  // Redirect if no words loaded
  useEffect(() => {
    if (!words || words.length === 0) {
      router.push('/upload');
    }
  }, [words, router]);

  const handleModeSelect = (selectedMode: ReaderMode) => {
    setMode(selectedMode);
    router.push('/reader');
  };

  if (!words || words.length === 0) return null;

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="page-center relative"
      >
        <button onClick={() => router.push('/upload')} className="back-button btn group flex items-center gap-2">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
        </button>

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your <span className="text-gradient-primary">Mode</span></h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Pick your reading style. Each mode is designed to keep you in flow.
          </p>
        </div>

        <div className="mode-grid">
          {/* Flash Mode */}
          <div onClick={() => handleModeSelect('word')} className="glass-panel mode-card group">
            <div className="mode-icon-box">
              <Zap size={32} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-1">Flash Mode</h3>
            <p className="text-primary/60 text-xs font-medium mb-2">RSVP Technology</p>
            <p className="text-muted leading-relaxed text-sm">Words flash one at a time for maximum speed. Best for articles and short content.</p>
          </div>

          {/* Flow Mode */}
          <div onClick={() => handleModeSelect('line')} className="glass-panel mode-card group">
            <div className="mode-icon-box">
              <Waves size={32} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-1">Flow Mode</h3>
            <p className="text-primary/60 text-xs font-medium mb-2">River Reading</p>
            <p className="text-muted leading-relaxed text-sm">Smooth scrolling text stream. Read naturally at a controlled, guided pace.</p>
          </div>

          {/* Book Mode */}
          <div onClick={() => handleModeSelect('page')} className="glass-panel mode-card group">
            <div className="mode-icon-box">
              <BookOpen size={32} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-1">Book Mode</h3>
            <p className="text-primary/60 text-xs font-medium mb-2">Page Flow</p>
            <p className="text-muted leading-relaxed text-sm">Full page view with word highlighting. Best for books and long-form content.</p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
