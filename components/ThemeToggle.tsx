import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Icon } from './Icon';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-full flex items-center justify-center space-x-4 p-3 rounded-full hover:bg-card_bg transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Icon name={theme === 'light' ? 'moon' : 'sun'} className="w-7 h-7" />
      <span className="text-xl">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  );
};