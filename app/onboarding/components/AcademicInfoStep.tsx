"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import type { OnboardingData } from "../page";

interface AcademicInfoStepProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
}

export default function AcademicInfoStep({ data, onNext, onBack }: AcademicInfoStepProps) {
  const [formData, setFormData] = useState(data.academicInfo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ academicInfo: formData });
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const autoFillDemoData = () => {
    setFormData({
      program: "MBA",
      batch: "2026",
      cgpa: "3.8",
      major: "Business Analytics",
      minor: "Finance",
      expectedGraduation: "2026-05",
      previousEducation: [
        {
          degree: "B.Tech",
          institution: "IIT Delhi",
          year: "2024",
          percentage: "85%",
        },
      ],
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

  const addPreviousEducation = () => {
    setFormData(prev => ({
      ...prev,
      previousEducation: [
        ...prev.previousEducation,
        { degree: "", institution: "", year: "", percentage: "" }
      ]
    }));
  };

  const removePreviousEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      previousEducation: prev.previousEducation.filter((_, i) => i !== index)
    }));
  };

  const updatePreviousEducation = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      previousEducation: prev.previousEducation.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  return (
    <Card className="border-none shadow-2xl">
      <CardContent className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Academic Information</h2>
          <p className="text-slate-600">Tell us about your education</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="program">Current Program *</Label>
              <Select value={formData.program} onValueChange={(value) => updateField("program", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MBA">MBA</SelectItem>
                  <SelectItem value="M.Tech">M.Tech</SelectItem>
                  <SelectItem value="B.Tech">B.Tech</SelectItem>
                  <SelectItem value="BBA">BBA</SelectItem>
                  <SelectItem value="B.Sc">B.Sc</SelectItem>
                  <SelectItem value="M.Sc">M.Sc</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="batch">Batch Year *</Label>
              <Input
                id="batch"
                value={formData.batch}
                onChange={(e) => updateField("batch", e.target.value)}
                required
                placeholder="2026"
              />
            </div>

            <div>
              <Label htmlFor="major">Major/Specialization *</Label>
              <Input
                id="major"
                value={formData.major}
                onChange={(e) => updateField("major", e.target.value)}
                required
                placeholder="Business Analytics"
              />
            </div>

            <div>
              <Label htmlFor="minor">Minor (Optional)</Label>
              <Input
                id="minor"
                value={formData.minor || ""}
                onChange={(e) => updateField("minor", e.target.value)}
                placeholder="Finance"
              />
            </div>

            <div>
              <Label htmlFor="cgpa">Current CGPA/Percentage *</Label>
              <Input
                id="cgpa"
                value={formData.cgpa}
                onChange={(e) => updateField("cgpa", e.target.value)}
                required
                placeholder="3.8 / 85%"
              />
            </div>

            <div>
              <Label htmlFor="expectedGraduation">Expected Graduation *</Label>
              <Input
                id="expectedGraduation"
                type="month"
                value={formData.expectedGraduation}
                onChange={(e) => updateField("expectedGraduation", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Previous Education</h3>
              <Button type="button" variant="outline" size="sm" onClick={addPreviousEducation}>
                <Plus className="w-4 h-4 mr-1" />
                Add Education
              </Button>
            </div>

            {formData.previousEducation.map((edu, index) => (
              <div key={index} className="bg-slate-50 rounded-lg p-4 mb-3">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium text-slate-900">Education #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removePreviousEducation(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Degree *</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updatePreviousEducation(index, "degree", e.target.value)}
                      required
                      placeholder="B.Tech"
                    />
                  </div>
                  <div>
                    <Label>Institution *</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updatePreviousEducation(index, "institution", e.target.value)}
                      required
                      placeholder="IIT Delhi"
                    />
                  </div>
                  <div>
                    <Label>Year of Completion *</Label>
                    <Input
                      value={edu.year}
                      onChange={(e) => updatePreviousEducation(index, "year", e.target.value)}
                      required
                      placeholder="2024"
                    />
                  </div>
                  <div>
                    <Label>Percentage/CGPA *</Label>
                    <Input
                      value={edu.percentage}
                      onChange={(e) => updatePreviousEducation(index, "percentage", e.target.value)}
                      required
                      placeholder="85%"
                    />
                  </div>
                </div>
              </div>
            ))}
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

