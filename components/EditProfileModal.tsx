import React, { useState, useRef } from 'react';
import { Modal } from './Modal';
import { Icon } from './Icon';
import type { User } from '../types';

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, onClose, onSave }) => {
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio || '');
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'banner') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'avatar') {
                    setAvatarPreview(reader.result as string);
                } else {
                    setBannerPreview(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        const updatedUser = { 
            ...user, 
            name, 
            bio,
            avatarUrl: avatarPreview || user.avatarUrl,
            bannerUrl: bannerPreview || user.bannerUrl,
        };
        onSave(updatedUser);
        onClose();
    };

    return (
        <Modal onClose={onClose} title="Edit Profile">
             <div className="max-h-[80vh] overflow-y-auto">
                <div className="relative">
                    <div className="h-48 bg-gray-300 dark:bg-gray-700 relative group">
                        <img src={bannerPreview || user.bannerUrl || 'https://picsum.photos/seed/default-banner/600/200'} alt="User banner" className="w-full h-full object-cover" />
                        <div 
                            className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            onClick={() => bannerInputRef.current?.click()}
                            role="button"
                            aria-label="Change banner image"
                        >
                            <Icon name="camera" className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <input type="file" ref={bannerInputRef} onChange={(e) => handleFileSelect(e, 'banner')} className="hidden" accept="image/*" />

                    <div className="absolute -bottom-16 left-6">
                        <div className="relative group">
                            <img 
                                src={avatarPreview || user.avatarUrl}
                                alt={user.name}
                                className="w-32 h-32 rounded-full border-4 border-background object-cover bg-background"
                            />
                            <div 
                                className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                onClick={() => avatarInputRef.current?.click()}
                                role="button"
                                aria-label="Change profile image"
                            >
                                <Icon name="camera" className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <input type="file" ref={avatarInputRef} onChange={(e) => handleFileSelect(e, 'avatar')} className="hidden" accept="image/*" />
                    </div>
                </div>

                <div className="pt-20 p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text_secondary mb-1">Name</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-card_bg text-text_primary p-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text_secondary mb-1">Bio</label>
                        <textarea
                            value={bio}
                            onChange={e => setBio(e.target.value)}
                            className="w-full bg-card_bg text-text_primary p-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                            rows={4}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end space-x-3 p-4 border-t border-border">
                <button onClick={onClose} className="px-4 py-2 bg-card_bg rounded-full font-bold hover:bg-border">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary_hover">Save</button>
            </div>
        </Modal>
    );
};