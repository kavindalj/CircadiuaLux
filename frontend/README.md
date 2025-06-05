# CircadiaLux – Frontend Component

This directory contains the frontend web application for the CircadiaLux project, a comprehensive system for managing circadian rhythm-friendly lighting environments.

## Overview

The CircadiaLux frontend provides a user-friendly interface for administrators and caretakers to manage devices, user accounts, and Patients. It connects to a Supabase backend for data storage and integrates with the ML component for personalized lighting recommendations.

## Key Features

- 📊 **Dashboard Views** for administrators and caretakers
- 👤 **User Management** for creating and managing user accounts
- 🔌 **Device Management** for setting up and monitoring CircadiaLux devices
- 👨‍⚕️ **Patient Management** for associating patients with caretakers and devices
- 🔐 **Authentication** with role-based access control

## User Roles

The application implements role-based access control with the following user roles:

### Administrator
- Create and manage all user accounts (admins, caretakers)
- Register and manage all devices
- Update their own profile information

### Caretaker
- View and manage patients
- Monitor device status for patients
- View lighting schedules for patients
- Adjust specific patient settings (with limitations)
- Update their own profile information

## Project Structure

- **src/**: Contains the React app source code.
  - **components/**: Reusable React components.
  - **pages/**: React components for each page in the app.
  - **hooks/**: Custom React hooks.
  - **lib/**: Utility libraries and shared functions.
  - **assets/**: Images and other static files.

## Technologies Used

- **React 19**: Modern JavaScript library for building user interfaces
- **Vite**: Next-generation frontend tooling for faster development
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Router v7**: For client-side routing
- **Supabase JS Client**: For backend integration and authentication
- **Framer Motion**: For smooth animations and transitions

## Installation

To get the frontend up and running on your local machine, follow these steps:

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later

### 1. Install Dependencies

Run the following command to install the project dependencies:

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the frontend directory with your Supabase credentials:

```bash
# Create .env file
cp .env.example .env
```

Edit the `.env` file and add the following configuration:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_TIMEZONE=Asia/Colombo
```

Required Environment Variables:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous/public API key
- `VITE_TIMEZONE`: The timezone used for date/time calculations (e.g., `Asia/Colombo`, `America/New_York`, `Europe/London`)

### 3. Start the Development Server

Run the following command to start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173 by default.

## Building for Production

To build the application for production, run:

```bash
npm run build
```

This will generate optimized production files in the `dist` directory. You can preview the production build locally:

```bash
npm run preview
```

## Deployment

### Static Hosting

You can deploy the frontend to any static hosting service:

1. Build the project with `npm run build`
2. Deploy the contents of the `dist` directory to your hosting provider

Popular hosting options include:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

### Supabase Integration

The frontend connects to Supabase for:
- User authentication and management
- Device data storage and retrieval
- Patient information management

Make sure your Supabase instance has the following tables configured:
- `users` - Supabase Auth user accounts (automatically managed by Supabase)
- `profiles` - Extended user information (e.g., role, name, contact)
- `devices` - CircadiaLux device information
- `patients` - Patient profiles and preferences
- `lighting_predictions` - Time-based lighting configurations

## Design Resources

The user interface design for CircadiaLux can be viewed on Figma:

- [CircadiaLux UI Design](https://www.figma.com/design/hizuNXYypdoXecEnmjfyrm/Untitled?node-id=0-1&t=b4aGygFkBWTrTX47-1)

## Complete Project Structure

Below is the complete structure of the frontend project:

```
frontend/
├── components.json          # UI component configurations
├── eslint.config.js         # ESLint configuration
├── .env.example             # Template for environment variables
├── index.html               # Entry HTML file
├── jsconfig.json            # JavaScript configuration
├── package.json             # NPM package definition
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite bundler configuration
├── public/                  # Static public assets
└── src/                     # Source code
    ├── App.jsx              # Main application component
    ├── index.css            # Global styles
    ├── main.jsx             # Application entry point
    ├── supabaseClient.js    # Supabase client configuration
    ├── assets/              # Static assets
    │   └── images/          # Images, icons and logos
    ├── components/          # Reusable UI components
    ├── hooks/               # Custom React hooks
    ├── lib/                 # Utility libraries
    └── pages/               # Page components
```

This structure follows React best practices with a clear separation of concerns between components, pages, and utilities.

---
For license and contribution info, see the [main README](../README.md).