import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, User, Dumbbell, Target } from 'lucide-react';
import { Input } from './ui/input';
import MobileHamburgerMenu from './MobileHamburgerMenu';
import { workoutDatabase } from '../utils/workoutDatabase';

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
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  /* ------------------ SLUG GENERATOR ------------------ */
  const generateExerciseSlug = (name: string) => {
    const map: Record<string, string> = {
      'bench press': 'bench-press',
      'barbell bench press': 'bench-press',
      'squats': 'barbell-squat',
      'barbell squat': 'barbell-squat',
      'deadlift': 'deadlift',
      'barbell deadlift': 'deadlift',
      'push-ups': 'push-ups',
      'push ups': 'push-ups',
      'plank': 'plank',
      'lunges': 'lunges',
      'burpees': 'burpees',
      'pull-ups': 'pull-ups',
      'overhead press': 'overhead-press',
      'barbell row': 'barbell-row',
    };

    const normalized = name.toLowerCase().trim();
    return (
      map[normalized] ??
      normalized
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
    );
  };

  /* ------------------ ALL EXERCISES (MEMOIZED) ------------------ */
  const allExercises = useMemo(() => {
    return workoutDatabase.flatMap(workout =>
      workout.exercises.map(ex => ({
        name: ex.name,
        target: ex.target,
        sets: ex.sets,
        reps: ex.reps,
        level: workout.level,
        exerciseSlug: generateExerciseSlug(ex.name),
      }))
    );
  }, []);

  /* ------------------ SEARCH SUGGESTIONS ------------------ */
  const exerciseSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const q = searchQuery.toLowerCase();

    const filtered = allExercises.filter(ex =>
      ex.name.toLowerCase().includes(q) ||
      ex.target.toLowerCase().includes(q)
    );

    return Array.from(new Map(filtered.map(e => [e.name, e])).values()).slice(0, 8);
  }, [searchQuery, allExercises]);

  /* ------------------ SEARCH HANDLER ------------------ */
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    navigate('/workouts');
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  return (
    <div className="md:hidden">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Menu */}
          {showMenu ? (
            <button
              onClick={() => setIsMenuOpen(v => !v)}
              className="p-2 rounded-lg"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          ) : (
            <div className="w-8" />
          )}

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg" />
            <span className="text-xl font-bold">M2Fitnes</span>
          </div>

          {/* Profile */}
          <button onClick={() => navigate('/login')}>
            <User className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Search */}
        {showSearch && (
          <div className="px-4 pb-3 relative">
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search exercises..."
              className="pl-10 h-11 bg-gray-50 rounded-lg"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
            />

            {/* Dropdown */}
            {isSearchFocused && searchQuery && (
              <div className="absolute left-4 right-4 mt-2 bg-white rounded-xl border shadow-xl z-[999] max-h-80 overflow-y-auto">
                {exerciseSuggestions.length > 0 ? (
                  exerciseSuggestions.map((ex, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        navigate(`/exercise/${ex.exerciseSlug}`);
                        setSearchQuery('');
                        setIsSearchFocused(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b last:border-none"
                    >
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Dumbbell className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{ex.name}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Target className="w-3 h-3" />
                            {ex.target} • {ex.sets}×{ex.reps}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-center text-sm text-gray-500 py-6">
                    No exercises found
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <MobileHamburgerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </div>
  );
}
