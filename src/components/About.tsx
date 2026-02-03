'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="section py-32 border-t border-white/5">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-xs font-semibold text-primary mb-6">
            OUR PHILOSOPHY
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Designed for the <br /> Information Age
          </h2>
          <div className="space-y-6 text-lg text-muted">
            <p>
              We consume more text than ever before, but our tools haven't evolved. 
              The static page is inefficient for the modern digital reader.
            </p>
            <p>
              <strong className="text-white">Blitz Reader</strong> uses scientifically backed 
              methods like RSVP (Rapid Serial Visual Presentation) to reduce eye movement 
              and increase retention.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden glass-panel flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent"
        >
           {/* Abstract visual */}
           <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
           <div className="text-center">
             <div className="text-6xl font-black text-white/10 select-none">FOCUS</div>
             <div className="text-6xl font-black text-white/5 select-none -mt-4">SPEED</div>
             <div className="text-6xl font-black text-white/5 select-none -mt-4">FLOW</div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
