"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeStep from "./components/WelcomeStep";
import CVUploadStep from "./components/CVUploadStep";
import LinkedInStep from "./components/LinkedInStep";
import PersonalInfoStep from "./components/PersonalInfoStep";
import AcademicInfoStep from "./components/AcademicInfoStep";
import ProfessionalExperienceStep from "./components/ProfessionalExperienceStep";
import SkillsStep from "./components/SkillsStep";
import CertificationsStep from "./components/CertificationsStep";
import CareerGoalsStep from "./components/CareerGoalsStep";
import PreferencesStep from "./components/PreferencesStep";
import CompletionStep from "./components/CompletionStep";

export interface OnboardingData {
  // CV Upload
  cvFile?: File;
  cvParsedData?: any;
  
  // LinkedIn
  linkedInConnected?: boolean;
  linkedInData?: any;
  
  // Personal Info
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
    twitter?: string;
  };
  
  // Academic Info
  academicInfo: {
    program: string;
    batch: string;
    cgpa: string;
    major: string;
    minor?: string;
    expectedGraduation: string;
    previousEducation: Array<{
      degree: string;
      institution: string;
      year: string;
      percentage: string;
    }>;
  };
  
  // Professional Experience
  professionalExperience: Array<{
    company: string;
    role: string;
    type: string;
    duration: string;
    location: string;
    description: string;
  }>;
  
  // Skills
  skills: {
    technical: string[];
    soft: string[];
    languages: Array<{ name: string; proficiency: string }>;
    tools: string[];
  };
  
  // Certifications
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
  }>;
  
  // Career Goals
  careerGoals: {
    shortTerm: string;
    longTerm: string;
    industries: string[];
    roles: string[];
    locations: string[];
    workMode: string;
  };
  
  // Preferences
  preferences: {
    jobAlerts: boolean;
    newsletter: boolean;
    mentorship: boolean;
    privacy: string;
  };
}

const steps = [
  { id: 0, name: "Welcome", component: WelcomeStep },
  { id: 1, name: "CV Upload", component: CVUploadStep },
  { id: 2, name: "LinkedIn", component: LinkedInStep },
  { id: 3, name: "Personal Info", component: PersonalInfoStep },
  { id: 4, name: "Academic Info", component: AcademicInfoStep },
  { id: 5, name: "Experience", component: ProfessionalExperienceStep },
  { id: 6, name: "Skills", component: SkillsStep },
  { id: 7, name: "Certifications", component: CertificationsStep },
  { id: 8, name: "Career Goals", component: CareerGoalsStep },
  { id: 9, name: "Preferences", component: PreferencesStep },
  { id: 10, name: "Complete", component: CompletionStep },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
    academicInfo: {
      program: "",
      batch: "",
      cgpa: "",
      major: "",
      expectedGraduation: "",
      previousEducation: [],
    },
    professionalExperience: [],
    skills: {
      technical: [],
      soft: [],
      languages: [],
      tools: [],
    },
    certifications: [],
    careerGoals: {
      shortTerm: "",
      longTerm: "",
      industries: [],
      roles: [],
      locations: [],
      workMode: "hybrid",
    },
    preferences: {
      jobAlerts: true,
      newsletter: true,
      mentorship: false,
      privacy: "public",
    },
  });

  const handleNext = (stepData?: Partial<OnboardingData>) => {
    if (stepData) {
      setOnboardingData((prev) => ({
        ...prev,
        ...stepData,
      }));
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSkip = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-tr from-blue-600 via-blue-500 to-sky-500 blur-[140px]" />
        <div className="absolute top-24 right-0 w-[28rem] h-[28rem] bg-gradient-to-br from-sky-400 via-blue-600 to-blue-700 blur-[180px]" />
        <div className="absolute -bottom-32 left-1/3 w-[36rem] h-[36rem] bg-gradient-to-tr from-blue-500 via-sky-400 to-blue-600 blur-[220px]" />
      </div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.35)_1px,_transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-sky-500 shadow-[0_0_12px_rgba(37,99,235,0.8)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-10 pt-16">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-3xl p-6 shadow-2xl shadow-blue-900/30"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="text-left flex-1">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-200 mb-2">CDC Portal Onboarding</p>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Welcome to your personalized career cockpit
                </h1>
                <p className="text-slate-200 max-w-2xl text-sm">
                  Upload your credentials, connect your professional identity, and unlock tailored opportunities curated just for you.
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-3 text-white shadow-lg shadow-blue-900/20">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-slate-200">Completion</p>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold">{Math.round(progress)}%</span>
                    <span className="text-slate-300 text-sm">ready</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-600 to-sky-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-2.5 text-slate-100 text-xs backdrop-blur-3xl">
                  <p className="font-semibold text-sm">Estimated time: 7 mins</p>
                  <p className="text-slate-300">Auto-fills using CV + LinkedIn</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stat Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid md:grid-cols-3 gap-4"
          >
            {[
              { title: "Smart Imports", desc: "CV + LinkedIn parser", icon: "📂" },
              { title: "AI Suggestions", desc: "Profile enhancement tips", icon: "✨" },
              { title: "One-time setup", desc: "Reusable across modules", icon: "🔁" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur-3xl shadow-lg shadow-blue-900/20"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-slate-200">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Step Indicator */}
          {currentStep > 0 && currentStep < steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-200">
                    Step {currentStep} of {steps.length - 2}
                  </p>
                  <h2 className="text-2xl font-bold text-white">
                    {steps[currentStep].name}
                  </h2>
                </div>
                <div className="text-sm font-medium text-sky-200">
                  {Math.round(progress)}% Complete
                </div>
              </div>
              
              {/* Step Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-600/60 scrollbar-track-transparent">
                {steps.slice(1, -1).map((step, idx) => (
                  <div
                    key={step.id}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      idx + 1 < currentStep
                        ? "bg-green-100 text-green-700"
                        : idx + 1 === currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {step.name}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentStepComponent
              data={onboardingData}
              onNext={handleNext}
              onBack={handleBack}
              onSkip={handleSkip}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      </div>
    </div>
  );
}

