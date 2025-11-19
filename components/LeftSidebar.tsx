import React from 'react';
import { Icon } from './Icon';
import { ThemeToggle } from './ThemeToggle';
import type { Page } from '../types';

interface LeftSidebarProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    onProfileClick: () => void;
    onLogout: () => void;
}

const NavItem: React.FC<{ icon: string; label: string; active: boolean; onClick: () => void; className?: string }> = ({ icon, label, active, onClick, className = '' }) => (
    <button onClick={onClick} className={`w-full flex items-center space-x-4 p-3 rounded-full hover:bg-card_bg transition-colors ${active ? 'font-bold' : ''} ${className}`}>
        <Icon name={icon} className="w-7 h-7" />
        <span className="text-xl">{label}</span>
    </button>
);

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ currentPage, setCurrentPage, onProfileClick, onLogout }) => {
    return (
        <aside className="sticky top-16 h-[calc(100vh-4rem)] p-4 flex flex-col justify-between">
            <div className="space-y-2">
                <NavItem
                    icon="home"
                    label="Home"
                    active={currentPage === 'home'}
                    onClick={() => setCurrentPage('home')}
                />
                <NavItem
                    icon="messages"
                    label="Messages"
                    active={currentPage === 'messages'}
                    onClick={() => setCurrentPage('messages')}
                />
                <NavItem
                    icon="search"
                    label="Search"
                    active={currentPage === 'search'}
                    onClick={() => setCurrentPage('search')}
                />
                <NavItem
                    icon="profile"
                    label="Profile"
                    active={false} 
                    onClick={onProfileClick}
                />
                 <button className="mt-4 w-full py-3 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary_hover transition-colors">
                   Post
                 </button>
                 <div className="pt-4 border-t border-border mt-4">
                    <NavItem
                        icon="logout"
                        label="Logout"
                        active={false}
                        onClick={onLogout}
                        className="text-red-500"
                    />
                </div>
            </div>
            
            <div className="py-4">
              <ThemeToggle />
            </div>
        </aside>
    );
};