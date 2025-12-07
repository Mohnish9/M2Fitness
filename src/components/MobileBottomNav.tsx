
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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-xl z-[999] md:hidden">
      <div className="flex justify-center items-center px-1 py-2 space-x-4">

        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`
                flex flex-col items-center justify-center
                ${isActive ? "text-orange-500" : "text-gray-500"}
                min-w-[40px]
              `}
            >
              {/* EXTRA SMALL ICON */}
              <Icon className="w-[5px] h-[5px] mb-[1px]" />

              {/* EXTRA SMALL TEXT */}
              <span className="text-[6px] leading-none">
                {item.label}
              </span>
            </button>
          );
        })}

      </div>
    </nav>
  );
}
