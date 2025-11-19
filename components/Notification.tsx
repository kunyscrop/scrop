import React, { useState, useEffect } from 'react';
import type { Notification as NotificationType } from '../contexts/NotificationContext';
import { Icon } from './Icon';

interface NotificationProps {
  notification: NotificationType;
}

export const Notification: React.FC<NotificationProps> = ({ notification }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Mount with fade-in
        setVisible(true);
        
        // Start fade-out before removal from context
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000); 
        
        return () => clearTimeout(timer);
    }, []);
    
    const iconName = notification.type === 'success' ? 'check-circle' : 'info-circle';
    const iconColor = notification.type === 'success' ? 'text-green-400' : 'text-blue-400';

    return (
        <div 
            className={`flex items-center space-x-3 w-auto max-w-sm p-4 rounded-xl shadow-lg bg-card_bg border border-border text-text_primary transition-all duration-300 ease-in-out transform ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            role="alert"
        >
            <Icon name={iconName} className={`w-6 h-6 ${iconColor}`} />
            <span className="font-semibold">{notification.message}</span>
        </div>
    );
};