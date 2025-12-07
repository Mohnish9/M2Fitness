// src/components/MobileBottomNav.tsx
import { useNavigate, useLocation } from "react-router-dom";
import {
  Utensils,
  Dumbbell,
  Heart,
  Calculator,
  Users,
  BookOpen,
} from "lucide-react";

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { label: "Diet", icon: Utensils, path: "/diet/new-plan" },
    { label: "Workout", icon: Dumbbell, path: "/workouts" },
    { label: "Anatomy", icon: Heart, path: "/muscle-anatomy" },
    { label: "Protein", icon: Calculator, path: "/protein-calculator" },
    { label: "Community", icon: Users, path: "/community" },
    { label: "Blog", icon: BookOpen, path: "/blog" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-[0_-2px_8px_rgba(0,0,0,0.06)] z-[999] md:hidden">
      <div className="flex justify-around px-2 py-[6px]">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex flex-1 justify-center"
            >
              <div
                className={`
                  flex flex-col items-center
                  ${isActive ? "text-orange-500" : "text-gray-500"}
                  w-[52px]   /* fixed inner width so labels never touch */
                `}
              >
                {/* small icon */}
                <Icon className="w-[16px] h-[16px] mb-[3px]" />

                {/* tiny label with some breathing room */}
                <span className="text-[9px] leading-[10px]">
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
