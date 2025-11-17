# Page Implementation Plan: Alumni Finder, Roadmap Coach & CV Comparator

## Overview
This document outlines the implementation plan for three full-featured pages in the CDC Dashboard:
1. **Alumni Finder** - Advanced search and connection platform
2. **Roadmap Coach** - Personalized career roadmap with AI guidance
3. **CV Comparator** - Compare CVs against job descriptions and get optimization tips

---

## 1. Alumni Finder Page (`/dashboard/alumni`)

### Current State
- Basic widget component (`AlumniList.tsx`) showing 4 alumni per page
- Simple pagination
- Basic connect functionality

### Proposed Full Page Features

#### **Layout Structure**
```
┌─────────────────────────────────────────────────────────┐
│ Header: "Alumni Finder" + Search Bar                    │
├─────────────────────────────────────────────────────────┤
│ Filters Sidebar (Left) │ Main Content Area (Right)     │
│                         │                               │
│ - Company Filter        │ ┌─────────────────────────┐ │
│ - Role Filter           │ │ Alumni Card Grid         │ │
│ - Batch Filter          │ │ (3 columns)              │ │
│ - Location Filter       │ │                         │ │
│ - Years of Experience   │ │ [Alumni Card]            │ │
│                         │ │ [Alumni Card]            │ │
│ - Availability Status   │ │ [Alumni Card]            │ │
│                         │ │                         │ │
│ [Clear Filters]         │ │ [Pagination Controls]   │ │
│                         │ └─────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

#### **Key Features**

1. **Advanced Search & Filters**
   - Search by name, company, role, skills
   - Filter by:
     - Company (multi-select dropdown)
     - Role/Title (multi-select)
     - Batch/Year (range slider)
     - Location (multi-select)
     - Years of Experience (range slider)
     - Availability Status (Available, Busy, Open to Connect)
     - Industry/Sector
   - Sort by: Relevance, Recent Activity, Years of Experience

2. **Enhanced Alumni Cards**
   - Profile photo with hover effect
   - Name, current role, company
   - Batch information
   - Years at company
   - Key skills/technologies
   - Location
   - Availability indicator (green/yellow/red dot)
   - Quick actions:
     - "Connect" button
     - "View Profile" button
     - "Request Referral" button (if applicable)
   - LinkedIn integration badge

3. **Alumni Profile Modal/Page**
   - Full profile view when clicking "View Profile"
   - Career timeline
   - Current and past companies
   - Skills and expertise
   - Education background
   - Contact information (if shared)
   - Mutual connections
   - Recent activity/updates

4. **Connection Features**
   - Send connection request
   - Message alumni directly
   - Request referral for specific jobs
   - Track connection status (Pending, Connected, Referred)

5. **Smart Recommendations**
   - "Alumni at Companies You're Interested In"
   - "Alumni in Similar Roles"
   - "Recently Active Alumni"
   - "Mutual Connections"

6. **Statistics Dashboard**
   - Total alumni count
   - Alumni by company (pie chart)
   - Alumni by role (bar chart)
   - Top companies represented
   - Connection success rate

#### **Components Needed**
- `AlumniFinderPage.tsx` - Main page component
- `AlumniSearchBar.tsx` - Search input with autocomplete
- `AlumniFilters.tsx` - Filter sidebar component
- `AlumniCard.tsx` - Enhanced card component
- `AlumniProfileModal.tsx` - Profile detail modal
- `AlumniStats.tsx` - Statistics dashboard
- `ConnectionRequestModal.tsx` - Connection request form

#### **Data Structure Extensions**
```typescript
interface Alumni {
  id: number;
  name: string;
  company: string;
  role: string;
  avatarUrl: string;
  batch?: string;
  yearsAtCompany?: string;
  // New fields:
  location?: string;
  skills?: string[];
  industry?: string;
  availability?: "available" | "busy" | "open";
  linkedInUrl?: string;
  email?: string; // Optional, privacy-controlled
  bio?: string;
  pastCompanies?: Array<{ company: string; role: string; duration: string }>;
  education?: Array<{ degree: string; institution: string; year: string }>;
  connectionStatus?: "none" | "pending" | "connected" | "referred";
  lastActive?: string;
  mutualConnections?: number;
}
```

---

## 2. Roadmap Coach Page (`/dashboard/roadmap`)

### Current State
- Basic widget component (`RoadmapList.tsx`) showing weekly tasks
- Simple task completion toggle
- Progress bar

### Proposed Full Page Features

#### **Layout Structure**
```
┌─────────────────────────────────────────────────────────┐
│ Header: "Roadmap Coach" + Progress Overview            │
├─────────────────────────────────────────────────────────┤
│ Tabs: [Overview] [Career Path] [Skills] [Timeline]     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ┌─────────────────┐  ┌─────────────────────────────┐ │
│ │ Progress Stats  │  │ Current Focus Area          │ │
│ │                 │  │                             │ │
│ │ Overall: 65%    │  │ [Active Task Card]          │ │
│ │ This Week: 3/5  │  │ [Active Task Card]          │ │
│ │ This Month: 12/20│ │                             │ │
│ └─────────────────┘  └─────────────────────────────┘ │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Weekly Roadmap Tasks                               │ │
│ │ [Task List with Categories]                       │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ AI Recommendations                                 │ │
│ │ [Personalized suggestions]                         │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

#### **Key Features**

1. **Multi-Level Roadmap System**
   - **Career Goals** (Long-term: 1-2 years)
     - Set career objectives
     - Target roles/companies
     - Salary goals
     - Skill milestones
   - **Quarterly Goals** (3 months)
     - Break down long-term goals
     - Quarterly milestones
   - **Weekly Tasks** (Current implementation)
     - Daily/weekly actionable items
     - Task categories:
       - Applications
       - Skill Development
       - Networking
       - Interview Prep
       - Portfolio Building

2. **AI-Powered Coaching**
   - Personalized task recommendations based on:
     - Current profile
     - Career goals
     - Application history
     - Skill gaps
   - Smart task prioritization
   - Deadline reminders
   - Progress insights and suggestions

3. **Task Management**
   - Create custom tasks
   - Set deadlines and priorities
   - Task categories and tags
   - Subtasks and dependencies
   - Task notes and attachments
   - Recurring tasks
   - Task templates (e.g., "Apply to 5 jobs this week")

4. **Progress Tracking**
   - Overall progress dashboard
   - Weekly/monthly progress reports
   - Goal completion timeline
   - Streak tracking (consecutive days active)
   - Achievement badges

5. **Career Path Visualization**
   - Interactive timeline view
   - Milestone markers
   - Skill development path
   - Application timeline
   - Interview preparation timeline

6. **Skills Development Tracker**
   - Skills gap analysis
   - Recommended learning resources
   - Skill level tracking (Beginner → Intermediate → Advanced)
   - Certification goals
   - Project suggestions to build skills

7. **Integration Features**
   - Link tasks to job applications
   - Link tasks to skill development
   - Link tasks to networking activities
   - Calendar integration (upcoming deadlines)

#### **Components Needed**
- `RoadmapCoachPage.tsx` - Main page component
- `RoadmapOverview.tsx` - Overview tab
- `CareerPathView.tsx` - Career path visualization
- `SkillsTracker.tsx` - Skills development tab
- `TimelineView.tsx` - Timeline visualization
- `TaskCard.tsx` - Enhanced task card
- `TaskCreator.tsx` - Task creation modal/form
- `ProgressStats.tsx` - Statistics dashboard
- `AICoachWidget.tsx` - AI recommendations widget
- `GoalSetter.tsx` - Goal setting component

#### **Data Structure Extensions**
```typescript
interface RoadmapTask {
  id: number;
  task: string;
  done: boolean;
  // New fields:
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

interface CareerGoal {
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

interface SkillGoal {
  id: string;
  skillName: string;
  currentLevel: "beginner" | "intermediate" | "advanced";
  targetLevel: "beginner" | "intermediate" | "advanced";
  progress: number;
  resources: Array<{ title: string; url: string; type: string }>;
  projects: Array<{ title: string; description: string }>;
}
```

---

## 3. CV Comparator Page (`/dashboard/comparator`)

### Current State
- No existing implementation
- CV upload exists in onboarding flow

### Proposed Full Page Features

#### **Layout Structure**
```
┌─────────────────────────────────────────────────────────┐
│ Header: "CV Comparator" + Upload CV Button            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ┌─────────────────┐  ┌─────────────────────────────┐ │
│ │ Your CV         │  │ Job Description             │ │
│ │                 │  │                             │ │
│ │ [CV Preview]    │  │ [Job Selector/Dropdown]     │ │
│ │                 │  │                             │ │
│ │ [Upload New]    │  │ [Job Details Preview]       │ │
│ │ [Edit CV]       │  │                             │ │
│ └─────────────────┘  └─────────────────────────────┘ │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Comparison Results                                 │ │
│ │                                                     │ │
│ │ Overall Match Score: 78%                            │ │
│ │                                                     │ │
│ │ ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │
│ │ │ Skills Match │  │ Experience   │  │ Education│ │
│ │ │ 85%          │  │ Match 70%    │  │ Match 90%│ │
│ │ └──────────────┘  └──────────────┘  └──────────┘ │
│ │                                                     │ │
│ │ [Detailed Analysis Tabs]                           │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ AI Optimization Suggestions                         │ │
│ │ [Actionable improvement tips]                       │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

#### **Key Features**

1. **CV Upload & Management**
   - Upload CV (PDF, DOC, DOCX)
   - CV parsing and extraction
   - Multiple CV versions support
   - CV preview/edit
   - Save CV versions with names/tags

2. **Job Selection**
   - Search and select from job listings
   - Upload custom job description
   - Compare against multiple jobs simultaneously
   - Save favorite jobs for comparison

3. **Comprehensive Comparison**
   - **Overall Match Score** (0-100%)
   - **Skills Analysis**
     - Required skills vs. your skills
     - Missing skills highlighted
     - Skill level matching
     - Skill relevance scoring
   - **Experience Matching**
     - Role relevance
     - Industry experience
     - Years of experience
     - Key achievements alignment
   - **Education Matching**
     - Degree requirements
     - Institution relevance
     - GPA/performance
   - **Keywords Analysis**
     - ATS keyword matching
     - Missing keywords
     - Keyword density analysis
   - **Soft Skills Matching**
     - Leadership experience
     - Communication skills
     - Teamwork examples

4. **Visual Comparison Tools**
   - Side-by-side comparison view
   - Highlight differences
   - Match score breakdown charts
   - Skills radar chart
   - Experience timeline comparison

5. **AI-Powered Optimization**
   - **Critical Improvements** (High priority)
     - Missing essential skills
     - Experience gaps
     - Keyword optimization
   - **Important Enhancements** (Medium priority)
     - Better skill descriptions
     - Achievement quantification
     - Formatting improvements
   - **Suggestions** (Low priority)
     - Additional certifications
     - Project additions
     - Summary optimization

6. **Actionable Recommendations**
   - Specific CV edits suggested
   - Skills to add/emphasize
   - Experience to highlight
   - Keywords to include
   - Formatting suggestions
   - Section reorganization tips

7. **Comparison History**
   - Save comparison results
   - Track improvement over time
   - Compare CV versions
   - Export comparison reports

8. **Export & Share**
   - Export comparison report (PDF)
   - Share optimized CV suggestions
   - Generate improvement checklist

#### **Components Needed**
- `CVComparatorPage.tsx` - Main page component
- `CVUploader.tsx` - CV upload component
- `CVPreview.tsx` - CV preview component
- `JobSelector.tsx` - Job selection dropdown
- `ComparisonResults.tsx` - Results display
- `MatchScoreCard.tsx` - Score breakdown cards
- `SkillsComparison.tsx` - Skills analysis component
- `ExperienceComparison.tsx` - Experience matching
- `AIOptimizationPanel.tsx` - AI suggestions panel
- `ComparisonHistory.tsx` - Saved comparisons
- `ExportReport.tsx` - Export functionality

#### **Data Structure**
```typescript
interface CVData {
  id: string;
  name: string;
  uploadedAt: string;
  fileUrl: string;
  parsedData: {
    personalInfo: PersonalInfo;
    experience: Experience[];
    education: Education[];
    skills: Skills;
    certifications: Certification[];
    projects: Project[];
  };
}

interface ComparisonResult {
  id: string;
  cvId: string;
  jobId: number;
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

interface OptimizationSuggestion {
  id: string;
  type: "critical" | "important" | "suggestion";
  category: "skills" | "experience" | "education" | "keywords" | "formatting";
  title: string;
  description: string;
  actionItems: string[];
  impact: "high" | "medium" | "low";
  estimatedScoreIncrease: number;
}
```

---

## Implementation Priority & Timeline

### Phase 1: Alumni Finder (Week 1-2)
1. Create full page layout
2. Implement advanced search and filters
3. Enhance alumni cards
4. Add profile modal
5. Implement connection features

### Phase 2: Roadmap Coach (Week 3-4)
1. Create full page layout
2. Implement multi-level roadmap system
3. Add task management features
4. Build progress tracking
5. Integrate AI coaching

### Phase 3: CV Comparator (Week 5-6)
1. Create full page layout
2. Implement CV upload and parsing
3. Build comparison engine
4. Add AI optimization suggestions
5. Create export functionality

---

## Technical Considerations

### State Management
- Use React Context or Zustand for shared state
- LocalStorage for persistence
- Consider Redux for complex state (if needed)

### API Integration Points
- Alumni data API
- CV parsing API (or use existing onboarding parser)
- Job data API
- AI recommendation API (or mock for MVP)

### Performance Optimizations
- Lazy load components
- Virtualize long lists
- Debounce search inputs
- Cache comparison results
- Optimize image loading

### Accessibility
- Keyboard navigation
- Screen reader support
- ARIA labels
- Focus management

### Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop enhancements
- Touch-friendly interactions

---

## Design System Consistency

All three pages should follow:
- Brand colors (blue to sky gradient)
- Consistent card styling
- Unified button styles
- Standard spacing and typography
- Animation patterns (Framer Motion)
- Loading states
- Error handling
- Empty states

---

## Next Steps

1. Review and approve this plan
2. Create detailed component mockups
3. Set up data structures in `mockData.ts`
4. Begin implementation starting with Alumni Finder
5. Iterate based on feedback

