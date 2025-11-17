"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, Code, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import type { SkillGoal } from "@/lib/mockData";

interface SkillsTrackerProps {
  skillGoals: SkillGoal[];
}

const getLevelColor = (level: string) => {
  switch (level) {
    case "advanced":
      return "bg-green-100 text-green-700 border-green-200";
    case "intermediate":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "beginner":
      return "bg-blue-100 text-blue-700 border-blue-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

export default function SkillsTracker({ skillGoals }: SkillsTrackerProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Skills Development</h2>
        <p className="text-slate-600">Track your skill progression and learning resources</p>
      </div>

      {skillGoals.length > 0 ? (
        <div className="space-y-4">
          {skillGoals.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-1">{skill.skillName}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={getLevelColor(skill.currentLevel)}>
                          {skill.currentLevel}
                        </Badge>
                        <span className="text-slate-400">→</span>
                        <Badge className={getLevelColor(skill.targetLevel)}>
                          {skill.targetLevel}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{skill.progress}%</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={skill.progress} className="h-3 mb-4" />

                  {skill.resources.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Learning Resources
                      </p>
                      <div className="space-y-2">
                        {skill.resources.map((resource, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200"
                          >
                            <span className="text-sm text-slate-700">{resource.title}</span>
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {skill.projects.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Project Ideas
                      </p>
                      <div className="space-y-2">
                        {skill.projects.map((project, idx) => (
                          <div
                            key={idx}
                            className="p-2 bg-blue-50 rounded-lg border border-blue-200"
                          >
                            <p className="text-sm font-medium text-slate-900">
                              {project.title}
                            </p>
                            <p className="text-xs text-slate-600 mt-1">{project.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <TrendingUp className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No skill goals set yet</p>
            <p className="text-sm text-slate-500 mt-2">
              Add skills you want to develop to track your progress
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

