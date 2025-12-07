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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-[999] md:hidden">
      <div className="flex justify-center items-center py-2">

        <div className="flex justify-between w-full px-6">

          {items.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);

            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center"
                style={{ width: "65px" }}  // ⬅ BIGGER spacing exactly like your screenshot
              >
                <Icon
                  className={`
                    w-[12px] h-[12px] mb-[3px]
                    ${isActive ? "text-orange-500" : "text-gray-500"}
                  `}
                />
                <span
                  className={`
                    text-[8px]
                    ${isActive ? "text-orange-500" : "text-gray-500"}
                  `}
                >
                  {item.label}
                </span>
              </button>
            );
          })}

        </div>
      </div>
    </nav>
  );
}
