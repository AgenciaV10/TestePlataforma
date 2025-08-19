export const mockProjects = [
  {
    id: "1",
    name: "E-commerce Platform",
    description: "A modern e-commerce website with shopping cart, payment integration, and admin dashboard",
    status: "ready",
    progress: 100,
    created: "2024-12-15T10:30:00Z",
    type: "web-app",
    framework: "React + Node.js",
    deployment: "deployed"
  },
  {
    id: "2",
    name: "Task Management App",
    description: "Collaborative task management application with real-time updates and team collaboration",
    status: "ready", 
    progress: 100,
    created: "2024-12-14T14:15:00Z",
    type: "web-app",
    framework: "Vue.js + FastAPI",
    deployment: "deployed"
  },
  {
    id: "3",
    name: "Blog Platform",
    description: "Personal blog platform with markdown support, comments, and SEO optimization",
    status: "building",
    progress: 65,
    created: "2024-12-16T09:45:00Z",
    type: "website",
    framework: "Next.js + Prisma",
    deployment: "pending"
  },
  {
    id: "4",
    name: "Weather Dashboard",
    description: "Interactive weather dashboard with forecasts, maps, and location-based alerts",
    status: "ready",
    progress: 100,
    created: "2024-12-13T16:20:00Z",
    type: "web-app",
    framework: "React + Express",
    deployment: "deployed"
  },
  {
    id: "5",
    name: "Recipe Finder",
    description: "Recipe discovery app with ingredient search, dietary filters, and meal planning",
    status: "error",
    progress: 45,
    created: "2024-12-16T11:00:00Z",
    type: "mobile-app",
    framework: "React Native",
    deployment: "failed"
  }
];

export const mockCommunityProjects = [
  {
    id: "c1",
    title: "AI Chat Assistant",
    author: "john_dev",
    description: "Intelligent chat assistant with natural language processing",
    likes: 234,
    views: 1520,
    tags: ["AI", "NLP", "Chat"],
    created: "2024-12-15T08:30:00Z",
    featured: true
  },
  {
    id: "c2", 
    title: "Crypto Portfolio Tracker",
    author: "crypto_sarah",
    description: "Track your cryptocurrency investments with real-time price updates",
    likes: 187,
    views: 892,
    tags: ["Crypto", "Finance", "Trading"],
    created: "2024-12-14T20:15:00Z",
    featured: false
  },
  {
    id: "c3",
    title: "Social Media Dashboard", 
    author: "design_mike",
    description: "Manage multiple social media accounts from one beautiful interface",
    likes: 156,
    views: 743,
    tags: ["Social", "Dashboard", "Analytics"],
    created: "2024-12-14T12:45:00Z", 
    featured: true
  },
  {
    id: "c4",
    title: "Fitness Tracker App",
    author: "fitness_guru",
    description: "Track workouts, nutrition, and progress with detailed analytics",
    likes: 298,
    views: 1834,
    tags: ["Fitness", "Health", "Tracking"],
    created: "2024-12-13T15:22:00Z",
    featured: false
  },
  {
    id: "c5",
    title: "Music Streaming Player",
    author: "audio_alex",
    description: "Beautiful music player with playlist management and social features", 
    likes: 445,
    views: 2156,
    tags: ["Music", "Audio", "Streaming"],
    created: "2024-12-12T10:18:00Z",
    featured: true
  }
];

export const mockPricingPlans = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    description: "Perfect for getting started and experimenting",
    features: [
      "5 messages per day",
      "30 messages per month",
      "Basic templates",
      "Community support",
      "Public projects only"
    ],
    limitations: [
      "Limited AI interactions",
      "No private projects", 
      "Basic deployment options"
    ],
    buttonText: "Get Started Free",
    popular: false
  },
  {
    name: "Pro",
    price: 29,
    period: "month", 
    description: "For serious developers and small teams",
    features: [
      "Unlimited messages",
      "Private projects",
      "Advanced templates",
      "Priority support",
      "Custom domains",
      "Team collaboration",
      "Advanced deployment",
      "Version control integration"
    ],
    limitations: [],
    buttonText: "Start Pro Trial",
    popular: true
  },
  {
    name: "Team", 
    price: 99,
    period: "month",
    description: "For growing teams and organizations",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Advanced collaboration tools",
      "Team management",
      "Custom integrations",
      "Dedicated support",
      "Enterprise security",
      "Usage analytics"
    ],
    limitations: [],
    buttonText: "Contact Sales",
    popular: false
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with specific needs", 
    features: [
      "Everything in Team",
      "Unlimited team members", 
      "Custom deployment options",
      "SLA guarantees",
      "Dedicated account manager",
      "Custom training",
      "On-premise deployment",
      "24/7 phone support"
    ],
    limitations: [],
    buttonText: "Contact Sales", 
    popular: false
  }
];