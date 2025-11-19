import React from 'react';
import { Modal } from './Modal';
import { ChatWindow } from './ChatWindow';
import type { ChatContact } from '../types';

interface ChatModalProps {
  contact: ChatContact;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ contact, onClose }) => {
  return (
    <Modal onClose={onClose} title={contact.user.name}>
      <div className="h-[70vh]">
        <ChatWindow contact={contact} />
      </div>
    </Modal>
  );
};