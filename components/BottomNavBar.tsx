import React from 'react';
import { Icon } from './Icon';
import type { Page } from '../types';

interface BottomNavBarProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    onProfileClick: () => void;
}

const NavButton: React.FC<{ icon: string; active: boolean; onClick: () => void; label: string }> = ({ icon, active, onClick, label }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center w-full h-full" aria-label={label}>
        <Icon name={icon} className={`w-7 h-7 transition-colors ${active ? 'text-primary' : 'text-text_secondary'}`} />
    </button>
);

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentPage, setCurrentPage, onProfileClick }) => {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-t border-border z-20">
            <div className="flex justify-around items-center h-full">
                <NavButton
                    icon="home"
                    active={currentPage === 'home'}
                    onClick={() => setCurrentPage('home')}
                    label="Home"
                />
                <NavButton
                    icon="messages"
                    active={currentPage === 'messages'}
                    onClick={() => setCurrentPage('messages')}
                    label="Messages"
                />
                 <button className="px-4 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary_hover transition-colors -mt-8">
                   <Icon name="xelar" className="w-6 h-6" />
                 </button>
                <NavButton
                    icon="search"
                    active={currentPage === 'search'}
                    onClick={() => setCurrentPage('search')}
                    label="Search"
                />
                <NavButton
                    icon="profile"
                    active={currentPage === 'profile'}
                    onClick={onProfileClick}
                    label="Profile"
                />
            </div>
        </nav>
    );
};