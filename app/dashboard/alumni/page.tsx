"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AlumniSearchBar from "../components/alumni/AlumniSearchBar";
import AlumniFilters, { type FilterState } from "../components/alumni/AlumniFilters";
import AlumniCard from "../components/alumni/AlumniCard";
import AlumniProfileModal from "../components/alumni/AlumniProfileModal";
import ConnectionRequestModal from "../components/alumni/ConnectionRequestModal";
import AlumniStats from "../components/alumni/AlumniStats";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { alumni as allAlumni, type Alumni } from "@/lib/mockData";

export default function AlumniFinderPage() {
  const router = useRouter();
  const [activeView, setActiveView] = useState("alumni");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    companies: [],
    roles: [],
    batches: [],
    locations: [],
    industries: [],
    availability: [],
    experienceRange: [0, 10],
    searchQuery: "",
  });
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;

  // Load saved filters from localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem("alumniFilters");
    if (savedFilters) {
      try {
        setFilters(JSON.parse(savedFilters));
      } catch (error) {
        console.error("Failed to parse saved filters", error);
      }
    }
  }, []);

  // Save filters to localStorage
  useEffect(() => {
    localStorage.setItem("alumniFilters", JSON.stringify(filters));
  }, [filters]);

  // Filter and search alumni
  const filteredAlumni = useMemo(() => {
    let result = [...allAlumni];

    // Search query filter
    if (searchQuery || filters.searchQuery) {
      const query = (searchQuery || filters.searchQuery).toLowerCase();
      result = result.filter(
        (alum) =>
          alum.name.toLowerCase().includes(query) ||
          alum.company.toLowerCase().includes(query) ||
          alum.role.toLowerCase().includes(query) ||
          alum.skills?.some((skill) => skill.toLowerCase().includes(query))
      );
    }

    // Company filter
    if (filters.companies.length > 0) {
      result = result.filter((alum) => filters.companies.includes(alum.company));
    }

    // Role filter
    if (filters.roles.length > 0) {
      result = result.filter((alum) => filters.roles.includes(alum.role));
    }

    // Batch filter
    if (filters.batches.length > 0) {
      result = result.filter((alum) => alum.batch && filters.batches.includes(alum.batch));
    }

    // Location filter
    if (filters.locations.length > 0) {
      result = result.filter(
        (alum) => alum.location && filters.locations.includes(alum.location)
      );
    }

    // Industry filter
    if (filters.industries.length > 0) {
      result = result.filter(
        (alum) => alum.industry && filters.industries.includes(alum.industry)
      );
    }

    // Availability filter
    if (filters.availability.length > 0) {
      result = result.filter(
        (alum) => alum.availability && filters.availability.includes(alum.availability)
      );
    }

    return result;
  }, [searchQuery, filters]);

  const totalPages = Math.ceil(filteredAlumni.length / itemsPerPage);
  const paginatedAlumni = filteredAlumni.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleSidebarNavigation = (view: string) => {
    if (view === activeView) {
      return;
    }

    setActiveView(view);

    if (view === "home") {
      router.push("/dashboard");
    } else if (view === "applications") {
      router.push("/dashboard?view=applications");
    } else if (view === "profile") {
      router.push("/dashboard?view=profile");
    } else if (view === "comparator") {
      router.push("/dashboard/comparator");
    } else if (view === "roadmap") {
      router.push("/dashboard/roadmap");
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilters((prev) => ({ ...prev, searchQuery: query }));
    setCurrentPage(0);
  };

  const handleConnect = (alum: Alumni) => {
    setSelectedAlumni(alum);
    setShowConnectionModal(true);
  };

  const handleSendConnection = (alum: Alumni, message: string) => {
    // Update connection status (mock)
    toast.success(`Connection request sent to ${alum.name}!`);
    // In a real app, this would update the backend
  };

  const handleViewProfile = (alum: Alumni) => {
    setSelectedAlumni(alum);
    setShowProfileModal(true);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar activeView={activeView} setActiveView={handleSidebarNavigation} />
      <Navbar onNavigate={handleSidebarNavigation} />

      <main className="ml-60 mt-16 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Alumni Finder</h1>
            <p className="text-slate-600">
              Connect with alumni from your network and explore opportunities
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <AlumniSearchBar onSearch={handleSearch} allAlumni={allAlumni} />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AlumniStats alumni={filteredAlumni} />
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <AlumniFilters
                alumni={allAlumni}
                filters={filters}
                onFiltersChange={(newFilters) => {
                  setFilters(newFilters);
                  setCurrentPage(0);
                }}
              />
            </div>

            {/* Alumni Grid */}
            <div className="lg:col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  Showing {filteredAlumni.length} alumni
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>

              {paginatedAlumni.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                    {paginatedAlumni.map((alum) => (
                      <AlumniCard
                        key={alum.id}
                        alumni={alum}
                        onConnect={handleConnect}
                        onViewProfile={handleViewProfile}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i).map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className="w-10"
                          >
                            {page + 1}
                          </Button>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages - 1}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                  <p className="text-slate-600 text-lg mb-2">No alumni found</p>
                  <p className="text-slate-500 text-sm">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AlumniProfileModal
        alumni={selectedAlumni}
        open={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onConnect={handleConnect}
      />

      <ConnectionRequestModal
        alumni={selectedAlumni}
        open={showConnectionModal}
        onClose={() => setShowConnectionModal(false)}
        onSend={handleSendConnection}
      />
    </div>
  );
}

