"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import JobCard from "./components/JobCard";
import KanbanBoard from "./components/KanbanBoard";
import RoadmapList from "./components/RoadmapList";
import SuggestionsWidget from "./components/SuggestionsWidget";
import AlumniList from "./components/AlumniList";
import Toast from "./components/Toast";
import StartupGuide from "./components/StartupGuide";
import {
  jobs,
  roadmapTasks as initialTasks,
  initialApplications,
  type Job,
  type RoadmapTask,
  type Application,
} from "@/lib/mockData";

export default function DashboardPage() {
  const [activeView, setActiveView] = useState("home");
  const [tasks, setTasks] = useState<RoadmapTask[]>(initialTasks);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showStartupGuide, setShowStartupGuide] = useState(false);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("roadmapTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Check if this is a new user and show startup guide
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedDashboard");
    if (!hasVisited) {
      // Show the guide after a short delay for better UX
      setTimeout(() => {
        setShowStartupGuide(true);
      }, 1000);
    }
  }, []);

  // Save tasks to localStorage whenever they change
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
    // Check if already applied
    const alreadyApplied = applications.some((app) => app.jobId === job.id);
    if (alreadyApplied) {
      showToastMessage("You've already applied to this role!");
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
    showToastMessage(`Application added to tracker: ${job.company}!`);
  };

  const handleConnect = (name: string) => {
    showToastMessage(`Chat request sent to ${name}!`);
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const renderView = () => {
    if (activeView === "home") {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome back, Priya! 👋
            </h1>
            <p className="text-slate-600">
              You have {applications.length} active applications and{" "}
              {tasks.filter((t) => !t.done).length} pending tasks.
            </p>
          </div>

          {/* Eligibility & Fit Roles */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Eligibility & Fit Roles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} onApply={handleApply} />
              ))}
            </div>
          </div>

          {/* Application Tracker */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Application Tracker
            </h2>
            <KanbanBoard
              applications={applications}
              setApplications={setApplications}
            />
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RoadmapList tasks={tasks} toggleTask={toggleTask} />
            <SuggestionsWidget />
            <AlumniList onConnect={handleConnect} />
          </div>
        </motion.div>
      );
    }

    // Placeholder views for other menu items
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
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <Navbar />

      <main className="ml-60 mt-16 p-6">
        <div className="max-w-7xl mx-auto">{renderView()}</div>
      </main>

      <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
      
      <StartupGuide 
        isOpen={showStartupGuide} 
        onClose={() => setShowStartupGuide(false)} 
      />
    </div>
  );
}

