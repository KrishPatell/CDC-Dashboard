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
}

export interface Alumni {
  id: number;
  name: string;
  company: string;
  role: string;
  avatarUrl: string;
  batch?: string;
  yearsAtCompany?: string;
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
    batch: "2022",
    yearsAtCompany: "2 years"
  },
  {
    id: 2,
    name: "Aman Patel",
    company: "Zepto",
    role: "Ops Manager",
    avatarUrl: "https://avatar.iran.liara.run/public/boy?id=1",
    batch: "2021",
    yearsAtCompany: "3 years"
  },
  {
    id: 3,
    name: "Neha Joshi",
    company: "TCS",
    role: "Consultant",
    avatarUrl: "https://avatar.iran.liara.run/public/girl?id=2",
    batch: "2020",
    yearsAtCompany: "4 years"
  },
  {
    id: 4,
    name: "Rohan Verma",
    company: "McKinsey",
    role: "Business Analyst",
    avatarUrl: "https://avatar.iran.liara.run/public/boy?id=2",
    batch: "2021",
    yearsAtCompany: "3 years"
  },
  {
    id: 5,
    name: "Ananya Gupta",
    company: "Deloitte",
    role: "Senior Consultant",
    avatarUrl: "https://avatar.iran.liara.run/public/girl?id=3",
    batch: "2019",
    yearsAtCompany: "5 years"
  },
  {
    id: 6,
    name: "Karan Singh",
    company: "Deloitte",
    role: "Business Analyst",
    avatarUrl: "https://avatar.iran.liara.run/public/boy?id=3",
    batch: "2022",
    yearsAtCompany: "2 years"
  },
  {
    id: 7,
    name: "Priya Mehta",
    company: "Amazon",
    role: "Data Scientist",
    avatarUrl: "https://avatar.iran.liara.run/public/girl?id=4",
    batch: "2020",
    yearsAtCompany: "4 years"
  },
  {
    id: 8,
    name: "Arjun Sharma",
    company: "Amazon",
    role: "Product Manager",
    avatarUrl: "https://avatar.iran.liara.run/public/boy?id=4",
    batch: "2021",
    yearsAtCompany: "3 years"
  },
  {
    id: 9,
    name: "Sneha Reddy",
    company: "Swiggy",
    role: "UX Designer",
    avatarUrl: "https://avatar.iran.liara.run/public/girl?id=5",
    batch: "2022",
    yearsAtCompany: "2 years"
  },
  {
    id: 10,
    name: "Vikram Jain",
    company: "Goldman Sachs",
    role: "Investment Banker",
    avatarUrl: "https://avatar.iran.liara.run/public/boy?id=5",
    batch: "2019",
    yearsAtCompany: "5 years"
  },
  {
    id: 11,
    name: "Divya Iyer",
    company: "Goldman Sachs",
    role: "Analyst",
    avatarUrl: "https://avatar.iran.liara.run/public/girl?id=6",
    batch: "2023",
    yearsAtCompany: "1 year"
  },
  {
    id: 12,
    name: "Rahul Khanna",
    company: "Flipkart",
    role: "Product Lead",
    avatarUrl: "https://avatar.iran.liara.run/public/boy?id=6",
    batch: "2020",
    yearsAtCompany: "4 years"
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

