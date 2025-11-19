import React, { useState } from 'react';
import { searchXelar } from '../services/geminiService';
import type { Post, User } from '../types';
import { Post as PostComponent } from '../components/Post';
import { UserRole } from '../types';

interface SearchPageProps {
    onViewProfile: (user: User) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onViewProfile }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<{ users: Partial<User>[], posts: Partial<Post>[] }>({ users: [], posts: [] });
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setSearched(true);
        const searchResults = await searchXelar(query);
        setResults(searchResults);
        setLoading(false);
    };

    // Mock current user for PostComponent props
    // FIX: Added missing properties to satisfy the User type.
    const mockCurrentUser: User = { id: 'mock-user', name: 'Searcher', handle: '@searcher', avatarUrl: '', role: UserRole.Student, email: 'searcher@example.com', dateOfBirth: '2000-01-01', followers: 0, following: 0 };

    return (
        <div className="p-4">
            <div className="relative mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search Xelar..."
                    className="w-full px-4 py-3 rounded-full bg-card_bg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button onClick={handleSearch} className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary text-white rounded-full font-bold">
                    Search
                </button>
            </div>
            
            {loading && <div className="text-center p-8">Loading...</div>}

            {!loading && searched && results.users.length === 0 && results.posts.length === 0 && (
                <div className="text-center p-8 text-text_secondary">No results found for "{query}"</div>
            )}
            
            {!loading && (results.users.length > 0 || results.posts.length > 0) && (
                <div>
                    {results.users.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-3">Users</h2>
                            <div className="space-y-3">
                                {results.users.map(user => (
                                     <button 
                                        key={user.id} 
                                        onClick={() => onViewProfile(user as User)}
                                        className="w-full flex items-center space-x-3 p-3 rounded-lg bg-card_bg border border-border hover:bg-border transition-colors text-left"
                                    >
                                        <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full" />
                                        <div>
                                            <p className="font-semibold">{user.name}</p>
                                            <p className="text-sm text-text_secondary">{user.handle}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {results.posts.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-3">Posts</h2>
                            <div className="space-y-4">
                                {results.posts.map(post => (
                                    <PostComponent 
                                      key={post.id} 
                                      post={post as Post} 
                                      currentUser={mockCurrentUser} 
                                      onSaveEdit={() => {}}
                                      onDelete={() => {}}
                                      onLike={() => {}}
                                      onViewProfile={onViewProfile}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
