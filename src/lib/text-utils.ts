// Special marker token for paragraph breaks in word array
export const PARA_MARKER = '¶PARA¶';

export function processText(text: string): string[] {
    // Replace paragraph breaks with a special marker that survives splitting
    const withMarkers = text
        .replace(/\n\n+/g, ` ${PARA_MARKER} `)
        .replace(/\s+/g, ' ')
        .trim();

    return withMarkers
        .split(' ')
        .filter((word) => word.length > 0);
}

export function processTextSimple(text: string): string[] {
    // Simple version that strips all formatting (for word/line mode)
    return text
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .filter((word) => word.length > 0);
}

export function getFocusPosition(word: string): number {
    const len = word.length;
    if (len === 1) return 0;
    if (len === 2 || len === 3) return 1;
    if (len <= 5) return 2;
    if (len <= 9) return 3;
    if (len <= 13) return 4;
    return 5;
}
