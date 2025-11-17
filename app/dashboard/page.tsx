"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import JobCard from "./components/JobCard";
import JobFilter, { type FilterState } from "./components/JobFilter";
import KanbanBoard from "./components/KanbanBoard";
import RoadmapList from "./components/RoadmapList";
import SuggestionsWidget from "./components/SuggestionsWidget";
import AlumniList from "./components/AlumniList";
import StartupGuide from "./components/StartupGuide";
import JobDetailsModal from "./components/JobDetailsModal";
import ProfilePage from "./components/ProfilePage";
import {
  jobs,
  roadmapTasks as initialTasks,
  initialApplications,
  type Job,
  type RoadmapTask,
  type Application,
} from "@/lib/mockData";

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeView, setActiveView] = useState("home");
  const [tasks, setTasks] = useState<RoadmapTask[]>(initialTasks);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [showStartupGuide, setShowStartupGuide] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    timing: [],
    jobType: [],
    fit: [],
  });

  // Handle URL search params to set the active view
  useEffect(() => {
    const view = searchParams.get("view");
    if (view && ["home", "applications", "profile"].includes(view)) {
      setActiveView(view);
    }
  }, [searchParams]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("roadmapTasks");
    if (!savedTasks) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      try {
      setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error("Failed to parse roadmapTasks from localStorage", error);
        localStorage.removeItem("roadmapTasks");
      }
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedDashboard");
    if (!hasVisited) {
      setTimeout(() => {
        setShowStartupGuide(true);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("roadmapTasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleApply = (job: Job) => {
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

    setApplications([...applications, newApplication]);
    toast.success(`Application added to tracker: ${job.company}!`);
  };

  const handleConnect = (name: string) => {
    toast.success(`Chat request sent to ${name}!`);
  };

  const handleViewJobDetails = (job: Job) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  const getFilteredJobs = () => {
    return jobs.filter((job) => {
      // Check timing filter
      if (filters.timing.length > 0) {
        const postedDays = job.postedDaysAgo || 0;
        const timingMatch = filters.timing.some((timing) => {
          switch (timing) {
            case "recent":
              return postedDays <= 7;
            case "week":
              return postedDays > 7 && postedDays <= 14;
            case "month":
              return postedDays > 14 && postedDays <= 30;
            case "older":
              return postedDays > 30;
            default:
              return false;
          }
        });
        if (!timingMatch) return false;
      }

      // Check job type filter
      if (filters.jobType.length > 0) {
        const jobTypeNormalized = job.jobType?.toLowerCase() || "";
        const jobTypeMatch = filters.jobType.some((type) => {
          switch (type) {
            case "internship":
              return jobTypeNormalized.includes("internship");
            case "fulltime":
              return jobTypeNormalized.includes("full-time") || jobTypeNormalized.includes("fulltime");
            case "parttime":
              return jobTypeNormalized.includes("part-time") || jobTypeNormalized.includes("parttime");
            default:
              return false;
          }
        });
        if (!jobTypeMatch) return false;
      }

      // Check fit filter
      if (filters.fit.length > 0) {
        const fitNormalized = job.fit?.toLowerCase() || "";
        const fitMatch = filters.fit.some((f) => {
          switch (f) {
            case "high":
              return fitNormalized === "high";
            case "medium":
              return fitNormalized === "medium";
            case "low":
              return fitNormalized === "low";
            default:
              return false;
          }
        });
        if (!fitMatch) return false;
      }

      return true;
    });
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);

    // Navigate to dedicated pages directly without setting state first
    if (view === "alumni") {
      router.push("/dashboard/alumni");
      return;
    }
    if (view === "roadmap") {
      router.push("/dashboard/roadmap");
      return;
    }
    if (view === "comparator") {
      router.push("/dashboard/comparator");
      return;
    }
    
    // For views that stay on this page, update URL with search params
    if (view === "home") {
      router.push("/dashboard");
    } else {
      router.push(`/dashboard?view=${view}`);
    }
  };

  const renderView = () => {
    if (activeView === "home") {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome back, Priya! 👋
            </h1>
            <p className="text-slate-600">
              You have {applications.length} active applications and{" "}
              {tasks.filter((t) => !t.done).length} pending tasks.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900">
              Eligibility & Fit Roles
            </h2>
              <JobFilter onFilterChange={setFilters} activeFilters={filters} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredJobs().map((job) => (
                <JobCard key={job.id} job={job} onApply={handleApply} onViewDetails={handleViewJobDetails} />
              ))}
            </div>
            {getFilteredJobs().length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500 text-lg">No jobs match your filters. Try adjusting your criteria.</p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Application Tracker
            </h2>
            <KanbanBoard
              applications={applications}
              setApplications={setApplications}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RoadmapList tasks={tasks} toggleTask={toggleTask} />
            <SuggestionsWidget />
            <AlumniList onConnect={handleConnect} />
          </div>
        </motion.div>
      );
    }

    if (activeView === "profile") {
      return <ProfilePage />;
    }

    if (activeView === "applications") {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">My Applications</h1>
            <p className="text-slate-600">Track your job applications</p>
          </div>
          <KanbanBoard
            applications={applications}
            setApplications={setApplications}
          />
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center h-96"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
          </h2>
          <p className="text-slate-600">This view is coming soon!</p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar activeView={activeView} setActiveView={handleViewChange} />
      <Navbar onNavigate={handleViewChange} />

      <main className="ml-60 mt-16 p-6">
        <div className="max-w-7xl mx-auto">{renderView()}</div>
      </main>
      
      <StartupGuide 
        isOpen={showStartupGuide} 
        onClose={() => setShowStartupGuide(false)} 
      />

      <JobDetailsModal
        job={selectedJob}
        open={showJobModal}
        onClose={() => setShowJobModal(false)}
        onApply={handleApply}
        onConnect={handleConnect}
      />
    </div>
  );
}

