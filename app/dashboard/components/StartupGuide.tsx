"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, CheckCircle2, Briefcase, Target, Users, Map, MessageSquare, FileCompare, FileText, Sparkles } from "lucide-react";

interface StartupGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const guideSteps = [
  {
    id: 1,
    title: "Welcome to CDC Platform! 👋",
    description: "Your personal career development dashboard. Let's get you started!",
    icon: Sparkles,
    content: "Explore your personalized dashboard with AI-powered role matching, application tracking, and career guidance.",
  },
  {
    id: 2,
    title: "My Fit Roles",
    description: "Discover roles matched to your profile",
    icon: Target,
    content: "View job opportunities tailored to your skills and experience. Each role shows your fit score and match percentage.",
  },
  {
    id: 3,
    title: "Application Tracker",
    description: "Manage your job applications with Kanban board",
    icon: Briefcase,
    content: "Drag and drop your applications between stages: Applied → Shortlist → Interview → Offer. Stay organized throughout your job search!",
  },
  {
    id: 4,
    title: "Weekly Roadmap",
    description: "AI-guided tasks to accelerate your career",
    icon: Map,
    content: "Complete personalized tasks weekly. Check off items as you go to track your progress toward career goals.",
  },
  {
    id: 5,
    title: "AI Suggestions",
    description: "Get personalized career advice",
    icon: Sparkles,
    content: "Receive rotating AI-powered suggestions to improve your resume, boost your skills, and enhance your job search strategy.",
  },
  {
    id: 6,
    title: "Connect with Alumni",
    description: "Build your professional network",
    icon: Users,
    content: "Request chats with alumni working at your dream companies. Get insider insights and valuable career advice.",
  },
  {
    id: 7,
    title: "You're all set! 🎉",
    description: "Ready to start your journey",
    icon: CheckCircle2,
    content: "Remember: Apply to jobs, track your progress, complete weekly tasks, and connect with the community. Good luck with your applications!",
  },
];

export default function StartupGuide({ isOpen, onClose }: StartupGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    // Check if this is the user's first visit
    const hasVisited = localStorage.getItem("hasVisitedDashboard");
    if (!hasVisited && isOpen) {
      setIsFirstVisit(true);
    }
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    localStorage.setItem("hasVisitedDashboard", "true");
    onClose();
  };

  const handleSkip = () => {
    localStorage.setItem("hasVisitedDashboard", "true");
    onClose();
  };

  const currentGuide = guideSteps[currentStep];
  const IconComponent = currentGuide.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleSkip}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={handleSkip}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-slate-600" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / guideSteps.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
              />
            </div>

            {/* Content */}
            <CardHeader className="pt-12 pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="h-16 w-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center mb-2">
                {currentGuide.title}
              </CardTitle>
              <p className="text-slate-600 text-center">
                {currentGuide.description}
              </p>
            </CardHeader>

            <CardContent className="pb-6">
              <div className="mb-6 min-h-[100px]">
                <motion.p
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-slate-700 text-center leading-relaxed"
                >
                  {currentGuide.content}
                </motion.p>
              </div>

              {/* Step Indicators */}
              <div className="flex justify-center gap-2 mb-6">
                {guideSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentStep
                        ? "w-8 bg-blue-600"
                        : "w-2 bg-slate-300"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="flex-1"
                  >
                    Previous
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {currentStep === guideSteps.length - 1 ? "Get Started!" : (
                    <>
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>

              {isFirstVisit && (
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="w-full mt-3 text-slate-500 text-sm"
                >
                  Skip for now
                </Button>
              )}
            </CardContent>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

