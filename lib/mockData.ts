// Mock data for the MVP CDC Dashboard

export interface Job {
  id: number;
  title: string;
  company: string;
  fit: "High" | "Medium" | "Low";
  location: string;
  ctc: string;
  description: string;
  fullDescription?: string;
  requirements?: string[];
  responsibilities?: string[];
  skills?: string[];
  matchScore?: number;
  companyWebsite?: string;
  companyLinkedIn?: string;
  companyTwitter?: string;
  companyInstagram?: string;
  deadline?: string;
  jobType?: string;
  experience?: string;
  logoUrl?: string;
  applicants?: number;
  jobLevel?: "Entry Level" | "Intermediate" | "Expert";
  isRemote?: boolean;
  postedDaysAgo?: number;
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
  category?: "application" | "skill" | "networking" | "interview" | "portfolio" | "other";
  priority?: "low" | "medium" | "high" | "urgent";
  deadline?: string;
  createdAt?: string;
  completedAt?: string;
  notes?: string;
  subtasks?: Array<{ id: number; task: string; done: boolean }>;
  linkedJobId?: number;
  linkedSkillId?: string;
  tags?: string[];
  recurring?: boolean;
  recurringPattern?: string;
}

export interface CareerGoal {
  id: number;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  milestones: Array<{
    id: number;
    title: string;
    targetDate: string;
    completed: boolean;
  }>;
  category: "role" | "company" | "skill" | "salary" | "other";
}

export interface SkillGoal {
  id: string;
  skillName: string;
  currentLevel: "beginner" | "intermediate" | "advanced";
  targetLevel: "beginner" | "intermediate" | "advanced";
  progress: number;
  resources: Array<{ title: string; url: string; type: string }>;
  projects: Array<{ title: string; description: string }>;
}

export interface Alumni {
  id: number;
  name: string;
  company: string;
  role: string;
  avatarUrl: string;
  batch?: string;
  yearsAtCompany?: string;
  location?: string;
  skills?: string[];
  industry?: string;
  availability?: "available" | "busy" | "open";
  linkedInUrl?: string;
  email?: string;
  bio?: string;
  pastCompanies?: Array<{ company: string; role: string; duration: string }>;
  education?: Array<{ degree: string; institution: string; year: string }>;
  connectionStatus?: "none" | "pending" | "connected" | "referred";
  lastActive?: string;
  mutualConnections?: number;
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
    logoUrl: "https://logo.clearbit.com/deloitte.com",
    applicants: 25,
    jobLevel: "Entry Level",
    isRemote: false,
    postedDaysAgo: 12,
    fullDescription: "Join Deloitte's consulting practice and work on high-impact projects for Fortune 500 clients. As a Business Analyst Intern, you'll be at the forefront of digital transformation initiatives, helping organizations solve their most complex business challenges through data-driven insights and strategic recommendations.",
    requirements: [
      "Strong analytical and problem-solving skills",
      "Proficiency in Excel, PowerPoint, and SQL",
      "Excellent communication and presentation abilities",
      "Bachelor's degree in Business, Economics, or related field",
      "Understanding of business processes and consulting methodologies"
    ],
    responsibilities: [
      "Conduct market research and competitive analysis",
      "Develop data models and perform quantitative analysis",
      "Create compelling presentations for client stakeholders",
      "Support project managers in delivering consulting engagements",
      "Collaborate with cross-functional teams across geographies"
    ],
    skills: ["Excel", "SQL", "PowerPoint", "Business Analytics", "Data Visualization", "Strategic Thinking"],
    matchScore: 92,
    companyWebsite: "https://www.deloitte.com",
    companyLinkedIn: "https://linkedin.com/company/deloitte",
    companyTwitter: "https://twitter.com/deloitte",
    companyInstagram: "https://instagram.com/deloitte",
    deadline: "2025-12-15",
    jobType: "Internship",
    experience: "0-1 years"
  },
  {
    id: 2,
    title: "UX Research Assistant",
    company: "Swiggy",
    fit: "Medium",
    location: "Bangalore",
    ctc: "₹5-7 LPA",
    description: "Help shape user experiences for millions of customers",
    logoUrl: "https://logo.clearbit.com/swiggy.com",
    applicants: 18,
    jobLevel: "Intermediate",
    isRemote: true,
    postedDaysAgo: 8,
    fullDescription: "Swiggy is looking for a passionate UX Research Assistant to join our product team. You'll work on understanding user behaviors, conducting usability tests, and translating insights into actionable recommendations that directly impact millions of users across India.",
    requirements: [
      "Background in HCI, Psychology, or Design",
      "Experience with user research methodologies",
      "Familiarity with tools like Figma, Miro, or similar",
      "Strong empathy for users and attention to detail",
      "Ability to synthesize complex information into clear insights"
    ],
    responsibilities: [
      "Conduct user interviews and usability testing sessions",
      "Analyze user behavior data and create research reports",
      "Collaborate with designers and product managers",
      "Create user personas and journey maps",
      "Present research findings to stakeholders"
    ],
    skills: ["User Research", "Figma", "Usability Testing", "Data Analysis", "Qualitative Research", "Prototyping"],
    matchScore: 78,
    companyWebsite: "https://www.swiggy.com",
    companyLinkedIn: "https://linkedin.com/company/swiggy",
    companyTwitter: "https://twitter.com/swiggy",
    companyInstagram: "https://instagram.com/swiggy",
    deadline: "2025-12-01",
    jobType: "Full-time",
    experience: "0-2 years"
  },
  {
    id: 3,
    title: "Marketing Associate",
    company: "Zomato",
    fit: "Low",
    location: "Gurgaon",
    ctc: "₹4-6 LPA",
    description: "Drive growth marketing initiatives for food delivery",
    logoUrl: "https://logo.clearbit.com/zomato.com",
    applicants: 32,
    jobLevel: "Entry Level",
    isRemote: false,
    postedDaysAgo: 15,
    fullDescription: "Be part of Zomato's dynamic marketing team and help drive user acquisition and engagement across India. This role offers exposure to performance marketing, content strategy, and brand campaigns in the fast-paced food-tech industry.",
    requirements: [
      "Strong understanding of digital marketing channels",
      "Data-driven mindset with analytical skills",
      "Creative thinking and content creation abilities",
      "Bachelor's degree in Marketing, Business, or related field",
      "Familiarity with marketing analytics tools"
    ],
    responsibilities: [
      "Plan and execute digital marketing campaigns",
      "Analyze campaign performance and optimize ROI",
      "Collaborate with creative teams on content creation",
      "Manage social media presence and engagement",
      "Support brand partnerships and influencer marketing"
    ],
    skills: ["Digital Marketing", "Google Analytics", "Content Marketing", "Social Media", "SEO", "Campaign Management"],
    matchScore: 65,
    companyWebsite: "https://www.zomato.com",
    companyLinkedIn: "https://linkedin.com/company/zomato",
    companyTwitter: "https://twitter.com/zomato",
    companyInstagram: "https://instagram.com/zomato",
    deadline: "2025-11-30",
    jobType: "Full-time",
    experience: "0-1 years"
  },
  {
    id: 4,
    title: "Data Analyst Intern",
    company: "Amazon",
    fit: "High",
    location: "Hyderabad",
    ctc: "₹7-9 LPA",
    description: "Analyze large datasets to drive business decisions",
    logoUrl: "https://logo.clearbit.com/amazon.com",
    applicants: 14,
    jobLevel: "Intermediate",
    isRemote: true,
    postedDaysAgo: 5,
    fullDescription: "Amazon is seeking a Data Analyst Intern to join our Business Intelligence team. You'll work with massive datasets, build dashboards, and provide insights that directly influence product and business strategy across Amazon's diverse portfolio.",
    requirements: [
      "Strong SQL and Python programming skills",
      "Experience with data visualization tools (Tableau, Power BI)",
      "Statistical knowledge and analytical thinking",
      "Bachelor's or Master's in Computer Science, Statistics, or related field",
      "Ability to work with large-scale datasets"
    ],
    responsibilities: [
      "Extract and analyze data from multiple sources",
      "Build automated dashboards and reports",
      "Identify trends and provide actionable insights",
      "Support A/B testing and experimentation",
      "Present findings to senior leadership"
    ],
    skills: ["SQL", "Python", "Tableau", "Statistics", "Data Modeling", "Machine Learning Basics"],
    matchScore: 88,
    companyWebsite: "https://www.amazon.com",
    companyLinkedIn: "https://linkedin.com/company/amazon",
    companyTwitter: "https://twitter.com/amazon",
    companyInstagram: "https://instagram.com/amazon",
    deadline: "2025-12-20",
    jobType: "Internship",
    experience: "0-1 years"
  },
  {
    id: 5,
    title: "Product Manager Intern",
    company: "Flipkart",
    fit: "Medium",
    location: "Bangalore",
    ctc: "₹6-8 LPA",
    description: "Own product features from ideation to launch",
    logoUrl: "https://logo.clearbit.com/flipkart.com",
    applicants: 42,
    jobLevel: "Intermediate",
    isRemote: false,
    postedDaysAgo: 6,
    fullDescription: "Join Flipkart's product team and get hands-on experience managing products used by millions. You'll work on defining product roadmaps, collaborating with engineering and design teams, and launching features that delight customers.",
    requirements: [
      "Strong analytical and problem-solving skills",
      "Technical aptitude and understanding of software development",
      "Excellent communication and stakeholder management",
      "Bachelor's degree in Engineering, Business, or related field",
      "Customer-centric mindset"
    ],
    responsibilities: [
      "Define product requirements and user stories",
      "Work with designers to create wireframes and prototypes",
      "Prioritize features based on impact and effort",
      "Coordinate with engineering teams for implementation",
      "Track metrics and iterate based on user feedback"
    ],
    skills: ["Product Management", "Agile", "Wireframing", "Data Analysis", "User Stories", "Stakeholder Management"],
    matchScore: 75,
    companyWebsite: "https://www.flipkart.com",
    companyLinkedIn: "https://linkedin.com/company/flipkart",
    companyTwitter: "https://twitter.com/flipkart",
    companyInstagram: "https://instagram.com/flipkart",
    deadline: "2025-12-10",
    jobType: "Internship",
    experience: "0-2 years"
  },
  {
    id: 6,
    title: "Financial Analyst",
    company: "Goldman Sachs",
    fit: "High",
    location: "Mumbai",
    ctc: "₹18-22 LPA",
    description: "Work on complex financial models and investment strategies",
    logoUrl: "https://logo.clearbit.com/goldmansachs.com",
    applicants: 58,
    jobLevel: "Expert",
    isRemote: false,
    postedDaysAgo: 4,
    fullDescription: "Goldman Sachs is seeking exceptional talent for our Investment Banking division. As a Financial Analyst, you'll work on M&A deals, financial modeling, and strategic advisory for high-profile clients across industries.",
    requirements: [
      "Strong financial modeling and valuation skills",
      "Advanced Excel proficiency",
      "Understanding of accounting principles and financial statements",
      "Bachelor's degree in Finance, Economics, or related field",
      "Excellent attention to detail and work ethic"
    ],
    responsibilities: [
      "Build complex financial models for M&A transactions",
      "Conduct company and industry research",
      "Prepare pitch books and client presentations",
      "Perform valuation analysis (DCF, comparable companies)",
      "Support senior bankers in deal execution"
    ],
    skills: ["Financial Modeling", "Excel", "Valuation", "PowerPoint", "Bloomberg Terminal", "Accounting"],
    matchScore: 95,
    companyWebsite: "https://www.goldmansachs.com",
    companyLinkedIn: "https://linkedin.com/company/goldman-sachs",
    companyTwitter: "https://twitter.com/goldmansachs",
    companyInstagram: "https://instagram.com/goldmansachs",
    deadline: "2025-12-25",
    jobType: "Full-time",
    experience: "0-2 years"
  },
];

export const roadmapTasks: RoadmapTask[] = [
  { 
    id: 1, 
    task: "Add metrics to resume", 
    done: false,
    category: "portfolio",
    priority: "high",
    deadline: "2024-12-20",
    createdAt: "2024-12-01",
    tags: ["resume", "metrics"]
  },
  { 
    id: 2, 
    task: "Practice SQL test", 
    done: true,
    category: "skill",
    priority: "medium",
    completedAt: "2024-12-05",
    createdAt: "2024-11-28"
  },
  { 
    id: 3, 
    task: "Book mock interview", 
    done: false,
    category: "interview",
    priority: "urgent",
    deadline: "2024-12-15",
    createdAt: "2024-12-01"
  },
  { 
    id: 4, 
    task: "Update LinkedIn profile", 
    done: false,
    category: "networking",
    priority: "medium",
    createdAt: "2024-11-25"
  },
  { 
    id: 5, 
    task: "Complete Excel certification", 
    done: true,
    category: "skill",
    priority: "low",
    completedAt: "2024-11-30",
    createdAt: "2024-11-15"
  },
  { 
    id: 6, 
    task: "Prepare case study presentation", 
    done: false,
    category: "interview",
    priority: "high",
    deadline: "2024-12-18",
    createdAt: "2024-12-01"
  },
];

export const careerGoals: CareerGoal[] = [
  {
    id: 1,
    title: "Land Business Analyst Role at Top Consulting Firm",
    description: "Secure a Business Analyst position at McKinsey, Deloitte, or BCG within 6 months",
    targetDate: "2025-06-01",
    progress: 45,
    milestones: [
      { id: 1, title: "Complete 10 job applications", targetDate: "2024-12-31", completed: true },
      { id: 2, title: "Get 3 interview calls", targetDate: "2025-01-15", completed: false },
      { id: 3, title: "Complete case study preparation", targetDate: "2025-01-31", completed: false },
      { id: 4, title: "Receive job offer", targetDate: "2025-03-31", completed: false },
    ],
    category: "role"
  },
  {
    id: 2,
    title: "Master Data Analytics Skills",
    description: "Achieve advanced proficiency in SQL, Python, and Tableau",
    targetDate: "2025-03-01",
    progress: 60,
    milestones: [
      { id: 1, title: "Complete SQL Advanced Course", targetDate: "2024-12-15", completed: true },
      { id: 2, title: "Build 3 data visualization projects", targetDate: "2025-01-15", completed: false },
      { id: 3, title: "Get Tableau certification", targetDate: "2025-02-15", completed: false },
    ],
    category: "skill"
  }
];

export const skillGoals: SkillGoal[] = [
  {
    id: "sql",
    skillName: "SQL",
    currentLevel: "intermediate",
    targetLevel: "advanced",
    progress: 75,
    resources: [
      { title: "Advanced SQL Course", url: "https://example.com/sql", type: "course" },
      { title: "SQL Practice Problems", url: "https://example.com/practice", type: "practice" }
    ],
    projects: [
      { title: "E-commerce Database Analysis", description: "Build complex queries for sales analytics" }
    ]
  },
  {
    id: "python",
    skillName: "Python",
    currentLevel: "intermediate",
    targetLevel: "advanced",
    progress: 65,
    resources: [
      { title: "Python for Data Science", url: "https://example.com/python", type: "course" }
    ],
    projects: [
      { title: "Data Analysis Project", description: "Analyze dataset using pandas and numpy" }
    ]
  }
];

export const alumni: Alumni[] = [
  {
    id: 1,
    name: "Riya Shah",
    company: "Accenture",
    role: "Product Analyst",
    avatarUrl: "https://avatar.iran.liara.run/public/girl?id=1",
    batch: "2022",
    yearsAtCompany: "2 years",
    location: "Mumbai",
    skills: ["Product Management", "Data Analysis", "SQL", "Agile"],
    industry: "Technology",
    availability: "available",
    linkedInUrl: "https://linkedin.com/in/riyashah",
    bio: "Product Analyst with expertise in data-driven decision making",
    connectionStatus: "none",
    lastActive: "2024-12-10",
    mutualConnections: 3
  },
  {
    id: 2,
    name: "Aman Patel",
    company: "Zepto",
    role: "Ops Manager",
    avatarUrl: "https://avatar.iran.liara.run/public/boy?id=1",
    batch: "2021",
    yearsAtCompany: "3 years",
    location: "Bangalore",
    skills: ["Operations", "Supply Chain", "Analytics"],
    industry: "E-commerce",
    availability: "open",
    linkedInUrl: "https://linkedin.com/in/amanpatel",
    connectionStatus: "none",
    lastActive: "2024-12-08",
    mutualConnections: 2
  },
  {
    id: 3,
    name: "Neha Joshi",
    company: "TCS",
    role: "Consultant",
    avatarUrl: "https://avatar.iran.liara.run/public/girl?id=2",
    batch: "2020",
    yearsAtCompany: "4 years",
    location: "Pune",
    skills: ["Consulting", "Project Management", "Business Analysis"],
    industry: "IT Services",
    availability: "available",
    linkedInUrl: "https://linkedin.com/in/nehajoshi",
    connectionStatus: "connected",
    lastActive: "2024-12-11",
    mutualConnections: 5
  },
  {
    id: 4,
    name: "Rohan Verma",
    company: "McKinsey",
    role: "Business Analyst",
    avatarUrl: "https://avatar.iran.liara.run/public/boy?id=2",
    batch: "2021",
    yearsAtCompany: "3 years",
    location: "Mumbai",
    skills: ["Strategy", "Consulting", "Data Analysis", "Excel"],
    industry: "Consulting",
    availability: "busy",
    linkedInUrl: "https://linkedin.com/in/rohanverma",
    connectionStatus: "pending",
    lastActive: "2024-12-09",
    mutualConnections: 1
  },
  {
    id: 5,
    name: "Ananya Gupta",
    company: "Deloitte",
    role: "Senior Consultant",
    avatarUrl: "https://avatar.iran.liara.run/public/girl?id=3",
    batch: "2019",
    yearsAtCompany: "5 years",
    location: "Delhi",
    skills: ["Consulting", "Strategy", "Leadership", "Client Management"],
    industry: "Consulting",
    availability: "available",
    linkedInUrl: "https://linkedin.com/in/ananyagupta",
    pastCompanies: [{ company: "Accenture", role: "Consultant", duration: "2 years" }],
    connectionStatus: "none",
    lastActive: "2024-12-12",
    mutualConnections: 4
  },
  {
    id: 6,
    name: "Karan Singh",
    company: "Deloitte",
    role: "Business Analyst",
    avatarUrl: "https://avatar.iran.liara.run/public/boy?id=3",
    batch: "2022",
    yearsAtCompany: "2 years",
    location: "Mumbai",
    skills: ["Business Analysis", "SQL", "Excel", "PowerPoint"],
    industry: "Consulting",
    availability: "open",
    linkedInUrl: "https://linkedin.com/in/karansingh",
    connectionStatus: "none",
    lastActive: "2024-12-10",
    mutualConnections: 2
  },
  {
    id: 7,
    name: "Priya Mehta",
    company: "Amazon",
    role: "Data Scientist",
    avatarUrl: "https://avatar.iran.liara.run/public/girl?id=4",
    batch: "2020",
    yearsAtCompany: "4 years",
    location: "Bangalore",
    skills: ["Python", "Machine Learning", "SQL", "Statistics"],
    industry: "Technology",
    availability: "available",
    linkedInUrl: "https://linkedin.com/in/priyamehta",
    connectionStatus: "none",
    lastActive: "2024-12-11",
    mutualConnections: 3
  },
  {
    id: 8,
    name: "Arjun Sharma",
    company: "Amazon",
    role: "Product Manager",
    avatarUrl: "https://avatar.iran.liara.run/public/boy?id=4",
    batch: "2021",
    yearsAtCompany: "3 years",
    location: "Hyderabad",
    skills: ["Product Management", "Agile", "Data Analysis"],
    industry: "Technology",
    availability: "busy",
    linkedInUrl: "https://linkedin.com/in/arjunsharma",
    connectionStatus: "none",
    lastActive: "2024-12-07",
    mutualConnections: 1
  },
  {
    id: 9,
    name: "Sneha Reddy",
    company: "Swiggy",
    role: "UX Designer",
    avatarUrl: "https://avatar.iran.liara.run/public/girl?id=5",
    batch: "2022",
    yearsAtCompany: "2 years",
    location: "Bangalore",
    skills: ["UX Design", "Figma", "User Research", "Prototyping"],
    industry: "Technology",
    availability: "open",
    linkedInUrl: "https://linkedin.com/in/snehareddy",
    connectionStatus: "none",
    lastActive: "2024-12-09",
    mutualConnections: 2
  },
  {
    id: 10,
    name: "Vikram Jain",
    company: "Goldman Sachs",
    role: "Investment Banker",
    avatarUrl: "https://avatar.iran.liara.run/public/boy?id=5",
    batch: "2019",
    yearsAtCompany: "5 years",
    location: "Mumbai",
    skills: ["Financial Modeling", "Investment Banking", "Excel", "Valuation"],
    industry: "Finance",
    availability: "busy",
    linkedInUrl: "https://linkedin.com/in/vikramjain",
    connectionStatus: "none",
    lastActive: "2024-12-08",
    mutualConnections: 0
  },
  {
    id: 11,
    name: "Divya Iyer",
    company: "Goldman Sachs",
    role: "Analyst",
    avatarUrl: "https://avatar.iran.liara.run/public/girl?id=6",
    batch: "2023",
    yearsAtCompany: "1 year",
    location: "Mumbai",
    skills: ["Financial Analysis", "Excel", "PowerPoint"],
    industry: "Finance",
    availability: "available",
    linkedInUrl: "https://linkedin.com/in/divyaiyer",
    connectionStatus: "none",
    lastActive: "2024-12-12",
    mutualConnections: 1
  },
  {
    id: 12,
    name: "Rahul Khanna",
    company: "Flipkart",
    role: "Product Lead",
    avatarUrl: "https://avatar.iran.liara.run/public/boy?id=6",
    batch: "2020",
    yearsAtCompany: "4 years",
    location: "Bangalore",
    skills: ["Product Management", "Leadership", "Strategy", "Data Analysis"],
    industry: "E-commerce",
    availability: "open",
    linkedInUrl: "https://linkedin.com/in/rahulkhanna",
    connectionStatus: "none",
    lastActive: "2024-12-10",
    mutualConnections: 2
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
  "Polish your LinkedIn headline with industry keywords.",
  "Draft a tailored cover letter paragraph for this role.",
  "Create a one-page case study showcasing your recent impact.",
  "Reach out to a faculty mentor for fresh application feedback.",
  "Refresh your GitHub README with new project learnings.",
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

// Comprehensive Profile Data
export interface Profile {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    avatarUrl: string;
    linkedinUrl: string;
    githubUrl: string;
    portfolioUrl: string;
    twitterUrl?: string;
  };
  academicInfo: {
    program: string;
    batchYear: number;
    enrollmentNumber: string;
    cgpa: number;
    specialization: string;
    expectedGraduation: string;
    previousEducation: {
      degree: string;
      institution: string;
      year: string;
      cgpa: number;
    }[];
  };
  professionalExperience: {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string | null;
    isCurrent: boolean;
    description: string;
    achievements: string[];
  }[];
  skills: {
    technical: { name: string; proficiency: number }[];
    soft: { name: string; proficiency: number }[];
    languages: { name: string; proficiency: string }[];
  };
  certifications: {
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate: string | null;
    credentialId: string;
    credentialUrl: string;
  }[];
  projects: {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    startDate: string;
    endDate: string | null;
    githubUrl?: string;
    liveUrl?: string;
    achievements: string[];
  }[];
  achievements: {
    id: string;
    title: string;
    description: string;
    date: string;
    issuer: string;
    category: "academic" | "professional" | "competition" | "other";
  }[];
  careerGoals: {
    targetRoles: string[];
    targetCompanies: string[];
    preferredLocations: string[];
    salaryExpectation: string;
    availabilityDate: string;
    workMode: "remote" | "hybrid" | "onsite";
  };
  documents: {
    id: string;
    name: string;
    type: "cv" | "cover-letter" | "transcript" | "certificate" | "other";
    uploadDate: string;
    isDefault: boolean;
  }[];
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    jobAlerts: boolean;
    newsletter: boolean;
    privacyLevel: "public" | "private" | "alumni-only";
  };
}

export const studentProfile: Profile = {
  personalInfo: {
    name: "Priya Sharma",
    email: "priya.sharma@student.edu",
    phone: "+91 98765 43210",
    dateOfBirth: "2000-05-15",
    address: "123 Campus Avenue",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    avatarUrl: "https://avatar.iran.liara.run/public/girl",
    linkedinUrl: "https://linkedin.com/in/priyasharma",
    githubUrl: "https://github.com/priyasharma",
    portfolioUrl: "https://priyasharma.dev",
    twitterUrl: "https://twitter.com/priyasharma",
  },
  academicInfo: {
    program: "MBA",
    batchYear: 2026,
    enrollmentNumber: "MBA2026-12345",
    cgpa: 8.7,
    specialization: "Business Analytics & Strategy",
    expectedGraduation: "2026-05",
    previousEducation: [
      {
        degree: "Bachelor of Engineering in Computer Science",
        institution: "Mumbai University",
        year: "2022",
        cgpa: 8.5,
      },
      {
        degree: "Higher Secondary Certificate",
        institution: "St. Xavier's College",
        year: "2018",
        cgpa: 9.2,
      },
    ],
  },
  professionalExperience: [
    {
      id: "1",
      title: "Business Analyst Intern",
      company: "TechCorp Solutions",
      location: "Mumbai",
      startDate: "2024-06",
      endDate: "2024-08",
      isCurrent: false,
      description: "Worked on digital transformation projects for enterprise clients, analyzing business processes and recommending technology solutions.",
      achievements: [
        "Improved client reporting efficiency by 40% through automated dashboards",
        "Conducted 15+ stakeholder interviews and documented requirements",
        "Created process flow diagrams for 5 major business functions",
      ],
    },
    {
      id: "2",
      title: "Data Analyst",
      company: "StartupXYZ",
      location: "Bangalore",
      startDate: "2023-01",
      endDate: "2024-05",
      isCurrent: false,
      description: "Analyzed user behavior data to drive product decisions and marketing strategies. Built predictive models for customer churn.",
      achievements: [
        "Reduced customer churn by 25% through data-driven insights",
        "Built automated reporting system saving 10 hours/week",
        "Presented findings to C-suite executives monthly",
      ],
    },
  ],
  skills: {
    technical: [
      { name: "SQL", proficiency: 90 },
      { name: "Python", proficiency: 85 },
      { name: "Excel", proficiency: 95 },
      { name: "Tableau", proficiency: 80 },
      { name: "Power BI", proficiency: 75 },
      { name: "Business Analysis", proficiency: 88 },
      { name: "Data Visualization", proficiency: 82 },
      { name: "Statistical Analysis", proficiency: 78 },
      { name: "R", proficiency: 70 },
      { name: "Git", proficiency: 75 },
    ],
    soft: [
      { name: "Communication", proficiency: 92 },
      { name: "Problem Solving", proficiency: 90 },
      { name: "Leadership", proficiency: 85 },
      { name: "Teamwork", proficiency: 88 },
      { name: "Presentation", proficiency: 87 },
      { name: "Time Management", proficiency: 90 },
      { name: "Critical Thinking", proficiency: 88 },
    ],
    languages: [
      { name: "English", proficiency: "Fluent" },
      { name: "Hindi", proficiency: "Native" },
      { name: "Marathi", proficiency: "Native" },
      { name: "French", proficiency: "Basic" },
    ],
  },
  certifications: [
    {
      id: "1",
      name: "Google Data Analytics Professional Certificate",
      issuer: "Google",
      issueDate: "2024-03",
      expiryDate: null,
      credentialId: "GDA-2024-12345",
      credentialUrl: "https://coursera.org/verify/12345",
    },
    {
      id: "2",
      name: "Tableau Desktop Specialist",
      issuer: "Tableau",
      issueDate: "2024-01",
      expiryDate: "2027-01",
      credentialId: "TDS-2024-67890",
      credentialUrl: "https://tableau.com/verify/67890",
    },
    {
      id: "3",
      name: "SQL Advanced Certification",
      issuer: "HackerRank",
      issueDate: "2023-11",
      expiryDate: null,
      credentialId: "HR-SQL-ADV-98765",
      credentialUrl: "https://hackerrank.com/certificates/98765",
    },
  ],
  projects: [
    {
      id: "1",
      title: "Customer Churn Prediction Model",
      description: "Built a machine learning model to predict customer churn using Python and scikit-learn. Achieved 85% accuracy and identified key churn indicators.",
      technologies: ["Python", "scikit-learn", "Pandas", "Matplotlib", "Jupyter"],
      startDate: "2024-02",
      endDate: "2024-04",
      githubUrl: "https://github.com/priyasharma/churn-prediction",
      achievements: [
        "Achieved 85% prediction accuracy",
        "Identified top 5 churn indicators",
        "Implemented in production reducing churn by 20%",
      ],
    },
    {
      id: "2",
      title: "Business Intelligence Dashboard",
      description: "Created an interactive BI dashboard for sales analytics using Tableau. Integrated data from multiple sources and automated refresh.",
      technologies: ["Tableau", "SQL", "Excel"],
      startDate: "2023-09",
      endDate: "2023-12",
      liveUrl: "https://dashboard.example.com",
      achievements: [
        "Reduced reporting time by 60%",
        "Used by 50+ stakeholders",
        "Automated daily data refresh",
      ],
    },
    {
      id: "3",
      title: "E-commerce Analytics Platform",
      description: "Developed a comprehensive analytics platform for tracking e-commerce KPIs including conversion rates, customer lifetime value, and product performance.",
      technologies: ["Python", "Flask", "PostgreSQL", "D3.js"],
      startDate: "2023-06",
      endDate: "2023-08",
      githubUrl: "https://github.com/priyasharma/ecommerce-analytics",
      liveUrl: "https://analytics.example.com",
      achievements: [
        "Tracked 1M+ transactions",
        "Real-time dashboard updates",
        "Custom alerting system",
      ],
    },
  ],
  achievements: [
    {
      id: "1",
      title: "Dean's List - Academic Excellence",
      description: "Recognized for maintaining CGPA above 8.5 for consecutive semesters",
      date: "2024-12",
      issuer: "University",
      category: "academic",
    },
    {
      id: "2",
      title: "Best Business Case Presentation",
      description: "Won first place in inter-college business case competition",
      date: "2024-10",
      issuer: "Business School Association",
      category: "competition",
    },
    {
      id: "3",
      title: "Data Science Hackathon Winner",
      description: "Led team to victory in 48-hour data science hackathon",
      date: "2024-08",
      issuer: "TechFest 2024",
      category: "competition",
    },
    {
      id: "4",
      title: "Outstanding Intern Award",
      description: "Recognized for exceptional performance during summer internship",
      date: "2024-08",
      issuer: "TechCorp Solutions",
      category: "professional",
    },
  ],
  careerGoals: {
    targetRoles: ["Business Analyst", "Consultant", "Product Manager", "Data Analyst"],
    targetCompanies: ["McKinsey", "Deloitte", "Goldman Sachs", "Amazon", "Google"],
    preferredLocations: ["Mumbai", "Bangalore", "Delhi", "Hyderabad"],
    salaryExpectation: "₹15-25 LPA",
    availabilityDate: "2026-06",
    workMode: "hybrid",
  },
  documents: [
    {
      id: "1",
      name: "Resume_Priya_Sharma_2024.pdf",
      type: "cv",
      uploadDate: "2024-11-15",
      isDefault: true,
    },
    {
      id: "2",
      name: "Cover_Letter_Deloitte.pdf",
      type: "cover-letter",
      uploadDate: "2024-11-10",
      isDefault: false,
    },
    {
      id: "3",
      name: "Academic_Transcript.pdf",
      type: "transcript",
      uploadDate: "2024-10-01",
      isDefault: false,
    },
  ],
  preferences: {
    emailNotifications: true,
    smsNotifications: false,
    jobAlerts: true,
    newsletter: true,
    privacyLevel: "alumni-only",
  },
};

