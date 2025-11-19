import React from 'react';
import { Feed } from '../components/Feed';
import { Stories } from '../components/Stories';
import type { User } from '../types';

interface HomePageProps {
    currentUser: User;
    onViewProfile: (user: User) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ currentUser, onViewProfile }) => {
    return (
        <div>
            <Stories />
            <Feed currentUser={currentUser} onViewProfile={onViewProfile} />
        </div>
    );
};