import React, { useState, useRef } from 'react';
import type { User } from '../types';
import { generatePostSuggestion } from '../services/geminiService';
import { useNotification } from '../contexts/NotificationContext';
import { Icon } from './Icon';

interface CreatePostProps {
  currentUser: User;
  onCreatePost: (content: string, imageUrl: string | null) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ currentUser, onCreatePost }) => {
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { addNotification } = useNotification();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() || imagePreview) {
      onCreatePost(content, imagePreview);
      setContent('');
      setImagePreview(null);
      if(fileInputRef.current) fileInputRef.current.value = "";
    }
  };
  
  const handleGenerateSuggestion = async () => {
    setIsGenerating(true);
    try {
        const suggestion = await generatePostSuggestion("my latest research progress");
        setContent(suggestion);
        addNotification("Suggestion generated!", "info");
    } catch(e) {
        addNotification("Failed to generate suggestion", "error");
    } finally {
        setIsGenerating(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
      setImagePreview(null);
      if(fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="bg-card_bg border border-border rounded-2xl p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-3">
          <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-12 h-12 rounded-full" />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="What's on your mind, scholar?"
              className="w-full bg-transparent text-xl p-2 focus:outline-none resize-none"
              rows={3}
            />
          </div>
        </div>

        {imagePreview && (
            <div className="mt-3 relative">
                <img src={imagePreview} alt="Selected preview" className="rounded-2xl w-full max-h-80 object-cover" />
                <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-black/70 rounded-full p-1 text-white hover:bg-black"
                    aria-label="Remove image"
                >
                    <Icon name="close" className="w-5 h-5" />
                </button>
            </div>
        )}

        <div className="flex justify-between items-center mt-2 pt-2 border-t border-border">
          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-full hover:bg-primary/20 text-primary"
              aria-label="Add image"
            >
              <Icon name="image" className="w-6 h-6" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              className="hidden"
              accept="image/png, image/jpeg, image/gif"
            />
            <button 
                type="button"
                onClick={handleGenerateSuggestion}
                disabled={isGenerating}
                className="flex items-center px-3 py-1 bg-primary/20 text-primary rounded-full font-semibold hover:bg-primary/30 disabled:opacity-50"
              >
                {isGenerating ? 'Generating...' : 'AI Suggest'}
            </button>
          </div>
          <button
            type="submit"
            disabled={!content.trim() && !imagePreview}
            className="px-6 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary_hover transition-colors disabled:opacity-50"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};