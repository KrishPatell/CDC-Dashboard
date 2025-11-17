"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CVUploader from "../components/comparator/CVUploader";
import JobSelector from "../components/comparator/JobSelector";
import ComparisonResults from "../components/comparator/ComparisonResults";
import AIOptimizationPanel from "../components/comparator/AIOptimizationPanel";
import AlumniComparisonPanel from "../components/comparator/AlumniComparisonPanel";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, Download, Briefcase, Users } from "lucide-react";
import { jobs, alumni, type Job } from "@/lib/mockData";
import { compareCVWithJob, compareCVWithAlumni, type CVData, type ComparisonResult, type AlumniComparisonResult } from "@/lib/comparator";

type ComparisonTab = "job" | "alumni";

export default function CVComparatorPage() {
  const router = useRouter();
  const [activeView, setActiveView] = useState("comparator");
  const [activeTab, setActiveTab] = useState<ComparisonTab>("job");
  const [currentCV, setCurrentCV] = useState<CVData | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const [alumniComparisonResult, setAlumniComparisonResult] = useState<AlumniComparisonResult | null>(null);
  const [comparisonHistory, setComparisonHistory] = useState<ComparisonResult[]>([]);

  // Load saved CV and history from localStorage
  useEffect(() => {
    const savedCV = localStorage.getItem("currentCV");
    if (savedCV) {
      try {
        setCurrentCV(JSON.parse(savedCV));
      } catch (error) {
        console.error("Failed to parse saved CV", error);
      }
    }

    const savedHistory = localStorage.getItem("comparisonHistory");
    if (savedHistory) {
      try {
        setComparisonHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Failed to parse comparison history", error);
      }
    }
  }, []);

  // Save CV to localStorage
  useEffect(() => {
    if (currentCV) {
      localStorage.setItem("currentCV", JSON.stringify(currentCV));
    }
  }, [currentCV]);

  // Save history to localStorage
  useEffect(() => {
    if (comparisonHistory.length > 0) {
      localStorage.setItem("comparisonHistory", JSON.stringify(comparisonHistory));
    }
  }, [comparisonHistory]);

  const handleSidebarNavigation = (view: string) => {
    // Navigate directly to the appropriate route
    if (view === "home") {
      router.push("/dashboard");
    } else if (view === "applications") {
      router.push("/dashboard?view=applications");
    } else if (view === "profile") {
      router.push("/dashboard?view=profile");
    } else if (view === "alumni") {
      router.push("/dashboard/alumni");
    } else if (view === "roadmap") {
      router.push("/dashboard/roadmap");
    } else if (view === "comparator") {
      // Already on comparator page, do nothing
      return;
    }
  };

  const handleCVUploaded = (cvData: CVData) => {
    setCurrentCV(cvData);
    toast.success("CV uploaded and parsed successfully!");
    
    // Auto-compare based on active tab
    if (activeTab === "job" && selectedJob) {
      performJobComparison(cvData, selectedJob);
    } else if (activeTab === "alumni") {
      performAlumniComparison(cvData);
    }
  };

  const handleJobSelect = (job: Job | null) => {
    setSelectedJob(job);
    
    // Auto-compare if CV is uploaded
    if (currentCV && job && activeTab === "job") {
      performJobComparison(currentCV, job);
    } else if (job) {
      setComparisonResult(null);
    }
  };

  const performJobComparison = (cv: CVData, job: Job) => {
    const result = compareCVWithJob(cv, job);
    setComparisonResult(result);
    
    // Add to history
    const updatedHistory = [result, ...comparisonHistory.slice(0, 9)]; // Keep last 10
    setComparisonHistory(updatedHistory);
    
    toast.success(`Comparison complete! Match score: ${result.overallScore}%`);
  };

  const performAlumniComparison = (cv: CVData) => {
    // Get top alumni (sorted by years of experience or other criteria)
    const topAlumni = [...alumni]
      .sort((a, b) => {
        const aYears = parseInt(a.yearsAtCompany?.match(/(\d+)/)?.[1] || "0");
        const bYears = parseInt(b.yearsAtCompany?.match(/(\d+)/)?.[1] || "0");
        return bYears - aYears;
      })
      .slice(0, 10); // Top 10 alumni
    
    const result = compareCVWithAlumni(cv, topAlumni);
    setAlumniComparisonResult(result);
    
    toast.success(`Alumni comparison complete! Analyzed ${topAlumni.length} top alumni profiles`);
  };

  const handleTabChange = (tab: ComparisonTab) => {
    setActiveTab(tab);
    
    // Auto-perform comparison when switching tabs if CV is uploaded
    if (currentCV) {
      if (tab === "job" && selectedJob) {
        performJobComparison(currentCV, selectedJob);
      } else if (tab === "alumni") {
        performAlumniComparison(currentCV);
      }
    }
  };

  const handleExportReport = () => {
    let report = "";
    
    if (comparisonResult && activeTab === "job") {
      report = `
CV Comparison Report - Job Analysis
====================================

Job: ${selectedJob?.title} at ${selectedJob?.company}
Date: ${new Date(comparisonResult.comparedAt).toLocaleDateString()}

Overall Match Score: ${comparisonResult.overallScore}%

Breakdown:
- Skills: ${comparisonResult.breakdown.skills.score}%
- Experience: ${comparisonResult.breakdown.experience.score}%
- Education: ${comparisonResult.breakdown.education.score}%
- Keywords: ${comparisonResult.breakdown.keywords.score}%
- Soft Skills: ${comparisonResult.breakdown.softSkills.score}%

Suggestions:
${comparisonResult.suggestions.map((s, i) => `${i + 1}. ${s.title}: ${s.description}`).join("\n")}
      `;
    } else if (alumniComparisonResult && activeTab === "alumni") {
      report = `
CV Comparison Report - Alumni Market Analysis
==============================================

Date: ${new Date(alumniComparisonResult.comparedAt).toLocaleDateString()}

MARKET INSIGHTS
---------------
Most Common Skills: ${alumniComparisonResult.marketInsights.commonSkills.slice(0, 10).join(", ")}
Common Experience Types: ${alumniComparisonResult.marketInsights.commonExperience.join(", ")}
Average Years Experience: ${alumniComparisonResult.marketInsights.averageYearsExperience} years
Top Companies: ${alumniComparisonResult.marketInsights.topCompanies.join(", ")}

TOP ALUMNI COMPARISON
---------------------
${alumniComparisonResult.topAlumni.map((item, idx) => `
${idx + 1}. ${item.alumni.name} - ${item.alumni.role} at ${item.alumni.company}
   Competitiveness Score: ${item.competitivenessScore}%
   Missing Skills: ${item.gapAnalysis.missingSkills.slice(0, 5).join(", ")}
   Missing Experience: ${item.gapAnalysis.missingExperience.join(", ")}
   Recommendations: ${item.gapAnalysis.recommendations.join("; ")}
`).join("\n")}

SUGGESTIONS FOR MARKET COMPETITIVENESS
---------------------------------------
${alumniComparisonResult.suggestions.map((s, i) => `${i + 1}. ${s.title}: ${s.description}`).join("\n")}
      `;
    } else {
      toast.error("No comparison data available to export");
      return;
    }
    
    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const filename = activeTab === "job" 
      ? `cv-comparison-job-${selectedJob?.company}-${Date.now()}.txt`
      : `cv-comparison-alumni-${Date.now()}.txt`;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success("Report exported successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar activeView={activeView} setActiveView={handleSidebarNavigation} />
      <Navbar onNavigate={handleSidebarNavigation} />

      <main className="ml-60 mt-16 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-sky-500 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">CV Comparator</h1>
                  <p className="text-slate-600">
                    Compare your CV against job descriptions and get AI-powered optimization tips
                  </p>
                </div>
              </div>
              {(comparisonResult || alumniComparisonResult) && (
                <Button onClick={handleExportReport} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              )}
            </div>
          </motion.div>

          {/* CV Upload */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <CVUploader onCVUploaded={handleCVUploaded} currentCV={currentCV} />
          </motion.div>

          {/* Tabs */}
          {currentCV && (
            <div className="mb-6 border-b border-slate-200">
              <div className="flex gap-2">
                <Button
                  variant={activeTab === "job" ? "default" : "ghost"}
                  onClick={() => handleTabChange("job")}
                  className={`rounded-b-none ${
                    activeTab === "job"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Briefcase className="h-4 w-4 mr-2" />
                  Job Comparison
                </Button>
                <Button
                  variant={activeTab === "alumni" ? "default" : "ghost"}
                  onClick={() => handleTabChange("alumni")}
                  className={`rounded-b-none ${
                    activeTab === "alumni"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Alumni Comparison
                </Button>
              </div>
            </div>
          )}

          {/* Job Comparison Tab */}
          {activeTab === "job" && (
            <>
              {/* Job Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <JobSelector selectedJob={selectedJob} onJobSelect={handleJobSelect} />
              </motion.div>

              {/* Comparison Results */}
              {currentCV && selectedJob && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <ComparisonResults result={comparisonResult} />
                </motion.div>
              )}

              {/* AI Optimization Panel */}
              {comparisonResult && comparisonResult.suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <AIOptimizationPanel suggestions={comparisonResult.suggestions} />
                </motion.div>
              )}
            </>
          )}

          {/* Alumni Comparison Tab */}
          {activeTab === "alumni" && (
            <>
              {currentCV ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                  >
                    <AlumniComparisonPanel result={alumniComparisonResult} />
                  </motion.div>

                  {/* AI Optimization Panel for Alumni Comparison */}
                  {alumniComparisonResult && alumniComparisonResult.suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <AIOptimizationPanel suggestions={alumniComparisonResult.suggestions} />
                    </motion.div>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">
                    Upload your CV first to compare with top alumni
                  </p>
                </motion.div>
              )}
            </>
          )}

          {/* Empty State - Only show when no CV is uploaded */}
          {!currentCV && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center justify-center h-20 w-20 bg-slate-100 rounded-full mb-4">
                <Sparkles className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Ready to Compare?
              </h3>
              <p className="text-slate-600 max-w-md mx-auto">
                Upload your CV to compare it with job descriptions or top alumni profiles. Get
                personalized insights on how to improve your competitiveness in the market.
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

