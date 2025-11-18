"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import type { OnboardingData } from "../page";

interface PersonalInfoStepProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
}

export default function PersonalInfoStep({ data, onNext, onBack }: PersonalInfoStepProps) {
  const [formData, setFormData] = useState(data.personalInfo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ personalInfo: formData });
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const autoFillDemoData = () => {
    setFormData({
      name: "Priya Sharma",
      email: "priya.sharma@student.edu",
      phone: "+91 98765 43210",
      dateOfBirth: "2000-05-15",
      gender: "female",
      address: "123, Main Street, Andheri West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400053",
      linkedin: "linkedin.com/in/priyasharma",
      github: "github.com/priyasharma",
      portfolio: "priyasharma.dev",
      twitter: "twitter.com/priyasharma",
    });
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "l" || e.key === "L") {
        autoFillDemoData();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <Card className="border-none shadow-2xl">
      <CardContent className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Personal Information</h2>
          <p className="text-slate-600">
            Review and update your personal details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
                placeholder="john@student.edu"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                required
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => updateField("dateOfBirth", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="gender">Gender *</Label>
              <Select value={formData.gender} onValueChange={(value) => updateField("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => updateField("city", e.target.value)}
                required
                placeholder="Mumbai"
              />
            </div>

            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => updateField("state", e.target.value)}
                required
                placeholder="Maharashtra"
              />
            </div>

            <div>
              <Label htmlFor="pincode">Pincode *</Label>
              <Input
                id="pincode"
                value={formData.pincode}
                onChange={(e) => updateField("pincode", e.target.value)}
                required
                placeholder="400001"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Full Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => updateField("address", e.target.value)}
              required
              placeholder="123, Main Street, Area Name"
            />
          </div>

          <div className="border-t pt-6 mt-6">
            <h3 className="font-semibold text-slate-900 mb-4">Social Links (Optional)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin || ""}
                  onChange={(e) => updateField("linkedin", e.target.value)}
                  placeholder="linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <Label htmlFor="github">GitHub Profile</Label>
                <Input
                  id="github"
                  value={formData.github || ""}
                  onChange={(e) => updateField("github", e.target.value)}
                  placeholder="github.com/yourprofile"
                />
              </div>

              <div>
                <Label htmlFor="portfolio">Portfolio Website</Label>
                <Input
                  id="portfolio"
                  value={formData.portfolio || ""}
                  onChange={(e) => updateField("portfolio", e.target.value)}
                  placeholder="yourportfolio.com"
                />
              </div>

              <div>
                <Label htmlFor="twitter">Twitter Profile</Label>
                <Input
                  id="twitter"
                  value={formData.twitter || ""}
                  onChange={(e) => updateField("twitter", e.target.value)}
                  placeholder="twitter.com/yourhandle"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Continue
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

