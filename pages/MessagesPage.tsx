import React from 'react';
import type { ChatContact } from '../types';

interface MessagesPageProps {
  contacts: ChatContact[];
  onContactClick: (contact: ChatContact) => void;
}

export const MessagesPage: React.FC<MessagesPageProps> = ({ contacts, onContactClick }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <div className="flex flex-col space-y-2">
        {contacts.map(contact => (
          <div 
            key={contact.id} 
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-card_bg cursor-pointer"
            onClick={() => onContactClick(contact)}
          >
            <img src={contact.user.avatarUrl} alt={contact.user.name} className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-semibold">{contact.user.name}</p>
              <p className="text-sm text-text_secondary">{contact.user.handle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
