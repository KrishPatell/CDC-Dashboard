"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Linkedin, CheckCircle2, Loader2, TrendingUp, AlertTriangle, Sparkles } from "lucide-react";
import type { OnboardingData } from "../page";

interface LinkedInStepProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  onSkip: () => void;
}

export default function LinkedInStep({ data, onNext, onBack, onSkip }: LinkedInStepProps) {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [linkedInData, setLinkedInData] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleConnect = async () => {
    setConnecting(true);
    
    // Simulate LinkedIn OAuth and data fetch
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    // Mock LinkedIn data
    const mockLinkedInData = {
      name: data.personalInfo.name || "Priya Sharma",
      headline: "MBA Candidate | Business Analytics Enthusiast",
      location: "Mumbai, Maharashtra",
      connections: 487,
      experience: [
        {
          company: "Amazon",
          role: "Business Analyst Intern",
          duration: "Jun 2023 - Aug 2023",
          location: "Bangalore",
          description: "Worked on supply chain optimization and inventory management projects",
        },
        {
          company: "Flipkart",
          role: "Product Management Intern",
          duration: "Jan 2023 - May 2023",
          location: "Bangalore",
          description: "Assisted in product feature development and user research",
        },
      ],
      education: [
        {
          school: "Ahmedabad University",
          degree: "Master of Business Administration - MBA",
          field: "Business Analytics & Strategy",
          years: "2024 - 2026",
        },
        {
          school: "IIT Delhi",
          degree: "Bachelor of Technology - BTech",
          field: "Computer Science",
          years: "2020 - 2024",
        },
      ],
      skills: [
        "Data Analysis", "Python", "SQL", "Business Strategy", 
        "Market Research", "Financial Modeling", "Excel", "Tableau"
      ],
      certifications: [
        "Google Data Analytics Professional Certificate",
        "Financial Markets - Yale University",
      ],
    };

    // Generate suggestions based on comparing CV data with LinkedIn
    const mockSuggestions = [
      {
        type: "add",
        category: "Experience",
        title: "Add Flipkart Internship",
        description: "We found this experience on your LinkedIn but not in your CV",
        icon: TrendingUp,
        color: "green",
        data: mockLinkedInData.experience[1],
      },
      {
        type: "update",
        category: "Skills",
        title: "Add 3 more skills from LinkedIn",
        description: "Business Strategy, Market Research, Financial Modeling",
        icon: Sparkles,
        color: "blue",
        data: ["Business Strategy", "Market Research", "Financial Modeling"],
      },
      {
        type: "enhance",
        category: "Experience",
        title: "Enhance Amazon description",
        description: "Your LinkedIn has a more detailed description",
        icon: AlertTriangle,
        color: "orange",
        data: {
          current: "Worked on supply chain optimization projects",
          suggested: mockLinkedInData.experience[0].description,
        },
      },
    ];

    setLinkedInData(mockLinkedInData);
    setSuggestions(mockSuggestions);
    setConnecting(false);
    setConnected(true);
  };

  const applySuggestion = (index: number) => {
    // Mark suggestion as applied (in real app, would update the onboarding data)
    setSuggestions(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleContinue = () => {
    onNext({
      linkedInConnected: connected,
      linkedInData,
      // Merge LinkedIn data with existing data
      personalInfo: {
        ...data.personalInfo,
        name: linkedInData?.name || data.personalInfo.name,
        city: linkedInData?.location?.split(",")[0] || data.personalInfo.city,
        state: linkedInData?.location?.split(",")[1]?.trim() || data.personalInfo.state,
      },
      professionalExperience: [
        ...data.professionalExperience,
        ...linkedInData?.experience?.map((exp: any) => ({
          company: exp.company,
          role: exp.role,
          type: "Internship",
          duration: exp.duration,
          location: exp.location,
          description: exp.description,
        })) || [],
      ],
      skills: {
        ...data.skills,
        technical: [...new Set([...data.skills.technical, ...linkedInData?.skills || []])],
        languages: data.skills.languages || [],
      },
    });
  };

  return (
    <Card className="border-none shadow-2xl">
      <CardContent className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Connect Your LinkedIn</h2>
          <p className="text-slate-600">
            Import your professional profile and get intelligent suggestions to enhance your profile
          </p>
        </div>

        {!connected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <Linkedin className="w-10 h-10 text-blue-600" />
            </div>
            
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Import from LinkedIn
            </h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Connect your LinkedIn account to automatically import your work experience, 
              education, skills, and certifications
            </p>

            <Button
              onClick={handleConnect}
              disabled={connecting}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              {connecting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Linkedin className="w-5 h-5 mr-2" />
                  Connect LinkedIn
                </>
              )}
            </Button>
          </motion.div>
        )}

        {connected && linkedInData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Connected Status */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900 mb-1">
                    LinkedIn Connected Successfully!
                  </h3>
                  <p className="text-sm text-green-700 mb-3">
                    We've imported your professional information
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-white">
                      {linkedInData.experience.length} Work Experiences
                    </Badge>
                    <Badge variant="secondary" className="bg-white">
                      {linkedInData.education.length} Education Entries
                    </Badge>
                    <Badge variant="secondary" className="bg-white">
                      {linkedInData.skills.length} Skills
                    </Badge>
                    <Badge variant="secondary" className="bg-white">
                      {linkedInData.connections} Connections
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Suggestions */}
            {suggestions.length > 0 && (
              <div>
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Smart Suggestions ({suggestions.length})
                </h3>
                <div className="space-y-3">
                  {suggestions.map((suggestion, idx) => {
                    const Icon = suggestion.icon;
                    const colorMap: Record<string, string> = {
                      green: "bg-green-50 border-green-200 text-green-900",
                      blue: "bg-blue-50 border-blue-200 text-blue-900",
                      orange: "bg-orange-50 border-orange-200 text-orange-900",
                    };
                    const colorClasses = colorMap[suggestion.color] || colorMap.blue;

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`border rounded-lg p-4 ${colorClasses}`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <div>
                                <Badge variant="outline" className="text-xs mb-2">
                                  {suggestion.category}
                                </Badge>
                                <h4 className="font-semibold">{suggestion.title}</h4>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="ml-2"
                                onClick={() => applySuggestion(idx)}
                              >
                                Apply
                              </Button>
                            </div>
                            <p className="text-sm">{suggestion.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {suggestions.length === 0 && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
                <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <p className="text-slate-600">
                  Your CV and LinkedIn profiles are well-aligned! No suggestions at this time.
                </p>
              </div>
            )}
          </motion.div>
        )}

        <div className="flex items-center justify-between mt-8 pt-6 border-t">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          
          <div className="flex items-center gap-3">
            {!connected && (
              <Button variant="ghost" onClick={onSkip}>
                Skip for now
              </Button>
            )}
            <Button
              onClick={handleContinue}
              disabled={!connected}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Continue
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

