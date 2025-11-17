"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2, TrendingUp, Users, AlertCircle, CheckCircle2, Target } from "lucide-react";
import { motion } from "framer-motion";
import type { AlumniComparisonResult } from "@/lib/comparator";

interface AlumniComparisonPanelProps {
  result: AlumniComparisonResult | null;
}

export default function AlumniComparisonPanel({ result }: AlumniComparisonPanelProps) {
  if (!result) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">Compare your CV with top alumni to see market competitiveness</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Market Insights */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Market Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-2">Most Common Skills Among Top Alumni</p>
            <div className="flex flex-wrap gap-2">
              {result.marketInsights.commonSkills.slice(0, 8).map((skill, idx) => (
                <Badge key={idx} variant="secondary" className="bg-blue-100 text-blue-700">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-700 mb-2">Common Experience Types</p>
            <div className="flex flex-wrap gap-2">
              {result.marketInsights.commonExperience.map((exp, idx) => (
                <Badge key={idx} variant="outline" className="bg-green-50 text-green-700">
                  {exp}
                </Badge>
              ))}
            </div>
          </div>

          {result.marketInsights.averageYearsExperience > 0 && (
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <p className="text-sm text-slate-600">
                <strong>Average Experience:</strong> Top alumni have{" "}
                <strong>{result.marketInsights.averageYearsExperience} years</strong> of experience
              </p>
            </div>
          )}

          {result.marketInsights.topCompanies.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">Top Companies</p>
              <div className="flex flex-wrap gap-2">
                {result.marketInsights.topCompanies.map((company, idx) => (
                  <div key={idx} className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-lg">
                    <Building2 className="h-3 w-3 text-slate-600" />
                    <span className="text-sm text-slate-700">{company}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Alumni Comparison */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-4">Your CV vs Top Alumni</h3>
        <div className="space-y-4">
          {result.topAlumni.map((item, idx) => (
            <motion.div
              key={item.alumni.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 border-2 border-slate-200">
                        <AvatarImage src={item.alumni.avatarUrl} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-sky-500 text-white">
                          {item.alumni.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{item.alumni.name}</CardTitle>
                        <p className="text-sm text-slate-600">
                          {item.alumni.role} at {item.alumni.company}
                        </p>
                        {item.alumni.yearsAtCompany && (
                          <p className="text-xs text-slate-500 mt-1">
                            {item.alumni.yearsAtCompany}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="h-4 w-4 text-blue-600" />
                        <span className="text-2xl font-bold text-blue-600">
                          {item.competitivenessScore}%
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">Competitiveness</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={item.competitivenessScore} className="h-2 mb-4" />

                  {/* Gap Analysis */}
                  {item.gapAnalysis.missingSkills.length > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                        <p className="text-sm font-semibold text-slate-900">Missing Skills</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.gapAnalysis.missingSkills.slice(0, 5).map((skill, skillIdx) => (
                          <Badge
                            key={skillIdx}
                            variant="outline"
                            className="bg-orange-50 text-orange-700 border-orange-200 text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {item.gapAnalysis.missingSkills.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.gapAnalysis.missingSkills.length - 5} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {item.gapAnalysis.missingExperience.length > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="h-4 w-4 text-purple-600" />
                        <p className="text-sm font-semibold text-slate-900">Missing Experience</p>
                      </div>
                      <div className="space-y-1">
                        {item.gapAnalysis.missingExperience.map((exp, expIdx) => (
                          <p key={expIdx} className="text-xs text-slate-600 flex items-center gap-2">
                            <span className="text-purple-600">•</span>
                            {exp}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.gapAnalysis.recommendations.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <p className="text-sm font-semibold text-slate-900">Recommendations</p>
                      </div>
                      <ul className="space-y-1">
                        {item.gapAnalysis.recommendations.map((rec, recIdx) => (
                          <li key={recIdx} className="text-xs text-slate-600 flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

