# CDC Platform - Student Dashboard MVP

A beautiful, interactive student career dashboard for the CDC (Career Development Cell) platform.

## 🚀 Features

### Interactive Dashboard Cards

1. **My Fit Roles** 🎯
   - AI-powered role matching with fit scores (High/Medium/Low)
   - Visual skill match percentage with progress bars
   - Company details, location, CTC range
   - Deadline tracking
   - Hover effects and smooth animations

2. **Application Status** 📊
   - Real-time application pipeline tracking
   - Stage indicators (Applied → Shortlisted → Test → Interview → Offer)
   - Activity timestamps
   - Color-coded status badges

3. **Upcoming Deadlines** 📅
   - Priority-based deadline visualization
   - Days remaining countdown
   - Type indicators (Application/Test/Interview)
   - Smart color coding (High/Medium/Low priority)

4. **AI Roadmap Coach** ✨
   - Personalized weekly task recommendations
   - Interactive task completion (click to toggle)
   - Category-based tasks (CV, Interview, Skills, Outreach)
   - Progress tracking with visual progress bar
   - AI-generated task descriptions

## 🎨 Design Features

- **Modern UI**: Built with shadcn/ui components + Tailwind CSS
- **Smooth Animations**: Framer Motion for delightful interactions
- **Responsive Layout**: Works beautifully on all screen sizes
- **Interactive Elements**: 
  - Clickable task checkboxes
  - Hover effects on all cards
  - Progress bars showing real-time data
  - Badge indicators for status/priority
- **Clean Typography**: Professional fonts with clear hierarchy
- **Gradient Accents**: Subtle gradients for visual polish

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Installation & Setup

1. **Navigate to the project**:
   ```bash
   cd cdc-dashboard
   ```

2. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Mock Data

The dashboard uses realistic mock data including:

- **Student Profile**: Priya Sharma (MBA 2026)
- **4 Fit Roles**: Goldman Sachs, McKinsey, Google, Amazon
- **4 Active Applications**: Various stages
- **4 Upcoming Deadlines**: Application, Test, Interview types
- **5 AI Roadmap Tasks**: Mix of CV, Skills, Interview, Outreach tasks

## 🎯 Interactive Features

### Click to Interact:
- ✅ **Toggle Tasks**: Click any roadmap task to mark complete/incomplete
- 🎯 **Hover Effects**: All cards have smooth hover transitions
- 📊 **Progress Tracking**: Real-time progress bars update as you complete tasks
- 🎨 **Color-Coded UI**: Visual indicators for priority, status, and fit levels

## 📱 Responsive Design

The dashboard is fully responsive and adapts to:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Next Steps (Future Enhancements)

- [ ] Add backend API integration
- [ ] Implement user authentication
- [ ] Add real-time notifications
- [ ] CV upload and analysis
- [ ] Alumni network finder
- [ ] Calendar integration
- [ ] Dark mode toggle
- [ ] Export/PDF generation
- [ ] Advanced filtering and search

## 📄 Project Structure

```
cdc-dashboard/
├── app/
│   ├── page.tsx          # Main dashboard page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   └── ui/               # shadcn/ui components
│       ├── card.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── progress.tsx
│       ├── tabs.tsx
│       ├── avatar.tsx
│       └── separator.tsx
├── lib/
│   ├── mock-data.ts      # Mock data for dashboard
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## 🎨 Color Scheme

- **Primary**: Blue-Purple gradient (#3B82F6 → #9333EA)
- **Fit Levels**:
  - High: Green (#22C55E)
  - Medium: Yellow (#EAB308)
  - Low: Gray (#6B7280)
- **Priorities**:
  - High: Red (#DC2626)
  - Medium: Orange (#F97316)
  - Low: Gray (#6B7280)

## 💡 Key Components

- **Student Header**: Shows profile info and avatar
- **Welcome Section**: Personalized greeting with quick stats
- **Role Cards**: Detailed role information with skill matching
- **Application Pipeline**: Visual status tracking
- **Deadline Cards**: Time-sensitive information display
- **AI Task List**: Interactive checklist with progress

---

**Built with ❤️ for students by the CDC Platform Team**
