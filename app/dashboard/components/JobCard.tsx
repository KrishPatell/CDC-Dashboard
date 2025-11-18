"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Job } from "@/lib/mockData";

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
  onViewDetails?: (job: Job) => void;
}

export default function JobCard({ job, onApply, onViewDetails }: JobCardProps) {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);

  const handleApplyClick = () => {
    // Navigate to the full page job application
    router.push(`/dashboard/jobs/${job.id}`);
  };

  const getJobLevelColor = (level?: string) => {
    switch (level) {
      case "Entry Level":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Intermediate":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Expert":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-purple-100 text-purple-700 border-purple-200";
    }
  };

  const getJobTypeColor = (type?: string) => {
    if (type?.toLowerCase().includes("part")) {
      return "bg-green-100 text-green-700 border-green-200";
    }
    return "bg-green-100 text-green-700 border-green-200";
  };

  const getRemoteColor = () => {
    return "bg-orange-100 text-orange-700 border-orange-200";
  };

  const formatSalary = (ctc: string) => {
    // Convert ₹6-8 LPA to $250/hr format for display
    // For now, we'll keep the original format or convert it
    return ctc;
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative"
    >
      <Card className="hover:shadow-md transition-shadow duration-200 border-slate-200 bg-white min-h-[300px] flex flex-col !gap-0 !py-0">
        <CardContent className="p-5 pb-4 flex flex-col flex-1 !px-5">
          {/* Heart Icon - Top Right */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorited(!isFavorited);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-3 right-3 p-1.5 hover:bg-slate-100 rounded-full transition-colors z-10"
            aria-label="Favorite"
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorited
                  ? "fill-red-500 text-red-500"
                  : "text-slate-400 hover:text-red-500"
              } transition-colors`}
            />
          </motion.button>

          {/* Logo and Job Info - Side by Side */}
          <div className="flex items-start gap-3 mb-3 pr-8">
            {/* Company Logo - Smaller */}
            <div className="flex-shrink-0">
              <div className="h-12 w-12 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                {job.logoUrl ? (
                  <img
                    src={job.logoUrl}
                    alt={`${job.company} logo`}
                    className="object-contain p-1.5 w-full h-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const parent = target.parentElement;
                      if (parent) {
                        target.style.display = "none";
                        const fallback = document.createElement("span");
                        fallback.className = "text-lg font-bold text-slate-600";
                        fallback.textContent = job.company.charAt(0);
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                ) : (
                  <span className="text-lg font-bold text-slate-600">
                    {job.company.charAt(0)}
                  </span>
                )}
              </div>
            </div>

            {/* Job Title and Company Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-slate-900 mb-1 leading-tight">
                {job.title}
              </h3>
              <p className="text-xs text-slate-600">
                {job.company} • {job.applicants || 0} Applicants
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {job.jobLevel && (
              <Badge
                variant="outline"
                className={`text-xs px-2 py-0.5 ${getJobLevelColor(
                  job.jobLevel
                )}`}
              >
                {job.jobLevel}
              </Badge>
            )}
            {job.jobType && (
              <Badge
                variant="outline"
                className={`text-xs px-2 py-0.5 ${getJobTypeColor(
                  job.jobType
                )}`}
              >
                {job.jobType}
              </Badge>
            )}
            {job.isRemote !== undefined && (
              <Badge
                variant="outline"
                className={`text-xs px-2 py-0.5 ${getRemoteColor()}`}
              >
                {job.isRemote ? "Remote" : "On-site"}
            </Badge>
            )}
          </div>

          {/* Description */}
          <div className="flex-none mb-2 px-1">
            <p className="text-sm text-slate-700 leading-relaxed line-clamp-2">
              {job.fullDescription || job.description}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200 my-3 flex-shrink-0"></div>

          {/* Salary & Posted Date */}
          <div className="flex items-center justify-between mb-2 flex-shrink-0 text-xs text-slate-600">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {formatSalary(job.ctc)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {job.location && <span>{job.location}</span>}
              <span>•</span>
              <span>Posted {job.postedDaysAgo || 0} days ago</span>
            </div>
          </div>

          {/* Apply Button */}
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              onClick={handleApplyClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white flex-shrink-0 transition-colors"
              size="sm"
            >
              Apply Now
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
