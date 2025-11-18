"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import type { OnboardingData } from "../page";

interface CareerGoalsStepProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
}

export default function CareerGoalsStep({ data, onNext, onBack }: CareerGoalsStepProps) {
  const [careerGoals, setCareerGoals] = useState(data.careerGoals);
  const [industryInput, setIndustryInput] = useState("");
  const [roleInput, setRoleInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ careerGoals });
  };

  const autoFillDemoData = () => {
    setCareerGoals({
      shortTerm: "Secure a product management role at a leading tech company, focusing on data-driven product development and user experience optimization.",
      longTerm: "Become a senior product leader, leading cross-functional teams to build innovative products that solve real-world problems. Eventually, I aim to start my own tech venture.",
      industries: ["Technology", "Finance", "Consulting"],
      roles: ["Product Manager", "Business Analyst", "Data Analyst"],
      locations: ["Bangalore", "Mumbai", "Delhi"],
      workMode: "hybrid",
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

  const updateField = (field: string, value: string) => {
    setCareerGoals(prev => ({ ...prev, [field]: value }));
  };

  const addItem = (field: "industries" | "roles" | "locations", value: string) => {
    if (value.trim()) {
      setCareerGoals(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
    }
  };

  const removeItem = (field: "industries" | "roles" | "locations", index: number) => {
    setCareerGoals(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const popularIndustries = ["Technology", "Finance", "Consulting", "Healthcare", "E-commerce", "FMCG"];
  const popularRoles = ["Product Manager", "Business Analyst", "Consultant", "Data Analyst", "Marketing Manager"];
  const popularLocations = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai"];

  return (
    <Card className="border-none shadow-2xl">
      <CardContent className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Career Goals</h2>
          <p className="text-slate-600">Help us understand your career aspirations</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Short-term Goals */}
          <div>
            <Label htmlFor="shortTerm">Short-term Goals (1-2 years) *</Label>
            <Textarea
              id="shortTerm"
              value={careerGoals.shortTerm}
              onChange={(e) => updateField("shortTerm", e.target.value)}
              required
              placeholder="What do you want to achieve in the next 1-2 years?"
              rows={3}
            />
          </div>

          {/* Long-term Goals */}
          <div>
            <Label htmlFor="longTerm">Long-term Goals (3-5 years) *</Label>
            <Textarea
              id="longTerm"
              value={careerGoals.longTerm}
              onChange={(e) => updateField("longTerm", e.target.value)}
              required
              placeholder="Where do you see yourself in 3-5 years?"
              rows={3}
            />
          </div>

          {/* Preferred Industries */}
          <div>
            <Label className="text-base font-semibold">Preferred Industries *</Label>
            <p className="text-sm text-slate-600 mb-3">Select or add industries you're interested in</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {popularIndustries.map((industry) => (
                <Button
                  key={industry}
                  type="button"
                  variant={careerGoals.industries.includes(industry) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (careerGoals.industries.includes(industry)) {
                      removeItem("industries", careerGoals.industries.indexOf(industry));
                    } else {
                      addItem("industries", industry);
                    }
                  }}
                >
                  {industry}
                </Button>
              ))}
            </div>

            <div className="flex gap-2 mb-3">
              <Input
                value={industryInput}
                onChange={(e) => setIndustryInput(e.target.value)}
                placeholder="Add custom industry"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addItem("industries", industryInput);
                    setIndustryInput("");
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => {
                  addItem("industries", industryInput);
                  setIndustryInput("");
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {careerGoals.industries.map((industry, index) => (
                <Badge key={index} variant="secondary" className="pl-3 pr-1 py-1.5">
                  {industry}
                  <button
                    type="button"
                    onClick={() => removeItem("industries", index)}
                    className="ml-2 hover:bg-slate-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Preferred Roles */}
          <div>
            <Label className="text-base font-semibold">Preferred Roles *</Label>
            <p className="text-sm text-slate-600 mb-3">Select or add roles you're interested in</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {popularRoles.map((role) => (
                <Button
                  key={role}
                  type="button"
                  variant={careerGoals.roles.includes(role) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (careerGoals.roles.includes(role)) {
                      removeItem("roles", careerGoals.roles.indexOf(role));
                    } else {
                      addItem("roles", role);
                    }
                  }}
                >
                  {role}
                </Button>
              ))}
            </div>

            <div className="flex gap-2 mb-3">
              <Input
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                placeholder="Add custom role"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addItem("roles", roleInput);
                    setRoleInput("");
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => {
                  addItem("roles", roleInput);
                  setRoleInput("");
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {careerGoals.roles.map((role, index) => (
                <Badge key={index} variant="secondary" className="pl-3 pr-1 py-1.5">
                  {role}
                  <button
                    type="button"
                    onClick={() => removeItem("roles", index)}
                    className="ml-2 hover:bg-slate-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Preferred Locations */}
          <div>
            <Label className="text-base font-semibold">Preferred Locations *</Label>
            <p className="text-sm text-slate-600 mb-3">Select or add locations you'd like to work in</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {popularLocations.map((location) => (
                <Button
                  key={location}
                  type="button"
                  variant={careerGoals.locations.includes(location) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (careerGoals.locations.includes(location)) {
                      removeItem("locations", careerGoals.locations.indexOf(location));
                    } else {
                      addItem("locations", location);
                    }
                  }}
                >
                  {location}
                </Button>
              ))}
            </div>

            <div className="flex gap-2 mb-3">
              <Input
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Add custom location"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addItem("locations", locationInput);
                    setLocationInput("");
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => {
                  addItem("locations", locationInput);
                  setLocationInput("");
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {careerGoals.locations.map((location, index) => (
                <Badge key={index} variant="secondary" className="pl-3 pr-1 py-1.5">
                  {location}
                  <button
                    type="button"
                    onClick={() => removeItem("locations", index)}
                    className="ml-2 hover:bg-slate-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Work Mode Preference */}
          <div>
            <Label htmlFor="workMode">Preferred Work Mode *</Label>
            <Select value={careerGoals.workMode} onValueChange={(value) => updateField("workMode", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="onsite">On-site</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
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

