import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Menu,
  User,
  Home,
  Dumbbell,
  Utensils,
  TrendingUp,
  Users,
  BookOpen,
  LogOut,
} from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface MobileHeaderProps {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
  /** set false on pages where you DON'T want the hamburger */
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
    if (!onSearch) return;
    const trimmed = searchQuery.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <>
      {/* Mobile only wrapper */}
      <div className="md:hidden">
        {/* Top bar */}
        <div className="sticky top-0 left-0 right-0 z-40 bg-white border-b shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Left: Hamburger or spacer */}
            {showMenu ? (
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors -ml-2"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            ) : (
              <div className="w-10" />
            )}

            {/* Center: Logo */}
            <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg" />
              <span className="text-xl font-bold">M2Fitnes</span>
            </div>

            {/* Right: login/profile */}
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
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Slide-in mobile menu */}
      {showMenu && isMenuOpen && (
        <div className="fixed inset-0 z-[120] md:hidden">
          {/* Dark backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* White panel */}
          <div className="relative h-full w-72 max-w-[80%] bg-white shadow-2xl flex flex-col">
            <div className="p-5 border-b flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg" />
              <span className="text-xl font-bold">M2Fitness</span>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate('/dashboard');
                  setIsMenuOpen(false);
                }}
              >
                <Home className="w-5 h-5 mr-3" />
                Home
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate('/workouts');
                  setIsMenuOpen(false);
                }}
              >
                <Dumbbell className="w-5 h-5 mr-3" />
                Workouts
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate('/diet/new-plan');
                  setIsMenuOpen(false);
                }}
              >
                <Utensils className="w-5 h-5 mr-3" />
                Diet Plans
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate('/progress');
                  setIsMenuOpen(false);
                }}
              >
                <TrendingUp className="w-5 h-5 mr-3" />
                Progress
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate('/community');
                  setIsMenuOpen(false);
                }}
              >
                <Users className="w-5 h-5 mr-3" />
                Community
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate('/blog');
                  setIsMenuOpen(false);
                }}
              >
                <BookOpen className="w-5 h-5 mr-3" />
                Blog
              </Button>
            </nav>

            <div className="p-4 border-t space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate('/profile');
                  setIsMenuOpen(false);
                }}
              >
                <User className="w-5 h-5 mr-3" />
                Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => {
                  navigate('/');
                  setIsMenuOpen(false);
                }}
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
