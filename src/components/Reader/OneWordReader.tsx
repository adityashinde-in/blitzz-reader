'use client';

import { useMemo } from 'react';
import { getFocusPosition } from '@/lib/text-utils';

interface OneWordReaderProps {
  word: string;
  fontSize: number;
}

export default function OneWordReader({ word, fontSize }: OneWordReaderProps) {
  const focusPos = useMemo(() => getFocusPosition(word), [word]);

  if (!word) return <div className="h-full flex items-center justify-center"></div>;

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Guides */}
      <div className="guide-vertical" />
      <div className="guide-horizontal" />

      {/* Word Display */}
      <div
        className="font-mono relative z-10 font-medium"
        style={{ fontSize: `${fontSize}px` }}
      >
        {word.split('').map((char, index) => (
          <span
            key={index}
            className={index === focusPos ? 'text-primary' : undefined}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
