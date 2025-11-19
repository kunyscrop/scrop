
import React from 'react';
import { Icon } from './Icon';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
             <Icon name="xelar" className="h-8 w-8 text-primary" />
             <h1 className="text-2xl font-bold text-text_primary">Xelar</h1>
          </div>
          <div className="flex-1 max-w-xl mx-4">
            <input 
              type="text" 
              placeholder="Search Xelar..."
              className="w-full px-4 py-2 rounded-full bg-card_bg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center space-x-4">
             <img src="https://picsum.photos/seed/user/40/40" alt="User Avatar" className="w-10 h-10 rounded-full" />
             <button className="px-4 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary_hover transition-colors">
               Post
             </button>
          </div>
        </div>
      </div>
    </header>
  );
};
