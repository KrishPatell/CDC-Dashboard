"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Search, FileText } from "lucide-react";
import { jobs } from "@/lib/mockData";
import type { Job } from "@/lib/mockData";

interface JobSelectorProps {
  selectedJob: Job | null;
  onJobSelect: (job: Job | null) => void;
}

export default function JobSelector({ selectedJob, onJobSelect }: JobSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Job Description</h3>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Select
            value={selectedJob?.id.toString()}
            onValueChange={(value) => {
              const job = jobs.find((j) => j.id === parseInt(value));
              onJobSelect(job || null);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a job to compare" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {filteredJobs.map((job) => (
                <SelectItem key={job.id} value={job.id.toString()}>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>
                      {job.title} - {job.company}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedJob && (
            <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-slate-900">{selectedJob.title}</h4>
                  <p className="text-sm text-slate-600">{selectedJob.company}</p>
                </div>
                {selectedJob.matchScore && (
                  <Badge className="bg-blue-100 text-blue-700">
                    {selectedJob.matchScore}% Match
                  </Badge>
                )}
              </div>
              <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                {selectedJob.description}
              </p>
              {selectedJob.skills && selectedJob.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {selectedJob.skills.slice(0, 4).map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {selectedJob.skills.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{selectedJob.skills.length - 4}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Upload Custom Job Description
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

