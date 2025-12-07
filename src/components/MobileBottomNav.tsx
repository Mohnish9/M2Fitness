import { useLocation, useNavigate } from 'react-router-dom';
import {
  Utensils,
  Dumbbell,
  Heart,
  Calculator,
  Users,
  BookOpen,
} from 'lucide-react';

export default function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Only show on mobile
  if (typeof window !== 'undefined' && window.innerWidth >= 768) return null;

  const items = [
    { label: 'Diet', icon: Utensils, path: '/diet/new-plan', match: '/diet' },
    { label: 'Workout', icon: Dumbbell, path: '/workouts', match: '/workouts' },
    { label: 'Anatomy', icon: Heart, path: '/muscle-anatomy', match: '/muscle-anatomy' },
    { label: 'Protein', icon: Calculator, path: '/protein-calculator', match: '/protein-calculator' },
    { label: 'Community', icon: Users, path: '/community', match: '/community' },
    { label: 'Blog', icon: BookOpen, path: '/blog', match: '/blog' },
  ];

  const isActive = (match: string) => location.pathname.startsWith(match);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm z-50 md:hidden">
      <div className="flex justify-around items-center px-1 py-1.5">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.match);

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center flex-1"
            >
              <Icon
                className={`w-5 h-5 mb-1 ${
                  active ? 'text-orange-500' : 'text-gray-400'
                }`}
              />
              <span
                className={`text-[11px] leading-none ${
                  active ? 'text-orange-500 font-semibold' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
