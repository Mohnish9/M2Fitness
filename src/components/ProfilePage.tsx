import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  Home,
  Dumbbell,
  TrendingUp,
  User,
  LogOut,
  Utensils,
  Camera,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth, API_BASE } from '../utils/authContext';
import MobileHeader from './MobileHeader';
import MobileBottomNav from './MobileBottomNav';

export default function ProfilePage() {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    age: '28',
    weight: '75',
    height: '180',
    goal: 'Build Muscle',
  });

  // Load data from logged-in user
  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        age: user.age ? String(user.age) : prev.age,
        weight: user.weight_kg ? String(user.weight_kg) : prev.weight,
        height: user.height_cm ? String(user.height_cm) : prev.height,
        goal: user.goal || prev.goal,
      }));
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/profile/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: Number(profile.age) || null,
          weight_kg: Number(profile.weight) || null,
          height_cm: Number(profile.height) || null,
          goal: profile.goal || null,
        }),
      });

      if (!res.ok) {
        console.error('Failed to update profile');
        setSaving(false);
        setIsEditing(false);
        return;
      }

      const updatedUser = await res.json();
      setUser(updatedUser);
      localStorage.setItem('m2fitness_user', JSON.stringify(updatedUser));
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
    } finally {
      setSaving(false);
    }
  };

  const initials = profile.name
    ? profile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U';

  const memberSince = 'January 2025';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Mobile Header */}
      <div className="md:hidden sticky top-0 z-40">
        <MobileHeader showSearch={false} />
      </div>

      {/* 🔹 Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 h-full w-64 bg-white border-r shadow-sm z-30">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg" />
            <span className="text-xl font-bold">M2Fitnes</span>
          </div>
          <nav className="space-y-2">
            <Link to="/dashboard">
              <Button variant="ghost" className="w-full justify-start">
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
              <Button variant="secondary" className="w-full justify-start">
                <User className="w-5 h-5 mr-3" />
                Profile
              </Button>
            </Link>

            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </nav>
        </div>
      </aside>

      {/* 🔹 Main Content */}
      <div className="pt-4 pb-20 px-4 sm:px-6 lg:px-8 md:ml-64">
        <div className="max-w-4xl mx-auto">
          {/* Page header */}
          <div className="mb-6 sm:mb-8 mt-2 md:mt-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 font-bold">
              Profile Settings
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-gray-600">
              Manage your account information
            </p>
          </div>

          {/* Profile + Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="lg:col-span-1">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-orange-500 text-white text-3xl sm:text-4xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full w-9 h-9 sm:w-10 sm:h-10 p-0 bg-blue-500 hover:bg-blue-600"
                  >
                    <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
                <h2 className="text-xl sm:text-2xl mb-1 font-bold">
                  {profile.name || 'Your Name'}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-6">
                  {profile.email || 'your@email.com'}
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-600">Goal</p>
                    <p className="text-sm sm:text-base font-semibold">
                      {profile.goal}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-600">
                      Member Since
                    </p>
                    <p className="text-sm sm:text-base font-semibold">
                      {memberSince}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Details Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <CardTitle className="text-lg sm:text-xl">
                    Personal Information
                  </CardTitle>
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      size="sm"
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        size="sm"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        disabled={saving}
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                      >
                        {saving ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      value={profile.age}
                      onChange={(e) =>
                        setProfile({ ...profile, age: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      value={profile.weight}
                      onChange={(e) =>
                        setProfile({ ...profile, weight: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      value={profile.height}
                      onChange={(e) =>
                        setProfile({ ...profile, height: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal">Fitness Goal</Label>
                  <Input
                    id="goal"
                    value={profile.goal}
                    onChange={(e) =>
                      setProfile({ ...profile, goal: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  Account Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-sm">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  Privacy Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  Activity Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-600">Total Workouts</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="font-bold">3 days</span>
                </div>
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-600">Calories Burned</span>
                  <span className="font-bold">1,240</span>
                </div>
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-600">Badges Earned</span>
                  <span className="font-bold">3</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 🔹 Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
