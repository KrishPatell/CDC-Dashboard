"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const steps = [
  { id: 1, title: "Your details", description: "Please provide your name and email" },
  { id: 2, title: "Choose a password", description: "Choose a secure password" },
  { id: 3, title: "Invite your team", description: "Start collaborating with your team" },
  { id: 4, title: "Add your socials", description: "Share posts to your social accounts" },
];

export default function SignupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    teamMembers: "",
    twitter: "",
    linkedin: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors = { email: "", password: "", confirmPassword: "" };
    let isValid = true;

    if (!formData.firstName || !formData.lastName) {
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep2 = () => {
    const newErrors = { email: "", password: "", confirmPassword: "" };
    let isValid = true;

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleContinue = () => {
    // Save signup data and redirect to onboarding
    localStorage.setItem("userEmail", formData.email);
    localStorage.setItem("userName", `${formData.firstName} ${formData.lastName}`);
    localStorage.removeItem("onboardingCompleted"); // Ensure onboarding runs
    router.push("/onboarding");
  };

  const progress = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Left Sidebar */}
      <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col text-white relative z-10">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
            <h1 className="text-2xl font-bold">CDC Portal</h1>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 mt-1">
                  {currentStep > step.id ? (
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    </div>
                  ) : currentStep === step.id ? (
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <Circle className="w-5 h-5 text-blue-600 fill-blue-600" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-white/40 flex items-center justify-center">
                      <Circle className="w-5 h-5 text-white/40" />
                    </div>
                  )}
                </div>
                <div className={currentStep >= step.id ? "opacity-100" : "opacity-50"}>
                  <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                  <p className="text-sm text-white/80">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <p className="text-sm text-white/60">© CDC Portal 2077</p>
          <p className="text-sm text-white/60">help@cdcportal.com</p>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex gap-2 mb-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    step <= currentStep ? "bg-gradient-to-r from-blue-600 to-sky-500" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-none shadow-xl bg-white">
              <CardContent className="p-8">
                {/* Step 1: Your Details */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">Your details</h2>
                      <p className="text-slate-600">Please provide your name and email</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="mb-2 block">First name</Label>
                        <Input
                          id="firstName"
                          className=""
                          value={formData.firstName}
                          onChange={(e) => updateField("firstName", e.target.value)}
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="mb-2 block">Last name</Label>
                        <Input
                          id="lastName"
                          className=""
                          value={formData.lastName}
                          onChange={(e) => updateField("lastName", e.target.value)}
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="mb-2 block">Email address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          className="pl-10"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <Button
                      onClick={handleNext}
                      className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600"
                      size="lg"
                    >
                      Continue
                    </Button>

                    <p className="text-center text-sm text-slate-600">
                      Already have an account?{" "}
                      <Link href="/auth/login" className="text-blue-600 hover:underline font-semibold">
                        Log in
                      </Link>
                    </p>
                  </div>
                )}

                {/* Step 2: Choose Password */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">Choose a password</h2>
                      <p className="text-slate-600">Must be at least 8 characters</p>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <Label htmlFor="password" className="mb-2 block">Choose a password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                            value={formData.password}
                            onChange={(e) => updateField("password", e.target.value)}
                            placeholder="Enter password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword" className="mb-2 block">Confirm password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                            value={formData.confirmPassword}
                            onChange={(e) => updateField("confirmPassword", e.target.value)}
                            placeholder="Re-enter password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleBack}
                        variant="outline"
                        className="flex-1"
                        size="lg"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleNext}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600"
                        size="lg"
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Invite Team */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">👥</span>
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">Invite your team</h2>
                      <p className="text-slate-600">Start collaborating with your team</p>
                    </div>

                    <div>
                      <Label htmlFor="teamMembers" className="mb-2 block">Email addresses</Label>
                      <Input
                        id="teamMembers"
                        value={formData.teamMembers}
                        onChange={(e) => updateField("teamMembers", e.target.value)}
                        placeholder="colleague@example.com, friend@example.com"
                      />
                      <p className="text-xs text-slate-500 mt-1">Separate multiple emails with commas</p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleBack}
                        variant="outline"
                        className="flex-1"
                        size="lg"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleNext}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600"
                        size="lg"
                      >
                        Continue
                      </Button>
                    </div>

                    <Button
                      onClick={handleNext}
                      variant="ghost"
                      className="w-full"
                    >
                      Skip for now
                    </Button>
                  </div>
                )}

                {/* Step 4: Add Socials */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🔗</span>
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">Add your socials</h2>
                      <p className="text-slate-600">Connect your social media accounts</p>
                    </div>

                    <div>
                      <Label htmlFor="linkedin" className="mb-2 block">LinkedIn Profile</Label>
                      <Input
                        id="linkedin"
                        value={formData.linkedin}
                        onChange={(e) => updateField("linkedin", e.target.value)}
                        placeholder="linkedin.com/in/yourprofile"
                      />
                    </div>

                    <div>
                      <Label htmlFor="twitter" className="mb-2 block">Twitter Handle</Label>
                      <Input
                        id="twitter"
                        value={formData.twitter}
                        onChange={(e) => updateField("twitter", e.target.value)}
                        placeholder="@yourhandle"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleBack}
                        variant="outline"
                        className="flex-1"
                        size="lg"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleContinue}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600"
                        size="lg"
                      >
                        Get Started
                      </Button>
                    </div>

                    <Button
                      onClick={handleContinue}
                      variant="ghost"
                      className="w-full"
                    >
                      Skip for now
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

