import React, { useState } from 'react';
import { ScreenId } from '../types';
import { 
  Home, 
  Search, 
  MessageSquare, 
  Info, 
  BookMarked, 
  Menu, 
  X, 
  Scale, 
  Type as TypeIcon,
  Sparkles
} from 'lucide-react';

interface Props {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  isLargeFont: boolean;
  onToggleLargeFont: () => void;
}

export const Navbar: React.FC<Props> = ({
  currentScreen,
  onNavigate,
  isLargeFont,
  onToggleLargeFont,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ScreenId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Trang chủ', icon: <Home className="w-4 h-4" /> },
    { id: 'search', label: 'Tra cứu mức phạt', icon: <Search className="w-4 h-4" />, badge: '16 lỗi' },
    { id: 'consult', label: 'Hỏi đáp tình huống', icon: <MessageSquare className="w-4 h-4" />, badge: 'AI' },
    { id: 'about', label: 'Giới thiệu', icon: <Info className="w-4 h-4" /> },
    { id: 'references', label: 'Nguồn tham khảo', icon: <BookMarked className="w-4 h-4" /> },
  ];

  const handleNavClick = (id: ScreenId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-red-800 via-rose-800 to-amber-800 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>Cổng thông tin tuyên truyền: Thực hành tín ngưỡng văn minh, bài trừ mê tín dị đoan theo pháp luật Việt Nam</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-red-700 to-amber-700 flex items-center justify-center text-white shadow-md shadow-red-900/20 group-hover:scale-105 transition-transform">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-stone-900 tracking-tight text-base sm:text-lg block leading-none">
                TÍN NGƯỠNG VĂN MINH
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-red-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-red-800 hover:bg-stone-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Font size toggle & Mobile toggle */}
          <div className="flex items-center gap-2">
            {/* Font size toggle for high accessibility */}
            <button
              onClick={onToggleLargeFont}
              title={isLargeFont ? 'Chuyển về cỡ chữ thường' : 'Phóng to chữ dễ đọc'}
              className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                isLargeFont
                  ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <TypeIcon className="w-4 h-4" />
              <span className="hidden sm:inline font-mono">{isLargeFont ? 'Cỡ chữ Lớn A+' : 'Cỡ chữ Chuẩn'}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full px-4 py-3 rounded-xl text-base font-bold flex items-center justify-between transition-colors ${
                  isActive
                    ? 'bg-red-800 text-white'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
