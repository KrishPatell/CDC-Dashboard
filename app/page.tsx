"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  Calendar,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  Target,
  Sparkles,
  ChevronRight,
  Building2,
  MapPin,
  IndianRupee,
} from "lucide-react";
import {
  mockRoles,
  mockApplications,
  mockDeadlines,
  mockRoadmapTasks,
  studentProfile,
  type FitLevel,
  type RoadmapTask,
} from "@/lib/mock-data";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<RoadmapTask[]>(mockRoadmapTasks);

  const toggleTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getFitBadge = (fit: FitLevel) => {
    const variants = {
      high: "bg-green-100 text-green-800 border-green-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return variants[fit];
  };

  const getStageBadge = (stage: string) => {
    const stages = {
      applied: "bg-blue-100 text-blue-800",
      shortlisted: "bg-purple-100 text-purple-800",
      test: "bg-orange-100 text-orange-800",
      interview: "bg-pink-100 text-pink-800",
      offer: "bg-green-100 text-green-800",
      rejected: "bg-gray-100 text-gray-800",
    };
    return stages[stage as keyof typeof stages] || stages.applied;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: "text-red-600",
      medium: "text-orange-600",
      low: "text-gray-600",
    };
    return colors[priority as keyof typeof colors];
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      cv: <Briefcase className="h-4 w-4" />,
      interview: <Target className="h-4 w-4" />,
      skills: <TrendingUp className="h-4 w-4" />,
      outreach: <Sparkles className="h-4 w-4" />,
    };
    return icons[category as keyof typeof icons];
  };

  const completedTasks = tasks.filter((t) => t.completed).length;
  const taskProgress = (completedTasks / tasks.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    CDC Platform
                  </h1>
                  <p className="text-sm text-slate-600">Student Dashboard</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">
                  {studentProfile.name}
                </p>
                <p className="text-xs text-slate-600">
                  {studentProfile.program} • {studentProfile.batchYear}
                </p>
              </div>
              <Avatar>
                <AvatarImage src={studentProfile.avatarUrl} />
                <AvatarFallback>PS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back, {studentProfile.name.split(" ")[0]}! 👋
          </h2>
          <p className="text-slate-600">
            You have {mockDeadlines.length} upcoming deadlines and{" "}
            {tasks.filter((t) => !t.completed).length} pending tasks.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* My Fit Roles */}
          <motion.div variants={item}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      My Fit Roles
                    </CardTitle>
                    <CardDescription>
                      Roles matched to your profile
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-50">
                    {mockRoles.length} Roles
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockRoles.slice(0, 3).map((role, idx) => (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 border rounded-lg hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Building2 className="h-4 w-4 text-slate-600" />
                          <h3 className="font-semibold text-slate-900">
                            {role.company}
                          </h3>
                        </div>
                        <p className="text-sm text-slate-700 font-medium">
                          {role.title}
                        </p>
                      </div>
                      <Badge
                        className={getFitBadge(role.fit)}
                        variant="outline"
                      >
                        {role.fit.toUpperCase()} FIT
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {role.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <IndianRupee className="h-3.5 w-3.5" />
                        {role.ctc}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        Due {new Date(role.deadline).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-600">
                          Skill Match
                        </span>
                        <span className="text-xs font-semibold text-blue-600">
                          {role.matchPercentage}%
                        </span>
                      </div>
                      <Progress value={role.matchPercentage} className="h-2" />
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {role.requiresSkills.slice(0, 4).map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className={
                            role.yourSkills.includes(skill)
                              ? "bg-green-100 text-green-800 text-xs"
                              : "bg-gray-100 text-gray-600 text-xs"
                          }
                        >
                          {skill}
                          {role.yourSkills.includes(skill) && " ✓"}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-3 group-hover:bg-blue-600 group-hover:text-white transition-colors"
                    >
                      View Details
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </motion.div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Roles ({mockRoles.length})
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Application Status */}
          <motion.div variants={item}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                      Application Status
                    </CardTitle>
                    <CardDescription>Track your applications</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-purple-50">
                    {mockApplications.length} Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockApplications.map((app, idx) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 border rounded-lg hover:border-purple-300 hover:bg-purple-50/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-0.5">
                          {app.company}
                        </h3>
                        <p className="text-sm text-slate-600">{app.role}</p>
                      </div>
                      <Badge className={getStageBadge(app.stage)}>
                        {app.stage.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                      <Separator orientation="vertical" className="h-3" />
                      <span>Updated: {new Date(app.lastUpdate).toLocaleDateString()}</span>
                    </div>
                  </motion.div>
                ))}
                <Button variant="outline" className="w-full">
                  View Pipeline
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Deadlines */}
          <motion.div variants={item}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-orange-600" />
                      Upcoming Deadlines
                    </CardTitle>
                    <CardDescription>Don&apos;t miss these dates</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-orange-50">
                    {mockDeadlines.length} Due
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockDeadlines.map((deadline, idx) => (
                  <motion.div
                    key={deadline.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 border rounded-lg hover:border-orange-300 hover:bg-orange-50/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertCircle
                            className={`h-4 w-4 ${getPriorityColor(
                              deadline.priority
                            )}`}
                          />
                          <h3 className="font-semibold text-slate-900">
                            {deadline.company}
                          </h3>
                        </div>
                        <p className="text-sm text-slate-600">
                          {deadline.role}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {deadline.type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Clock className="h-4 w-4 text-slate-500" />
                        <span className={getPriorityColor(deadline.priority)}>
                          {new Date(deadline.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">
                        {Math.ceil(
                          (new Date(deadline.dueDate).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days left
                      </span>
                    </div>
                  </motion.div>
                ))}
                <Button variant="outline" className="w-full">
                  View Calendar
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Roadmap Nudges */}
          <motion.div variants={item}>
            <Card className="h-full hover:shadow-lg transition-shadow border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                      AI Roadmap Coach
                    </CardTitle>
                    <CardDescription>
                      Personalized weekly tasks
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-blue-600">
                      {completedTasks}/{tasks.length}
                    </div>
                    <div className="text-xs text-slate-600">completed</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      Weekly Progress
                    </span>
                    <span className="text-sm font-semibold text-blue-600">
                      {Math.round(taskProgress)}%
                    </span>
                  </div>
                  <Progress value={taskProgress} className="h-2.5" />
                </div>

                <div className="space-y-2.5">
                  {tasks.map((task, idx) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`p-3.5 border rounded-lg transition-all cursor-pointer ${
                        task.completed
                          ? "bg-green-50 border-green-200 opacity-75"
                          : "hover:border-blue-300 hover:bg-blue-50/50"
                      }`}
                      onClick={() => toggleTask(task.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {task.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <div className="h-5 w-5 border-2 border-slate-300 rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1.5">
                            <h4
                              className={`text-sm font-medium ${
                                task.completed
                                  ? "line-through text-slate-600"
                                  : "text-slate-900"
                              }`}
                            >
                              {task.title}
                            </h4>
                            <Badge
                              variant="outline"
                              className="ml-2 text-xs flex items-center gap-1"
                            >
                              {getCategoryIcon(task.category)}
                              {task.category}
                            </Badge>
                          </div>
                          <p
                            className={`text-xs mb-2 ${
                              task.completed
                                ? "text-slate-500"
                                : "text-slate-600"
                            }`}
                          >
                            {task.description}
                          </p>
                          <div className="flex items-center gap-3 text-xs">
                            <div
                              className={`flex items-center gap-1 ${getPriorityColor(
                                task.priority
                              )}`}
                            >
                              <AlertCircle className="h-3.5 w-3.5" />
                              {task.priority} priority
                            </div>
                            <Separator
                              orientation="vertical"
                              className="h-3"
                            />
                            <div className="flex items-center gap-1 text-slate-600">
                              <Clock className="h-3.5 w-3.5" />
                              Due {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get More AI Suggestions
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
