"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle2, Loader2, X } from "lucide-react";
import { motion } from "framer-motion";
import type { CVData } from "@/lib/comparator";

interface CVUploaderProps {
  onCVUploaded: (cvData: CVData) => void;
  currentCV: CVData | null;
}

export default function CVUploader({ onCVUploaded, currentCV }: CVUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [parsing, setParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setUploading(true);
    setParsing(true);

    // Simulate upload and parsing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock parsed data (reusing onboarding logic)
    const mockParsedData: CVData = {
      id: `cv-${Date.now()}`,
      name: selectedFile.name,
      uploadedAt: new Date().toISOString(),
      fileUrl: URL.createObjectURL(selectedFile),
      parsedData: {
        personalInfo: {
          name: "Priya Sharma",
          email: "priya.sharma@student.edu",
        },
        experience: [
          {
            company: "TechCorp Solutions",
            role: "Business Analyst Intern",
            duration: "3 months",
            description: "Worked on digital transformation projects",
          },
          {
            company: "StartupXYZ",
            role: "Data Analyst",
            duration: "1.5 years",
            description: "Analyzed user behavior data",
          },
        ],
        education: [
          {
            degree: "MBA",
            institution: "Ahmedabad University",
            year: "2026",
          },
          {
            degree: "B.Tech Computer Science",
            institution: "Mumbai University",
            year: "2022",
          },
        ],
        skills: {
          technical: ["Python", "SQL", "Excel", "Tableau", "Power BI"],
          soft: ["Leadership", "Communication", "Problem Solving"],
          tools: ["Microsoft Office", "Google Analytics"],
        },
        certifications: [
          {
            name: "Google Data Analytics",
            issuer: "Google",
          },
        ],
        projects: [
          {
            title: "Customer Churn Prediction",
            description: "Built ML model with 85% accuracy",
            technologies: ["Python", "scikit-learn"],
          },
        ],
      },
    };

    setUploading(false);
    setParsing(false);
    onCVUploaded(mockParsedData);
  };

  const handleRemove = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Your CV</h3>

        {!currentCV && !file ? (
          <div
            className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-700 font-medium mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-slate-500 mb-4">
              PDF, DOC, or DOCX (Max 5MB)
            </p>
            <Button variant="outline" onClick={(e) => e.stopPropagation()}>
              Select File
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) {
                  handleFileSelect(selectedFile);
                }
              }}
            />
          </div>
        ) : (
          <div className="space-y-4">
            {currentCV && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900">{currentCV.name}</p>
                      <p className="text-sm text-green-700">
                        Uploaded {new Date(currentCV.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {file && !currentCV && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  {parsing ? (
                    <Loader2 className="h-5 w-5 text-blue-600 animate-spin mt-0.5" />
                  ) : (
                    <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-blue-900">{file.name}</p>
                    {parsing ? (
                      <p className="text-sm text-blue-700">Parsing CV...</p>
                    ) : (
                      <p className="text-sm text-blue-700">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    )}
                  </div>
                  {!parsing && (
                    <Button variant="ghost" size="sm" onClick={handleRemove}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {parsing && (
                  <div className="mt-3">
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <motion.div
                        className="bg-blue-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentCV && (
              <div className="pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New CV
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) {
                      handleFileSelect(selectedFile);
                    }
                  }}
                />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

