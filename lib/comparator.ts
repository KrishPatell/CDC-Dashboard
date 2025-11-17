import type { Job, Alumni } from "./mockData";

export interface CVData {
  id: string;
  name: string;
  uploadedAt: string;
  fileUrl: string;
  parsedData: {
    personalInfo: {
      name: string;
      email: string;
    };
    experience: Array<{
      company: string;
      role: string;
      duration: string;
      description: string;
    }>;
    education: Array<{
      degree: string;
      institution: string;
      year: string;
    }>;
    skills: {
      technical: string[];
      soft: string[];
      tools: string[];
    };
    certifications: Array<{
      name: string;
      issuer: string;
    }>;
    projects: Array<{
      title: string;
      description: string;
      technologies: string[];
    }>;
  };
}

export interface ComparisonResult {
  id: string;
  cvId: string;
  jobId?: number;
  comparedAt: string;
  overallScore: number;
  breakdown: {
    skills: { score: number; matched: string[]; missing: string[] };
    experience: { score: number; matched: number; gaps: string[] };
    education: { score: number; matched: boolean; gaps: string[] };
    keywords: { score: number; matched: number; missing: string[] };
    softSkills: { score: number; matched: string[]; missing: string[] };
  };
  suggestions: OptimizationSuggestion[];
}

export interface AlumniComparisonResult {
  id: string;
  cvId: string;
  comparedAt: string;
  topAlumni: Array<{
    alumni: Alumni;
    gapAnalysis: {
      missingSkills: string[];
      missingExperience: string[];
      missingEducation: string[];
      missingCertifications: string[];
      recommendations: string[];
    };
    competitivenessScore: number;
  }>;
  marketInsights: {
    commonSkills: string[];
    commonExperience: string[];
    commonCertifications: string[];
    averageYearsExperience: number;
    topCompanies: string[];
  };
  suggestions: OptimizationSuggestion[];
}

export interface OptimizationSuggestion {
  id: string;
  type: "critical" | "important" | "suggestion";
  category: "skills" | "experience" | "education" | "keywords" | "formatting" | "certifications";
  title: string;
  description: string;
  actionItems: string[];
  impact: "high" | "medium" | "low";
  estimatedScoreIncrease: number;
}

export function compareCVWithJob(cvData: CVData, job: Job): ComparisonResult {
  const cvSkills = [
    ...(cvData.parsedData.skills.technical || []),
    ...(cvData.parsedData.skills.tools || []),
  ];
  const jobSkills = job.skills || [];
  
  // Skills matching
  const matchedSkills = cvSkills.filter((skill) =>
    jobSkills.some((js) => js.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(js.toLowerCase()))
  );
  const missingSkills = jobSkills.filter(
    (js) => !cvSkills.some((cs) => cs.toLowerCase().includes(js.toLowerCase()) || js.toLowerCase().includes(cs.toLowerCase()))
  );
  const skillsScore = jobSkills.length > 0 ? (matchedSkills.length / jobSkills.length) * 100 : 0;

  // Experience matching
  const experienceMatch = cvData.parsedData.experience.some((exp) =>
    exp.role.toLowerCase().includes(job.title.toLowerCase().split(" ")[0]) ||
    job.title.toLowerCase().includes(exp.role.toLowerCase().split(" ")[0])
  );
  const experienceScore = experienceMatch ? 70 : 40;

  // Education matching
  const educationMatch = cvData.parsedData.education.length > 0;
  const educationScore = educationMatch ? 90 : 50;

  // Keywords matching
  const allJobText = `${job.title} ${job.company} ${job.description} ${job.fullDescription || ""} ${job.requirements?.join(" ") || ""} ${job.skills?.join(" ") || ""}`.toLowerCase();
  const cvText = `${cvData.parsedData.personalInfo.name} ${cvData.parsedData.experience.map(e => `${e.role} ${e.company} ${e.description}`).join(" ")} ${cvSkills.join(" ")}`.toLowerCase();
  
  const jobKeywords = allJobText.split(/\s+/).filter(w => w.length > 4);
  const matchedKeywords = jobKeywords.filter(kw => cvText.includes(kw));
  const keywordsScore = jobKeywords.length > 0 ? (matchedKeywords.length / jobKeywords.length) * 100 : 0;
  const missingKeywords = jobKeywords.slice(0, 10).filter(kw => !cvText.includes(kw));

  // Soft skills
  const jobSoftSkills = ["Leadership", "Communication", "Teamwork", "Problem Solving"];
  const cvSoftSkills = cvData.parsedData.skills.soft || [];
  const matchedSoftSkills = jobSoftSkills.filter(js => 
    cvSoftSkills.some(cs => cs.toLowerCase().includes(js.toLowerCase()))
  );
  const softSkillsScore = (matchedSoftSkills.length / jobSoftSkills.length) * 100;

  // Overall score (weighted average)
  const overallScore = Math.round(
    skillsScore * 0.3 +
    experienceScore * 0.25 +
    educationScore * 0.15 +
    keywordsScore * 0.2 +
    softSkillsScore * 0.1
  );

  // Generate suggestions
  const suggestions: OptimizationSuggestion[] = [];

  if (missingSkills.length > 0) {
    suggestions.push({
      id: "1",
      type: "critical",
      category: "skills",
      title: "Add Missing Skills",
      description: `The job requires these skills that are missing from your CV: ${missingSkills.slice(0, 3).join(", ")}`,
      actionItems: [
        `Add ${missingSkills[0]} to your skills section`,
        `Highlight relevant projects or experience using ${missingSkills[1] || missingSkills[0]}`,
        "Consider taking a course or certification in these areas",
      ],
      impact: "high",
      estimatedScoreIncrease: 15,
    });
  }

  if (missingKeywords.length > 0) {
    suggestions.push({
      id: "2",
      type: "important",
      category: "keywords",
      title: "Include More Keywords",
      description: `Add these keywords to improve ATS matching: ${missingKeywords.slice(0, 5).join(", ")}`,
      actionItems: [
        "Incorporate keywords naturally into your experience descriptions",
        "Add keywords to your skills section",
        "Use keywords in your summary or objective",
      ],
      impact: "medium",
      estimatedScoreIncrease: 10,
    });
  }

  if (experienceScore < 60) {
    suggestions.push({
      id: "3",
      type: "important",
      category: "experience",
      title: "Highlight Relevant Experience",
      description: "Emphasize experience that aligns with the job requirements",
      actionItems: [
        "Reorder your experience to put most relevant roles first",
        "Add quantifiable achievements to your experience",
        "Use action verbs that match the job description",
      ],
      impact: "high",
      estimatedScoreIncrease: 12,
    });
  }

  if (matchedSoftSkills.length < jobSoftSkills.length) {
    suggestions.push({
      id: "4",
      type: "suggestion",
      category: "skills",
      title: "Emphasize Soft Skills",
      description: "Add examples of soft skills in your experience descriptions",
      actionItems: [
        "Add leadership examples to your experience",
        "Highlight teamwork and collaboration",
        "Include problem-solving achievements",
      ],
      impact: "low",
      estimatedScoreIncrease: 5,
    });
  }

  return {
    id: `comparison-${Date.now()}`,
    cvId: cvData.id,
    jobId: job.id,
    comparedAt: new Date().toISOString(),
    overallScore: Math.min(overallScore, 100),
    breakdown: {
      skills: {
        score: Math.round(skillsScore),
        matched: matchedSkills,
        missing: missingSkills,
      },
      experience: {
        score: Math.round(experienceScore),
        matched: experienceMatch ? 1 : 0,
        gaps: [],
      },
      education: {
        score: Math.round(educationScore),
        matched: educationMatch,
        gaps: [],
      },
      keywords: {
        score: Math.round(keywordsScore),
        matched: matchedKeywords.length,
        missing: missingKeywords,
      },
      softSkills: {
        score: Math.round(softSkillsScore),
        matched: matchedSoftSkills,
        missing: jobSoftSkills.filter(js => !matchedSoftSkills.includes(js)),
      },
    },
    suggestions,
  };
}

export function compareCVWithAlumni(cvData: CVData, topAlumni: Alumni[]): AlumniComparisonResult {
  const cvSkills = [
    ...(cvData.parsedData.skills.technical || []),
    ...(cvData.parsedData.skills.tools || []),
    ...(cvData.parsedData.skills.soft || []),
  ];
  const cvCertifications = cvData.parsedData.certifications.map(c => c.name.toLowerCase());
  const cvExperience = cvData.parsedData.experience.map(e => e.role.toLowerCase());
  const cvEducation = cvData.parsedData.education.map(e => e.degree.toLowerCase());

  // Analyze top alumni
  const alumniAnalysis = topAlumni.slice(0, 5).map((alumni) => {
    const alumniSkills = alumni.skills || [];
    const missingSkills = alumniSkills.filter(
      (skill) => !cvSkills.some((cs) => cs.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(cs.toLowerCase()))
    );

    const missingExperience: string[] = [];
    if (alumni.role && !cvExperience.some(e => e.includes(alumni.role.toLowerCase()) || alumni.role.toLowerCase().includes(e))) {
      missingExperience.push(`${alumni.role} experience`);
    }
    if (alumni.pastCompanies) {
      alumni.pastCompanies.forEach(pc => {
        if (!cvData.parsedData.experience.some(e => e.company.toLowerCase().includes(pc.company.toLowerCase()))) {
          missingExperience.push(`Experience at ${pc.company}`);
        }
      });
    }

    const missingEducation: string[] = [];
    if (alumni.education) {
      alumni.education.forEach(edu => {
        if (!cvEducation.some(ce => ce.includes(edu.degree.toLowerCase()))) {
          missingEducation.push(edu.degree);
        }
      });
    }

    // Calculate competitiveness score
    const skillMatch = (alumniSkills.length - missingSkills.length) / Math.max(alumniSkills.length, 1);
    const experienceMatch = missingExperience.length === 0 ? 1 : 0.5;
    const educationMatch = missingEducation.length === 0 ? 1 : 0.7;
    const competitivenessScore = Math.round((skillMatch * 0.5 + experienceMatch * 0.3 + educationMatch * 0.2) * 100);

    const recommendations: string[] = [];
    if (missingSkills.length > 0) {
      recommendations.push(`Consider learning: ${missingSkills.slice(0, 2).join(", ")}`);
    }
    if (missingExperience.length > 0) {
      recommendations.push(`Gain experience in: ${missingExperience[0]}`);
    }
    if (alumni.yearsAtCompany) {
      recommendations.push(`Build ${alumni.yearsAtCompany} of experience in similar roles`);
    }

    return {
      alumni,
      gapAnalysis: {
        missingSkills,
        missingExperience,
        missingEducation,
        missingCertifications: [],
        recommendations,
      },
      competitivenessScore,
    };
  });

  // Market insights
  const allAlumniSkills = topAlumni.flatMap(a => a.skills || []);
  const skillFrequency = allAlumniSkills.reduce((acc, skill) => {
    acc[skill] = (acc[skill] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const commonSkills = Object.entries(skillFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([skill]) => skill);

  const allAlumniRoles = topAlumni.map(a => a.role).filter(Boolean);
  const roleFrequency = allAlumniRoles.reduce((acc, role) => {
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const commonExperience = Object.entries(roleFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([role]) => role);

  const allAlumniCompanies = topAlumni.map(a => a.company);
  const companyFrequency = allAlumniCompanies.reduce((acc, company) => {
    acc[company] = (acc[company] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topCompanies = Object.entries(companyFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([company]) => company);

  const yearsExperience = topAlumni
    .map(a => {
      const match = a.yearsAtCompany?.match(/(\d+)/);
      return match ? parseInt(match[1]) : 0;
    })
    .filter(y => y > 0);
  const averageYearsExperience = yearsExperience.length > 0
    ? Math.round(yearsExperience.reduce((a, b) => a + b, 0) / yearsExperience.length)
    : 0;

  // Generate suggestions based on market insights
  const suggestions: OptimizationSuggestion[] = [];

  const missingCommonSkills = commonSkills.filter(skill => 
    !cvSkills.some(cs => cs.toLowerCase().includes(skill.toLowerCase()))
  );
  if (missingCommonSkills.length > 0) {
    suggestions.push({
      id: "alumni-1",
      type: "critical",
      category: "skills",
      title: "Add Market-Demand Skills",
      description: `Top alumni commonly have these skills that you're missing: ${missingCommonSkills.slice(0, 3).join(", ")}`,
      actionItems: [
        `Prioritize learning ${missingCommonSkills[0]} - it's highly valued in the market`,
        `Add ${missingCommonSkills[1] || missingCommonSkills[0]} to your skills section`,
        "Consider taking online courses or certifications for these skills",
      ],
      impact: "high",
      estimatedScoreIncrease: 20,
    });
  }

  const missingCommonExperience = commonExperience.filter(exp =>
    !cvExperience.some(ce => ce.includes(exp.toLowerCase()))
  );
  if (missingCommonExperience.length > 0) {
    suggestions.push({
      id: "alumni-2",
      type: "important",
      category: "experience",
      title: "Gain Common Experience Types",
      description: `Many successful alumni have experience in: ${missingCommonExperience.slice(0, 2).join(", ")}`,
      actionItems: [
        `Seek internships or projects in ${missingCommonExperience[0]}`,
        "Highlight any related experience you have",
        "Consider side projects to demonstrate these skills",
      ],
      impact: "high",
      estimatedScoreIncrease: 15,
    });
  }

  if (averageYearsExperience > 0) {
    const userYears = cvData.parsedData.experience.reduce((total, exp) => {
      const match = exp.duration.match(/(\d+)/);
      return total + (match ? parseInt(match[1]) : 0);
    }, 0);
    if (userYears < averageYearsExperience) {
      suggestions.push({
        id: "alumni-3",
        type: "suggestion",
        category: "experience",
        title: "Build More Experience",
        description: `Top alumni average ${averageYearsExperience} years of experience. Focus on gaining more hands-on experience.`,
        actionItems: [
          "Seek longer-term internships or projects",
          "Take on leadership roles in projects",
          "Document all your experience with quantifiable results",
        ],
        impact: "medium",
        estimatedScoreIncrease: 10,
      });
    }
  }

  return {
    id: `alumni-comparison-${Date.now()}`,
    cvId: cvData.id,
    comparedAt: new Date().toISOString(),
    topAlumni: alumniAnalysis,
    marketInsights: {
      commonSkills,
      commonExperience,
      commonCertifications: [],
      averageYearsExperience,
      topCompanies,
    },
    suggestions,
  };
}
