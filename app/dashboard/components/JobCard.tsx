"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";
import type { Job } from "@/lib/mockData";

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
}

export default function JobCard({ job, onApply }: JobCardProps) {
  const getFitColor = (fit: string) => {
    switch (fit) {
      case "High":
        return "bg-green-100 text-green-700 border-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Low":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="h-4 w-4 text-slate-600" />
                <h3 className="font-semibold text-slate-900">{job.company}</h3>
              </div>
              <p className="text-sm text-slate-700 font-medium">{job.title}</p>
            </div>
            <Badge variant="outline" className={getFitColor(job.fit)}>
              {job.fit} Fit
            </Badge>
          </div>

          <p className="text-xs text-slate-600 mb-3">{job.description}</p>

          <div className="flex items-center gap-3 text-xs text-slate-600 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {job.location}
            </div>
            <div className="flex items-center gap-1">
              <IndianRupee className="h-3.5 w-3.5" />
              {job.ctc}
            </div>
          </div>

          <Button
            onClick={() => onApply(job)}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="sm"
          >
            Apply Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

