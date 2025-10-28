// Mock data for the MVP CDC Dashboard

export interface Job {
  id: number;
  title: string;
  company: string;
  fit: "High" | "Medium" | "Low";
  location: string;
  ctc: string;
  description: string;
}

export interface Application {
  id: number;
  jobId: number;
  company: string;
  role: string;
  stage: "Applied" | "Shortlist" | "Interview" | "Offer";
}

export interface RoadmapTask {
  id: number;
  task: string;
  done: boolean;
}

export interface Alumni {
  id: number;
  name: string;
  company: string;
  role: string;
  avatarUrl: string;
}

export const jobs: Job[] = [
  {
    id: 1,
    title: "Business Analyst Intern",
    company: "Deloitte",
    fit: "High",
    location: "Mumbai",
    ctc: "₹6-8 LPA",
    description: "Seeking analytical minds for strategic consulting projects",
  },
  {
    id: 2,
    title: "UX Research Assistant",
    company: "Swiggy",
    fit: "Medium",
    location: "Bangalore",
    ctc: "₹5-7 LPA",
    description: "Help shape user experiences for millions of customers",
  },
  {
    id: 3,
    title: "Marketing Associate",
    company: "Zomato",
    fit: "Low",
    location: "Gurgaon",
    ctc: "₹4-6 LPA",
    description: "Drive growth marketing initiatives for food delivery",
  },
  {
    id: 4,
    title: "Data Analyst Intern",
    company: "Amazon",
    fit: "High",
    location: "Hyderabad",
    ctc: "₹7-9 LPA",
    description: "Analyze large datasets to drive business decisions",
  },
  {
    id: 5,
    title: "Product Manager Intern",
    company: "Flipkart",
    fit: "Medium",
    location: "Bangalore",
    ctc: "₹6-8 LPA",
    description: "Own product features from ideation to launch",
  },
  {
    id: 6,
    title: "Financial Analyst",
    company: "Goldman Sachs",
    fit: "High",
    location: "Mumbai",
    ctc: "₹18-22 LPA",
    description: "Work on complex financial models and investment strategies",
  },
];

export const roadmapTasks: RoadmapTask[] = [
  { id: 1, task: "Add metrics to resume", done: false },
  { id: 2, task: "Practice SQL test", done: true },
  { id: 3, task: "Book mock interview", done: false },
  { id: 4, task: "Update LinkedIn profile", done: false },
  { id: 5, task: "Complete Excel certification", done: true },
  { id: 6, task: "Prepare case study presentation", done: false },
];

export const alumni: Alumni[] = [
  {
    id: 1,
    name: "Riya Shah",
    company: "Accenture",
    role: "Product Analyst",
    avatarUrl: "https://avatar.iran.liara.run/public/girl?id=1",
  },
  {
    id: 2,
    name: "Aman Patel",
    company: "Zepto",
    role: "Ops Manager",
    avatarUrl: "https://avatar.iran.liara.run/public/boy?id=1",
  },
  {
    id: 3,
    name: "Neha Joshi",
    company: "TCS",
    role: "Consultant",
    avatarUrl: "https://avatar.iran.liara.run/public/girl?id=2",
  },
  {
    id: 4,
    name: "Rohan Verma",
    company: "McKinsey",
    role: "Business Analyst",
    avatarUrl: "https://avatar.iran.liara.run/public/boy?id=2",
  },
];

export const suggestions: string[] = [
  "Update resume headline for clarity.",
  "Try connecting with alumni from your dream company.",
  "Add a measurable achievement in your project section.",
  "Enroll in a short LinkedIn Learning course this week.",
  "Review common case study frameworks for consulting roles.",
  "Practice behavioral interview questions using STAR method.",
  "Update your portfolio with your latest capstone project.",
  "Schedule a mock interview with the career services team.",
];

export const initialApplications: Application[] = [
  {
    id: 1,
    jobId: 1,
    company: "Deloitte",
    role: "Business Analyst Intern",
    stage: "Interview",
  },
  {
    id: 2,
    jobId: 4,
    company: "Amazon",
    role: "Data Analyst Intern",
    stage: "Shortlist",
  },
  {
    id: 3,
    jobId: 6,
    company: "Goldman Sachs",
    role: "Financial Analyst",
    stage: "Applied",
  },
  {
    id: 4,
    jobId: 2,
    company: "Swiggy",
    role: "UX Research Assistant",
    stage: "Applied",
  },
  {
    id: 5,
    jobId: 5,
    company: "Flipkart",
    role: "Product Manager Intern",
    stage: "Applied",
  },
  {
    id: 6,
    jobId: 3,
    company: "Zomato",
    role: "Marketing Associate",
    stage: "Applied",
  },
  {
    id: 7,
    jobId: 1,
    company: "McKinsey",
    role: "Junior Consultant",
    stage: "Shortlist",
  },
  {
    id: 8,
    jobId: 2,
    company: "Google",
    role: "Product Analyst",
    stage: "Shortlist",
  },
  {
    id: 9,
    jobId: 4,
    company: "Microsoft",
    role: "Program Manager",
    stage: "Interview",
  },
  {
    id: 10,
    jobId: 3,
    company: "Accenture",
    role: "Digital Consultant",
    stage: "Interview",
  },
  {
    id: 11,
    jobId: 1,
    company: "Bain & Company",
    role: "Associate Consultant",
    stage: "Offer",
  },
  {
    id: 12,
    jobId: 5,
    company: "JP Morgan",
    role: "Analyst",
    stage: "Offer",
  },
];

