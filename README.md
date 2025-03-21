# CircadiuaLux

## Overview

This is our team project, which includes a **frontend** built with **React** and **Tailwind CSS**, a **backend** using **Firebase**, and components for **IoT**.

- **Frontend**: React application styled with Tailwind CSS.
- **Backend**: Firebase for authentication and Firestore.
- **IoT**: IoT devices integrated with the frontend.

For detailed setup and installation instructions for the frontend, refer to the [Frontend README](frontend/README.md).

## Development Workflow

### Commit Message Structure

We follow the **Conventional Commits** specification for commit messages to maintain a clean and consistent Git history. Please refer to the official [Conventional Commits guide](https://www.conventionalcommits.org/) for more details on the commit message format.

Example commit message format:

- `feat: add new login page`
- `fix: resolve authentication bug`
- `chore: update dependencies`
  
### Branching Strategy (Feature Branches + Dev Branch)

We follow a controlled **branching strategy** similar to **Git Flow** for better organization and stability. Here’s how our branching workflow works:

1. **Main Branch (`main`)**: The `main` branch is reserved for **production-ready** code. It should always contain stable and tested code that’s ready for release.
   
2. **Development Branch (`dev`)**: The `dev` branch serves as the **integration** branch for features under development. All feature branches are created from `dev`, and once a feature is complete, it gets merged back into `dev`.

3. **Feature Branches**: Feature branches are created from the `dev` branch. Each feature branch should be **small and focused** on a specific task or feature. These branches should be merged into `dev` once the feature is complete and tested.

4. **Merging to Main**: After a certain period of development, when `dev` is stable and all features are merged in, the `dev` branch is merged into `main`. This can be done on a regular schedule or when the code in `dev` is deemed production-ready.

This workflow prevents direct pushes to the `main` branch, ensuring better control over the development process and easier integration.

### Why This Workflow?

We prefer this workflow because it offers a **more controllable** development environment. By having:
- A clear **separation between production-ready and in-progress code**.
- A **centralized integration branch (`dev`)** where all feature branches get merged before production.
- The ability to test features before they hit `main`.

This setup helps maintain a stable and predictable release cycle.

