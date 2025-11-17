"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { alumni } from "@/lib/mockData";
import { useState } from "react";

interface AlumniListProps {
  onConnect: (name: string) => void;
}

export default function AlumniList({ onConnect }: AlumniListProps) {
  const itemsPerPage = 4;
  const [page, setPage] = useState(0);

  const startIndex = page * itemsPerPage;
  const visibleAlumni = alumni.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.max(1, Math.ceil(alumni.length / itemsPerPage));

  const goPrev = () => {
    setPage((prev) => Math.max(0, prev - 1));
  };

  const goNext = () => {
    setPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Alumni Quick Connect</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {visibleAlumni.map((alum, idx) => (
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
      <CardFooter className="flex items-center justify-between px-6 pt-0">
        <p className="text-xs text-slate-500">
          Showing {Math.min(startIndex + 1, alumni.length)}-
          {Math.min(startIndex + visibleAlumni.length, alumni.length)} of{" "}
          {alumni.length}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goPrev}
            disabled={page === 0}
          >
            Prev
          </Button>
          <span className="text-xs text-slate-500">
            {page + 1}/{totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={goNext}
            disabled={page >= totalPages - 1}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

