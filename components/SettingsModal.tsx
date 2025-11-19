import React from 'react';
import { Modal } from './Modal';
import { ThemeToggle } from './ThemeToggle';
import { Icon } from './Icon';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsItem: React.FC<{ icon: string; label: string; }> = ({ icon, label }) => (
    <button className="w-full flex items-center space-x-4 p-4 rounded-lg hover:bg-card_bg transition-colors text-left">
      <Icon name={icon} className="w-6 h-6 text-text_secondary" />
      <span className="text-lg">{label}</span>
    </button>
);


export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  return (
    <Modal onClose={onClose} title="Settings & Privacy">
      <div className="p-2">
          <div className="m-2">
            <h3 className="text-lg font-semibold mb-2 px-2 text-text_primary">Appearance</h3>
            <ThemeToggle />
          </div>
          <div className="my-2 border-t border-border" />
          <SettingsItem icon="language" label="Language" />
          <SettingsItem icon="mail" label="Contact Support" />
          <SettingsItem icon="life-buoy" label="Help Center" />
          <SettingsItem icon="shield" label="Security" />
          <SettingsItem icon="gamepad" label="Games" />
          <SettingsItem icon="layout" label="Dashboard" />
      </div>
    </Modal>
  );
};