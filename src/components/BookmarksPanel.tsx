'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bookmark, Trash2, Edit2, Check, Play } from 'lucide-react';
import { Bookmark as BookmarkType, getBookmarks, addBookmark, renameBookmark, deleteBookmark } from '@/lib/storage';

interface BookmarksPanelProps {
  bookId: string;
  currentWordIndex: number;
  onJumpTo: (index: number) => void;
  onClose: () => void;
}

export default function BookmarksPanel({ bookId, currentWordIndex, onJumpTo, onClose }: BookmarksPanelProps) {
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>(() => getBookmarks(bookId));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAddBookmark = () => {
    const newBookmark = addBookmark(bookId, currentWordIndex);
    if (newBookmark) {
      setBookmarks([...bookmarks, newBookmark]);
    }
  };

  const handleRename = (id: string) => {
    if (editValue.trim()) {
      renameBookmark(bookId, id, editValue.trim());
      setBookmarks(bookmarks.map(bm => 
        bm.id === id ? { ...bm, label: editValue.trim() } : bm
      ));
    }
    setEditingId(null);
    setEditValue('');
  };

  const handleDelete = (id: string) => {
    deleteBookmark(bookId, id);
    setBookmarks(bookmarks.filter(bm => bm.id !== id));
  };

  const startEditing = (bookmark: BookmarkType) => {
    setEditingId(bookmark.id);
    setEditValue(bookmark.label);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bookmarks-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bookmarks-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bookmarks-header">
          <h3><Bookmark size={20} /> Bookmarks</h3>
          <button onClick={onClose} className="btn-control">
            <X size={20} />
          </button>
        </div>

        <div className="bookmarks-list">
          {bookmarks.length === 0 ? (
            <p className="text-muted text-center p-8">
              No bookmarks yet.<br />Add one to save your place!
            </p>
          ) : (
            bookmarks.map((bookmark) => (
              <div key={bookmark.id} className="bookmark-item">
                {editingId === bookmark.id ? (
                  <div className="bookmark-edit">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleRename(bookmark.id)}
                      autoFocus
                      className="bookmark-input"
                    />
                    <button onClick={() => handleRename(bookmark.id)} className="btn-control">
                      <Check size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        onJumpTo(bookmark.wordIndex);
                        onClose();
                      }}
                      className="bookmark-label"
                    >
                      <Play size={14} />
                      <span>{bookmark.label}</span>
                      <span className="bookmark-position">Word {bookmark.wordIndex + 1}</span>
                    </button>
                    <div className="bookmark-actions">
                      <button onClick={() => startEditing(bookmark)} className="btn-control" title="Rename">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(bookmark.id)} className="btn-control delete-btn" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        <div className="bookmarks-footer">
          <button onClick={handleAddBookmark} className="btn btn-primary w-full">
            + Add Bookmark Here
          </button>
          <p className="text-muted text-xs mt-2 text-center">
            {bookmarks.length}/25 bookmarks
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
