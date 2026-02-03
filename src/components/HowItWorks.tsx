'use client';

import { motion } from 'framer-motion';
import { Upload, MousePointer, Gauge, BookOpen } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload',
    description: 'Drop any PDF or paste text. No account needed.',
  },
  {
    icon: MousePointer,
    step: '02',
    title: 'Choose Mode',
    description: 'Flash, Flow, or Book — pick your style.',
  },
  {
    icon: Gauge,
    step: '03',
    title: 'Set Speed',
    description: 'Start slow, build up to 1000 WPM.',
  },
  {
    icon: BookOpen,
    step: '04',
    title: 'Read',
    description: 'Focus deeply. Finish faster.',
  },
];

export default function HowItWorks() {
  return (
    <section className="section py-24 border-t border-white/5">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          How It <span className="text-gradient-primary">Works</span>
        </h2>
        <p className="text-muted text-lg max-w-xl mx-auto">
          Start reading better in under 30 seconds.
        </p>
      </motion.div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="text-center relative"
          >
            {/* Connector Line (hidden on mobile) */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-[60%] w-full h-px bg-gradient-to-r from-primary/30 to-transparent" />
            )}
            
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 relative">
              <step.icon size={28} className="text-primary" />
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-xs font-bold flex items-center justify-center text-black">
                {index + 1}
              </span>
            </div>
            
            {/* Content */}
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-muted text-sm">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
