"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Trophy, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CompletionStep() {
  const router = useRouter();

  const completionStats = [
    {
      icon: CheckCircle2,
      label: "Profile Completed",
      value: "100%",
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      icon: Sparkles,
      label: "Data Imported",
      value: "CV + LinkedIn",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: Trophy,
      label: "Profile Quality",
      value: "Excellent",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
  ];

  const handleGetStarted = () => {
    // Mark onboarding as completed
    localStorage.setItem("onboardingCompleted", "true");
    router.push("/dashboard");
  };

  return (
    <Card className="border-none shadow-2xl">
      <CardContent className="p-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6">
            <CheckCircle2 className="w-14 h-14 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            🎉 You're All Set!
          </h1>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Your profile has been successfully created! You're now ready to explore job opportunities, connect with alumni, and take the next step in your career journey.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {completionStats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
            >
              <Card className="border-2 border-slate-200">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.bg} rounded-full mb-3`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-8 mb-8"
        >
          <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Rocket className="w-6 h-6 text-blue-600" />
            What's Next?
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <p className="font-semibold text-slate-900">Browse Job Opportunities</p>
                <p className="text-sm text-slate-600">Discover roles that match your profile and preferences</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <p className="font-semibold text-slate-900">Connect with Alumni</p>
                <p className="text-sm text-slate-600">Network with professionals in your field of interest</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <p className="font-semibold text-slate-900">Track Applications</p>
                <p className="text-sm text-slate-600">Manage your job applications with our Kanban board</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div>
                <p className="font-semibold text-slate-900">Get AI Assistance</p>
                <p className="text-sm text-slate-600">Use our AI coach for personalized career guidance</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white px-12"
          >
            Go to Dashboard
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}

