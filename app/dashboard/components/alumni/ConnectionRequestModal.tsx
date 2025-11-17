"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { toast } from "sonner";
import type { Alumni } from "@/lib/mockData";

interface ConnectionRequestModalProps {
  alumni: Alumni | null;
  open: boolean;
  onClose: () => void;
  onSend: (alumni: Alumni, message: string) => void;
}

export default function ConnectionRequestModal({
  alumni,
  open,
  onClose,
  onSend,
}: ConnectionRequestModalProps) {
  const [message, setMessage] = useState("");

  if (!alumni) return null;

  const handleSend = () => {
    if (message.trim().length < 10) {
      toast.error("Please write a message (at least 10 characters)");
      return;
    }
    onSend(alumni, message);
    setMessage("");
    onClose();
    toast.success(`Connection request sent to ${alumni.name}!`);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle>Connect with {alumni.name}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              placeholder={`Hi ${alumni.name.split(" ")[0]}, I'd love to connect and learn more about your experience at ${alumni.company}...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2 min-h-[120px]"
            />
            <p className="text-xs text-slate-500 mt-1">
              {message.length}/500 characters
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSend} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Send Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

