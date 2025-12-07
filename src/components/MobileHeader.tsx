// src/components/MobileHeader.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, User, Home, Dumbbell, Utensils, TrendingUp, LogOut } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface MobileHeaderProps {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
  showMenu?: boolean;
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

  const go = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* MOBILE HEADER BAR */}
      <div className="md:hidden">
        <div className="sticky top-0 left-0 right-0 z-40 bg-white border-b shadow-sm">
          {/* Top row */}
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

          {/* Search bar */}
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

      {/* SLIDE-IN MENU OVERLAY */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[120] md:hidden">
          {/* dark background */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* left panel */}
          <div className="relative h-full w-72 bg-white shadow-2xl">
            {/* header inside menu */}
            <div className="flex items-center gap-2 px-4 py-4 border-b">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg" />
              <span className="text-lg font-bold">M2Fitnes</span>
            </div>

            {/* nav items */}
            <nav className="p-4 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => go('/dashboard')}
              >
                <Home className="w-5 h-5 mr-3" />
                Home
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => go('/workouts')}
              >
                <Dumbbell className="w-5 h-5 mr-3" />
                Workouts
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => go('/diet/new-plan')}
              >
                <Utensils className="w-5 h-5 mr-3" />
                Diet Plans
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => go('/progress')}
              >
                <TrendingUp className="w-5 h-5 mr-3" />
                Progress
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => go('/profile')}
              >
                <User className="w-5 h-5 mr-3" />
                Profile
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => go('/')}
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
