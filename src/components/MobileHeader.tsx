// src/components/MobileHeader.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, User } from 'lucide-react';
import { Input } from './ui/input';
import MobileHamburgerMenu from './MobileHamburgerMenu';

interface MobileHeaderProps {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
  showMenu?: boolean; // allow disabling the hamburger on some screens
}

export default function MobileHeader({
  onSearch,
  showSearch = true,
  showMenu = true,
}: MobileHeaderProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <>
      {/* Header itself (mobile only) */}
      <div className="md:hidden">
        <div className="sticky top-0 left-0 right-0 z-40 bg-white border-b shadow-sm">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3">
            {/* Hamburger */}
            {showMenu ? (
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors -ml-2"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            ) : (
              <div className="w-6 h-6 -ml-2" />
            )}

            {/* Logo */}
            <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg" />
              <span className="text-xl font-bold">M2Fitnes</span>
            </div>

            {/* Profile/Login */}
            <button
              onClick={() => navigate('/login')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors -mr-2"
              aria-label="Login or Profile"
            >
              <User className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Search bar (optional) */}
          {showSearch && (
            <div className="px-4 pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search workouts, diets, blogs..."
                  className="pl-10 pr-4 h-11 text-sm bg-gray-50 border border-gray-300 focus:border-blue-400 rounded-lg w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      handleSearch();
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Slide-in menu */}
      <MobileHamburgerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
