"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Mail, Users, Shield } from "lucide-react";
import type { OnboardingData } from "../page";

interface PreferencesStepProps {
  data: OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
}

export default function PreferencesStep({ data, onNext, onBack }: PreferencesStepProps) {
  const [preferences, setPreferences] = useState(data.preferences);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ preferences });
  };

  const updateField = (field: string, value: boolean | string) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="border-none shadow-2xl max-w-2xl mx-auto">
      <CardContent className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Communication Preferences</h2>
          <p className="text-slate-600">Customize your notification and privacy settings</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Notifications */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">Job Alerts</Label>
                    <p className="text-sm text-slate-600">
                      Get notified about new job opportunities matching your profile
                    </p>
                  </div>
                  <Switch
                    checked={preferences.jobAlerts}
                    onCheckedChange={(checked) => updateField("jobAlerts", checked)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">Newsletter</Label>
                    <p className="text-sm text-slate-600">
                      Receive weekly updates about career tips and industry insights
                    </p>
                  </div>
                  <Switch
                    checked={preferences.newsletter}
                    onCheckedChange={(checked) => updateField("newsletter", checked)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold">Mentorship Program</Label>
                    <p className="text-sm text-slate-600">
                      Interested in connecting with mentors and alumni
                    </p>
                  </div>
                  <Switch
                    checked={preferences.mentorship}
                    onCheckedChange={(checked) => updateField("mentorship", checked)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="border-t pt-6">
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <Label className="text-base font-semibold mb-3 block">Profile Visibility</Label>
                <Select value={preferences.privacy} onValueChange={(value) => updateField("privacy", value)}>
                  <SelectTrigger className="w-full h-auto min-h-[60px] py-3 px-3 text-left items-start">
                    <SelectValue>
                      {preferences.privacy === "public" ? (
                        <div className="flex flex-col items-start gap-0.5">
                          <span className="font-medium text-sm leading-tight">Public</span>
                          <span className="text-xs text-slate-500 leading-tight">Visible to all employers and recruiters</span>
                        </div>
                      ) : preferences.privacy === "verified" ? (
                        <div className="flex flex-col items-start gap-0.5">
                          <span className="font-medium text-sm leading-tight">Verified Companies Only</span>
                          <span className="text-xs text-slate-500 leading-tight">Visible to verified partner companies</span>
                        </div>
                      ) : preferences.privacy === "private" ? (
                        <div className="flex flex-col items-start gap-0.5">
                          <span className="font-medium text-sm leading-tight">Private</span>
                          <span className="text-xs text-slate-500 leading-tight">Only visible when you apply</span>
                        </div>
                      ) : (
                        "Select privacy setting"
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent align="start" className="w-[var(--radix-select-trigger-width)]">
                    <SelectItem value="public" className="py-3 cursor-pointer">
                      <div className="flex flex-col items-start text-left w-full gap-0.5">
                        <p className="font-medium text-sm leading-tight">Public</p>
                        <p className="text-xs text-slate-500 leading-tight">Visible to all employers and recruiters</p>
                      </div>
                    </SelectItem>
                    <SelectItem value="verified" className="py-3 cursor-pointer">
                      <div className="flex flex-col items-start text-left w-full gap-0.5">
                        <p className="font-medium text-sm leading-tight">Verified Companies Only</p>
                        <p className="text-xs text-slate-500 leading-tight">Visible to verified partner companies</p>
                      </div>
                    </SelectItem>
                    <SelectItem value="private" className="py-3 cursor-pointer">
                      <div className="flex flex-col items-start text-left w-full gap-0.5">
                        <p className="font-medium text-sm leading-tight">Private</p>
                        <p className="text-xs text-slate-500 leading-tight">Only visible when you apply</p>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              💡 <span className="font-medium">Pro tip:</span> Enabling job alerts and keeping your profile public increases your chances of being discovered by top recruiters.
            </p>
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

