// src/components/MobileHamburgerMenu.tsx
import { useNavigate } from 'react-router-dom';
import { Home, Dumbbell, Utensils, TrendingUp, User, LogOut, X } from 'lucide-react';
import { Button } from './ui/button';

interface MobileHamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileHamburgerMenu({ isOpen, onClose }: MobileHamburgerMenuProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const go = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] md:hidden">
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <div className="relative h-full w-72 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg" />
            <span className="text-lg font-bold">M2Fitnes</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav items */}
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
  );
}
