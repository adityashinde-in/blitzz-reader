// We use dynamic import to avoid loading pdfjs-dist on the server during build
// which causes "Please use the legacy build in Node.js environments" errors.

// Special marker for paragraph breaks
export const PARAGRAPH_BREAK = '\n\n';

export async function parsePDF(file: File): Promise<string> {
    if (typeof window === 'undefined') {
        return '';
    }

    const pdfjsLib = await import('pdfjs-dist');

    // Set worker source dynamically to local file
    // ensuring it matches the installed version (we copied it to public/)
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
    }

    const arrayBuffer = await file.arrayBuffer();
    // @ts-ignore
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        // Sort items by Y position (top to bottom), then X position (left to right)
        const items = textContent.items
            .filter((item: any) => item.str && item.str.trim().length > 0)
            .map((item: any) => ({
                str: item.str,
                x: item.transform[4],
                y: item.transform[5],
                height: item.height || 12,
            }))
            .sort((a: any, b: any) => {
                // Sort by Y descending (top of page first), then X ascending
                const yDiff = b.y - a.y;
                if (Math.abs(yDiff) > 5) return yDiff;
                return a.x - b.x;
            });

        let lastY: number | null = null;
        let lastHeight = 12;
        let pageText = '';

        for (const item of items) {
            if (lastY !== null) {
                const yGap = lastY - item.y;

                // Detect paragraph break: gap is significantly larger than line height
                // Typically a paragraph break has 1.5x-2x the normal line gap
                if (yGap > lastHeight * 1.8) {
                    pageText += PARAGRAPH_BREAK;
                } else if (yGap > 2) {
                    // Normal line break or same line with space
                    pageText += ' ';
                }
            }

            pageText += item.str;
            lastY = item.y;
            lastHeight = item.height || 12;
        }

        // Add page break (double paragraph break) between pages
        fullText += pageText + PARAGRAPH_BREAK;
    }

    return fullText;
}
