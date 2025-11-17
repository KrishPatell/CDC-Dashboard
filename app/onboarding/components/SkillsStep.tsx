"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Trash2 } from "lucide-react";
import type { OnboardingData } from "../page";

interface SkillsStepProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
}

export default function SkillsStep({ data, onNext, onBack }: SkillsStepProps) {
  const [skills, setSkills] = useState(data.skills);
  const [techInput, setTechInput] = useState("");
  const [softInput, setSoftInput] = useState("");
  const [toolInput, setToolInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ skills });
  };

  const addSkill = (category: "technical" | "soft" | "tools", value: string) => {
    if (value.trim()) {
      setSkills(prev => ({
        ...prev,
        [category]: [...prev[category], value.trim()]
      }));
    }
  };

  const removeSkill = (category: "technical" | "soft" | "tools", index: number) => {
    setSkills(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
  };

  const addLanguage = () => {
    setSkills(prev => ({
      ...prev,
      languages: [...prev.languages, { name: "", proficiency: "Intermediate" }]
    }));
  };

  const removeLanguage = (index: number) => {
    setSkills(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const updateLanguage = (index: number, field: string, value: string) => {
    setSkills(prev => ({
      ...prev,
      languages: prev.languages.map((lang, i) =>
        i === index ? { ...lang, [field]: value } : lang
      )
    }));
  };

  return (
    <Card className="border-none shadow-2xl">
      <CardContent className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Skills & Languages</h2>
          <p className="text-slate-600">Showcase your skills and language proficiency</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Technical Skills */}
          <div>
            <Label className="text-base font-semibold">Technical Skills</Label>
            <p className="text-sm text-slate-600 mb-3">
              Add programming languages, frameworks, and technical skills
            </p>
            <div className="flex gap-2 mb-3">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="e.g., Python, React, SQL"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill("technical", techInput);
                    setTechInput("");
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => {
                  addSkill("technical", techInput);
                  setTechInput("");
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.technical.map((skill, index) => (
                <Badge key={index} variant="secondary" className="pl-3 pr-1 py-1.5">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill("technical", index)}
                    className="ml-2 hover:bg-slate-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <Label className="text-base font-semibold">Soft Skills</Label>
            <p className="text-sm text-slate-600 mb-3">
              Add interpersonal and professional skills
            </p>
            <div className="flex gap-2 mb-3">
              <Input
                value={softInput}
                onChange={(e) => setSoftInput(e.target.value)}
                placeholder="e.g., Leadership, Communication"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill("soft", softInput);
                    setSoftInput("");
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => {
                  addSkill("soft", softInput);
                  setSoftInput("");
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.soft.map((skill, index) => (
                <Badge key={index} variant="secondary" className="pl-3 pr-1 py-1.5">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill("soft", index)}
                    className="ml-2 hover:bg-slate-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Tools & Software */}
          <div>
            <Label className="text-base font-semibold">Tools & Software</Label>
            <p className="text-sm text-slate-600 mb-3">
              Add tools, software, and platforms you're proficient with
            </p>
            <div className="flex gap-2 mb-3">
              <Input
                value={toolInput}
                onChange={(e) => setToolInput(e.target.value)}
                placeholder="e.g., Excel, Tableau, Figma"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill("tools", toolInput);
                    setToolInput("");
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => {
                  addSkill("tools", toolInput);
                  setToolInput("");
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((tool, index) => (
                <Badge key={index} variant="secondary" className="pl-3 pr-1 py-1.5">
                  {tool}
                  <button
                    type="button"
                    onClick={() => removeSkill("tools", index)}
                    className="ml-2 hover:bg-slate-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Label className="text-base font-semibold">Languages</Label>
                <p className="text-sm text-slate-600">Add languages you can speak</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addLanguage}>
                <Plus className="w-4 h-4 mr-1" />
                Add Language
              </Button>
            </div>

            {skills.languages.map((lang, index) => (
              <div key={index} className="flex items-end gap-3 mb-3">
                <div className="flex-1">
                  <Label>Language</Label>
                  <Input
                    value={lang.name}
                    onChange={(e) => updateLanguage(index, "name", e.target.value)}
                    placeholder="English"
                  />
                </div>
                <div className="flex-1">
                  <Label>Proficiency</Label>
                  <Select
                    value={lang.proficiency}
                    onValueChange={(value) => updateLanguage(index, "proficiency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Native">Native</SelectItem>
                      <SelectItem value="Fluent">Fluent</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Basic">Basic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLanguage(index)}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
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

