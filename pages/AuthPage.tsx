import React, { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { SignUpForm } from '../components/SignUpForm';
import { Icon } from '../components/Icon';
import type { User } from '../types';

interface AuthPageProps {
  onAuthSuccess: (user: User) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
            <Icon name="xelar" className="h-16 w-16 text-primary" />
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-2">
            {isLoginView ? 'Welcome Back to Xelar' : 'Join the Academic Community'}
        </h1>
        <p className="text-center text-text_secondary mb-8">
            The social platform for scholars, researchers, and students.
        </p>

        <div className="bg-card_bg border border-border rounded-2xl p-8">
          {isLoginView ? (
            <LoginForm onAuthSuccess={onAuthSuccess} />
          ) : (
            <SignUpForm onAuthSuccess={onAuthSuccess} />
          )}
        </div>

        <div className="mt-6 text-center">
            {isLoginView ? (
                <p>
                    Don't have an account?{' '}
                    <button onClick={() => setIsLoginView(false)} className="font-semibold text-primary hover:underline">
                        Sign Up
                    </button>
                </p>
            ) : (
                <p>
                    Already have an account?{' '}
                    <button onClick={() => setIsLoginView(true)} className="font-semibold text-primary hover:underline">
                        Log In
                    </button>
                </p>
            )}
        </div>
      </div>
    </div>
  );
};
