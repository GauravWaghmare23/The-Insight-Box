# True-FeedBack Project Documentation

## Project Overview

True-FeedBack is a Next.js-based web application that provides an anonymous feedback system. Users can sign up, verify their email, and receive anonymous messages. The application leverages modern web technologies for a seamless user experience, including authentication, email verification, and database integration.

### Key Features
- User registration and email verification
- Secure authentication using NextAuth
- Anonymous message sending and receiving
- Responsive UI with Tailwind CSS
- MongoDB for data persistence
- Email notifications via Resend

### Technology Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js v4
- **Email Service**: Resend
- **Validation**: Zod
- **Password Hashing**: bcryptjs

## Setup and Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB database (local or cloud instance)

### Installation Steps

1. **Clone the repository** (if applicable) or navigate to the project directory.

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory with the following variables:

   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/true-feedback

   # Authentication
   NEXTAUTH_SECRET=your-nextauth-secret-key-here
   NEXTAUTH_URL=http://localhost:3000

   # Email Service
   RESEND_API_KEY=your-resend-api-key-here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000).

### Build for Production
```bash
npm run build
npm start
```

## Environment Variables (.env.local)

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `NEXTAUTH_SECRET` | Secret key for NextAuth JWT encryption | Yes |
| `NEXTAUTH_URL` | Base URL for NextAuth (usually http://localhost:3000 in development) | Yes |
| `RESEND_API_KEY` | API key for Resend email service | Yes |

## Architecture and Structure

### Overall Architecture
The application follows Next.js App Router architecture with a clear separation of concerns:
- **Pages/Routes**: Located in `src/app/`
- **API Routes**: Located in `src/app/api/`
- **Components**: Organized within page directories
- **Business Logic**: Split between server-side API routes and client-side components
- **Data Layer**: Mongoose models and database connection utilities

### File and Folder Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Route group for authentication pages
│   │   └── sign-in/
│   │       └── page.tsx   # Sign-in page component
│   ├── api/               # API routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       ├── route.ts    # NextAuth API handler
│   │   │       └── options.ts  # NextAuth configuration
│   │   └── sign-up/
│   │       └── route.ts        # User registration API
│   ├── favicon.ico
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page component
├── context/               # React Context providers
│   └── AuthProvider.tsx   # NextAuth SessionProvider wrapper
├── helpers/               # Utility functions
│   └── sendVerificationEmail.ts  # Email sending utility
├── lib/                   # Library configurations and utilities
│   ├── dbConnect.ts       # MongoDB connection utility
│   └── resend.ts          # Resend email client configuration
├── models/                # Mongoose data models
│   └── User.ts            # User schema and model
├── schemas/               # Zod validation schemas
│   ├── acceptMessageSchema.ts
│   ├── messageSchema.ts
│   ├── signInSchema.ts
│   ├── signUpSchema.ts
│   └── verifySchema.ts
└── types/                 # TypeScript type definitions
    ├── ApiResponse.ts     # API response interface
    └── next-auth.d.ts     # NextAuth type extensions
```

### Component Structure

#### Guidelines
- **Server Components**: Used for data fetching and initial rendering
- **Client Components**: Used for interactivity (marked with "use client")
- **Naming Convention**: PascalCase for component files (e.g., `SignInForm.tsx`)
- **Organization**: Components are co-located with their respective pages in the App Router structure

#### Component Interaction
- **Props**: Data flows down from parent to child components
- **Context**: Global state (like authentication) is managed via React Context
- **Server/Client Boundary**: Server components handle data fetching, client components handle user interactions

### Data Flow

1. **User Request**: Routes to appropriate page in `src/app/`
2. **Server Component Rendering**: Fetches initial data if needed
3. **Client Hydration**: Interactive components take over for user interactions
4. **API Calls**: Client components call API routes for data mutations
5. **Database Operations**: API routes interact with MongoDB via Mongoose models
6. **Response**: Data flows back through the component hierarchy

## Core Concepts and Features

### Routing
The application uses Next.js **App Router** (not Pages Router). Key aspects:

- **File-based Routing**: Pages are defined by `page.tsx` files in directory structure
- **Dynamic Routes**: Support for `[slug]` and `[...catchAll]` patterns
- **Route Groups**: `(auth)` groups organize related routes without affecting URL structure
- **Nested Routes**: Automatic nesting based on folder hierarchy
- **API Routes**: Located in `app/api/` with file-based routing

### Data Fetching

#### Server Components
- Used for initial page loads and SEO-critical content
- Can directly query databases and external APIs
- Render on the server, reducing client-side JavaScript

#### Client Components
- Handle user interactions and dynamic updates
- Use React hooks for state management
- Make API calls to server-side endpoints

#### API Routes
- Serverless functions for data operations
- Handle authentication, validation, and business logic
- Return JSON responses to client components

#### Server Actions (Future Enhancement)
- Not currently implemented but can be added for form handling
- Would allow direct server mutations from client components

### Styling
- **Tailwind CSS v4**: Utility-first CSS framework
- **Global Styles**: Defined in `src/app/globals.css`
- **Component-level Styling**: Applied directly in JSX using Tailwind classes
- **Dark Mode Support**: CSS variables for theme switching
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### State Management
- **NextAuth Session**: Global authentication state via React Context
- **Local Component State**: React `useState` for component-specific state
- **No External State Library**: Currently using built-in React state management
- **Future Consideration**: Could integrate Zustand or Redux for complex state needs

### Authentication/Authorization
- **NextAuth.js v4**: Handles authentication flow
- **Credentials Provider**: Email/password authentication
- **JWT Strategy**: Stateless session management
- **Email Verification**: Required for account activation
- **Protected Routes**: Can be implemented using NextAuth middleware
- **User Roles**: Basic user model with verification status

#### Authentication Flow
1. User registers with email, username, and password
2. Verification email sent via Resend
3. User verifies email with OTP code
4. Verified users can sign in
5. JWT tokens manage sessions
6. Protected resources check session validity

## Development Guidelines

### Code Style
- **TypeScript**: Strict typing throughout the application
- **ESLint**: Configured for code quality
- **Prettier**: Recommended for consistent formatting

### Database Schema
- **User Model**: Stores user information, messages, and verification status
- **Message Sub-schema**: Embedded messages within user documents
- **Indexes**: Unique constraints on email and username

### API Design
- **RESTful Routes**: Standard HTTP methods (GET, POST, etc.)
- **JSON Responses**: Consistent response format with success/message structure
- **Error Handling**: Proper HTTP status codes and error messages
- **Validation**: Zod schemas for input validation

### Security Considerations
- **Password Hashing**: bcryptjs for secure password storage
- **Environment Variables**: Sensitive data stored securely
- **Input Validation**: Zod schemas prevent malicious input
- **CORS**: Next.js handles CORS automatically for API routes

## Deployment
- **Vercel**: Recommended for Next.js applications
- **Environment Variables**: Configure in deployment platform
- **Database**: Use MongoDB Atlas for production
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

## Future Enhancements
- Complete user dashboard for managing messages
- Message acceptance toggle functionality
- Advanced user profile management
- Real-time notifications
- Message analytics
- Admin panel for user management
