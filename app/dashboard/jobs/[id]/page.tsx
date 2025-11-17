"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Building2,
  MapPin,
  IndianRupee,
  Calendar,
  Clock,
  Briefcase,
  Target,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Linkedin,
  Twitter,
  Instagram,
  Globe,
  Sparkles,
  FileText,
  Zap,
  Users,
  TrendingUp,
  AlertCircle,
  MessageCircle,
  Send,
  Award,
  ArrowRight,
  Star,
  Brain,
  Rocket,
} from "lucide-react";
import { jobs, alumni as allAlumni, type Job, type Alumni, type Application } from "@/lib/mockData";

export default function JobApplicationPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = parseInt(params.id as string);
  
  const [job, setJob] = useState<Job | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "ai-optimize" | "alumni">("overview");
  const [showCVSuggestions, setShowCVSuggestions] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [activeView, setActiveView] = useState("applications"); // Show applications as active since we're viewing a job

  useEffect(() => {
    // Load applications from localStorage
    const savedApplications = localStorage.getItem("applications");
    if (savedApplications) {
      try {
        setApplications(JSON.parse(savedApplications));
      } catch (error) {
        console.error("Failed to parse applications from localStorage", error);
      }
    }

    // Find the job by ID
    const foundJob = jobs.find((j) => j.id === jobId);
    if (foundJob) {
      setJob(foundJob);
    } else {
      toast.error("Job not found");
      router.back();
    }
  }, [jobId, router]);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  // Filter alumni by company
  const companyAlumni = allAlumni.filter((alumni) => alumni.company === job.company);

  // AI-generated CV suggestions based on job
  const cvSuggestions = [
    {
      type: "critical",
      title: "Add Quantifiable Achievements",
      description: `The JD emphasizes ${job.skills?.[0] || 'technical skills'}. Add metrics to your experience section (e.g., "Improved efficiency by 30%")`,
      impact: "High",
    },
    {
      type: "important",
      title: "Highlight Relevant Skills",
      description: `Emphasize ${job.skills?.slice(0, 3).join(", ")} in your skills section and provide concrete examples`,
      impact: "High",
    },
    {
      type: "suggestion",
      title: "Tailor Your Summary",
      description: `Rewrite your professional summary to align with "${job.title}" role requirements`,
      impact: "Medium",
    },
    {
      type: "suggestion",
      title: "Add Relevant Keywords",
      description: `Include keywords: ${job.skills?.slice(0, 4).join(", ")} to pass ATS screening`,
      impact: "Medium",
    },
    {
      type: "tip",
      title: "Showcase Relevant Projects",
      description: `Add projects that demonstrate ${job.skills?.[0] || 'key skills'} to strengthen your application`,
      impact: "Low",
    },
  ];

  const getFitColor = (fit?: string) => {
    switch (fit) {
      case "Perfect":
        return "bg-green-100 text-green-700 border-green-300";
      case "Great":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Good":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Low":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const handleApply = () => {
    const alreadyApplied = applications.some((app) => app.jobId === job.id);
    if (alreadyApplied) {
      toast.info("You've already applied to this role!");
      return;
    }

    const newApplication: Application = {
      id: applications.length + 1,
      jobId: job.id,
      company: job.company,
      role: job.title,
      stage: "Applied",
    };

    const updatedApplications = [...applications, newApplication];
    setApplications(updatedApplications);
    localStorage.setItem("applications", JSON.stringify(updatedApplications));
    toast.success(`Application added to tracker: ${job.company}!`);
    router.back();
  };

  const handleConnect = (name: string) => {
    toast.success(`Chat request sent to ${name}!`);
  };

  const handleSidebarNavigation = (view: string) => {
    if (view === activeView) {
      return;
    }

    setActiveView(view);

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
      router.push("/dashboard/comparator");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar activeView={activeView} setActiveView={handleSidebarNavigation} />
      <Navbar onNavigate={handleSidebarNavigation} />

      <main className="ml-60 mt-16 p-6">
        {/* Header with Back Button */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center gap-2 hover:bg-slate-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
              <p className="text-slate-600">{job.company}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
        {/* Job Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50 shadow-xl overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {job.logoUrl && (
                      <div className="h-16 w-16 bg-white rounded-xl flex items-center justify-center overflow-hidden border-2 border-blue-200 shadow-md">
                        <img
                          src={job.logoUrl}
                          alt={`${job.company} logo`}
                          className="object-contain p-2 w-full h-full"
                        />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-3xl font-bold text-slate-900 mb-1">
                        {job.title}
                      </CardTitle>
                      <p className="text-lg text-slate-600 font-medium">{job.company}</p>
                    </div>
                  </div>

                  {/* Job Meta Info */}
                  <div className="flex flex-wrap gap-3 mt-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200"
                    >
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{job.location}</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200"
                    >
                      <IndianRupee className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{job.ctc}</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200"
                    >
                      <Briefcase className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">{job.jobType}</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200"
                    >
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span className="font-medium">{job.experience}</span>
                    </motion.div>
                    {job.deadline && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-1.5 bg-orange-100/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-orange-300"
                      >
                        <Calendar className="h-4 w-4 text-orange-600" />
                        <span className="font-medium text-orange-700">
                          Deadline: {new Date(job.deadline).toLocaleDateString()}
                        </span>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className="ml-4"
                >
                  <Badge variant="outline" className={getFitColor(job.fit) + " text-xs px-3 py-1 font-semibold shadow-md border"}>
                    <Star className="h-3 w-3 mr-1.5" />
                    {job.fit} Fit
                  </Badge>
                </motion.div>
              </div>

              {/* Company Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 mt-4"
              >
                {job.companyWebsite && (
                  <motion.div whileHover={{ scale: 1.05, y: -2 }}>
                    <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm hover:bg-white hover:border-blue-300 hover:shadow-md transition-all" asChild>
                      <a href={job.companyWebsite} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-1.5 text-blue-600" />
                        <span className="font-medium">Website</span>
                      </a>
                    </Button>
                  </motion.div>
                )}
                {job.companyLinkedIn && (
                  <motion.div whileHover={{ scale: 1.05, y: -2 }}>
                    <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm hover:bg-white hover:border-[#0077B5] hover:shadow-md transition-all" asChild>
                      <a href={job.companyLinkedIn} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-1.5 text-[#0077B5]" />
                        <span className="font-medium">LinkedIn</span>
                      </a>
                    </Button>
                  </motion.div>
                )}
                {job.companyTwitter && (
                  <motion.div whileHover={{ scale: 1.05, y: -2 }}>
                    <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm hover:bg-white hover:border-[#1DA1F2] hover:shadow-md transition-all" asChild>
                      <a href={job.companyTwitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4 mr-1.5 text-[#1DA1F2]" />
                        <span className="font-medium">Twitter</span>
                      </a>
                    </Button>
                  </motion.div>
                )}
                {job.companyInstagram && (
                  <motion.div whileHover={{ scale: 1.05, y: -2 }}>
                    <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm hover:bg-white hover:border-[#E4405F] hover:shadow-md transition-all" asChild>
                      <a href={job.companyInstagram} target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-4 w-4 mr-1.5 text-[#E4405F]" />
                        <span className="font-medium">Instagram</span>
                      </a>
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Tabs */}
        <div className="border-b bg-white rounded-t-lg mb-6">
          <div className="flex gap-2 px-6">
            <motion.button
              onClick={() => setActiveTab("overview")}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`pb-3 pt-3 px-4 text-sm font-semibold border-b-3 transition-all relative ${
                activeTab === "overview"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {activeTab === "overview" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-50/50 rounded-t-lg -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="flex items-center gap-2 relative z-10">
                <FileText className="h-4 w-4" />
                Job Overview
              </div>
            </motion.button>
            
            <motion.button
              onClick={() => setActiveTab("ai-optimize")}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`pb-3 pt-3 px-4 text-sm font-semibold border-b-3 transition-all relative ${
                activeTab === "ai-optimize"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {activeTab === "ai-optimize" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-50/50 rounded-t-lg -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="flex items-center gap-2 relative z-10">
                <Sparkles className="h-4 w-4" />
                AI CV Optimizer
                <Badge className="bg-blue-600 text-white text-xs px-2 py-0">
                  <Brain className="h-3 w-3 mr-1" />
                  AI
                </Badge>
              </div>
            </motion.button>
            
            <motion.button
              onClick={() => setActiveTab("alumni")}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`pb-3 pt-3 px-4 text-sm font-semibold border-b-3 transition-all relative ${
                activeTab === "alumni"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {activeTab === "alumni" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-50/50 rounded-t-lg -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="flex items-center gap-2 relative z-10">
                <Users className="h-4 w-4" />
                Alumni Network
                <Badge className="bg-slate-300 text-slate-700 text-xs px-2 py-0">
                  {companyAlumni.length}
                </Badge>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-b-lg shadow-lg p-6">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* AI Match Score */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white overflow-hidden relative shadow-xl">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-300/10 to-blue-200/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-200/10 to-blue-100/10 rounded-full blur-2xl" />
                    
                    <CardHeader className="relative z-10">
                      <CardTitle className="flex items-center gap-2 text-blue-900">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          <Target className="h-5 w-5" />
                        </motion.div>
                        AI Match Analysis
                        <Badge className="ml-auto bg-blue-600 text-white">
                          <Brain className="h-3 w-3 mr-1" />
                          Powered by AI
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="text-sm font-semibold text-slate-700">Your Match Score</span>
                            <p className="text-xs text-slate-500">Based on skills & experience</p>
                          </div>
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", bounce: 0.5, delay: 0.3 }}
                            className="text-4xl font-bold text-blue-600"
                          >
                            {job.matchScore}%
                          </motion.span>
                        </div>
                        <div className="relative">
                          <Progress value={job.matchScore} className="h-4 bg-slate-200" />
                          <motion.div
                            className="absolute top-0 left-0 h-4 rounded-full bg-blue-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${job.matchScore}%` }}
                            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <motion.div
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-green-200 shadow-lg hover:shadow-xl transition-all"
                        >
                          <div className="flex items-center gap-2 text-green-600 mb-2">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <CheckCircle2 className="h-5 w-5" />
                            </motion.div>
                            <span className="text-sm font-semibold">Matched Skills</span>
                          </div>
                          <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            {job.skills?.length ? Math.floor(job.skills.length * 0.7) : 0}/{job.skills?.length || 0}
                          </p>
                          <p className="text-xs text-green-700 mt-1">Strong alignment!</p>
                        </motion.div>
                        
                        <motion.div
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all"
                        >
                          <div className="flex items-center gap-2 text-orange-600 mb-2">
                            <motion.div
                              animate={{ y: [0, -3, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <TrendingUp className="h-5 w-5" />
                            </motion.div>
                            <span className="text-sm font-semibold">Skills to Develop</span>
                          </div>
                          <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            {job.skills?.length ? Math.ceil(job.skills.length * 0.3) : 0}
                          </p>
                          <p className="text-xs text-orange-700 mt-1">Growth opportunities</p>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Job Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Briefcase className="h-5 w-5 text-blue-600" />
                        </div>
                        About the Role
                      </h3>
                      <p className="text-slate-700 leading-relaxed text-base">{job.fullDescription}</p>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50/50 to-white">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          </div>
                          Requirements
                        </h3>
                        <ul className="space-y-3">
                          {job.requirements.map((req, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + index * 0.05 }}
                              className="flex items-start gap-3 text-slate-700 bg-white/60 p-3 rounded-lg border border-green-100"
                            >
                              <ChevronRight className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm font-medium">{req}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Responsibilities */}
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50/50 to-white">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Target className="h-5 w-5 text-purple-600" />
                          </div>
                          Responsibilities
                        </h3>
                        <ul className="space-y-3">
                          {job.responsibilities.map((resp, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + index * 0.05 }}
                              className="flex items-start gap-3 text-slate-700 bg-white/60 p-3 rounded-lg border border-purple-100"
                            >
                              <ChevronRight className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm font-medium">{resp}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Skills */}
                {job.skills && job.skills.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50/50 to-white">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <Zap className="h-5 w-5 text-orange-600" />
                          </div>
                          Required Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + index * 0.05 }}
                              whileHover={{ scale: 1.1, y: -2 }}
                            >
                              <Badge
                                variant="secondary"
                                className="px-4 py-2 text-sm bg-blue-100 border-2 border-blue-300 text-blue-700 font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer hover:bg-blue-200"
                              >
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === "ai-optimize" && (
              <motion.div
                key="ai-optimize"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {!showCVSuggestions ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="max-w-md mx-auto">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/50 relative"
                      >
                        <Sparkles className="h-12 w-12 text-white" />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-300 rounded-3xl blur-xl -z-10"
                          animate={{ opacity: [0.5, 0.8, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                      
                      <h3 className="text-3xl font-bold text-blue-600 mb-4">
                        AI-Powered CV Optimization
                      </h3>
                      <p className="text-slate-600 mb-8 text-lg">
                        Our AI will analyze your CV against this job description and provide personalized suggestions to increase your chances of getting shortlisted by{" "}
                        <span className="font-bold text-blue-600">up to 40%</span>.
                      </p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-200"
                        >
                          <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                          <p className="text-xs font-semibold text-slate-700">Smart Analysis</p>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-200"
                        >
                          <Rocket className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                          <p className="text-xs font-semibold text-slate-700">Boost Chances</p>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-200"
                        >
                          <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                          <p className="text-xs font-semibold text-slate-700">Tailored Tips</p>
                        </motion.div>
                      </div>
                      
                      <div className="space-y-3">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            onClick={() => setShowCVSuggestions(true)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/30"
                            size="lg"
                          >
                            <Sparkles className="h-5 w-5 mr-2" />
                            Get AI Suggestions
                            <ChevronRight className="h-5 w-5 ml-2" />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            onClick={handleApply}
                            variant="outline"
                            className="w-full border-2"
                            size="lg"
                          >
                            Skip & Apply Directly
                            <ArrowRight className="h-5 w-5 ml-2" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-900">
                          <Award className="h-5 w-5" />
                          CV Optimization Report
                        </CardTitle>
                        <p className="text-sm text-blue-700">
                          Based on AI analysis of {job.company}&apos;s job requirements
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                          <div>
                            <p className="text-sm text-slate-600 mb-1">Current CV Score</p>
                            <p className="text-3xl font-bold text-blue-600">{job.matchScore}%</p>
                          </div>
                          <ArrowRight className="h-6 w-6 text-slate-400" />
                          <div>
                            <p className="text-sm text-slate-600 mb-1">Potential Score</p>
                            <p className="text-3xl font-bold text-blue-700">{Math.min(job.matchScore! + 12, 100)}%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-orange-600" />
                        Personalized Suggestions
                      </h3>
                      {cvSuggestions.map((suggestion, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className={`mt-1 p-2 rounded-lg ${getImpactColor(suggestion.impact)}`}>
                                  <AlertCircle className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-slate-900">{suggestion.title}</h4>
                                    <Badge variant="outline" className={`text-xs ${getImpactColor(suggestion.impact)}`}>
                                      {suggestion.impact} Impact
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-slate-600">{suggestion.description}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <Card className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
                      <CardContent className="p-6 text-center">
                        <Sparkles className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                        <h4 className="font-semibold text-lg text-slate-900 mb-2">Ready to Apply with Optimized CV?</h4>
                        <p className="text-sm text-slate-600 mb-4">
                          Implement these suggestions to boost your chances by up to 40%
                        </p>
                        <Button
                          onClick={handleApply}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Apply Now
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "alumni" && (
              <motion.div
                key="alumni"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white overflow-hidden relative shadow-xl">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-300/10 to-blue-200/10 rounded-full blur-2xl" />
                  
                  <CardHeader className="relative z-10">
                    <CardTitle className="flex items-center gap-2 text-blue-900">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Users className="h-5 w-5" />
                      </motion.div>
                      Connect with {job.company} Alumni
                      <Badge className="ml-auto bg-blue-600 text-white">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        3x Better Results
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-blue-700 font-medium">
                      Get insider tips and referrals from alumni who work or worked at {job.company}
                    </p>
                  </CardHeader>
                </Card>

                {companyAlumni.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No Alumni Found</h3>
                    <p className="text-slate-600">
                      We don&apos;t have any alumni from {job.company} in our network yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {companyAlumni.map((person, index) => (
                      <motion.div
                        key={person.id}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.03, y: -4 }}
                      >
                        <Card className="hover:shadow-2xl transition-all hover:border-blue-400 cursor-pointer bg-gradient-to-br from-white to-blue-50/30 border-2 border-blue-200 overflow-hidden relative">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-300/10 to-blue-200/10 rounded-bl-full" />
                          
                          <CardContent className="p-5 relative z-10">
                            <div className="flex items-start gap-4">
                              <motion.div whileHover={{ rotate: 5, scale: 1.1 }}>
                                <Avatar className="h-16 w-16 border-3 border-blue-300 shadow-lg shadow-blue-500/20">
                                  <AvatarImage src={person.avatarUrl} alt={person.name} />
                                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-500 text-white font-bold">
                                    {person.name.split(" ").map(n => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                              </motion.div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-slate-900 mb-1 text-lg">{person.name}</h4>
                                <p className="text-sm text-slate-700 font-medium mb-2">{person.role}</p>
                                <div className="flex items-center gap-3 text-xs text-slate-600 mb-3">
                                  <span className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-md border border-slate-200">
                                    <Building2 className="h-3 w-3 text-blue-600" />
                                    {person.yearsAtCompany}
                                  </span>
                                  <span className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-md border border-slate-200">
                                    <Award className="h-3 w-3 text-blue-600" />
                                    Batch {person.batch}
                                  </span>
                                </div>
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                  <Button
                                    onClick={() => handleConnect(person.name)}
                                    size="sm"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                                  >
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Connect & Share Application
                                    <Send className="h-3 w-3 ml-auto" />
                                  </Button>
                                </motion.div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}

                {companyAlumni.length > 0 && (
                  <Card className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-white rounded-lg">
                          <Send className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg text-slate-900 mb-2">
                            Pro Tip: Leverage Alumni Connections
                          </h4>
                          <p className="text-sm text-slate-600 mb-4">
                            Applications with internal referrals are 3x more likely to get shortlisted. Reach out to alumni for insights and potential referrals!
                          </p>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => {
                                if (companyAlumni.length > 0) {
                                  handleConnect(companyAlumni[0].name);
                                }
                              }}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Message Alumni
                            </Button>
                            <Button
                              onClick={handleApply}
                              variant="outline"
                            >
                              Apply Directly
                              <ExternalLink className="h-4 w-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 bg-white rounded-lg shadow-lg border-t-2 p-6">
          <div className="flex items-center justify-between">
            <div>
              {job.deadline && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-orange-200"
                >
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <div>
                    <p className="text-xs text-slate-600">Application deadline:</p>
                    <p className="font-bold text-orange-600">
                      {new Date(job.deadline).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" onClick={() => router.back()} className="border-2">
                  Cancel
                </Button>
              </motion.div>
              {activeTab !== "ai-optimize" && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleApply}
                    className="bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/30"
                    size="lg"
                  >
                    <Rocket className="h-5 w-5 mr-2" />
                    Apply to this Role
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}

