# Oficios UY - Setup Guide

## Project Overview
Oficios UY is a web platform connecting users with independent service providers in Uruguay. Built with Angular 20, SSR, and TailwindCSS.

## Prerequisites
- Node.js v20.19.0 or newer
- npm or pnpm

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Install TailwindCSS (if not already installed)
```bash
npm install -D tailwindcss postcss autoprefixer
```

### 3. Development Server
```bash
npm run dev:ssr
```
Navigate to `http://localhost:4200/`

### 4. Build for Production
```bash
npm run build:ssr
```

### 5. Serve Production Build
```bash
npm run serve:ssr
```

## Project Structure

```
src/
├── app/
│   ├── auth/                    # Authentication components
│   │   ├── login.component.ts
│   │   └── register.component.ts
│   ├── booking/                 # Booking feature
│   │   └── booking-form.component.ts
│   ├── core/                    # Core services, guards, interceptors
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts
│   │   ├── models/
│   │   │   ├── user.model.ts
│   │   │   ├── service.model.ts
│   │   │   └── booking.model.ts
│   │   └── services/
│   │       ├── auth.service.ts
│   │       ├── user.service.ts
│   │       ├── service-provider.service.ts
│   │       └── booking.service.ts
│   ├── services/                # Services listing feature
│   │   ├── service-list.component.ts
│   │   └── service-card.component.ts
│   ├── shared/                  # Shared components
│   │   ├── navbar.component.ts
│   │   └── footer.component.ts
│   ├── user/                    # User profile feature
│   │   ├── profile.component.ts
│   │   └── profile-form.component.ts
│   ├── home.component.ts        # Home page
│   ├── app.routes.ts            # Route configuration
│   ├── app.config.ts            # App configuration
│   └── app.ts                   # Root component
├── environments/
│   ├── environment.ts           # Production environment
│   └── environment.development.ts # Development environment
└── styles.css                   # Global styles with TailwindCSS
```

## Features Implemented

### 1. Authentication Module
- Login page with JWT cookie-based authentication
- Registration page with user/service provider option
- Auth guard for protected routes
- Auth interceptor for 401 handling

### 2. User Module
- Profile view and edit
- Profile form component with validation

### 3. Services Module
- Service listing with mock data
- Service card component
- Search functionality

### 4. Booking Module
- Booking request form
- Date/time scheduling
- Service provider selection

### 5. Shared Components
- Responsive navbar with authentication state
- Footer component
- TailwindCSS styling throughout

## Key Technologies

- **Angular 20**: Latest framework version
- **SSR**: Server-Side Rendering with hybrid rendering
- **Zoneless**: Using signals for reactivity
- **TailwindCSS**: Utility-first CSS framework
- **RxJS**: Reactive programming
- **TypeScript**: Type-safe development

## Environment Configuration

Update `src/environments/environment.ts` and `environment.development.ts` with your backend API URL:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000' // Your .NET Core API URL
};
```

## Authentication Flow

1. JWT tokens are stored in HttpOnly cookies (secure)
2. Auth interceptor handles 401 responses
3. Auth guard protects routes requiring authentication
4. Auth service manages authentication state with signals

## Testing

Run unit tests:
```bash
npm test
```

Example tests included:
- `auth.service.spec.ts` - Auth service tests
- `navbar.component.spec.ts` - Navbar component tests

## Available Routes

- `/` - Home page with hero and featured services
- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/services` - All services listing
- `/profile` - User profile (protected)
- `/booking` - Service booking form (protected)

## Next Steps

1. Connect to your .NET Core backend API
2. Implement real authentication endpoints
3. Add more service categories
4. Implement booking management
5. Add user reviews and ratings
6. Implement payment integration

## Notes

- All components use standalone architecture
- Signals are used for reactive state management
- Lazy loading is implemented for all routes
- Change detection is set to OnPush for performance
- TailwindCSS provides responsive design out of the box