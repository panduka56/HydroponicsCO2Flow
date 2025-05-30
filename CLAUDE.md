# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hydroponics CO₂ Flow Calculator - a web application that helps growers calculate optimal CO₂ supplementation for their grow rooms. It's built as a full-stack TypeScript application with React frontend and Express backend.

## Common Commands

```bash
# Development
npm run dev          # Start development server on port 5001 (frontend + backend with hot reload)

# Build & Production
npm run build        # Build both frontend and backend for production
npm start            # Run production server

# Database
npm run db:push      # Push database schema changes to PostgreSQL

# Type Checking
npm run check        # Run TypeScript type checking
```

## Architecture Overview

### Technology Stack
- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS + shadcn/ui components
- **Backend**: Express.js + TypeScript + Drizzle ORM
- **Database**: PostgreSQL
- **Styling**: Neumorphic design system with hydroponics-themed color palette

### Key Architectural Decisions

1. **Component Library**: The project uses shadcn/ui components extensively (located in `client/src/components/ui/`). When adding new UI elements, check if a component already exists before creating a new one.

2. **State Management**: Uses Tanstack Query for server state and React Hook Form for form management. Avoid adding additional state management libraries.

3. **Routing**: Uses Wouter for client-side routing (not React Router).

4. **Form Validation**: Uses React Hook Form with Zod schemas. Define schemas in `shared/schema.ts` for type safety across frontend/backend.

5. **Database**: Drizzle ORM is configured but the database layer is minimal. The app primarily functions as a calculator without persistent storage needs currently.

### Project Structure

- `/client` - React frontend application
  - `/src/components/ui` - shadcn/ui component library (40+ components)
  - `/src/pages` - Page components (currently just home.tsx)
- `/server` - Express backend
  - `index.ts` - Main server entry point
  - `routes.ts` - API routes
- `/shared` - Shared types and schemas
- `/attached_assets` - Project documentation and concept files

### Design System

The app uses a custom neumorphic design with CSS variables defined in `client/src/index.css`. Key design tokens:
- Earthy green/brown color palette aligned with hydroponics branding
- Soft shadows for neumorphic effect
- Custom animations defined in `tailwind.config.ts`

When modifying styles, maintain consistency with the existing neumorphic design language and color scheme.

### Current Features

The calculator includes inputs for room dimensions, CO₂ targets, ventilation type, usage schedule, and cylinder size. It calculates:
- CO₂ requirements (daily/weekly/monthly)
- Flow rates (g/hr and L/min)
- Cylinder duration estimates
- Bubble rates for verification

All calculations happen client-side in the React app.