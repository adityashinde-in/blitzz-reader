import { useState, useEffect, useRef, useCallback } from 'react';

export type ReaderMode = 'word' | 'line' | 'page' | null;

export function useReaderEngine(words: string[] | undefined, mode: ReaderMode) {
    const safeWords = words || [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [wpm, setWpm] = useState(300);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Reset logic
    const reset = useCallback(() => {
        setIsPlaying(false);
        setCurrentIndex(0);
    }, []);

    // Auto-reset if words change
    useEffect(() => {
        reset();
    }, [safeWords, reset]); // Use safeWords dependency

    const processIndex = useCallback(() => {
        setCurrentIndex((prev) => {
            if (prev >= safeWords.length - 1) {
                setIsPlaying(false);
                return prev;
            }
            return prev + 1;
        });
    }, [safeWords.length]);

    useEffect(() => {
        if (isPlaying && mode === 'word') {
            const intervalMs = 60000 / wpm;
            timerRef.current = setInterval(processIndex, intervalMs);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isPlaying, wpm, mode, processIndex]);

    const play = useCallback(() => setIsPlaying(true), []);
    const pause = useCallback(() => setIsPlaying(false), []);
    const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);

    const next = useCallback(() => {
        setIsPlaying(false);
        setCurrentIndex((prev) => Math.min(prev + 1, safeWords.length - 1));
    }, [safeWords.length]);

    const prev = useCallback(() => {
        setIsPlaying(false);
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }, []);

    return {
        currentIndex,
        isPlaying,
        wpm,
        setWpm,
        play,
        pause,
        togglePlay,
        reset,
        next,
        prev,
        setCurrentIndex,
    };
}
