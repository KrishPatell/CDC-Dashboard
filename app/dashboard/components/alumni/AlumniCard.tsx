"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Linkedin, MapPin, Building2, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";
import type { Alumni } from "@/lib/mockData";

interface AlumniCardProps {
  alumni: Alumni;
  onConnect: (alumni: Alumni) => void;
  onViewProfile: (alumni: Alumni) => void;
}

export default function AlumniCard({ alumni, onConnect, onViewProfile }: AlumniCardProps) {
  const getAvailabilityColor = (availability?: string) => {
    switch (availability) {
      case "available":
        return "bg-green-500";
      case "busy":
        return "bg-red-500";
      case "open":
        return "bg-yellow-500";
      default:
        return "bg-slate-400";
    }
  };

  const getConnectionButtonText = () => {
    switch (alumni.connectionStatus) {
      case "connected":
        return "Message";
      case "pending":
        return "Pending";
      case "referred":
        return "Referred";
      default:
        return "Connect";
    }
  };

  const isConnectionDisabled = alumni.connectionStatus === "pending" || alumni.connectionStatus === "referred";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-lg transition-all cursor-pointer border-slate-200">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-slate-200">
                <AvatarImage src={alumni.avatarUrl} alt={alumni.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-sky-500 text-white font-semibold">
                  {alumni.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {alumni.availability && (
                <div
                  className={`absolute bottom-0 right-0 h-4 w-4 ${getAvailabilityColor(
                    alumni.availability
                  )} rounded-full border-2 border-white`}
                  title={alumni.availability}
                />
              )}
            </div>

            <div className="flex-1 min-w-0 flex flex-col h-full">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3
                    className="font-bold text-slate-900 text-lg mb-1 cursor-pointer hover:text-blue-600"
                    onClick={() => onViewProfile(alumni)}
                  >
                    {alumni.name}
                  </h3>
                  <p className="text-sm text-slate-600 font-medium">{alumni.role}</p>
                </div>
                {alumni.linkedInUrl && (
                  <a
                    href={alumni.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Building2 className="h-3.5 w-3.5" />
                  <span className="font-medium">{alumni.company}</span>
                </div>
                {alumni.location && (
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{alumni.location}</span>
                  </div>
                )}
                {alumni.batch && (
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Users className="h-3.5 w-3.5" />
                    <span>Batch {alumni.batch}</span>
                  </div>
                )}
                {alumni.yearsAtCompany && (
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{alumni.yearsAtCompany} at company</span>
                  </div>
                )}
              </div>

              {alumni.skills && alumni.skills.length > 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1.5">
                    {alumni.skills.slice(0, 3).map((skill, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {alumni.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{alumni.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {alumni.mutualConnections !== undefined && alumni.mutualConnections > 0 && (
                <p className="text-xs text-blue-600 mb-3">
                  {alumni.mutualConnections} mutual connection{alumni.mutualConnections > 1 ? "s" : ""}
                </p>
              )}

              <div className="flex flex-col gap-2 mt-auto pt-4">
                <Button
                  onClick={() => onConnect(alumni)}
                  disabled={isConnectionDisabled}
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  variant={isConnectionDisabled ? "outline" : "default"}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {getConnectionButtonText()}
                </Button>
                <Button
                  onClick={() => onViewProfile(alumni)}
                  size="sm"
                  variant="outline"
                  className="w-full"
                >
                  View Profile
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

