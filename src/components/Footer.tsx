'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-transparent py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h4 className="font-bold text-lg mb-2">Blitz Reader.</h4>
          <p className="text-sm text-muted">Reach flowstate while reading.</p>
        </div>
        
        <div className="flex gap-8 text-sm text-muted">
          <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
          <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
          <Link href="#" className="hover:text-white transition-colors">Contact</Link>
        </div>

        <div className="text-xs text-muted/50">
          Made by <a href="https://aniketgprofile.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@aniket</a> · © {new Date().getFullYear()} Blitz Reader
        </div>
      </div>
    </footer>
  );
}
