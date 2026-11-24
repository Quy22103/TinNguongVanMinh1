import React, { useState, useEffect } from 'react';
import { ScreenId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeScreen } from './screens/HomeScreen';
import { SearchScreen } from './screens/SearchScreen';
import { ConsultScreen } from './screens/ConsultScreen';
import { AboutScreen } from './screens/AboutScreen';
import { ReferencesScreen } from './screens/ReferencesScreen';
import { Home, Search, MessageSquare, Info, BookMarked } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLargeFont, setIsLargeFont] = useState<boolean>(() => {
    try {
      return localStorage.getItem('tnvm_large_font') === 'true';
    } catch {
      return false;
    }
  });

  const handleToggleLargeFont = () => {
    setIsLargeFont((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('tnvm_large_font', String(next));
      } catch {}
      return next;
    });
  };

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchFromHome = (query: string) => {
    setSearchQuery(query);
    setCurrentScreen('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mobile bottom bar items
  const mobileNavItems: { id: ScreenId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Trang chủ', icon: <Home className="w-5 h-5" /> },
    { id: 'search', label: 'Tra cứu', icon: <Search className="w-5 h-5" /> },
    { id: 'consult', label: 'Hỏi đáp AI', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'about', label: 'Giới thiệu', icon: <Info className="w-5 h-5" /> },
    { id: 'references', label: 'Văn bản', icon: <BookMarked className="w-5 h-5" /> },
  ];

  return (
    <div className={`min-h-screen bg-stone-100 flex flex-col text-stone-900 font-sans selection:bg-red-100 selection:text-red-900 ${
      isLargeFont ? 'text-lg' : 'text-base'
    }`}>
      {/* Top Navbar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        isLargeFont={isLargeFont}
        onToggleLargeFont={handleToggleLargeFont}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 md:pb-8">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onSearchQuery={handleSearchFromHome}
            isLargeFont={isLargeFont}
          />
        )}

        {currentScreen === 'search' && (
          <SearchScreen
            initialQuery={searchQuery}
            isLargeFont={isLargeFont}
          />
        )}

        {currentScreen === 'consult' && (
          <ConsultScreen
            isLargeFont={isLargeFont}
          />
        )}

        {currentScreen === 'about' && (
          <AboutScreen
            isLargeFont={isLargeFont}
          />
        )}

        {currentScreen === 'references' && (
          <ReferencesScreen
            isLargeFont={isLargeFont}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Bottom Navigation Bar (Sticky bottom for phones) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg px-2 py-1">
        <div className="grid grid-cols-5 gap-1 text-center">
          {mobileNavItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`py-1.5 px-1 rounded-xl flex flex-col items-center justify-center transition-colors cursor-pointer ${
                  isActive
                    ? 'text-red-700 font-bold'
                    : 'text-stone-500 hover:text-stone-800 font-medium'
                }`}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-red-50' : ''}`}>
                  {item.icon}
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-full">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
