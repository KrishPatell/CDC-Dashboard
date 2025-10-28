"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { alumni } from "@/lib/mockData";

interface AlumniListProps {
  onConnect: (name: string) => void;
}

export default function AlumniList({ onConnect }: AlumniListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Alumni Quick Connect</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alumni.slice(0, 3).map((alum, idx) => (
          <motion.div
            key={alum.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-3 p-3 border rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Avatar>
              <AvatarImage src={alum.avatarUrl} />
              <AvatarFallback>
                {alum.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-slate-900">
                {alum.name}
              </h4>
              <p className="text-xs text-slate-600">
                {alum.role} at {alum.company}
              </p>
            </div>
            <Button
              onClick={() => onConnect(alum.name)}
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Chat
            </Button>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}

