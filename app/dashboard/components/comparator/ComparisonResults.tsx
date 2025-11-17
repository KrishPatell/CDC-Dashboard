"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, CheckCircle2, X, TrendingUp, BookOpen, FileText } from "lucide-react";
import { motion } from "framer-motion";
import type { ComparisonResult } from "@/lib/comparator";

interface ComparisonResultsProps {
  result: ComparisonResult | null;
}

export default function ComparisonResults({ result }: ComparisonResultsProps) {
  if (!result) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Target className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">Upload a CV and select a job to see comparison results</p>
        </CardContent>
      </Card>
    );
  }

  const breakdown = result.breakdown;

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Overall Match Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">Your CV matches this job</p>
              <p className="text-4xl font-bold text-blue-600">{result.overallScore}%</p>
            </div>
            <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Target className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          <Progress value={result.overallScore} className="h-4" />
        </CardContent>
      </Card>

      {/* Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Skills Match
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-slate-900">
                  {breakdown.skills.score}%
                </span>
                <Badge variant="secondary">
                  {breakdown.skills.matched.length}/{breakdown.skills.matched.length + breakdown.skills.missing.length}
                </Badge>
              </div>
              <Progress value={breakdown.skills.score} className="h-2" />
            </div>
            {breakdown.skills.matched.length > 0 && (
              <div className="mb-2">
                <p className="text-xs font-semibold text-green-700 mb-1">Matched:</p>
                <div className="flex flex-wrap gap-1">
                  {breakdown.skills.matched.slice(0, 3).map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs bg-green-50">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {breakdown.skills.missing.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-red-700 mb-1">Missing:</p>
                <div className="flex flex-wrap gap-1">
                  {breakdown.skills.missing.slice(0, 3).map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs bg-red-50">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Experience */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Experience Match
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-slate-900">
                  {breakdown.experience.score}%
                </span>
              </div>
              <Progress value={breakdown.experience.score} className="h-2" />
            </div>
            <p className="text-xs text-slate-600">
              {breakdown.experience.matched > 0
                ? "Relevant experience found"
                : "Consider highlighting relevant experience"}
            </p>
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Education Match
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-slate-900">
                  {breakdown.education.score}%
                </span>
                {breakdown.education.matched ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <X className="h-5 w-5 text-red-600" />
                )}
              </div>
              <Progress value={breakdown.education.score} className="h-2" />
            </div>
            <p className="text-xs text-slate-600">
              {breakdown.education.matched
                ? "Education requirements met"
                : "Review education requirements"}
            </p>
          </CardContent>
        </Card>

        {/* Keywords */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Keywords Match
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-slate-900">
                  {breakdown.keywords.score}%
                </span>
                <Badge variant="secondary">{breakdown.keywords.matched} matched</Badge>
              </div>
              <Progress value={breakdown.keywords.score} className="h-2" />
            </div>
            {breakdown.keywords.missing.length > 0 && (
              <p className="text-xs text-red-700">
                {breakdown.keywords.missing.length} keywords missing
              </p>
            )}
          </CardContent>
        </Card>

        {/* Soft Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4" />
              Soft Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-slate-900">
                  {breakdown.softSkills.score}%
                </span>
              </div>
              <Progress value={breakdown.softSkills.score} className="h-2" />
            </div>
            {breakdown.softSkills.matched.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {breakdown.softSkills.matched.map((skill, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

