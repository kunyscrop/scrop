import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { HomePage } from './pages/HomePage';
import { MessagesPage } from './pages/MessagesPage';
import { SearchPage } from './pages/SearchPage';
import { ProfileModal } from './components/ProfileModal';
import { PublicProfileModal } from './components/PublicProfileModal';
import { ChatModal } from './components/ChatModal';
import { EditProfileModal } from './components/EditProfileModal';
import { InviteModal } from './components/InviteModal';
import { NotificationContainer } from './components/NotificationContainer';
import { BottomNavBar } from './components/BottomNavBar';
import { AuthPage } from './pages/AuthPage';
import type { User, Page, ChatContact, UserRole } from './types';
import { useNotification } from './contexts/NotificationContext';
import { getCurrentUser, logout } from './services/authService';

// Mock Data
const MOCK_CONTACTS: ChatContact[] = [
    { id: 'contact-1', user: { id: 'user-1', name: 'Dr. Emily Carter', handle: '@emilycarter', avatarUrl: 'https://picsum.photos/seed/contact1/200/200', role: 'Professor' as UserRole, email: '', dateOfBirth: '' } as User, online: true },
    { id: 'contact-2', user: { id: 'user-2', name: 'BenNet', handle: '@bennet', avatarUrl: 'https://picsum.photos/seed/contact2/200/200', role: 'Student' as UserRole, email: '', dateOfBirth: '' } as User, online: false },
    { id: 'contact-3', user: { id: 'user-3', name: 'Laura Chen', handle: '@laurachen', avatarUrl: 'https://picsum.photos/seed/contact3/200/200', role: 'Student' as UserRole, email: '', dateOfBirth: '' } as User, online: true },
    { id: 'contact-4', user: { id: 'user-4', name: 'Dr. Smith', handle: '@dsmith', avatarUrl: 'https://picsum.photos/seed/contact4/200/200', role: 'Professor' as UserRole, email: '', dateOfBirth: '' } as User, online: false },
];


const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [viewedProfile, setViewedProfile] = useState<User | null>(null);
  const [activeChatContact, setActiveChatContact] = useState<ChatContact | null>(null);
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const { addNotification } = useNotification();

  useEffect(() => {
    // Check for a logged-in user on app start
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    if(currentUser) {
        // Simulate fetching contacts after login
        setTimeout(() => {
            setContacts(MOCK_CONTACTS);
        }, 1000);
    } else {
        setContacts([]); // Clear contacts on logout
    }
  }, [currentUser]);

  const handleAuthSuccess = (user: User) => {
      setCurrentUser(user);
      addNotification(`Welcome back, ${user.name}!`);
  };
  
  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setProfileModalOpen(false);
    addNotification("You have been logged out.", "info");
  };

  const handleViewProfile = (user: User) => {
    if (user.id === currentUser?.id) {
        setProfileModalOpen(true);
    } else {
        setViewedProfile(user);
    }
  };

  const handleEditProfile = () => {
    setProfileModalOpen(false);
    setEditProfileModalOpen(true);
  }

  const handleSaveProfile = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    addNotification('Profile updated successfully!');
  }
  
  if (!currentUser) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage currentUser={currentUser} onViewProfile={handleViewProfile} />;
      case 'messages':
        return <MessagesPage contacts={contacts} onContactClick={setActiveChatContact} />;
      case 'search':
        return <SearchPage onViewProfile={handleViewProfile} />;
      case 'profile':
         setProfileModalOpen(true);
         setCurrentPage('home'); 
         return <HomePage currentUser={currentUser} onViewProfile={handleViewProfile} />;
      default:
        return <HomePage currentUser={currentUser} onViewProfile={handleViewProfile} />;
    }
  };

  return (
    <div className="bg-background text-text_primary min-h-screen">
      <Header />
      <main className="container mx-auto max-w-7xl px-0 md:px-4 grid grid-cols-12 gap-x-4">
        <div className="hidden md:block md:col-span-3">
          <LeftSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} onProfileClick={() => setProfileModalOpen(true)} onLogout={handleLogout} />
        </div>
        <div className="col-span-12 md:col-span-6 border-x border-border pb-16 md:pb-0">
          {renderPage()}
        </div>
        <div className="hidden md:block md:col-span-3">
          <RightSidebar contacts={contacts} onContactClick={setActiveChatContact} onInviteClick={() => setInviteModalOpen(true)} />
        </div>
      </main>
      
      <BottomNavBar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        onProfileClick={() => setProfileModalOpen(true)}
      />

      {isProfileModalOpen && <ProfileModal user={currentUser} onClose={() => setProfileModalOpen(false)} onEdit={handleEditProfile} onLogout={handleLogout} />}
      {isEditProfileModalOpen && <EditProfileModal user={currentUser} onClose={() => setEditProfileModalOpen(false)} onSave={handleSaveProfile} />}
      {viewedProfile && <PublicProfileModal user={viewedProfile} onClose={() => setViewedProfile(null)} />}
      {activeChatContact && <ChatModal contact={activeChatContact} onClose={() => setActiveChatContact(null)} />}
      {isInviteModalOpen && <InviteModal onClose={() => setInviteModalOpen(false)} />}
      <NotificationContainer />
    </div>
  );
}

export default App;