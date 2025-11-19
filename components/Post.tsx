import React, { useState } from 'react';
import { Icon } from './Icon';
import { EditPostModal } from './EditPostModal';
// FIX: Alias the imported `Post` type to `PostType` to avoid a name collision with the `Post` component.
import type { Post as PostType, User } from '../types';

interface PostProps {
  // FIX: Use the aliased `PostType`.
  post: PostType;
  currentUser: User;
  onSaveEdit: (postId: string, newContent: string) => void;
  onDelete: (postId: string) => void;
  onLike: (postId: string) => void;
  onViewProfile: (user: User) => void;
}

export const Post: React.FC<PostProps> = ({ post, currentUser, onSaveEdit, onDelete, onLike, onViewProfile }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <article className="bg-card_bg border border-border rounded-2xl p-4">
      <div className="flex items-start space-x-3">
        <button onClick={() => onViewProfile(post.author)} className="flex-shrink-0" aria-label={`View profile of ${post.author.name}`}>
          <img src={post.author.avatarUrl} alt={post.author.name} className="w-12 h-12 rounded-full" />
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <button onClick={() => onViewProfile(post.author)} className="text-left">
              <span className="font-bold hover:underline">{post.author.name}</span>
              <span className="text-text_secondary ml-2">{post.author.handle} · {post.timestamp}</span>
            </button>
            {post.author.id === currentUser.id && (
              <div className="flex space-x-2">
                  <button onClick={() => setIsEditing(true)} className="p-2 rounded-full hover:bg-border text-text_secondary hover:text-primary"><Icon name="edit" className="w-5 h-5"/></button>
                  <button onClick={() => onDelete(post.id)} className="p-2 rounded-full hover:bg-border text-text_secondary hover:text-red-500"><Icon name="trash" className="w-5 h-5"/></button>
              </div>
            )}
          </div>
          <p className="mt-2 whitespace-pre-wrap">{post.content}</p>
          {post.imageUrl && (
            <div className="mt-3">
                <img src={post.imageUrl} alt="Post content" className="rounded-2xl w-full object-cover border border-border" style={{ maxHeight: '500px' }} />
            </div>
          )}
          <div className="flex justify-between items-center mt-4 text-text_secondary max-w-xs">
            <button className="flex items-center space-x-2 hover:text-blue-500">
              <Icon name="comment" className="w-5 h-5" />
              <span>{post.comments}</span>
            </button>
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center space-x-2 hover:text-red-500 ${post.isLiked ? 'text-red-500' : ''}`}
            >
              <Icon name="heart" className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
              <span>{post.likes}</span>
            </button>
          </div>
        </div>
      </div>
      {isEditing && (
        <EditPostModal
          post={post}
          onClose={() => setIsEditing(false)}
          onSave={onSaveEdit}
        />
      )}
    </article>
  );
};