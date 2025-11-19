import React, { useState, useRef, useEffect } from 'react';
import { Modal } from './Modal';
import { SettingsModal } from './SettingsModal';
import { Icon } from './Icon';
import type { User } from '../types';

interface ProfileModalProps {
  user: User;
  onClose: () => void;
  onEdit: () => void;
  onLogout: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose, onEdit, onLogout }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isActionsMenuOpen, setActionsMenuOpen] = useState(false);
  const actionsMenuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionsMenuRef.current && !actionsMenuRef.current.contains(event.target as Node)) {
        setActionsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <>
      <Modal onClose={onClose} title={`${user.name}`}>
        <div className="relative">
          <div className="h-48 bg-gray-300 dark:bg-gray-700 relative group">
              <img src={user.bannerUrl || 'https://picsum.photos/seed/default-banner/600/200'} alt={`${user.name}'s banner`} className="w-full h-full object-cover" />
              <div 
                className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={onEdit}
              >
                  <Icon name="camera" className="w-8 h-8 text-white" />
              </div>
          </div>
          <div className="absolute -bottom-16 left-6">
              <div className="relative group">
                <img 
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-32 h-32 rounded-full border-4 border-background object-cover"
                />
                 <div 
                    className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={onEdit}
                >
                    <Icon name="camera" className="w-8 h-8 text-white" />
                </div>
              </div>
          </div>
        </div>
        <div className="pt-4 px-6 pb-6">
          <div className="flex justify-end items-center">
              <div className="relative" ref={actionsMenuRef}>
                 <button 
                    onClick={() => setActionsMenuOpen(prev => !prev)} 
                    className="p-2 border border-border rounded-full font-bold hover:bg-card_bg"
                    aria-label="More actions"
                    aria-haspopup="true"
                    aria-expanded={isActionsMenuOpen}
                  >
                    <Icon name="more-horizontal" className="w-6 h-6" />
                 </button>
                 {isActionsMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-xl shadow-lg z-10">
                        <ul className="py-1">
                           <li>
                               <button 
                                onClick={() => { onEdit(); setActionsMenuOpen(false); }} 
                                className="w-full text-left flex items-center space-x-3 px-4 py-2 hover:bg-card_bg"
                               >
                                   <Icon name="edit" className="w-5 h-5"/>
                                   <span>Edit Profile</span>
                               </button>
                           </li>
                           <li>
                               <button 
                                onClick={() => { setIsSettingsOpen(true); setActionsMenuOpen(false); }} 
                                className="w-full text-left flex items-center space-x-3 px-4 py-2 hover:bg-card_bg"
                                >
                                   <Icon name="settings" className="w-5 h-5"/>
                                   <span>Settings & Privacy</span>
                                </button>
                           </li>
                           <div className="my-1 border-t border-border" />
                           <li>
                               <button 
                                onClick={() => { onLogout(); onClose(); }} 
                                className="w-full text-left flex items-center space-x-3 px-4 py-2 text-red-500 hover:bg-card_bg"
                               >
                                   <Icon name="logout" className="w-5 h-5"/>
                                   <span>Logout</span>
                               </button>
                           </li>
                        </ul>
                    </div>
                 )}
              </div>
          </div>
          <div className="-mt-8"> {/* Adjust for button height */}
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-text_secondary">{user.handle}</p>
              <p className="mt-4">{user.bio}</p>
              <div className="flex items-center space-x-4 mt-4 text-text_secondary">
                  <span><span className="font-bold text-text_primary">{user.following}</span> Following</span>
                  <span><span className="font-bold text-text_primary">{user.followers}</span> Followers</span>
              </div>
          </div>
        </div>
      </Modal>
      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}
    </>
  );
};