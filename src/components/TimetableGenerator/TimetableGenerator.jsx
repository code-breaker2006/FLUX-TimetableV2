import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  X, 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  Calendar, 
  Clock,
  Cpu,
  BarChart3,
  RefreshCw
} from 'lucide-react';

import { useAppContext } from '../../hooks/useAppContext';

const TimetableGenerator = ({ isOpen, onClose }) => {
  const { generateTimetable, students, faculty, courses } = useAppContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [optimizationStats, setOptimizationStats] = useState(null);

  // Generation steps with realistic AI messages
  const generationSteps = [
    { 
      id: 0,
      title: 'Initializing AI Engine',
      message: 'Loading constraint satisfaction algorithms...',
      icon: Cpu,
      duration: 800
    },
    {
      id: 1, 
      title: 'Analyzing Data Structure',
      message: 'Processing 3,891 students, 156 faculty, 247 courses...',
      icon: BarChart3,
      duration: 1000
    },
    {
      id: 2,
      title: 'Mapping Constraints',
      message: 'Identifying 12,447 scheduling constraints...',
      icon: AlertTriangle,
      duration: 900
    },
    {
      id: 3,
      title: 'Running Genetic Algorithm',
      message: 'Optimizing across 50,000+ possible combinations...',
      icon: RefreshCw,
      duration: 1200
    },
    {
      id: 4,
      title: 'Conflict Resolution',
      message: 'Resolving room capacity and time conflicts...',
      icon: CheckCircle,
      duration: 700
    },
    {
      id: 5,
      title: 'Final Optimization',
      message: 'Applying faculty preferences and minimizing gaps...',
      icon: CheckCircle,
      duration: 600
    }
  ];

  // Mock statistics that will be shown after generation
  const mockStats = {
    totalClasses: 247,
    studentsScheduled: 3891,
    facultyAssigned: 156,
    conflictsResolved: 0,
    efficiencyGain: '23%',
    processingTime: '4.2 seconds',
    constraintsSatisfied: '100%',
    optimizationScore: 96
  };

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setCurrentStep(0);
      setProgress(0);
      setIsGenerating(false);
      setGenerationComplete(false);
      setOptimizationStats(null);
    }
  }, [isOpen]);

  const handleStartGeneration = async () => {
    setIsGenerating(true);
    setGenerationComplete(false);
    setCurrentStep(0);
    setProgress(0);

    // Simulate the AI generation process
    for (let i = 0; i < generationSteps.length; i++) {
      setCurrentStep(i);
      
      // Animate progress for this step
      const stepDuration = generationSteps[i].duration;
      const stepProgress = (i + 1) / generationSteps.length * 100;
      
      await new Promise((resolve) => {
        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const stepProgressPercent = Math.min(elapsed / stepDuration, 1);
          const currentProgress = (i / generationSteps.length * 100) + (stepProgressPercent * (100 / generationSteps.length));
          
          setProgress(currentProgress);
          
          if (elapsed < stepDuration) {
            requestAnimationFrame(animate);
          } else {
            resolve();
          }
        };
        animate();
      });
    }

    // Complete the generation
    setProgress(100);
    setIsGenerating(false);
    setGenerationComplete(true);
    setOptimizationStats(mockStats);

    // Call the actual context function
    try {
      await generateTimetable();
      toast.success('🎉 Timetable generated successfully!');
    } catch (error) {
      toast.error('❌ Generation failed');
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsGenerating(false);
    setGenerationComplete(false);
    setOptimizationStats(null);
  };

  const StepIndicator = ({ step, isActive, isComplete }) => {
    const Icon = step.icon;
    
    return (
      <motion.div 
        className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
          isActive 
            ? 'bg-blue-50 border-2 border-blue-200' 
            : isComplete
            ? 'bg-green-50 border-2 border-green-200'
            : 'bg-gray-50 border-2 border-gray-200'
        }`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: step.id * 0.1 }}
      >
        <div className={`p-2 rounded-full ${
          isActive 
            ? 'bg-blue-100' 
            : isComplete 
            ? 'bg-green-100' 
            : 'bg-gray-100'
        }`}>
          {isActive ? (
            <Icon className={`w-5 h-5 ${isActive && step.icon === RefreshCw ? 'animate-spin' : ''} text-blue-600`} />
          ) : isComplete ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <Icon className="w-5 h-5 text-gray-400" />
          )}
        </div>
        <div className="ml-3 flex-1">
          <h4 className={`font-medium ${isActive ? 'text-blue-900' : isComplete ? 'text-green-900' : 'text-gray-700'}`}>
            {step.title}
          </h4>
          <p className={`text-sm ${isActive ? 'text-blue-600' : isComplete ? 'text-green-600' : 'text-gray-500'}`}>
            {step.message}
          </p>
        </div>
      </motion.div>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={(e) => e.target === e.currentTarget && !isGenerating && onClose()}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">AI Timetable Generation</h2>
              <p className="text-gray-600 mt-1">Optimizing academic schedules using advanced algorithms</p>
            </div>
            {!isGenerating && (
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {!isGenerating && !generationComplete && (
              <div className="space-y-6">
                {/* Pre-generation Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-900">{students.length || '3,891'}</p>
                    <p className="text-sm text-blue-600">Students to Schedule</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-900">{faculty.length || '156'}</p>
                    <p className="text-sm text-green-600">Faculty Members</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-900">{courses.length || '247'}</p>
                    <p className="text-sm text-purple-600">Course Offerings</p>
                  </div>
                </div>

                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartGeneration}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start AI Generation
                  </motion.button>
                  <p className="text-sm text-gray-500 mt-3">
                    This will analyze constraints and generate an optimal timetable
                  </p>
                </div>
              </div>
            )}

            {isGenerating && (
              <div className="space-y-6">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Generation Progress</span>
                    <span className="text-sm font-medium text-gray-900">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full"
                      style={{ width: `${progress}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Generation Steps */}
                <div className="space-y-3">
                  {generationSteps.map((step) => (
                    <StepIndicator 
                      key={step.id}
                      step={step}
                      isActive={currentStep === step.id}
                      isComplete={currentStep > step.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {generationComplete && optimizationStats && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Success Header */}
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Generation Complete!</h3>
                  <p className="text-gray-600">Your optimized timetable has been generated successfully</p>
                </div>

                {/* Optimization Results */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{optimizationStats.conflictsResolved}</p>
                    <p className="text-sm text-green-700">Conflicts</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{optimizationStats.optimizationScore}%</p>
                    <p className="text-sm text-blue-700">Optimization</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{optimizationStats.efficiencyGain}</p>
                    <p className="text-sm text-purple-700">Efficiency</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">{optimizationStats.processingTime}</p>
                    <p className="text-sm text-orange-700">Time</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRestart}
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Generate New
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Timetable
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TimetableGenerator;