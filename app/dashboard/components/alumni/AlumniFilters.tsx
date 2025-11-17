"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Alumni } from "@/lib/mockData";

interface AlumniFiltersProps {
  alumni: Alumni[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export interface FilterState {
  companies: string[];
  roles: string[];
  batches: string[];
  locations: string[];
  industries: string[];
  availability: string[];
  experienceRange: [number, number];
  searchQuery: string;
}

export default function AlumniFilters({
  alumni,
  filters,
  onFiltersChange,
}: AlumniFiltersProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  // Extract unique values for filters
  const companies = Array.from(new Set(alumni.map((a) => a.company))).sort();
  const roles = Array.from(new Set(alumni.map((a) => a.role))).sort();
  const batches = Array.from(new Set(alumni.map((a) => a.batch).filter((b): b is string => Boolean(b)))).sort();
  const locations = Array.from(new Set(alumni.map((a) => a.location).filter((l): l is string => Boolean(l)))).sort();
  const industries = Array.from(new Set(alumni.map((a) => a.industry).filter((i): i is string => Boolean(i)))).sort();
  const availabilityOptions = ["available", "busy", "open"];

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleArrayFilter = (key: "companies" | "roles" | "batches" | "locations" | "industries" | "availability", value: string) => {
    const current = localFilters[key] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilter(key, updated);
  };

  const clearFilters = () => {
    const cleared: FilterState = {
      companies: [],
      roles: [],
      batches: [],
      locations: [],
      industries: [],
      availability: [],
      experienceRange: [0, 10],
      searchQuery: "",
    };
    setLocalFilters(cleared);
    onFiltersChange(cleared);
  };

  const hasActiveFilters =
    localFilters.companies.length > 0 ||
    localFilters.roles.length > 0 ||
    localFilters.batches.length > 0 ||
    localFilters.locations.length > 0 ||
    localFilters.industries.length > 0 ||
    localFilters.availability.length > 0;

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Company Filter */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Company</Label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {companies.map((company) => (
              <div key={company} className="flex items-center space-x-2">
                <Checkbox
                  id={`company-${company}`}
                  checked={localFilters.companies.includes(company)}
                  onCheckedChange={() => toggleArrayFilter("companies", company)}
                />
                <Label
                  htmlFor={`company-${company}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {company}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Role Filter */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Role</Label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {roles.map((role) => (
              <div key={role} className="flex items-center space-x-2">
                <Checkbox
                  id={`role-${role}`}
                  checked={localFilters.roles.includes(role)}
                  onCheckedChange={() => toggleArrayFilter("roles", role)}
                />
                <Label htmlFor={`role-${role}`} className="text-sm font-normal cursor-pointer">
                  {role}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Batch Filter */}
        {batches.length > 0 && (
          <div>
            <Label className="text-sm font-semibold mb-2 block">Batch</Label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {batches.map((batch) => (
                <div key={batch} className="flex items-center space-x-2">
                  <Checkbox
                    id={`batch-${batch}`}
                    checked={localFilters.batches.includes(batch)}
                    onCheckedChange={() => toggleArrayFilter("batches", batch)}
                  />
                  <Label htmlFor={`batch-${batch}`} className="text-sm font-normal cursor-pointer">
                    {batch}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Location Filter */}
        {locations.length > 0 && (
          <div>
            <Label className="text-sm font-semibold mb-2 block">Location</Label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {locations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${location}`}
                    checked={localFilters.locations.includes(location)}
                    onCheckedChange={() => toggleArrayFilter("locations", location)}
                  />
                  <Label
                    htmlFor={`location-${location}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Industry Filter */}
        {industries.length > 0 && (
          <div>
            <Label className="text-sm font-semibold mb-2 block">Industry</Label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {industries.map((industry) => (
                <div key={industry} className="flex items-center space-x-2">
                  <Checkbox
                    id={`industry-${industry}`}
                    checked={localFilters.industries.includes(industry)}
                    onCheckedChange={() => toggleArrayFilter("industries", industry)}
                  />
                  <Label
                    htmlFor={`industry-${industry}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {industry}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Availability Filter */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Availability</Label>
          <div className="space-y-2">
            {availabilityOptions.map((avail) => (
              <div key={avail} className="flex items-center space-x-2">
                <Checkbox
                  id={`avail-${avail}`}
                  checked={localFilters.availability.includes(avail)}
                  onCheckedChange={() => toggleArrayFilter("availability", avail)}
                />
                <Label htmlFor={`avail-${avail}`} className="text-sm font-normal cursor-pointer capitalize">
                  {avail}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="pt-4 border-t">
            <p className="text-xs font-semibold text-slate-600 mb-2">Active Filters:</p>
            <div className="flex flex-wrap gap-2">
              {localFilters.companies.map((c) => (
                <Badge key={c} variant="secondary" className="text-xs">
                  {c}
                </Badge>
              ))}
              {localFilters.roles.map((r) => (
                <Badge key={r} variant="secondary" className="text-xs">
                  {r}
                </Badge>
              ))}
              {localFilters.batches.map((b) => (
                <Badge key={b} variant="secondary" className="text-xs">
                  Batch {b}
                </Badge>
              ))}
              {localFilters.locations.map((l) => (
                <Badge key={l} variant="secondary" className="text-xs">
                  {l}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

