# CircadiuaLux - Supabase Configuration

This directory contains the Supabase configuration for the CircadiuaLux project.

## Overview

CircadiuaLux uses Supabase as its backend service, providing:
- User authentication and authorization
- Database for storing device, patient, and lighting data
- Real-time updates for device statuses and lighting predictions

## Database Schema

The Supabase database includes the following tables:

- **profiles**: User profile information with roles (admin, caretaker)
- **devices**: IoT device information including location details
- **patients**: Patient information with health and sleep preferences
- **diseases**: Disease information affecting sleep parameters
- **lighting_predictions**: Time-based lighting configurations for patients
- **password_reset_requests**: Tracks user password reset requests
- **issues**: For tracking reported issues in the system

## Setting Up Supabase

### Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli)
- [Docker](https://www.docker.com/) (for local development)

### Local Development

1. Start a local Supabase instance:

```zsh
supabase start
```

2. Apply the database schema:

```zsh
supabase db reset
```

This will apply all migrations in the `supabase/migrations` directory.

### Production Setup

1. Create a new project on [Supabase.com](https://supabase.com)

2. Link your local configuration to the remote project:

```zsh
supabase link --project-ref your-project-ref
```

3. Push your local database schema to the remote project:

```zsh
supabase db push
```

## Environment Configuration

Create or update your environment variables in your application:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

For local development, you can get these values by running:

```zsh
supabase status
```

## Database Migrations

The `migrations` directory contains SQL scripts that define the database schema.

- The schema includes tables for users, devices, patients, and lighting predictions
- Row Level Security (RLS) policies are defined to secure data access
- Database triggers automate processes like:
  - Calculating full names from first and last names
  - Sending patient data to ML prediction service when updated

## Security Features

- Role-based access control with admin and caretaker roles
- Row Level Security (RLS) policies to restrict data access
- Secure authentication via Supabase Auth

## Seeding Initial Data

For testing or initial setup, you can create a seed file in `supabase/seed.sql` and apply it with:

```zsh
# Create seed.sql with initial data (admin user, test devices, etc.)
supabase db seed
```

## API References

- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Auth](https://supabase.com/docs/reference/javascript/auth-signup)
- [Supabase Database](https://supabase.com/docs/reference/javascript/select)

---

For more information on the CircadiuaLux project architecture and components, see the main [README](../README.md).