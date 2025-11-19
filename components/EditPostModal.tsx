import React, { useState } from 'react';
import { Modal } from './Modal';
import type { Post } from '../types';

interface EditPostModalProps {
  post: Post;
  onClose: () => void;
  onSave: (postId: string, newContent: string) => void;
}

export const EditPostModal: React.FC<EditPostModalProps> = ({ post, onClose, onSave }) => {
  const [content, setContent] = useState(post.content);

  const handleSave = () => {
    if (content.trim()) {
      onSave(post.id, content);
      onClose();
    }
  };

  return (
    <Modal onClose={onClose} title="Edit Post">
      <div className="p-4">
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full bg-card_bg text-text_primary p-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-y"
          rows={6}
          autoFocus
        />
        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-card_bg text-text_primary rounded-full font-bold hover:bg-border transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!content.trim()}
            className="px-4 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary_hover transition-colors disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};