export type FitLevel = "high" | "medium" | "low";

export interface Role {
  id: string;
  company: string;
  title: string;
  location: string;
  ctc: string;
  fit: FitLevel;
  deadline: string;
  requiresSkills: string[];
  yourSkills: string[];
  matchPercentage: number;
}

export interface Application {
  id: string;
  company: string;
  role: string;
  stage: "applied" | "shortlisted" | "test" | "interview" | "offer" | "rejected";
  appliedDate: string;
  lastUpdate: string;
}

export interface Deadline {
  id: string;
  company: string;
  role: string;
  dueDate: string;
  type: "application" | "test" | "interview";
  priority: "high" | "medium" | "low";
}

export interface RoadmapTask {
  id: string;
  title: string;
  category: "cv" | "interview" | "skills" | "outreach";
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  description: string;
}

export const mockRoles: Role[] = [
  {
    id: "1",
    company: "Goldman Sachs",
    title: "Business Analyst",
    location: "Mumbai",
    ctc: "₹18-22 LPA",
    fit: "high",
    deadline: "2025-11-05",
    requiresSkills: ["SQL", "Python", "Excel", "Business Analysis", "Financial Modeling"],
    yourSkills: ["SQL", "Python", "Excel", "Business Analysis"],
    matchPercentage: 85,
  },
  {
    id: "2",
    company: "McKinsey & Company",
    title: "Junior Consultant",
    location: "Bangalore",
    ctc: "₹25-30 LPA",
    fit: "high",
    deadline: "2025-11-08",
    requiresSkills: ["Case Studies", "Problem Solving", "Excel", "Presentation"],
    yourSkills: ["Problem Solving", "Excel", "Presentation"],
    matchPercentage: 75,
  },
  {
    id: "3",
    company: "Google",
    title: "Product Analyst",
    location: "Hyderabad",
    ctc: "₹20-25 LPA",
    fit: "medium",
    deadline: "2025-11-12",
    requiresSkills: ["SQL", "Product Analytics", "A/B Testing", "Data Visualization"],
    yourSkills: ["SQL", "Data Visualization"],
    matchPercentage: 50,
  },
  {
    id: "4",
    company: "Amazon",
    title: "Data Analyst",
    location: "Bangalore",
    ctc: "₹15-18 LPA",
    fit: "high",
    deadline: "2025-11-15",
    requiresSkills: ["SQL", "Python", "Tableau", "Statistics"],
    yourSkills: ["SQL", "Python", "Tableau"],
    matchPercentage: 80,
  },
];

export const mockApplications: Application[] = [
  {
    id: "1",
    company: "Deloitte",
    role: "Business Technology Analyst",
    stage: "interview",
    appliedDate: "2025-10-15",
    lastUpdate: "2025-10-25",
  },
  {
    id: "2",
    company: "JP Morgan",
    role: "Analyst",
    stage: "test",
    appliedDate: "2025-10-18",
    lastUpdate: "2025-10-22",
  },
  {
    id: "3",
    company: "Microsoft",
    role: "Program Manager",
    stage: "shortlisted",
    appliedDate: "2025-10-20",
    lastUpdate: "2025-10-26",
  },
  {
    id: "4",
    company: "Bain & Company",
    role: "Associate Consultant",
    stage: "applied",
    appliedDate: "2025-10-22",
    lastUpdate: "2025-10-22",
  },
];

export const mockDeadlines: Deadline[] = [
  {
    id: "1",
    company: "Goldman Sachs",
    role: "Business Analyst",
    dueDate: "2025-11-05",
    type: "application",
    priority: "high",
  },
  {
    id: "2",
    company: "McKinsey & Company",
    role: "Junior Consultant",
    dueDate: "2025-11-08",
    type: "application",
    priority: "high",
  },
  {
    id: "3",
    company: "Deloitte",
    role: "Business Technology Analyst",
    dueDate: "2025-11-01",
    type: "interview",
    priority: "high",
  },
  {
    id: "4",
    company: "JP Morgan",
    role: "Analyst",
    dueDate: "2025-11-03",
    type: "test",
    priority: "medium",
  },
];

export const mockRoadmapTasks: RoadmapTask[] = [
  {
    id: "1",
    title: "Add 2 quantifiable metrics to your CV experience section",
    category: "cv",
    dueDate: "2025-11-02",
    priority: "high",
    completed: false,
    description: "Your CV lacks impact metrics. Add numbers like % improvement, revenue, or users affected.",
  },
  {
    id: "2",
    title: "Complete 15 SQL practice questions on HackerRank",
    category: "skills",
    dueDate: "2025-11-03",
    priority: "high",
    completed: false,
    description: "Goldman Sachs BA role requires strong SQL. Practice window functions and joins.",
  },
  {
    id: "3",
    title: "Prepare 3 case studies for McKinsey interview",
    category: "interview",
    dueDate: "2025-11-05",
    priority: "high",
    completed: false,
    description: "Review profitability, market entry, and M&A frameworks.",
  },
  {
    id: "4",
    title: "Request LinkedIn intro to Goldman Sachs alum",
    category: "outreach",
    dueDate: "2025-11-01",
    priority: "medium",
    completed: true,
    description: "Connect with Rahul Sharma (2020 batch) for referral insights.",
  },
  {
    id: "5",
    title: "Update GitHub portfolio with latest project",
    category: "cv",
    dueDate: "2025-11-04",
    priority: "medium",
    completed: false,
    description: "Add your capstone analytics project with clear README and results.",
  },
];

export const studentProfile = {
  name: "Priya Sharma",
  program: "MBA",
  batchYear: 2026,
  avatarUrl: "https://avatar.iran.liara.run/public/girl",
  targetRoles: ["Business Analyst", "Consultant", "Product Manager"],
  skills: ["SQL", "Python", "Excel", "Business Analysis", "Problem Solving", "Tableau", "Presentation", "Data Visualization"],
};

