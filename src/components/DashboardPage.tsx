import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Progress } from './ui/progress';
import {
  Home,
  Dumbbell,
  TrendingUp,
  User,
  LogOut,
  Utensils,
  Play,
  Flame,
  Calendar,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import MobileHeader from './MobileHeader';
import MobileBottomNav from './MobileBottomNav';

export default function DashboardPage() {
  const userName = 'Alex';
  const currentTime = new Date().getHours();
  const greeting =
    currentTime < 12
      ? 'Good Morning'
      : currentTime < 18
      ? 'Good Afternoon'
      : 'Good Evening';

  const todayMeals = [
    {
      name: 'Paneer Bhurji + Roti',
      time: 'Breakfast',
      protein: '25g',
      completed: true,
    },
    {
      name: 'Grilled Chicken + Rice',
      time: 'Lunch',
      protein: '25g',
      completed: true,
    },
    {
      name: 'Moong Dal Chilla',
      time: 'Snack',
      protein: '25g',
      completed: false,
    },
    {
      name: 'Fish Curry + Chapati',
      time: 'Dinner',
      protein: '25g',
      completed: false,
    },
  ];

  const proteinConsumed = 50;
  const proteinGoal = 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Mobile Header */}
      <div className="md:hidden sticky top-0 z-40">
        <MobileHeader showSearch={false} />
      </div>

      {/* 🔹 Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden md:block fixed left-0 top-0 h-full w-64 bg-white border-r shadow-sm z-30">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg" />
            <span className="text-xl font-bold">M2Fitnes</span>
          </div>
          <nav className="space-y-2">
            <Link to="/dashboard">
              <Button variant="secondary" className="w-full justify-start">
                <Home className="w-5 h-5 mr-3" />
                Home
              </Button>
            </Link>
            <Link to="/workouts">
              <Button variant="ghost" className="w-full justify-start">
                <Dumbbell className="w-5 h-5 mr-3" />
                Workouts
              </Button>
            </Link>
            <Link to="/diet/new-plan">
              <Button variant="ghost" className="w-full justify-start">
                <Utensils className="w-5 h-5 mr-3" />
                Diet Plans
              </Button>
            </Link>
            <Link to="/progress">
              <Button variant="ghost" className="w-full justify-start">
                <TrendingUp className="w-5 h-5 mr-3" />
                Progress
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" className="w-full justify-start">
                <User className="w-5 h-5 mr-3" />
                Profile
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </Button>
            </Link>
          </nav>
        </div>
      </aside>

      {/* 🔹 Main Content */}
      <div
        className="
          pt-4 pb-20
          px-4 sm:px-6 lg:px-8
          md:ml-64           /* space for sidebar on desktop */
        "
      >
        {/* Header / Greeting */}
        <div className="mb-6 sm:mb-8 mt-2 md:mt-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 font-bold">
            {greeting}, {userName}!
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-gray-600">
            Ready to crush your goals today?
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-blue-100 mb-1">
                    Current Streak
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold">3 Days</p>
                </div>
                <Flame className="w-10 h-10 sm:w-12 sm:h-12 text-orange-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-orange-100 mb-1">
                    Calories Burned
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold">1,240</p>
                </div>
                <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-green-100 mb-1">
                    Workouts Done
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold">12</p>
                </div>
                <Award className="w-10 h-10 sm:w-12 sm:h-12 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column (2/3 on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Workout */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg sm:text-xl">
                  Today&apos;s Workout
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Full Body Strength Training
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                  <div className="flex-shrink-0 mx-auto md:mx-0">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1669807164466-10a6584a067e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nJTIwZ3ltfGVufDF8fHx8MTc2MTI2ODYzM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Workout"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          45 min
                        </span>
                        <span>Intermediate</span>
                        <span>8 Exercises</span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700">
                        A comprehensive full-body workout focusing on compound
                        movements for maximum strength gains.
                      </p>
                      <Link to="/workout/1">
                        <Button className="mt-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                          <Play className="w-4 h-4 mr-2" />
                          Start Workout
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Diet */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg sm:text-xl">
                      Today&apos;s Diet
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      High-Protein Meal Plan
                    </CardDescription>
                  </div>
                  <Link to="/diet/plan">
                    <Button variant="outline" size="sm">
                      View Full Plan
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Protein Progress */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs sm:text-sm">Daily Protein</span>
                      <span className="text-xs sm:text-sm font-semibold">
                        {proteinConsumed}g / {proteinGoal}g
                      </span>
                    </div>
                    <Progress
                      value={(proteinConsumed / proteinGoal) * 100}
                      className="h-2.5 sm:h-3"
                    />
                  </div>

                  {/* Meals */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {todayMeals.map((meal, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border-2 ${
                          meal.completed
                            ? 'bg-green-50 border-green-200'
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <p className="text-xs sm:text-sm font-semibold">
                              {meal.time}
                            </p>
                            <p className="text-xs text-gray-600">
                              {meal.name}
                            </p>
                          </div>
                          {meal.completed && (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <p className="text-[11px] sm:text-xs text-gray-500">
                          {meal.protein} protein
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/workouts">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-sm"
                  >
                    <Dumbbell className="w-5 h-5 mr-3" />
                    Explore Workouts
                  </Button>
                </Link>
                <Link to="/progress">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-sm"
                  >
                    <TrendingUp className="w-5 h-5 mr-3" />
                    View Progress
                  </Button>
                </Link>
                <Link to="/diet/new-plan">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-sm"
                  >
                    <Utensils className="w-5 h-5 mr-3" />
                    Diet Plans
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-semibold">
                      3-Day Streak!
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Keep it up!
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-semibold">
                      Goal Crusher
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Completed 10 workouts
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 🔹 Mobile Bottom Nav */}
      <MobileBottomNav />
    </div>
  );
}
