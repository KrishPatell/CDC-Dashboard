"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  User,
  GraduationCap,
  Briefcase,
  Award,
  FileText,
  Settings,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Github,
  Linkedin,
  ExternalLink,
  Download,
  Edit,
  Star,
  Target,
  Code,
  Languages,
  Trophy,
  BookOpen,
  Globe,
  Building2,
  TrendingUp,
} from "lucide-react";
import { studentProfile, type Profile } from "@/lib/mockData";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(studentProfile);
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const formatMonthYear = (dateString: string) => {
    const [year, month] = dateString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 80) return "bg-gradient-to-r from-blue-600 to-sky-500";
    if (proficiency >= 60) return "bg-gradient-to-r from-indigo-500 to-blue-500";
    return "bg-gradient-to-r from-slate-400 to-slate-500";
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "professional":
        return "bg-green-100 text-green-700 border-green-200";
      case "competition":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-48"
      >
        <div 
          className="h-48 rounded-xl bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://ahduni.edu.in/site/assets/files/18194/1920_x_925_seas.1400x0.webp)'
          }}
        ></div>
        <div className="absolute top-32 left-6 backdrop-blur-sm bg-white rounded-xl p-6 w-[calc(100%-3rem)] z-10 shadow-2xl border border-white/70">
          <div className="flex items-end gap-6 mb-4">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage src={profile.personalInfo.avatarUrl} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-600 to-indigo-500 text-white">
                  {profile.personalInfo.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full bg-blue-600 hover:bg-blue-700 border-2 border-white"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="pb-4 flex-1">
              <h1 className="text-3xl font-bold text-slate-900 mb-1">{profile.personalInfo.name}</h1>
              <p className="text-lg text-slate-600 mb-2">
                {profile.academicInfo.program} {profile.academicInfo.batchYear} • {profile.academicInfo.specialization}
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {profile.personalInfo.email}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {profile.personalInfo.phone}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {profile.personalInfo.city}, {profile.personalInfo.state}
                </div>
              </div>
            </div>
            <div className="pb-4">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white"
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/30 flex-wrap">
            <a
              href={profile.personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-white/30 hover:bg-white/40 text-blue-700 rounded-lg transition-colors backdrop-blur-sm text-sm whitespace-nowrap"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={profile.personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-white/30 hover:bg-white/40 text-slate-700 rounded-lg transition-colors backdrop-blur-sm text-sm whitespace-nowrap"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={profile.personalInfo.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-white/30 hover:bg-white/40 text-indigo-700 rounded-lg transition-colors backdrop-blur-sm text-sm whitespace-nowrap"
            >
              <Globe className="h-4 w-4" />
              Portfolio
            </a>
            {profile.personalInfo.twitterUrl && (
              <a
                href={profile.personalInfo.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 bg-white/30 hover:bg-white/40 text-sky-700 rounded-lg transition-colors backdrop-blur-sm text-sm whitespace-nowrap"
              >
                <ExternalLink className="h-4 w-4" />
                Twitter
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="relative z-20 flex flex-row gap-6 mt-4">
        {/* Left Sidebar Tabs */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-2 sticky top-24">
            <TabsList className="bg-transparent p-0 h-auto gap-1 flex-col w-full items-stretch">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-sky-500 data-[state=active]:text-white data-[state=active]:shadow-md px-4 py-3 rounded-lg font-medium transition-all hover:bg-slate-50 data-[state=active]:hover:from-blue-700 data-[state=active]:hover:to-sky-600 justify-start w-full"
              >
                <User className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="academic" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-sky-500 data-[state=active]:text-white data-[state=active]:shadow-md px-4 py-3 rounded-lg font-medium transition-all hover:bg-slate-50 data-[state=active]:hover:from-blue-700 data-[state=active]:hover:to-sky-600 justify-start w-full"
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                Academic
              </TabsTrigger>
              <TabsTrigger 
                value="experience" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-sky-500 data-[state=active]:text-white data-[state=active]:shadow-md px-4 py-3 rounded-lg font-medium transition-all hover:bg-slate-50 data-[state=active]:hover:from-blue-700 data-[state=active]:hover:to-sky-600 justify-start w-full"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Experience
              </TabsTrigger>
              <TabsTrigger 
                value="skills" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-sky-500 data-[state=active]:text-white data-[state=active]:shadow-md px-4 py-3 rounded-lg font-medium transition-all hover:bg-slate-50 data-[state=active]:hover:from-blue-700 data-[state=active]:hover:to-sky-600 justify-start w-full"
              >
                <Code className="h-4 w-4 mr-2" />
                Skills
              </TabsTrigger>
              <TabsTrigger 
                value="projects" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-sky-500 data-[state=active]:text-white data-[state=active]:shadow-md px-4 py-3 rounded-lg font-medium transition-all hover:bg-slate-50 data-[state=active]:hover:from-blue-700 data-[state=active]:hover:to-sky-600 justify-start w-full"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Projects
              </TabsTrigger>
              <TabsTrigger 
                value="achievements" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-sky-500 data-[state=active]:text-white data-[state=active]:shadow-md px-4 py-3 rounded-lg font-medium transition-all hover:bg-slate-50 data-[state=active]:hover:from-blue-700 data-[state=active]:hover:to-sky-600 justify-start w-full"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Achievements
              </TabsTrigger>
              <TabsTrigger 
                value="career" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-sky-500 data-[state=active]:text-white data-[state=active]:shadow-md px-4 py-3 rounded-lg font-medium transition-all hover:bg-slate-50 data-[state=active]:hover:from-blue-700 data-[state=active]:hover:to-sky-600 justify-start w-full"
              >
                <Target className="h-4 w-4 mr-2" />
                Career Goals
              </TabsTrigger>
              <TabsTrigger 
                value="documents" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-sky-500 data-[state=active]:text-white data-[state=active]:shadow-md px-4 py-3 rounded-lg font-medium transition-all hover:bg-slate-50 data-[state=active]:hover:from-blue-700 data-[state=active]:hover:to-sky-600 justify-start w-full"
              >
                <FileText className="h-4 w-4 mr-2" />
                Documents
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-sky-500 data-[state=active]:text-white data-[state=active]:shadow-md px-4 py-3 rounded-lg font-medium transition-all hover:bg-slate-50 data-[state=active]:hover:from-blue-700 data-[state=active]:hover:to-sky-600 justify-start w-full"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 min-w-0">
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  Academic Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Current CGPA</p>
                  <p className="text-2xl font-bold text-blue-600">{profile.academicInfo.cgpa}/10</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-slate-600">Program</p>
                  <p className="font-semibold">{profile.academicInfo.program}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Expected Graduation</p>
                  <p className="font-semibold">{formatMonthYear(profile.academicInfo.expectedGraduation)}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-green-600" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Total Experience</p>
                  <p className="text-2xl font-bold text-green-600">
                    {profile.professionalExperience.length} {profile.professionalExperience.length === 1 ? "Role" : "Roles"}
                  </p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-slate-600">Latest Role</p>
                  <p className="font-semibold">{profile.professionalExperience[0]?.title}</p>
                  <p className="text-sm text-slate-500">{profile.professionalExperience[0]?.company}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Total Awards</p>
                  <p className="text-2xl font-bold text-purple-600">{profile.achievements.length}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-slate-600">Certifications</p>
                  <p className="font-semibold">{profile.certifications.length} Active</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Projects</p>
                  <p className="text-2xl font-bold text-blue-600">{profile.projects.length}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Technical Skills</p>
                  <p className="text-2xl font-bold text-indigo-600">{profile.skills.technical.length}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Languages</p>
                  <p className="text-2xl font-bold text-sky-600">{profile.skills.languages.length}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Documents</p>
                  <p className="text-2xl font-bold text-green-600">{profile.documents.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Tab */}
        <TabsContent value="academic" className="space-y-6 mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Current Program</CardTitle>
              <CardDescription>MBA Program Details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Program</Label>
                  <p className="font-semibold">{profile.academicInfo.program}</p>
                </div>
                <div>
                  <Label>Batch Year</Label>
                  <p className="font-semibold">{profile.academicInfo.batchYear}</p>
                </div>
                <div>
                  <Label>Enrollment Number</Label>
                  <p className="font-semibold">{profile.academicInfo.enrollmentNumber}</p>
                </div>
                <div>
                  <Label>CGPA</Label>
                  <p className="font-semibold">{profile.academicInfo.cgpa}/10</p>
                </div>
                <div className="col-span-2">
                  <Label>Specialization</Label>
                  <p className="font-semibold">{profile.academicInfo.specialization}</p>
                </div>
                <div className="col-span-2">
                  <Label>Expected Graduation</Label>
                  <p className="font-semibold">{formatMonthYear(profile.academicInfo.expectedGraduation)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Previous Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.academicInfo.previousEducation.map((edu, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{edu.degree}</h4>
                        <p className="text-slate-600">{edu.institution}</p>
                        <p className="text-sm text-slate-500">Graduated: {edu.year}</p>
                      </div>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        CGPA: {edu.cgpa}/10
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Experience Tab */}
        <TabsContent value="experience" className="space-y-6 mt-0">
          {profile.professionalExperience.map((exp) => (
            <Card key={exp.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{exp.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Building2 className="h-4 w-4" />
                      {exp.company} • {exp.location}
                    </CardDescription>
                  </div>
                  <Badge variant={exp.isCurrent ? "default" : "outline"}>
                    {exp.isCurrent ? "Current" : "Past"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="h-4 w-4" />
                  {formatMonthYear(exp.startDate)} - {exp.endDate ? formatMonthYear(exp.endDate) : "Present"}
                </div>
                <p className="text-slate-700">{exp.description}</p>
                <div>
                  <h5 className="font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    Key Achievements
                  </h5>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                        <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6 mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Technical Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.skills.technical.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-slate-600">{skill.proficiency}%</span>
                  </div>
                  <Progress value={skill.proficiency} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Soft Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.skills.soft.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-slate-600">{skill.proficiency}%</span>
                  </div>
                  <Progress value={skill.proficiency} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                Languages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.skills.languages.map((lang) => (
                  <Badge key={lang.name} variant="outline" className="px-3 py-1 text-sm">
                    {lang.name} - {lang.proficiency}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.certifications.map((cert) => (
                  <div key={cert.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{cert.name}</h4>
                        <p className="text-sm text-slate-600">{cert.issuer}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          Issued: {formatMonthYear(cert.issueDate)}
                          {cert.expiryDate && ` • Expires: ${formatMonthYear(cert.expiryDate)}`}
                        </p>
                        <p className="text-xs text-slate-500">Credential ID: {cert.credentialId}</p>
                      </div>
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6 mt-0">
          {profile.projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4" />
                      {formatMonthYear(project.startDate)} - {project.endDate ? formatMonthYear(project.endDate) : "Ongoing"}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon">
                          <Github className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700">{project.description}</p>
                <div>
                  <h5 className="font-semibold mb-2">Technologies Used</h5>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    Key Achievements
                  </h5>
                  <ul className="space-y-1">
                    {project.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6 mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    <Badge className={getCategoryBadgeColor(achievement.category)}>
                      {achievement.category}
                    </Badge>
                  </div>
                  <CardDescription>{achievement.issuer}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-2">{achievement.description}</p>
                  <p className="text-sm text-slate-500">{formatDate(achievement.date)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Career Goals Tab */}
        <TabsContent value="career" className="space-y-6 mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Career Objectives</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-3 block">Target Roles</Label>
                <div className="flex flex-wrap gap-2">
                  {profile.careerGoals.targetRoles.map((role) => (
                    <Badge key={role} variant="default" className="px-3 py-1">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <Label className="text-base font-semibold mb-3 block">Target Companies</Label>
                <div className="flex flex-wrap gap-2">
                  {profile.careerGoals.targetCompanies.map((company) => (
                    <Badge key={company} variant="secondary" className="px-3 py-1">
                      {company}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Preferred Locations</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.careerGoals.preferredLocations.map((location) => (
                      <Badge key={location} variant="outline">{location}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Work Mode</Label>
                  <Badge className="mt-2">{profile.careerGoals.workMode}</Badge>
                </div>
                <div>
                  <Label>Salary Expectation</Label>
                  <p className="font-semibold mt-1">{profile.careerGoals.salaryExpectation}</p>
                </div>
                <div>
                  <Label>Availability Date</Label>
                  <p className="font-semibold mt-1">{formatMonthYear(profile.careerGoals.availabilityDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6 mt-0">
          <Card>
            <CardHeader>
              <CardTitle>My Documents</CardTitle>
              <CardDescription>Manage your CV, cover letters, and other documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-semibold">{doc.name}</p>
                        <p className="text-sm text-slate-500">
                          {doc.type.charAt(0).toUpperCase() + doc.type.slice(1).replace("-", " ")} • Uploaded {formatDate(doc.uploadDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.isDefault && (
                        <Badge variant="default">Default</Badge>
                      )}
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600">
                <FileText className="h-4 w-4 mr-2" />
                Upload New Document
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6 mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-slate-500">Receive updates via email</p>
                </div>
                <Switch checked={profile.preferences.emailNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-slate-500">Receive updates via SMS</p>
                </div>
                <Switch checked={profile.preferences.smsNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Job Alerts</Label>
                  <p className="text-sm text-slate-500">Get notified about new job matches</p>
                </div>
                <Switch checked={profile.preferences.jobAlerts} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Newsletter</Label>
                  <p className="text-sm text-slate-500">Receive career tips and updates</p>
                </div>
                <Switch checked={profile.preferences.newsletter} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label>Profile Visibility</Label>
                <select className="mt-2 w-full px-3 py-2 border rounded-lg">
                  <option value="public">Public</option>
                  <option value="alumni-only" selected={profile.preferences.privacyLevel === "alumni-only"}>Alumni Only</option>
                  <option value="private" selected={profile.preferences.privacyLevel === "private"}>Private</option>
                </select>
                <p className="text-sm text-slate-500 mt-1">
                  Control who can view your profile
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

