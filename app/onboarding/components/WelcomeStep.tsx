"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, Upload, Linkedin, UserCircle, Briefcase, Award } from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  const features = [
    {
      icon: Upload,
      title: "CV Upload",
      description: "Upload your CV and we'll automatically extract your details",
    },
    {
      icon: Linkedin,
      title: "LinkedIn Integration",
      description: "Connect your LinkedIn to import professional experience",
    },
    {
      icon: UserCircle,
      title: "Complete Profile",
      description: "Build a comprehensive profile for better job matches",
    },
    {
      icon: Briefcase,
      title: "Career Goals",
      description: "Tell us about your aspirations and preferences",
    },
  ];

  return (
    <Card className="border-none shadow-2xl">
      <CardContent className="p-12">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-sky-500 rounded-full mb-6"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-slate-900 mb-4"
          >
            Welcome to CDC Portal! 
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Let's set up your profile in just a few minutes. We'll help you get started by importing data from your CV and LinkedIn.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
            >
              <Card className="border-2 border-slate-200 hover:border-blue-300 transition-colors">
                <CardContent className="p-6">
                  <feature.icon className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Button
            onClick={onNext}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white px-12"
          >
            Get Started
          </Button>
          <p className="text-sm text-slate-500 mt-4">Takes about 5-10 minutes</p>
        </motion.div>
      </CardContent>
    </Card>
  );
}

