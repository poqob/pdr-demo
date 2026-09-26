import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoginView } from './components/auth/LoginView';
import { Sidebar } from './components/layout/Sidebar';
import { MobileHeader } from './components/layout/MobileHeader';
import { BottomNav } from './components/layout/BottomNav';
import { CounselingHub } from './components/counseling/CounselingHub';
import { FeedView } from './components/feed/FeedView';
import { ShareProblemModal } from './components/share/ShareProblemModal';
import { EditProfileModal } from './components/counseling/EditProfileModal';
import { CounselorDetailModal } from './components/counseling/CounselorDetailModal';
import { ChatModal } from './components/counseling/ChatModal';
import { useSwipeGesture } from './hooks/useSwipeGesture';

const MainLayout: React.FC = () => {
  const { role, activeTab, setActiveTab } = useApp();

  // Touch Swipe for mobile:
  // Sağdan sola kaydırınca (swipe left) -> Akış'a geç
  // Soldan sağa kaydırınca (swipe right) -> Danışmanlık & İletişim'e dön
  useSwipeGesture({
    onSwipeLeft: () => {
      if (activeTab === 'counseling') {
        setActiveTab('feed');
      }
    },
    onSwipeRight: () => {
      if (activeTab === 'feed') {
        setActiveTab('counseling');
      }
    }
  });

  if (!role) {
    return <LoginView />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800">
      
      {/* Desktop Sidebar (Ekranın solundaki panel) */}
      <Sidebar />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Header (Ekranın üstündeki mobil bar) */}
        <MobileHeader />

        {/* Page Content with animated transition */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {activeTab === 'counseling' ? (
            <div className="animate-in fade-in duration-200">
              <CounselingHub />
            </div>
          ) : (
            <div className="animate-in fade-in duration-200">
              <FeedView />
            </div>
          )}
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <BottomNav />
      </div>

      {/* Global Modals */}
      <ShareProblemModal />
      <EditProfileModal />
      <CounselorDetailModal />
      <ChatModal />

    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
