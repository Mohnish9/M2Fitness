// src/components/MuscleAnatomyViewer.tsx
import {
  useState,
  useRef,
  useEffect,
  type MouseEvent,
  type TouchEvent,
} from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import {
  RotateCw,
  Info,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import {
  exerciseDatabase,
  getRelatedExercisesByMuscle,
} from '../utils/exerciseMuscleDatabase';
import exampleImage from 'figma:asset/a72ea76144d069fc56114a7b235b3879b3e8b2c2.png';
import benchPressImage from 'figma:asset/9d594596acf29cebe918f79a6f54d011a4733fae.png';
import squatsImage from 'figma:asset/d54784bf34f25c7157617145c68dcdf6d2d7b53e.png';
import deadliftImage from 'figma:asset/a40bc557e9d2b6876b6cea64d4e50d89108e2b58.png';

interface MuscleAnatomyViewerProps {
  selectedExerciseId?: string;
  onExerciseChange?: (exerciseId: string) => void;
}

export default function MuscleAnatomyViewer({
  selectedExerciseId = 'barbell-bench-press',
  onExerciseChange,
}: MuscleAnatomyViewerProps) {
  const [viewMode, setViewMode] = useState<'front' | 'back'>('front');
  const [rotationAngle, setRotationAngle] = useState(0); // 0-345
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredMuscle, setHoveredMuscle] = useState<string | null>(null);
  const dragStartX = useRef(0);
  const dragStartAngle = useRef(0);
  const viewerRef = useRef<HTMLDivElement | null>(null);

  const currentExercise =
    exerciseDatabase.find((ex) => ex.id === selectedExerciseId) ||
    exerciseDatabase[0];

  const getAnatomyImage = () => {
    const exerciseId = currentExercise.id;
    const exerciseNameLower = currentExercise.name.toLowerCase();

    if (
      exerciseId === 'barbell-bench-press' ||
      exerciseNameLower.includes('bench press')
    ) {
      return benchPressImage;
    } else if (
      exerciseId === 'squat' ||
      exerciseNameLower.includes('squat')
    ) {
      return squatsImage;
    } else if (
      exerciseId === 'deadlift' ||
      exerciseNameLower.includes('deadlift')
    ) {
      return deadliftImage;
    }

    return exampleImage;
  };

  useEffect(() => {
    setViewMode(currentExercise.defaultView);
  }, [currentExercise.defaultView]);

  // --- rotation helpers ---
  const applyDeltaToAngle = (deltaX: number) => {
    const rotationSpeed = 0.5; // deg per px
    let newAngle = dragStartAngle.current + deltaX * rotationSpeed;
    newAngle = ((newAngle % 360) + 360) % 360;
    const snapped = Math.round(newAngle / 15) * 15;
    setRotationAngle(snapped % 360);
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartAngle.current = rotationAngle;
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    applyDeltaToAngle(deltaX);
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setIsDragging(true);
    dragStartX.current = touch.clientX;
    dragStartAngle.current = rotationAngle;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStartX.current;
    applyDeltaToAngle(deltaX);
  };

  const rotateForward = () => {
    setRotationAngle((prev) => (prev + 15) % 360);
  };

  const rotateBackward = () => {
    setRotationAngle((prev) => (prev - 15 + 360) % 360);
  };

  const getDisplayRotation = () =>
    viewMode === 'back' ? rotationAngle + 180 : rotationAngle;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] gap-6 md:gap-8">
        {/* LEFT: viewer */}
        <Card className="bg-white shadow-xl border-2 border-gray-100">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h2
                  className="text-lg sm:text-2xl mb-1 sm:mb-2"
                  style={{ fontWeight: 700 }}
                >
                  <span className="bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                    Muscle Anatomy
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Interactive 360° Rotation
                </p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Information"
                    >
                      <Info className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Drag or swipe to rotate • Tap Front / Back to switch view</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Viewer */}
            <div
              ref={viewerRef}
              className="relative bg-white border-2 border-gray-200 rounded-xl overflow-hidden mb-4 sm:mb-6"
              style={{
                height: '320px',
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={endDrag}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
                <div
                  className="relative transition-transform duration-300 ease-out"
                  style={{
                    transform: `rotateY(${getDisplayRotation()}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <img
                    src={getAnatomyImage()}
                    alt={`${currentExercise.name} - Muscle Anatomy`}
                    className="w-auto h-[260px] sm:h-[300px] md:h-[340px] object-contain pointer-events-none select-none"
                    draggable={false}
                    style={{
                      filter: 'contrast(1.1) brightness(1.05)',
                    }}
                  />

                  {/* Highlights */}
                  {currentExercise.muscles.map((muscle, index) => {
                    const muscleLower = muscle.name.toLowerCase();
                    const getHighlightPosition = () => {
                      if (viewMode === 'front') {
                        if (
                          muscleLower.includes('chest') ||
                          muscleLower.includes('pectoral')
                        ) {
                          return {
                            top: '30%',
                            left: '50%',
                            width: '40%',
                            height: '25%',
                          };
                        }
                        if (muscleLower.includes('bicep')) {
                          return {
                            top: '35%',
                            left: '25%',
                            width: '15%',
                            height: '20%',
                          };
                        }
                        if (
                          muscleLower.includes('shoulder') ||
                          muscleLower.includes('deltoid')
                        ) {
                          return {
                            top: '25%',
                            left: '50%',
                            width: '50%',
                            height: '20%',
                          };
                        }
                        if (
                          muscleLower.includes('abs') ||
                          muscleLower.includes('core') ||
                          muscleLower.includes('rectus')
                        ) {
                          return {
                            top: '45%',
                            left: '50%',
                            width: '30%',
                            height: '30%',
                          };
                        }
                        if (muscleLower.includes('quad')) {
                          return {
                            top: '60%',
                            left: '50%',
                            width: '35%',
                            height: '30%',
                          };
                        }
                        if (muscleLower.includes('oblique')) {
                          return {
                            top: '45%',
                            left: '50%',
                            width: '40%',
                            height: '25%',
                          };
                        }
                      } else {
                        if (
                          muscleLower.includes('lat') ||
                          muscleLower.includes('back')
                        ) {
                          return {
                            top: '30%',
                            left: '50%',
                            width: '45%',
                            height: '35%',
                          };
                        }
                        if (muscleLower.includes('tricep')) {
                          return {
                            top: '35%',
                            left: '75%',
                            width: '15%',
                            height: '20%',
                          };
                        }
                        if (muscleLower.includes('glute')) {
                          return {
                            top: '50%',
                            left: '50%',
                            width: '35%',
                            height: '20%',
                          };
                        }
                        if (muscleLower.includes('hamstring')) {
                          return {
                            top: '65%',
                            left: '50%',
                            width: '35%',
                            height: '25%',
                          };
                        }
                        if (
                          muscleLower.includes('calf') ||
                          muscleLower.includes('gastrocnemius')
                        ) {
                          return {
                            top: '75%',
                            left: '50%',
                            width: '25%',
                            height: '15%',
                          };
                        }
                        if (
                          muscleLower.includes('trap') ||
                          muscleLower.includes('rhomboid')
                        ) {
                          return {
                            top: '25%',
                            left: '50%',
                            width: '40%',
                            height: '25%',
                          };
                        }
                      }
                      return {
                        top: '40%',
                        left: '50%',
                        width: '45%',
                        height: '40%',
                      };
                    };

                    const position = getHighlightPosition();

                    return (
                      <div
                        key={`${currentExercise.id}-${muscle.name}-${index}`}
                        className="absolute transition-all duration-300"
                        onMouseEnter={() => setHoveredMuscle(muscle.name)}
                        onMouseLeave={() => setHoveredMuscle(null)}
                        style={{
                          top: position.top,
                          left: position.left,
                          width: position.width,
                          height: position.height,
                          transform: 'translate(-50%, -50%)',
                          background: `radial-gradient(ellipse at center, ${muscle.color}60 0%, ${muscle.color}30 40%, transparent 70%)`,
                          opacity: 0.7,
                          borderRadius: '50%',
                          pointerEvents: 'auto',
                        }}
                      />
                    );
                  })}
                </div>

                {/* Angle indicator */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white px-3 py-1.5 rounded-lg shadow-md border border-gray-200">
                  <span
                    className="text-xs text-gray-600"
                    style={{ fontWeight: 600 }}
                  >
                    {rotationAngle}°
                  </span>
                </div>

                {/* View mode */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                  <Badge className="text-[11px] sm:text-xs px-2.5 py-1 bg-white border border-gray-200 shadow-md">
                    {viewMode === 'front' ? '👤 Front' : '🔄 Back'}
                  </Badge>
                </div>

                {/* Hover tooltip */}
                {hoveredMuscle && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl max-w-xs text-center">
                    <p className="text-xs" style={{ fontWeight: 600 }}>
                      {hoveredMuscle}
                    </p>
                  </div>
                )}
              </div>

              {/* Rotate buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 shadow-md rounded-full w-9 h-9 sm:w-10 sm:h-10 border border-gray-200"
                onClick={rotateBackward}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 shadow-md rounded-full w-9 h-9 sm:w-10 sm:h-10 border border-gray-200"
                onClick={rotateForward}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>

            {/* Controls */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex gap-2 sm:gap-3">
                <Button
                  variant={viewMode === 'front' ? 'default' : 'outline'}
                  className="flex-1 h-10 sm:h-12 text-xs sm:text-sm"
                  onClick={() => setViewMode('front')}
                >
                  Front View
                </Button>
                <Button
                  variant={viewMode === 'back' ? 'default' : 'outline'}
                  className="flex-1 h-10 sm:h-12 text-xs sm:text-sm"
                  onClick={() => setViewMode('back')}
                >
                  Back View
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 sm:h-12 sm:w-12"
                  onClick={() => setRotationAngle(0)}
                >
                  <RotateCw className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex justify-between items-center">
                  <span
                    className="text-xs sm:text-sm text-gray-600"
                    style={{ fontWeight: 600 }}
                  >
                    Rotation Angle
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {rotationAngle}°
                  </span>
                </div>
                <Slider
                  value={[rotationAngle]}
                  onValueChange={(values) => setRotationAngle(values[0])}
                  max={345}
                  step={15}
                  className="w-full"
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500" />
                  <span
                    className="text-xs sm:text-sm text-gray-700"
                    style={{ fontWeight: 600 }}
                  >
                    Primary
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-orange-500" />
                  <span
                    className="text-xs sm:text-sm text-gray-700"
                    style={{ fontWeight: 600 }}
                  >
                    Secondary
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-500" />
                  <span
                    className="text-xs sm:text-sm text-gray-700"
                    style={{ fontWeight: 600 }}
                  >
                    Stabilizer
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT: info panel (unchanged layout, but responsive text) */}
        <div className="space-y-6">
          {/* Exercise Selector */}
          <Card className="bg-gradient-to-br from-blue-50 to-orange-50 border-2 border-blue-200">
            <CardContent className="p-4 sm:p-6">
              <label
                className="block text-xs sm:text-sm mb-2 sm:mb-3 text-gray-700"
                style={{ fontWeight: 600 }}
              >
                Select Exercise
              </label>
              <Select
                value={selectedExerciseId}
                onValueChange={(value) => onExerciseChange?.(value)}
              >
                <SelectTrigger className="w-full h-10 sm:h-12 bg-white text-xs sm:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {exerciseDatabase.map((exercise) => (
                    <SelectItem key={exercise.id} value={exercise.id}>
                      {exercise.name} ({exercise.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Current Exercise Details */}
          <Card className="shadow-lg border-2 border-gray-100">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div>
                  <Badge variant="secondary" className="mb-1 sm:mb-2 text-[11px] sm:text-xs">
                    {currentExercise.category}
                  </Badge>
                  <h3
                    className="text-lg sm:text-2xl mb-1 sm:mb-2"
                    style={{ fontWeight: 700 }}
                  >
                    {currentExercise.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {currentExercise.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
                <h4
                  className="text-base sm:text-lg"
                  style={{ fontWeight: 700 }}
                >
                  Targeted Muscles
                </h4>

                {/* Primary */}
                <div>
                  <p
                    className="text-xs sm:text-sm text-gray-600 mb-1.5 sm:mb-2"
                    style={{ fontWeight: 600 }}
                  >
                    🔴 Primary Muscles
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {currentExercise.muscles
                      .filter((m) => m.type === 'primary')
                      .map((muscle, index) => (
                        <Badge
                          key={index}
                          className="bg-red-100 text-red-700 hover:bg-red-200 px-2.5 py-0.5 text-[11px] sm:text-xs"
                        >
                          {muscle.name}
                        </Badge>
                      ))}
                  </div>
                </div>

                {/* Secondary */}
                {currentExercise.muscles.some((m) => m.type === 'secondary') && (
                  <div>
                    <p
                      className="text-xs sm:text-sm text-gray-600 mb-1.5 sm:mb-2"
                      style={{ fontWeight: 600 }}
                    >
                      🟠 Secondary Muscles
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {currentExercise.muscles
                        .filter((m) => m.type === 'secondary')
                        .map((muscle, index) => (
                          <Badge
                            key={index}
                            className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-2.5 py-0.5 text-[11px] sm:text-xs"
                          >
                            {muscle.name}
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}

                {/* Stabilizer */}
                {currentExercise.muscles.some((m) => m.type === 'stabilizer') && (
                  <div>
                    <p
                      className="text-xs sm:text-sm text-gray-600 mb-1.5 sm:mb-2"
                      style={{ fontWeight: 600 }}
                    >
                      🟡 Stabilizer Muscles
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {currentExercise.muscles
                        .filter((m) => m.type === 'stabilizer')
                        .map((muscle, index) => (
                          <Badge
                            key={index}
                            className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-2.5 py-0.5 text-[11px] sm:text-xs"
                          >
                            {muscle.name}
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips & Category cards – you can keep your originals here.
             If you want, I can also shrink those for mobile next. */}
        </div>
      </div>
    </div>
  );
}
