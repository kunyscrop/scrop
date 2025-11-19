import React from 'react';
import type { ChatContact } from '../types';
import { Icon } from './Icon';

interface RightSidebarProps {
  contacts: ChatContact[];
  onContactClick: (contact: ChatContact) => void;
  onInviteClick: () => void;
}

const ContactItem: React.FC<{ contact: ChatContact; onClick: () => void }> = ({ contact, onClick }) => (
  <div 
    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-border cursor-pointer transition-colors"
    onClick={onClick}
    role="button"
    tabIndex={0}
    aria-label={`Chat with ${contact.user.name}`}
  >
    <div className="relative">
      <img src={contact.user.avatarUrl} alt={contact.user.name} className="w-10 h-10 rounded-full" />
      {contact.online && (
        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
      )}
    </div>
    <div>
      <p className="font-semibold text-text_primary">{contact.user.name}</p>
      <p className="text-sm text-text_secondary">{contact.user.handle}</p>
    </div>
  </div>
);

export const RightSidebar: React.FC<RightSidebarProps> = ({ contacts, onContactClick, onInviteClick }) => {
  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] p-4 flex flex-col space-y-4">
      <div className="bg-card_bg border border-border rounded-2xl p-4">
        <h3 className="text-xl font-bold mb-4">Contacts</h3>
        <div className="flex flex-col space-y-2">
          {contacts.length > 0 ? (
            contacts.map(contact => <ContactItem key={contact.id} contact={contact} onClick={() => onContactClick(contact)} />)
          ) : (
            <p className="text-text_secondary">Loading contacts...</p>
          )}
        </div>
      </div>
      <div className="bg-card_bg border border-border rounded-2xl p-4 text-center">
         <h3 className="text-xl font-bold mb-3">Grow Your Network</h3>
         <p className="text-text_secondary mb-4">Invite students and professors to join the conversation on Xelar.</p>
         <button onClick={onInviteClick} className="w-full py-2 px-4 bg-primary text-white rounded-full font-bold hover:bg-primary_hover transition-colors">
            Invite Friends
         </button>
      </div>
    </aside>
  );
};