import React from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { Notification } from './Notification';

export const NotificationContainer: React.FC = () => {
    const { notifications } = useNotification();
    
    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col items-end space-y-2">
            {notifications.map(note => (
                <Notification key={note.id} notification={note} />
            ))}
        </div>
    );
};