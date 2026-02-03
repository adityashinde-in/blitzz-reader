'use client';

import { motion } from 'framer-motion';
import { Zap, Waves, BookOpen, Gauge, Bookmark, Moon } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Flash Mode',
    subtitle: 'RSVP Technology',
    description: 'Words flash one at a time, eliminating eye movement and maximizing reading velocity. Perfect for articles and short content.',
  },
  {
    icon: Waves,
    title: 'Flow Mode',
    subtitle: 'River Reading',
    description: 'Text streams smoothly across your screen. Read naturally while maintaining a controlled, guided pace.',
  },
  {
    icon: BookOpen,
    title: 'Book Mode',
    subtitle: 'Page Flow',
    description: 'Full page view with word-by-word highlighting. Great for long-form content like books and research papers.',
  },
  {
    icon: Gauge,
    title: 'Speed Control',
    subtitle: '100-1000+ WPM',
    description: 'Dial in your perfect pace. Start slow, build up to 1000+ words per minute as you train.',
  },
  {
    icon: Bookmark,
    title: 'Smart Library',
    subtitle: 'Auto-Save Progress',
    description: 'Upload once, read anywhere. Your position is saved automatically so you never lose your place.',
  },
  {
    icon: Moon,
    title: 'Focus Interface',
    subtitle: 'Zero Distractions',
    description: 'Dark, minimal design engineered to keep your attention on what matters: the words.',
  },
];

export default function Features() {
  return (
    <section id="features" className="section py-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Three Ways to <span className="text-gradient-primary">Focus</span>
        </h2>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Pick the mode that matches your content. Each one is designed to keep you locked in.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-all duration-300 group flex flex-col"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <feature.icon size={24} className="text-primary" />
            </div>
            
            {/* Content */}
            <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
            <p className="text-primary/70 text-xs font-medium mb-3">{feature.subtitle}</p>
            <p className="text-muted text-sm leading-relaxed flex-grow">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
