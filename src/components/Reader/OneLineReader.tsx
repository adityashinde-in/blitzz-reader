'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

interface OneLineReaderProps {
  words: string[];
  isPlaying: boolean;
  wpm: number;
  fontSize: number;
  startIndex?: number; // Word index to jump to (for bookmarks)
  onIndexChange?: (index: number) => void; // Callback to sync current position
}

export default function OneLineReader({ 
  words, 
  isPlaying, 
  wpm, 
  fontSize, 
  startIndex = 0,
  onIndexChange,
}: OneLineReaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const positionRef = useRef(0);
  const lastTimeRef = useRef<number>(0);
  const lastStartIndexRef = useRef<number>(startIndex);
  
  // Virtualization State
  const [renderRange, setRenderRange] = useState({ start: 0, end: 50 });
  const renderRangeRef = useRef({ start: 0, end: 50 });
  
  // Word Metrics cache
  const [wordMetrics, setWordMetrics] = useState<{ widths: number[], positions: number[] }>({ widths: [], positions: [] });

  // 1. Pre-calculate all word widths and positions
  useEffect(() => {
    // Width heuristic: char_width + padding
    // Average char width is ~0.6em. Base padding 1.5em.
    // Making it slightly tighter for better flow.
    const widths: number[] = [];
    const positions: number[] = [];
    let currentPos = 0;

    words.forEach(word => {
      // Logic: (length * 0.55 * fontSize) + (fontSize * 1.0)
      const width = (word.length * 0.55 * fontSize) + (fontSize * 1.5);
      widths.push(width);
      positions.push(currentPos);
      currentPos += width;
    });

    setWordMetrics({ widths, positions });
  }, [words, fontSize]);

  // Helper to find index from pixel position (Binary Search ideally, or linear around guess)
  const getIndexFromPosition = useCallback((targetPos: number, positions: number[], widths: number[]) => {
    if (positions.length === 0) return 0;
    
    // Quick heuristic scan around expected index if possible
    // But since we jump, let's just do a binary search or rough scan.
    let low = 0, high = positions.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const start = positions[mid];
      const end = start + widths[mid];
      
      if (targetPos >= start && targetPos < end) return mid;
      if (targetPos < start) high = mid - 1;
      else low = mid + 1;
    }
    return Math.min(Math.max(0, low), positions.length - 1);
  }, []);

  // Initialize Position
  useEffect(() => {
    if (wordMetrics.positions.length > 0) {
      // Find position of start index
      const targetWordPos = wordMetrics.positions[startIndex] || 0;
      const targetWordWidth = wordMetrics.widths[startIndex] || 100;
      // We want the CENTER of the target word to be at 0 (Logic: positionRef tracks "center point")
      // positionRef will be the pixel offset of the "Read Head" relative to start of book.
      // So if Read Head is at word 5, pos = positions[5] + width[5]/2.
      const initialPos = targetWordPos + (targetWordWidth / 2);
      positionRef.current = initialPos;

      // Init render range
      const start = Math.max(0, startIndex - 20);
      const end = Math.min(words.length, startIndex + 30);
      setRenderRange({ start, end });
      renderRangeRef.current = { start, end };
    }
  }, [wordMetrics, startIndex]); // Run when metrics are ready or startIndex props change meaningfully (external)

  // Handle External Bookmark Jump
  useEffect(() => {
    if (startIndex !== lastStartIndexRef.current && wordMetrics.positions.length > 0) {
      lastStartIndexRef.current = startIndex;
      const targetWordPos = wordMetrics.positions[startIndex] || 0;
      const targetWordWidth = wordMetrics.widths[startIndex] || 100;
      const newPos = targetWordPos + (targetWordWidth / 2);
      positionRef.current = newPos;

      const start = Math.max(0, startIndex - 20);
      const end = Math.min(words.length, startIndex + 30);
      setRenderRange({ start, end });
      renderRangeRef.current = { start, end };
    }
  }, [startIndex, wordMetrics]);

  // Refs for tracking latest props/state in animation loop without restarting it
  const wordsRef = useRef(words);
  const wordMetricsRef = useRef(wordMetrics);
  
  useEffect(() => {
    wordsRef.current = words;
  }, [words]);

  useEffect(() => {
    wordMetricsRef.current = wordMetrics;
  }, [wordMetrics]);

  const animate = (time: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const deltaTime = Math.min(time - lastTimeRef.current, 100); // Clamp to max 100ms to prevent jumps
    lastTimeRef.current = time;

    const averageWidth = fontSize * 5; 
    const pixelSpeed = (wpm / 60) * averageWidth;
    
    // Move position
    const moveAmount = (pixelSpeed * deltaTime) / 1000;
    positionRef.current += moveAmount;

    // Virtualization Logic using REFS to ensure freshness
    const { positions, widths } = wordMetricsRef.current;
    
    // Safety check - if metrics aren't ready, verify consistency
    if (positions.length === 0 || positions.length !== wordsRef.current.length) {
      if (positions.length === 0) {
         // Just wait for metrics
         requestRef.current = requestAnimationFrame(animate); 
         return; 
      }
    }

    const currentIdx = getIndexFromPosition(positionRef.current, positions, widths);

    const { start, end } = renderRangeRef.current;
    
    // Buffer logic
    if (currentIdx > end - 15 || (currentIdx < start + 5 && start > 0)) {
      const newStart = Math.max(0, currentIdx - 20);
      const newEnd = Math.min(wordsRef.current.length, currentIdx + 30);
      
      if (newStart !== start || newEnd !== end) {
        setRenderRange({ start: newStart, end: newEnd });
        renderRangeRef.current = { start: newStart, end: newEnd };
      }
    }
    
    if (textRef.current) {
      // Visual Transform
      // We want to shift the "World" so that `positionRef` is at `Screen Center`.
      // screenCenter = window.innerWidth / 2.
      // transformX = screenCenter - positionRef.
      const centerOffset = window.innerWidth / 2;
      const x = centerOffset - positionRef.current;
      textRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
    }

    if (onIndexChange) {
      onIndexChange(currentIdx);
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = 0;
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, wpm, wordMetrics, onIndexChange]); // Removed dependencies that force resets

  // Prepare visible slice
  const visibleWords = [];
  // Since we use absolute positioning, we can just render the slice
  // We need to map global indices to array items
  if (wordMetrics.positions.length > 0) {
    for (let i = renderRange.start; i < renderRange.end; i++) {
      if (i >= words.length) break;
      visibleWords.push({
        word: words[i],
        left: wordMetrics.positions[i],
        width: wordMetrics.widths[i],
        index: i
      });
    }
  }

  return (
    <div className="one-line-container" ref={containerRef}>
      {/* Visual Aids */}
      <div className="center-marker" />
      <div className="fade-overlay" />

      <div
        ref={textRef}
        className="line-text"
        style={{ fontSize: `${fontSize}px` }}
      >
        {visibleWords.map((item) => (
          <div 
            key={item.index} 
            className="line-word"
            style={{ 
              left: `${item.left}px`,
              width: `${item.width}px`,
              fontSize: `${fontSize}px`
            }} 
          >
            {item.word}
          </div>
        ))}
      </div>
    </div>
  );
}
