import React, { useState, useRef } from 'react';
import { signup } from '../services/authService';
import { UserRole } from '../types';
import type { User } from '../types';
import { USER_ROLES } from '../constants';
import { Icon } from './Icon';

interface SignUpFormProps {
  onAuthSuccess: (user: User) => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onAuthSuccess }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
      name: '',
      handle: '',
      email: '',
      password: '',
      dateOfBirth: '',
      role: UserRole.Student,
      bio: '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setAvatarFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setAvatarPreview(reader.result as string);
        reader.readAsDataURL(file);
    }
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.handle || !formData.email || !formData.password || !formData.dateOfBirth) {
        setError("Please fill out all required fields.");
        return false;
    }
    if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return false;
    }
    // Simple handle validation
    if (!formData.handle.startsWith('@')) {
        setFormData(prev => ({ ...prev, handle: `@${prev.handle}` }));
    }
    setError('');
    return true;
  }

  const handleNext = () => {
    if (step === 1) {
        if(validateStep1()) {
            setStep(2);
        }
    } else if (step === 2) {
        setStep(3);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(step !== 3) return; // Should only submit on the last step

    setError('');
    setLoading(true);
    try {
      const user = await signup({ ...formData, avatarFile: avatarFile || undefined });
      onAuthSuccess(user);
    } catch (err: any) {
      setError(err.message || 'Sign up failed. Please try again.');
      setStep(1); // Go back to the first step on error
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch(step) {
        case 1:
            return (
                <div className="space-y-4">
                    <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 bg-background border border-border rounded-md"/>
                    <input name="handle" type="text" placeholder="@handle" value={formData.handle} onChange={handleChange} required className="w-full px-3 py-2 bg-background border border-border rounded-md"/>
                    <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 bg-background border border-border rounded-md"/>
                    <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required minLength={6} className="w-full px-3 py-2 bg-background border border-border rounded-md"/>
                    <div>
                        <label className="text-xs text-text_secondary">Date of Birth (You must be 16+)</label>
                        <input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required className="w-full px-3 py-2 bg-background border border-border rounded-md"/>
                    </div>
                    <select name="role" value={formData.role} onChange={handleChange} required className="w-full px-3 py-2 bg-background border border-border rounded-md">
                        {USER_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>
            );
        case 2:
            return (
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4">Add a Profile Picture</h3>
                    <div className="flex justify-center mb-4">
                        <div className="relative group w-32 h-32">
                            <img src={avatarPreview || 'https://picsum.photos/seed/placeholder/200/200'} alt="Avatar preview" className="w-32 h-32 rounded-full object-cover bg-background" />
                            <div onClick={() => avatarInputRef.current?.click()} className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Icon name="camera" className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <input type="file" ref={avatarInputRef} onChange={handleAvatarSelect} className="hidden" accept="image/*" />
                    </div>
                    <button type="button" onClick={() => avatarInputRef.current?.click()} className="text-sm font-semibold text-primary hover:underline">
                        Upload a photo
                    </button>
                </div>
            );
        case 3:
            return (
                <div>
                    <h3 className="text-xl font-semibold mb-4">Describe Yourself</h3>
                    <textarea name="bio" placeholder="Your bio" value={formData.bio} onChange={handleChange} rows={4} className="w-full p-2 bg-background border border-border rounded-md resize-none"/>
                </div>
            );
        default: return null;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {renderStep()}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <div className="flex flex-col space-y-2">
        {step < 3 && (
            <button type="button" onClick={handleNext} className="w-full py-2 px-4 rounded-full font-medium text-white bg-primary hover:bg-primary_hover">
                Next
            </button>
        )}
         {step === 2 && (
            <button type="button" onClick={handleNext} className="w-full py-2 font-medium text-primary hover:underline">
                Skip for now
            </button>
        )}
        {step === 3 && (
             <button type="submit" disabled={loading} className="w-full py-2 px-4 rounded-full font-medium text-white bg-primary hover:bg-primary_hover disabled:opacity-50">
                {loading ? 'Creating account...' : 'Finish Sign Up'}
             </button>
        )}
      </div>
    </form>
  );
};