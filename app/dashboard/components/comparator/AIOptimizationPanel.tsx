"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Lightbulb, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import type { OptimizationSuggestion } from "@/lib/comparator";

interface AIOptimizationPanelProps {
  suggestions: OptimizationSuggestion[];
}

const getSuggestionIcon = (type: string) => {
  switch (type) {
    case "critical":
      return AlertCircle;
    case "important":
      return CheckCircle2;
    default:
      return Lightbulb;
  }
};

const getSuggestionColor = (type: string) => {
  switch (type) {
    case "critical":
      return "bg-red-50 border-red-200 text-red-900";
    case "important":
      return "bg-orange-50 border-orange-200 text-orange-900";
    default:
      return "bg-blue-50 border-blue-200 text-blue-900";
  }
};

const getImpactColor = (impact: string) => {
  switch (impact) {
    case "high":
      return "bg-red-100 text-red-700";
    case "medium":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-blue-100 text-blue-700";
  }
};

export default function AIOptimizationPanel({ suggestions }: AIOptimizationPanelProps) {
  if (suggestions.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <p className="text-slate-600">Your CV looks great! No major improvements needed.</p>
        </CardContent>
      </Card>
    );
  }

  const criticalSuggestions = suggestions.filter((s) => s.type === "critical");
  const importantSuggestions = suggestions.filter((s) => s.type === "important");
  const otherSuggestions = suggestions.filter(
    (s) => s.type !== "critical" && s.type !== "important"
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          AI Optimization Suggestions
        </CardTitle>
        <p className="text-sm text-slate-600">
          Implement these suggestions to improve your match score
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Critical Suggestions */}
        {criticalSuggestions.length > 0 && (
          <div>
            <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Critical ({criticalSuggestions.length})
            </h4>
            <div className="space-y-3">
              {criticalSuggestions.map((suggestion) => {
                const Icon = getSuggestionIcon(suggestion.type);
                return (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border-2 ${getSuggestionColor(suggestion.type)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3">
                        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h5 className="font-semibold mb-1">{suggestion.title}</h5>
                          <p className="text-sm opacity-90 mb-3">{suggestion.description}</p>
                          <ul className="space-y-1">
                            {suggestion.actionItems.map((item, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                <span className="text-red-600 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <Badge className={getImpactColor(suggestion.impact)}>
                          {suggestion.impact} impact
                        </Badge>
                        <p className="text-xs mt-2 font-semibold">
                          +{suggestion.estimatedScoreIncrease}% potential
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Important Suggestions */}
        {importantSuggestions.length > 0 && (
          <div>
            <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Important ({importantSuggestions.length})
            </h4>
            <div className="space-y-3">
              {importantSuggestions.map((suggestion) => {
                const Icon = getSuggestionIcon(suggestion.type);
                return (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border ${getSuggestionColor(suggestion.type)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3">
                        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h5 className="font-semibold mb-1">{suggestion.title}</h5>
                          <p className="text-sm opacity-90 mb-3">{suggestion.description}</p>
                          <ul className="space-y-1">
                            {suggestion.actionItems.map((item, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                <span className="text-orange-600 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <Badge className={getImpactColor(suggestion.impact)}>
                          {suggestion.impact} impact
                        </Badge>
                        <p className="text-xs mt-2 font-semibold">
                          +{suggestion.estimatedScoreIncrease}% potential
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Other Suggestions */}
        {otherSuggestions.length > 0 && (
          <div>
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Suggestions ({otherSuggestions.length})
            </h4>
            <div className="space-y-3">
              {otherSuggestions.map((suggestion) => {
                const Icon = getSuggestionIcon(suggestion.type);
                return (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border ${getSuggestionColor(suggestion.type)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h5 className="font-semibold mb-1">{suggestion.title}</h5>
                          <p className="text-sm opacity-90">{suggestion.description}</p>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <Badge className={getImpactColor(suggestion.impact)}>
                          {suggestion.impact} impact
                        </Badge>
                        <p className="text-xs mt-2 font-semibold">
                          +{suggestion.estimatedScoreIncrease}% potential
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="pt-4 border-t bg-gradient-to-r from-blue-50 to-sky-50 p-4 rounded-lg">
          <p className="text-sm font-semibold text-slate-900 mb-1">
            Potential Score Improvement
          </p>
          <p className="text-2xl font-bold text-blue-600">
            +{suggestions.reduce((acc, s) => acc + s.estimatedScoreIncrease, 0)}%
          </p>
          <p className="text-xs text-slate-600 mt-2">
            Implement all suggestions to maximize your match score
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

