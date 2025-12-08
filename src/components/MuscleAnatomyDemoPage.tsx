import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft, Dumbbell, Activity } from 'lucide-react';
import MuscleAnatomyViewer from './MuscleAnatomyViewer';
import MobileHeader from './MobileHeader';
import MobileBottomNav from './MobileBottomNav';

export default function MuscleAnatomyDemoPage() {
  const navigate = useNavigate();
  const [selectedExerciseId, setSelectedExerciseId] = useState('barbell-bench-press');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* ✅ Mobile: same top bar style as other pages */}
      <MobileHeader showSearch={false} />

      {/* ✅ Desktop header only */}
      <div className="hidden md:block bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div className="h-8 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-orange-600 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">
                    3D Muscle Anatomy
                  </h1>
                  <p className="text-xs text-gray-600">
                    Interactive Exercise Guide
                  </p>
                </div>
              </div>
            </div>
            <Button className="gap-2">
              <Dumbbell className="w-4 h-4" />
              Start Workout
            </Button>
          </div>
        </div>
      </div>

      <main className="max-w-5xl md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 md:pt-8 pb-24">
        {/* ✅ Mobile secondary header (like Community page) */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 -ml-2 px-2 py-1 rounded-full hover:bg-gray-100 active:bg-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
          <h1 className="text-base font-bold">Muscle Anatomy</h1>
          <div className="w-10" /> {/* spacer */}
        </div>

        {/* Hero section – responsive sizes */}
        <section className="text-center mb-8 md:mb-12">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl mb-3 md:mb-4 leading-tight font-bold"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
              Interactive 3D Muscle Anatomy
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore every muscle group with our realistic 3D rotating anatomy viewer.
            Select any exercise to see exactly which muscles you're targeting.
          </p>
        </section>

        {/* 3D Viewer */}
        <MuscleAnatomyViewer
          selectedExerciseId={selectedExerciseId}
          onExerciseChange={setSelectedExerciseId}
        />

        {/* Educational Content */}
        <section className="mt-10 md:mt-16 grid md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-blue-100">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
              <span className="text-xl md:text-2xl">🎯</span>
            </div>
            <h3 className="text-lg md:text-xl mb-2 md:mb-3 font-bold">
              Targeted Training
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Understand exactly which muscles each exercise works to optimize your
              training program and achieve better results.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-orange-100">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4">
              <span className="text-xl md:text-2xl">🔄</span>
            </div>
            <h3 className="text-lg md:text-xl mb-2 md:mb-3 font-bold">
              360° Rotation
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              View the human anatomy from every angle with smooth drag-to-rotate
              interaction and precise angle control.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-purple-100">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
              <span className="text-xl md:text-2xl">📚</span>
            </div>
            <h3 className="text-lg md:text-xl mb-2 md:mb-3 font-bold">
              Exercise Database
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Access our comprehensive database of 30+ exercises across all major
              muscle groups with detailed muscle mapping.
            </p>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="mt-10 md:mt-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-10 text-white">
          <h3 className="text-2xl md:text-3xl mb-6 text-center font-bold">
            Technical Specifications
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl mb-1 md:mb-2 font-bold">24</p>
              <p className="text-gray-300 text-sm md:text-base">Rotation Angles</p>
              <p className="text-[11px] md:text-xs text-gray-500 mt-1">
                15° increments
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl mb-1 md:mb-2 font-bold">30+</p>
              <p className="text-gray-300 text-sm md:text-base">Exercises</p>
              <p className="text-[11px] md:text-xs text-gray-500 mt-1">
                All major groups
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl mb-1 md:mb-2 font-bold">2</p>
              <p className="text-gray-300 text-sm md:text-base">View Modes</p>
              <p className="text-[11px] md:text-xs text-gray-500 mt-1">
                Front &amp; Back
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl mb-1 md:mb-2 font-bold">3</p>
              <p className="text-gray-300 text-sm md:text-base">Muscle Types</p>
              <p className="text-[11px] md:text-xs text-gray-500 mt-1">
                Primary, Secondary, Stabilizer
              </p>
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className="mt-10 md:mt-16 bg-white rounded-2xl p-8 md:p-10 shadow-xl border-2 border-gray-100">
          <h3 className="text-2xl md:text-3xl mb-6 md:mb-8 text-center font-bold">
            How to Use the Viewer
          </h3>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-5 md:space-y-6">
              {[
                {
                  n: 1,
                  title: 'Select an Exercise',
                  text: 'Choose from our comprehensive exercise database or browse by muscle group category.',
                },
                {
                  n: 2,
                  title: 'Rotate the Model',
                  text: 'Drag left or right to rotate 360°, or use the slider for precise angle control.',
                },
                {
                  n: 3,
                  title: 'Toggle Views',
                  text: 'Switch between Front and Back views to see all targeted muscle groups from every angle.',
                },
              ].map((step) => (
                <div key={step.n} className="flex gap-4">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold">
                    {step.n}
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg mb-1 md:mb-2 font-bold">
                      {step.title}
                    </h4>
                    <p className="text-sm md:text-base text-gray-600">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-5 md:space-y-6">
              {[
                {
                  n: 4,
                  title: 'Hover Over Muscles',
                  text: 'Hover over highlighted muscle areas to see related exercises that target the same muscles.',
                },
                {
                  n: 5,
                  title: 'Study Muscle Groups',
                  text: 'Review the color-coded muscle breakdown: Red (Primary), Orange (Secondary), Yellow (Stabilizer).',
                },
                {
                  n: 6,
                  title: 'Plan Your Workout',
                  text: 'Use the muscle knowledge to create balanced workout programs that target all desired areas.',
                },
              ].map((step) => (
                <div key={step.n} className="flex gap-4">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 font-bold">
                    {step.n}
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg mb-1 md:mb-2 font-bold">
                      {step.title}
                    </h4>
                    <p className="text-sm md:text-base text-gray-600">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-orange-600 py-10 md:py-16 mt-10 md:mt-16 rounded-2xl text-center text-white">
          <h2 className="text-2xl md:text-4xl mb-3 md:mb-4 font-bold">
            Ready to Start Training?
          </h2>
          <p className="text-sm md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto">
            Use your new anatomy knowledge to build the perfect workout plan.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => navigate('/workout-plans')}
            >
              <Dumbbell className="w-5 h-5 mr-2" />
              Browse Workout Plans
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
          </div>
        </section>
      </main>

      {/* ✅ Mobile bottom nav (unchanged) */}
      <MobileBottomNav />
    </div>
  );
}
