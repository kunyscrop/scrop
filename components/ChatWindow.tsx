import React, { useState, useEffect, useRef } from 'react';
import { Icon } from './Icon';
import type { ChatContact, ChatMessage } from '../types';
import { generateChatHistory } from '../services/geminiService';

interface ChatWindowProps {
  contact: ChatContact;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center p-8 h-full">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
);

type AttachmentPreview = {
  url: string;
  name: string;
  type: 'image' | 'file';
  size: string;
};

export const ChatWindow: React.FC<ChatWindowProps> = ({ contact }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [attachmentPreview, setAttachmentPreview] = useState<AttachmentPreview | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const history = await generateChatHistory(contact.user);
        setMessages(history);
      } catch (err) {
        setError('Failed to load chat history.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [contact]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSend = () => {
      if (newMessage.trim() || attachmentPreview) {
          const msg: ChatMessage = {
              id: new Date().toISOString(),
              text: newMessage,
              sender: 'me',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              imageUrl: attachmentPreview?.type === 'image' ? attachmentPreview.url : undefined,
              file: attachmentPreview?.type === 'file' ? { name: attachmentPreview.name, url: attachmentPreview.url, size: attachmentPreview.size } : undefined,
          };
          setMessages(prev => [...prev, msg]);
          setNewMessage('');
          setAttachmentPreview(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
      }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachmentPreview({
          url: reader.result as string,
          name: file.name,
          type: file.type.startsWith('image/') ? 'image' : 'file',
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAttachment = () => {
      setAttachmentPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {loading && <LoadingSpinner />}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md p-1 rounded-2xl ${msg.sender === 'me' ? 'bg-primary text-white rounded-br-none' : 'bg-card_bg text-text_primary rounded-bl-none'}`}>
              <div className="p-2">
                {msg.imageUrl && <img src={msg.imageUrl} alt="attached" className="rounded-xl mb-2 max-w-full h-auto"/>}
                {msg.file && (
                    <div className="flex items-center space-