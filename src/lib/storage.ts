// Types for the library storage system

export interface Bookmark {
    id: string;
    label: string;
    wordIndex: number;
    createdAt: number;
}

export interface StoredBook {
    id: string;
    name: string;
    words: string[];
    uploadedAt: number;
    lastReadAt?: number;
    lastPosition: number;
    bookmarks: Bookmark[];
}

const STORAGE_KEY = 'reading-but-better-library';
const MAX_BOOKMARKS = 25;

// Generate unique ID
function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// Get all books from localStorage
export function getLibrary(): StoredBook[] {
    if (typeof window === 'undefined') return [];

    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        console.error('Failed to read library from localStorage');
        return [];
    }
}

// Save library to localStorage
function saveLibrary(books: StoredBook[]): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    } catch (error) {
        console.error('Failed to save library:', error);
        // Could be quota exceeded
        alert('Storage is full. Please delete some books to continue.');
    }
}

// Add a new book to library
export function addBook(name: string, words: string[]): StoredBook {
    const book: StoredBook = {
        id: generateId(),
        name,
        words,
        uploadedAt: Date.now(),
        lastPosition: 0,
        bookmarks: [],
    };

    const library = getLibrary();
    library.unshift(book); // Add to beginning
    saveLibrary(library);

    return book;
}

// Get a single book by ID
export function getBook(id: string): StoredBook | undefined {
    const library = getLibrary();
    return library.find(book => book.id === id);
}

// Delete a book by ID
export function deleteBook(id: string): void {
    const library = getLibrary();
    const filtered = library.filter(book => book.id !== id);
    saveLibrary(filtered);
}

// Update book's last read position
export function updateReadPosition(id: string, position: number): void {
    const library = getLibrary();
    const book = library.find(b => b.id === id);

    if (book) {
        book.lastPosition = position;
        book.lastReadAt = Date.now();
        saveLibrary(library);
    }
}

// Add a bookmark to a book
export function addBookmark(bookId: string, wordIndex: number, label?: string): Bookmark | null {
    const library = getLibrary();
    const book = library.find(b => b.id === bookId);

    if (!book) return null;

    if (book.bookmarks.length >= MAX_BOOKMARKS) {
        alert(`Maximum ${MAX_BOOKMARKS} bookmarks allowed per book.`);
        return null;
    }

    const bookmark: Bookmark = {
        id: generateId(),
        label: label || `Bookmark ${book.bookmarks.length + 1}`,
        wordIndex,
        createdAt: Date.now(),
    };

    book.bookmarks.push(bookmark);
    saveLibrary(library);

    return bookmark;
}

// Rename a bookmark
export function renameBookmark(bookId: string, bookmarkId: string, newLabel: string): void {
    const library = getLibrary();
    const book = library.find(b => b.id === bookId);

    if (book) {
        const bookmark = book.bookmarks.find(bm => bm.id === bookmarkId);
        if (bookmark) {
            bookmark.label = newLabel;
            saveLibrary(library);
        }
    }
}

// Delete a bookmark
export function deleteBookmark(bookId: string, bookmarkId: string): void {
    const library = getLibrary();
    const book = library.find(b => b.id === bookId);

    if (book) {
        book.bookmarks = book.bookmarks.filter(bm => bm.id !== bookmarkId);
        saveLibrary(library);
    }
}

// Get all bookmarks for a book
export function getBookmarks(bookId: string): Bookmark[] {
    const book = getBook(bookId);
    return book?.bookmarks || [];
}
