import React, { useEffect, ReactNode } from 'react';
import { Icon } from './Icon';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  title: string;
}

export const Modal: React.FC<ModalProps> = ({ onClose, children, title }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="bg-background rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center p-3 border-b border-border">
            <button 
                onClick={onClose} 
                className="p-2 rounded-full hover:bg-card_bg"
                aria-label="Close modal"
            >
                <Icon name="close" className="w-5 h-5" />
            </button>
            <h2 id="modal-title" className="text-xl font-bold ml-4">{title}</h2>
        </div>
        <div className="overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};