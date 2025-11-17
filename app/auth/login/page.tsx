"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const VALID_EMAIL = "krish.p4@ahduni.edu.in";
  const VALID_PASSWORD = "password123"; // You can set any password

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(""); // Clear error when user types
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate credentials
    if (formData.email === VALID_EMAIL && formData.password) {
      // Save login state
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userName", "Krish Patel");
      
      // Check if onboarding is completed
      const onboardingCompleted = localStorage.getItem("onboardingCompleted");
      
      if (onboardingCompleted === "true") {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Left Sidebar */}
      <div className="hidden md:flex w-2/5 p-12 flex-col justify-between text-white relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
            <h1 className="text-2xl font-bold">CDC Portal</h1>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Welcome back to your career journey
              </h2>
              <p className="text-lg text-white/80">
                Access your profile, track applications, and discover new opportunities.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span>📊</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Track Applications</h3>
                  <p className="text-sm text-white/70">Monitor your job applications with our intuitive Kanban board</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span>🤝</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Connect with Alumni</h3>
                  <p className="text-sm text-white/70">Network with professionals in your field</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span>🎯</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">AI Career Assistance</h3>
                  <p className="text-sm text-white/70">Get personalized guidance from our AI coach</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-white/60">© CDC Portal 2077</p>
          <p className="text-sm text-white/60">help@cdcportal.com</p>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-xl bg-white">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h2>
                <p className="text-slate-600">Please enter your details to sign in</p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6 flex items-start gap-2"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
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
                      placeholder="krish.p4@ahduni.edu.in"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="mb-2 block">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline font-semibold">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600"
                  size="lg"
                >
                  Sign in
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-500">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" variant="outline" className="w-full">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button type="button" variant="outline" className="w-full">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    GitHub
                  </Button>
                </div>

                <p className="text-center text-sm text-slate-600">
                  Don't have an account?{" "}
                  <Link href="/auth/signup" className="text-blue-600 hover:underline font-semibold">
                    Sign up
                  </Link>
                </p>
              </form>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-900">
                  <strong>Demo Account:</strong> Use <code className="bg-blue-100 px-1 py-0.5 rounded">krish.p4@ahduni.edu.in</code> with any password to login
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

