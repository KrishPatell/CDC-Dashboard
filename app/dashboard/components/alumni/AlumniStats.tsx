"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, MapPin, TrendingUp } from "lucide-react";
import type { Alumni } from "@/lib/mockData";

interface AlumniStatsProps {
  alumni: Alumni[];
}

export default function AlumniStats({ alumni }: AlumniStatsProps) {
  const totalAlumni = alumni.length;
  const uniqueCompanies = new Set(alumni.map((a) => a.company)).size;
  const uniqueLocations = new Set(alumni.map((a) => a.location).filter(Boolean)).size;
  const connectedCount = alumni.filter((a) => a.connectionStatus === "connected").length;

  // Top companies
  const companyCounts = alumni.reduce((acc, alum) => {
    acc[alum.company] = (acc[alum.company] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCompanies = Object.entries(companyCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Total Alumni</p>
              <p className="text-2xl font-bold text-slate-900">{totalAlumni}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Companies</p>
              <p className="text-2xl font-bold text-slate-900">{uniqueCompanies}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Locations</p>
              <p className="text-2xl font-bold text-slate-900">{uniqueLocations}</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Connected</p>
              <p className="text-2xl font-bold text-slate-900">{connectedCount}</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {topCompanies.length > 0 && (
        <Card className="md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-lg">Top Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {topCompanies.map(([company, count]) => (
                <div
                  key={company}
                  className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200"
                >
                  <Building2 className="h-4 w-4 text-slate-600" />
                  <span className="font-medium text-slate-900">{company}</span>
                  <span className="text-sm text-slate-600">({count})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

