# Lovable Clone - API Contracts & Implementation Plan

## 1. API Contracts

### Authentication & Users
```
POST /api/auth/register - Register new user
POST /api/auth/login - User login
POST /api/auth/logout - User logout
GET /api/auth/me - Get current user profile
PUT /api/auth/profile - Update user profile
```

### Projects Management
```
GET /api/projects - Get user projects
POST /api/projects - Create new project from prompt
GET /api/projects/:id - Get project details
PUT /api/projects/:id - Update project
DELETE /api/projects/:id - Delete project
POST /api/projects/:id/generate - Generate/build project code
GET /api/projects/:id/status - Get project build status
GET /api/projects/:id/files - Get project files
POST /api/projects/:id/deploy - Deploy project
```

### Community
```
GET /api/community/projects - Get public community projects
GET /api/community/projects/:id - Get community project details
POST /api/community/projects/:id/like - Like/unlike project
GET /api/community/stats - Get community statistics
GET /api/community/tags - Get available tags
```

### Admin Panel
```
GET /api/admin/settings - Get system settings (API keys, configs)
PUT /api/admin/settings - Update system settings
GET /api/admin/plans - Get subscription plans
POST /api/admin/plans - Create new plan
PUT /api/admin/plans/:id - Update plan
DELETE /api/admin/plans/:id - Delete plan
GET /api/admin/users - Get all users
GET /api/admin/projects - Get all projects
GET /api/admin/analytics - Get platform analytics
```

### Payments & Subscriptions
```
GET /api/subscriptions/current - Get user subscription
POST /api/subscriptions/create - Create subscription
POST /api/subscriptions/cancel - Cancel subscription
GET /api/subscriptions/plans - Get available plans
POST /api/payments/webhook - Stripe webhook handler
```

### AI Integration
```
POST /api/ai/generate - Generate project from prompt (using EMERGENT_LLM_KEY)
POST /api/ai/chat - Chat with AI about project
GET /api/ai/templates - Get available templates
```

## 2. Data Models

### User Model
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  name: String,
  avatar: String,
  role: String (user/admin),
  subscription: {
    plan: String,
    status: String,
    startDate: Date,
    endDate: Date,
    stripeCustomerId: String,
    stripeSubscriptionId: String
  },
  usage: {
    messagesUsed: Number,
    projectsCreated: Number,
    lastResetDate: Date
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Project Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  name: String,
  description: String,
  prompt: String,
  status: String (pending/building/ready/error/deployed),
  progress: Number,
  type: String,
  framework: String,
  isPublic: Boolean,
  likes: Number,
  views: Number,
  tags: [String],
  files: [{
    name: String,
    content: String,
    type: String
  }],
  deployment: {
    url: String,
    status: String,
    lastDeployed: Date
  },
  buildLogs: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Plan Model
```javascript
{
  _id: ObjectId,
  name: String,
  price: Number,
  period: String (month/year),
  features: [String],
  limitations: [String],
  messagesLimit: Number,
  projectsLimit: Number,
  isActive: Boolean,
  stripePriceId: String,
  createdAt: Date
}
```

### Settings Model
```javascript
{
  _id: ObjectId,
  apiKeys: {
    emergentLlmKey: String,
    stripePublicKey: String,
    stripeSecretKey: String,
    deploymentApiKey: String
  },
  aiSettings: {
    defaultModel: String,
    maxTokens: Number,
    temperature: Number
  },
  paymentSettings: {
    currency: String,
    taxRate: Number
  },
  systemSettings: {
    maintenanceMode: Boolean,
    maxUsersPerPlan: Object,
    defaultPlan: String
  },
  updatedAt: Date
}
```

## 3. Mock Data to Replace

### Frontend Mock Data (from mockData.js):
- `mockProjects` → Replace with API calls to `/api/projects`
- `mockCommunityProjects` → Replace with `/api/community/projects`  
- `mockPricingPlans` → Replace with `/api/subscriptions/plans`

### Frontend Components to Update:
- HomePage.jsx: Connect generate button to actual AI API
- Dashboard.jsx: Connect to real project APIs
- Community.jsx: Connect to real community APIs
- Pricing.jsx: Connect to real subscription APIs

## 4. Backend Implementation Plan

### Phase 1: Core Infrastructure
1. Setup authentication middleware (JWT)
2. Create database models (User, Project, Plan, Settings)
3. Implement basic CRUD operations
4. Setup admin middleware

### Phase 2: AI Integration 
1. Install emergentintegrations library
2. Implement AI project generation using EMERGENT_LLM_KEY
3. Create project building simulation/real implementation
4. File generation and management

### Phase 3: Admin Panel
1. Protected admin routes
2. Settings management (API keys)
3. Plans management
4. User management
5. Analytics dashboard

### Phase 4: Payments Integration
1. Stripe integration for subscriptions
2. Webhook handling
3. Usage tracking and limits
4. Plan enforcement

### Phase 5: Advanced Features
1. Real deployment capabilities
2. File management system
3. Community features (likes, shares)
4. Search and filtering

## 5. Frontend & Backend Integration

### Authentication Flow:
1. Remove mock authentication
2. Implement real login/register forms
3. Add JWT token management
4. Protect routes based on subscription

### Project Creation Flow:
1. User enters prompt → POST /api/ai/generate
2. AI generates project structure → POST /api/projects
3. Real-time updates via WebSocket or polling
4. Display actual generated files and preview

### Admin Panel Integration:
1. Add admin route guard
2. Create admin components for settings
3. Real-time plan management
4. API key configuration interface

### Payment Integration:
1. Stripe Checkout integration
2. Real subscription management
3. Usage tracking and limits
4. Plan upgrade/downgrade flows

## 6. Security Considerations

- JWT token authentication
- Admin role verification
- API rate limiting
- Input validation and sanitization
- Secure API key storage
- Payment webhook verification
- CORS configuration
- Environment variables protection

## 7. Deployment Requirements

- Environment variables for all API keys
- MongoDB connection
- Stripe webhook endpoint
- File storage system
- Background job processing for AI generation
- Monitoring and logging

This contract ensures seamless integration between frontend mock data and real backend functionality while maintaining the same user experience.