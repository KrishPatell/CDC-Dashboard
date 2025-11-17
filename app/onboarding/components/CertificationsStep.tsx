"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import type { OnboardingData } from "../page";

interface CertificationsStepProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  onSkip: () => void;
}

export default function CertificationsStep({ data, onNext, onBack, onSkip }: CertificationsStepProps) {
  const [certifications, setCertifications] = useState(data.certifications);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ certifications });
  };

  const addCertification = () => {
    setCertifications(prev => [
      ...prev,
      { name: "", issuer: "", date: "", credentialId: "" }
    ]);
  };

  const removeCertification = (index: number) => {
    setCertifications(prev => prev.filter((_, i) => i !== index));
  };

  const updateCertification = (index: number, field: string, value: string) => {
    setCertifications(prev => prev.map((cert, i) =>
      i === index ? { ...cert, [field]: value } : cert
    ));
  };

  return (
    <Card className="border-none shadow-2xl">
      <CardContent className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Certifications</h2>
          <p className="text-slate-600">Add your professional certifications and courses</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-600">
              {certifications.length} certification(s) added
            </p>
            <Button type="button" variant="outline" size="sm" onClick={addCertification}>
              <Plus className="w-4 h-4 mr-1" />
              Add Certification
            </Button>
          </div>

          {certifications.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
              <p className="text-slate-600 mb-4">No certifications added yet</p>
              <Button type="button" variant="outline" onClick={addCertification}>
                <Plus className="w-4 h-4 mr-1" />
                Add Your First Certification
              </Button>
            </div>
          )}

          {certifications.map((cert, index) => (
            <div key={index} className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <h4 className="font-semibold text-slate-900">Certification #{index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCertification(index)}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label>Certification Name *</Label>
                  <Input
                    value={cert.name}
                    onChange={(e) => updateCertification(index, "name", e.target.value)}
                    required
                    placeholder="Google Data Analytics Professional Certificate"
                  />
                </div>
                <div>
                  <Label>Issuing Organization *</Label>
                  <Input
                    value={cert.issuer}
                    onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                    required
                    placeholder="Google"
                  />
                </div>
                <div>
                  <Label>Issue Date *</Label>
                  <Input
                    type="month"
                    value={cert.date}
                    onChange={(e) => updateCertification(index, "date", e.target.value)}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Credential ID (Optional)</Label>
                  <Input
                    value={cert.credentialId}
                    onChange={(e) => updateCertification(index, "credentialId", e.target.value)}
                    placeholder="ABC123456"
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
              {certifications.length === 0 && (
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

