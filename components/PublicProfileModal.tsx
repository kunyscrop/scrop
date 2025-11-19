import React from 'react';
import { Modal } from './Modal';
import type { User } from '../types';

interface PublicProfileModalProps {
  user: User;
  onClose: () => void;
}

export const PublicProfileModal: React.FC<PublicProfileModalProps> = ({ user, onClose }) => {
  return (
    <Modal onClose={onClose} title={`${user.name}'s Profile`}>
      <div className="relative">
        <div className="h-48 bg-gray-300 dark:bg-gray-700">
          <img src={user.bannerUrl || 'https://picsum.photos/seed/public-banner/600/200'} alt={`${user.name}'s banner`} className="w-full h-full object-cover" />
        </div>
        <img 
            src={user.avatarUrl}
            alt={user.name}
            className="w-32 h-32 rounded-full absolute -bottom-16 left-6 border-4 border-background object-cover"
        />
      </div>
      <div className="pt-20 px-6 pb-6">
        <div className="flex justify-end">
            <button className="px-4 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary_hover">
                Follow
            </button>
        </div>
        <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-text_secondary">{user.handle}</p>
            <p className="mt-4">{user.bio || 'No bio available.'}</p>
            <div className="flex items-center space-x-4 mt-4 text-text_secondary">
                <span><span className="font-bold text-text_primary">{user.following || 0}</span> Following</span>
                <span><span className="font-bold text-text_primary">{user.followers || 0}</span> Followers</span>
            </div>
        </div>
      </div>
    </Modal>
  );
};