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

  // Show only on mobile
  const isHidden =
    typeof window !== 'undefined' && window.innerWidth >= 768;

  if (isHidden) return null;

  const items = [
    {
      label: 'Diet',
      icon: Utensils,
      path: '/diet/new-plan',
      match: ['/diet', '/diet-plan'],
    },
    {
      label: 'Workout',
      icon: Dumbbell,
      path: '/workouts',
      match: ['/workouts', '/workout', '/exercise'],
    },
    {
      label: 'Anatomy',
      icon: Heart,
      path: '/muscle-anatomy',
      match: ['/muscle-anatomy'],
    },
    {
      label: 'Protein',
      icon: Calculator,
      path: '/protein-calculator',
      match: ['/protein-calculator'],
    },
    {
      label: 'Community',
      icon: Users,
      path: '/community',
      match: ['/community'],
    },
    {
      label: 'Blog',
      icon: BookOpen,
      path: '/blog',
      match: ['/blog'],
    },
  ];

  const isActive = (paths: string[]) =>
    paths.some((p) => location.pathname.startsWith(p));

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
      <div className="flex justify-between px-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.match);

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center flex-1 py-2 text-[11px]"
            >
              <Icon
                className={`w-5 h-5 mb-0.5 ${
                  active ? 'text-orange-500' : 'text-gray-500'
                }`}
              />
              <span
                className={`${
                  active ? 'text-orange-500 font-semibold' : 'text-gray-500'
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
