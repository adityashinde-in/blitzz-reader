'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ReaderMode } from '@/hooks/useReaderEngine';

interface ReaderContextType {
  words: string[];
  setWords: (words: string[]) => void;
  mode: ReaderMode;
  setMode: (mode: ReaderMode) => void;
  currentBookId: string | null;
  setCurrentBookId: (id: string | null) => void;
}

const ReaderContext = createContext<ReaderContextType | undefined>(undefined);

export function ReaderProvider({ children }: { children: ReactNode }) {
  const [words, setWords] = useState<string[]>([]);
  const [mode, setMode] = useState<ReaderMode>(null);
  const [currentBookId, setCurrentBookId] = useState<string | null>(null);

  return (
    <ReaderContext.Provider value={{ 
      words, 
      setWords, 
      mode, 
      setMode,
      currentBookId,
      setCurrentBookId,
    }}>
      {children}
    </ReaderContext.Provider>
  );
}

export function useReaderContext() {
  const context = useContext(ReaderContext);
  if (context === undefined) {
    throw new Error('useReaderContext must be used within a ReaderProvider');
  }
  return context;
}
