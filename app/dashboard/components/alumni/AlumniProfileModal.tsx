"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  Users,
  Clock,
  Linkedin,
  Mail,
  Calendar,
  Briefcase,
  GraduationCap,
  X,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Alumni } from "@/lib/mockData";

interface AlumniProfileModalProps {
  alumni: Alumni | null;
  open: boolean;
  onClose: () => void;
  onConnect: (alumni: Alumni) => void;
}

export default function AlumniProfileModal({
  alumni,
  open,
  onClose,
  onConnect,
}: AlumniProfileModalProps) {
  if (!alumni) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Alumni Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24 border-2 border-slate-200">
              <AvatarImage src={alumni.avatarUrl} alt={alumni.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-sky-500 text-white text-xl font-bold">
                {alumni.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">{alumni.name}</h2>
              <p className="text-lg text-slate-600 mb-2">{alumni.role}</p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                {alumni.company && (
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    <span>{alumni.company}</span>
                  </div>
                )}
                {alumni.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{alumni.location}</span>
                  </div>
                )}
                {alumni.batch && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Batch {alumni.batch}</span>
                  </div>
                )}
                {alumni.yearsAtCompany && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{alumni.yearsAtCompany}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => onConnect(alumni)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Connect
                </Button>
                {alumni.linkedInUrl && (
                  <Button variant="outline" asChild>
                    <a href={alumni.linkedInUrl} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Bio */}
          {alumni.bio && (
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">About</h3>
              <p className="text-slate-600">{alumni.bio}</p>
            </div>
          )}

          {/* Skills */}
          {alumni.skills && alumni.skills.length > 0 && (
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {alumni.skills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Past Companies */}
          {alumni.pastCompanies && alumni.pastCompanies.length > 0 && (
            <div>
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Experience
              </h3>
              <div className="space-y-3">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <p className="font-medium text-slate-900">{alumni.role}</p>
                  <p className="text-sm text-slate-600">{alumni.company}</p>
                  {alumni.yearsAtCompany && (
                    <p className="text-xs text-slate-500 mt-1">{alumni.yearsAtCompany}</p>
                  )}
                </div>
                {alumni.pastCompanies.map((exp, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <p className="font-medium text-slate-900">{exp.role}</p>
                    <p className="text-sm text-slate-600">{exp.company}</p>
                    <p className="text-xs text-slate-500 mt-1">{exp.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {alumni.education && alumni.education.length > 0 && (
            <div>
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Education
              </h3>
              <div className="space-y-2">
                {alumni.education.map((edu, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <p className="font-medium text-slate-900">{edu.degree}</p>
                    <p className="text-sm text-slate-600">{edu.institution}</p>
                    <p className="text-xs text-slate-500 mt-1">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Connection Status */}
          {alumni.mutualConnections !== undefined && alumni.mutualConnections > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>{alumni.mutualConnections}</strong> mutual connection
                {alumni.mutualConnections > 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

