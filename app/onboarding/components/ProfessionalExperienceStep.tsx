"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import type { OnboardingData } from "../page";

interface ProfessionalExperienceStepProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  onSkip: () => void;
}

export default function ProfessionalExperienceStep({ data, onNext, onBack, onSkip }: ProfessionalExperienceStepProps) {
  const [experiences, setExperiences] = useState(data.professionalExperience);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ professionalExperience: experiences });
  };

  const addExperience = () => {
    setExperiences(prev => [
      ...prev,
      { company: "", role: "", type: "Internship", duration: "", location: "", description: "" }
    ]);
  };

  const removeExperience = (index: number) => {
    setExperiences(prev => prev.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    setExperiences(prev => prev.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    ));
  };

  return (
    <Card className="border-none shadow-2xl">
      <CardContent className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Professional Experience</h2>
          <p className="text-slate-600">Add your work experience and internships</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-600">
              {experiences.length} experience(s) added
            </p>
            <Button type="button" variant="outline" size="sm" onClick={addExperience}>
              <Plus className="w-4 h-4 mr-1" />
              Add Experience
            </Button>
          </div>

          {experiences.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
              <p className="text-slate-600 mb-4">No experience added yet</p>
              <Button type="button" variant="outline" onClick={addExperience}>
                <Plus className="w-4 h-4 mr-1" />
                Add Your First Experience
              </Button>
            </div>
          )}

          {experiences.map((exp, index) => (
            <div key={index} className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <h4 className="font-semibold text-slate-900">Experience #{index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(index)}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Company *</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                    required
                    placeholder="Amazon"
                  />
                </div>
                <div>
                  <Label>Role *</Label>
                  <Input
                    value={exp.role}
                    onChange={(e) => updateExperience(index, "role", e.target.value)}
                    required
                    placeholder="Business Analyst Intern"
                  />
                </div>
                <div>
                  <Label>Type *</Label>
                  <Select 
                    value={exp.type} 
                    onValueChange={(value) => updateExperience(index, "type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Duration *</Label>
                  <Input
                    value={exp.duration}
                    onChange={(e) => updateExperience(index, "duration", e.target.value)}
                    required
                    placeholder="3 months"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Location *</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) => updateExperience(index, "location", e.target.value)}
                    required
                    placeholder="Bangalore"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Description *</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    required
                    placeholder="Describe your responsibilities and achievements..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <div className="flex items-center gap-3">
              {experiences.length === 0 && (
                <Button type="button" variant="ghost" onClick={onSkip}>
                  Skip for now
                </Button>
              )}
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Continue
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

