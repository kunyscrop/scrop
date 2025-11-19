import React from 'react';
import type { Story, UserRole } from '../types';

// Mock data
const stories: Story[] = [
    { id: '1', user: { id: 'user-1', name: 'Dr. Carter', avatarUrl: 'https://picsum.photos/seed/contact1/200/200', role: 'Professor' } as any, imageUrl: 'https://picsum.photos/seed/story1/200/300', viewed: true },
    { id: '2', user: { id: 'user-2', name: 'BenNet', avatarUrl: 'https://picsum.photos/seed/contact2/200/200', role: 'Student' } as any, imageUrl: 'https://picsum.photos/seed/story2/200/300', viewed: false },
    { id: '3', user: { id: 'user-3', name: 'Laura Chen', avatarUrl: 'https://picsum.photos/seed/contact3/200/200', role: 'Student' } as any, imageUrl: 'https://picsum.photos/seed/story3/200/300', viewed: false },
    { id: '4', user: { id: 'user-4', name: 'Dr. Smith', avatarUrl: 'https://picsum.photos/seed/contact4/200/200', role: 'Professor' } as any, imageUrl: 'https://picsum.photos/seed/story4/200/300', viewed: false },
];

export const Stories: React.FC = () => {
    return (
        <div className="p-4 border-b border-border">
            <div className="flex space-x-4 overflow-x-auto pb-2 -mx-4 px-4">
                {stories.map(story => (
                    <div key={story.id} className="flex-shrink-0 w-20 text-center cursor-pointer">
                        <div className={`rounded-full p-1 ${story.viewed ? 'bg-gray-300 dark:bg-gray-600' : 'bg-gradient-to-tr from-yellow-400 to-fuchsia-600'}`}>
                            <img src={story.user.avatarUrl} alt={story.user.name} className="w-16 h-16 rounded-full border-2 border-background" />
                        </div>
                        <p className="text-xs mt-1 truncate">{story.user.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
