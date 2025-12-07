import { useNavigate } from 'react-router-dom';
import {
  Home,
  Dumbbell,
  Utensils,
  TrendingUp,
  Users,
  BookOpen,
  User as UserIcon,
} from 'lucide-react';

interface MobileHamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileHamburgerMenu({
  isOpen,
  onClose,
}: MobileHamburgerMenuProps) {
  const navigate = useNavigate();

  if (!isOpen) return null; // nothing when closed

  const navClick = (path: string) => {
    navigate(path);
    onClose();
  };

  const Item = ({
    icon: Icon,
    label,
    path,
  }: {
    icon: any;
    label: string;
    path: string;
  }) => (
    <button
      onClick={() => navClick(path)}
      className="w-full flex items-center gap-3 px-6 py-3 text-base text-gray-800 hover:bg-gray-50 active:bg-gray-100"
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="bg-white border-b shadow-sm md:hidden">
      <nav className="flex flex-col py-2">
        <Item icon={Home} label="Home" path="/" />
        <Item icon={Dumbbell} label="Workouts" path="/workouts" />
        <Item icon={Utensils} label="Diet Plans" path="/diet/new-plan" />
        <Item icon={TrendingUp} label="Progress" path="/progress" />
        <Item icon={Users} label="Community" path="/community" />
        <Item icon={BookOpen} label="Blog" path="/blog" />

        <div className="h-px bg-gray-100 my-2 mx-6" />

        <Item icon={UserIcon} label="Profile" path="/profile" />
      </nav>
    </div>
  );
}
