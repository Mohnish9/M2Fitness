import { useNavigate } from 'react-router-dom';
import {
  Home,
  Dumbbell,
  Utensils,
  TrendingUp,
  Users,
  BookOpen,
  User,
  LogOut,
} from 'lucide-react';
import { Button } from './ui/button';

interface MobileHamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileHamburgerMenu({ isOpen, onClose }: MobileHamburgerMenuProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed inset-0 z-[120] md:hidden transition-opacity duration-200 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <div
        className={`absolute left-0 top-0 h-full w-72 max-w-[80%] bg-white shadow-2xl flex flex-col transform transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
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
              onClose();
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
              onClose();
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
              onClose();
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
              onClose();
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
              onClose();
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
              onClose();
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
              onClose();
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
              onClose();
            }}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
