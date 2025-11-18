"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Upload, FileText, CheckCircle2, Loader2, AlertCircle, Sparkles } from "lucide-react";
import type { OnboardingData } from "../page";

interface CVUploadStepProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  onSkip: () => void;
}

export default function CVUploadStep({ data, onNext, onBack, onSkip }: CVUploadStepProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [parsed, setParsed] = useState(false);
  const [parsedData, setParsedData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      handleUpload(selectedFile);
    }
  };

  const handleUpload = async (selectedFile: File) => {
    setUploading(true);
    
    // Simulate CV parsing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Mock parsed data
    const mockParsedData = {
      personalInfo: {
        name: "Priya Sharma",
        email: "priya.sharma@student.edu",
        phone: "+91 98765 43210",
        city: "Mumbai",
        state: "Maharashtra",
        linkedin: "linkedin.com/in/priyasharma",
        github: "github.com/priyasharma",
      },
      academicInfo: {
        program: "MBA",
        batch: "2026",
        cgpa: "3.8",
        major: "Business Analytics",
        previousEducation: [
          {
            degree: "B.Tech in Computer Science",
            institution: "IIT Delhi",
            year: "2024",
            percentage: "85%",
          },
        ],
      },
      professionalExperience: [
        {
          company: "Amazon",
          role: "Business Analyst Intern",
          type: "Internship",
          duration: "3 months",
          location: "Bangalore",
          description: "Worked on supply chain optimization projects",
        },
      ],
      skills: {
        technical: ["Python", "SQL", "Excel", "Tableau", "Power BI"],
        soft: ["Leadership", "Communication", "Problem Solving"],
        tools: ["Microsoft Office", "Google Analytics", "Salesforce"],
        languages: [],
      },
      certifications: [
        {
          name: "Google Data Analytics Professional Certificate",
          issuer: "Google",
          date: "2024",
        },
      ],
    };

    setParsedData(mockParsedData);
    setUploading(false);
    setParsed(true);
  };

  const handleContinue = () => {
    onNext({
      cvFile: file!,
      cvParsedData: parsedData,
      personalInfo: {
        ...data.personalInfo,
        ...parsedData.personalInfo,
      },
      academicInfo: {
        ...data.academicInfo,
        ...parsedData.academicInfo,
      },
      professionalExperience: parsedData.professionalExperience,
      skills: parsedData.skills,
      certifications: parsedData.certifications,
    });
  };

  return (
    <Card className="border border-white/10 bg-white/5 text-white backdrop-blur-2xl shadow-2xl shadow-blue-900/30 rounded-3xl">
      <CardContent className="p-8 space-y-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs uppercase tracking-[0.35em] text-slate-200">
              <span className="text-[10px]">Step 1</span>
              <span className="text-white/60">CV Import</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-4 mb-2">Upload Your CV</h2>
            <p className="text-slate-200 text-sm max-w-2xl">
              We'll automatically extract information from your CV to save you time
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/30">
            <FileText className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="border-t border-white/10" />

        <div className="grid sm:grid-cols-2 gap-4 text-xs text-slate-200">
          <div className="flex items-center gap-2 bg-white/5 rounded-2xl px-4 py-3 border border-white/10">
            <AlertCircle className="w-4 h-4 text-sky-300" />
            <span>Auto fills personal, academic and experience data</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 rounded-2xl px-4 py-3 border border-white/10">
            <Sparkles className="w-4 h-4 text-sky-300" />
            <span>AI will highlight gaps before you confirm</span>
          </div>
        </div>

        <div className="space-y-6">
          {!file && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border border-dashed border-white/20 rounded-2xl p-10 text-center hover:border-sky-400/60 hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-lg font-medium text-white mb-2">
                Drop your CV here or click to browse
              </p>
              <p className="text-sm text-slate-300 mb-4">
                Supports PDF, DOC, DOCX (Max 5MB)
              </p>
              <Button variant="outline" type="button">
                Select File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
              />
            </motion.div>
          )}

          {file && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {uploading && <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />}
                  {!uploading && !parsed && <FileText className="w-8 h-8 text-slate-200" />}
                  {parsed && <CheckCircle2 className="w-8 h-8 text-green-400" />}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{file.name}</h3>
                  <p className="text-sm text-slate-300">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                  
                  {uploading && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-200">Parsing your CV...</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-blue-600 to-sky-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2 }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {parsed && parsedData && (
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center gap-2 text-green-300">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm font-medium">CV parsed successfully!</span>
                      </div>
                      
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <h4 className="font-semibold text-white mb-3">Extracted Information:</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm text-slate-200">
                          <div>
                            <span className="text-slate-300">Name:</span>
                            <p className="font-medium text-white">{parsedData.personalInfo.name}</p>
                          </div>
                          <div>
                            <span className="text-slate-300">Email:</span>
                            <p className="font-medium text-white">{parsedData.personalInfo.email}</p>
                          </div>
                          <div>
                            <span className="text-slate-300">Skills:</span>
                            <p className="font-medium text-white">{parsedData.skills.technical.length} technical skills</p>
                          </div>
                          <div>
                            <span className="text-slate-300">Experience:</span>
                            <p className="font-medium text-white">{parsedData.professionalExperience.length} positions</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-sky-300 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-200">
                          You'll be able to review and edit all extracted information in the next steps
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {!uploading && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setFile(null);
                      setParsed(false);
                      setParsedData(null);
                    }}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex items-center justify-between mt-8 pt-6 border-t">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onSkip}>
              Skip for now
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!parsed}
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

