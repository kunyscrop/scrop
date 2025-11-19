import React, { useState } from 'react';
import { Post as PostComponent } from './Post';
import { CreatePost } from './CreatePost';
import type { Post, User } from '../types';
import { useNotification } from '../contexts/NotificationContext';
import { UserRole } from '../types';

// Mock Data for Posts
const initialPosts: Post[] = [
    {
        id: 'post-1',
        // FIX: Added missing properties to satisfy the User type.
        author: { id: 'user-1', name: 'Dr. Emily Carter', handle: '@emilycarter', avatarUrl: 'https://picsum.photos/seed/contact1/200/200', role: UserRole.Professor, email: 'emily.carter@example.com', dateOfBirth: '1980-01-01', followers: 5000, following: 200 },
        content: "Just published a new paper on the applications of machine learning in astrophysics. It's been a long journey, but incredibly rewarding. Feedback is welcome! #ML #AstroPhysics",
        imageUrl: 'https://picsum.photos/seed/post1/600/400',
        timestamp: '2h ago',
        likes: 156,
        comments: 23,
        isLiked: false,
    },
    {
        id: 'post-2',
        // FIX: Added missing properties to satisfy the User type.
        author: { id: 'user-2', name: 'BenNet', handle: '@bennet', avatarUrl: 'https://picsum.photos/seed/contact2/200/200', role: UserRole.Student, email: 'bennet@example.com', dateOfBirth: '2001-05-10', followers: 150, following: 250 },
        content: "Thrilled to announce I'll be presenting my research on graph neural networks at #ICLR2024! If you're attending, let's connect. #GNN #AI #Conference",
        timestamp: '5h ago',
        likes: 98,
        comments: 12,
        isLiked: true,
    }
];

interface FeedProps {
    currentUser: User;
    onViewProfile: (user: User) => void;
}

export const Feed: React.FC<FeedProps> = ({ currentUser, onViewProfile }) => {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const { addNotification } = useNotification();

    const handleCreatePost = (content: string, imageUrl: string | null) => {
        const newPost: Post = {
            id: new Date().toISOString(),
            author: currentUser,
            content,
            imageUrl: imageUrl || undefined,
            timestamp: 'Just now',
            likes: 0,
            comments: 0,
            isLiked: false,
        };
        setPosts(prevPosts => [newPost, ...prevPosts]);
        addNotification('Post created successfully!');
    };
    
    const handleSaveEdit = (postId: string, newContent: string) => {
        setPosts(posts.map(p => p.id === postId ? { ...p, content: newContent } : p));
        addNotification('Post updated!');
    };

    const handleDelete = (postId: string) => {
        setPosts(posts.filter(p => p.id !== postId));
        addNotification('Post deleted.', 'info');
    };

    const handleLike = (postId: string) => {
        setPosts(posts.map(p => p.id === postId ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 } : p));
    };

    return (
        <div>
            <CreatePost currentUser={currentUser} onCreatePost={handleCreatePost} />
            <div className="mt-4 space-y-4">
                {posts.map(post => (
                    <PostComponent 
                        key={post.id} 
                        post={post} 
                        currentUser={currentUser}
                        onSaveEdit={handleSaveEdit}
                        onDelete={handleDelete}
                        onLike={handleLike}
                        onViewProfile={onViewProfile}
                    />
                ))}
            </div>
        </div>
    );
};
