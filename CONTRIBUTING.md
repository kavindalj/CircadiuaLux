# Contributing to CircadiaLux

Thank you for your interest in contributing to CircadiaLux! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our code of conduct:

- Be respectful and inclusive
- Exercise consideration and empathy
- Focus on what is best for the community
- Give and gracefully accept constructive feedback

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/CircadiaLux.git
   cd CircadiaLux
   ```
3. **Set up the development environment**
   - Follow setup instructions in the component-specific READMEs:
     - [Supabase README](supabase/README.md)
     - [Frontend README](frontend/README.md)
     - [IoT README](IoT/README.md)
     - [ML README](ML/README.md)

## Development Workflow

### Branching Strategy (Feature Branches + Dev Branch)

We follow a controlled **branching strategy** similar to **Git Flow** for better organization and stability. Here's how our branching workflow works:

1. **Main Branch (`main`)**: The `main` branch is reserved for **production-ready** code. It should always contain stable and tested code that's ready for release.
   
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

### Branch Naming Convention

We use the following branch naming convention:

- **Feature branches**: `feature/short-description`
  - Example: `feature/user-authentication`
  - Example: `feature/device-management`

- **Bug fix branches**: `fix/issue-description`
  - Example: `fix/login-validation`

- **Documentation branches**: `docs/description`
  - Example: `docs/api-documentation`

- **Hotfix branches**: `hotfix/issue-description`
  - Example: `hotfix/critical-auth-bug`

### Commit Message Structure

We follow the **Conventional Commits** specification for commit messages to maintain a clean and consistent Git history. Please refer to the official [Conventional Commits guide](https://www.conventionalcommits.org/) for more details on the commit message format.

Example commit message format:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types include:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no code change)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or correcting tests
- `chore`: Changes to build process, tooling, etc.

**Examples:**
- `feat: add new login page`
- `fix: resolve authentication bug`
- `docs(readme): update installation instructions`
- `chore: update dependencies`

## Pull Request Process

1. **Update your fork**
   ```bash
   git checkout dev
   git pull upstream dev
   ```

2. **Create your branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Keep changes focused on a single issue/feature
   - Follow code style guidelines
   - Add tests for new functionality

4. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a pull request**
   - Target the `dev` branch
   - Provide a clear description of the changes
   - Reference any related issues

7. **Code review**
   - Address review feedback
   - Make requested changes
   - Push new commits to your branch

8. **Merge**
   - Once approved, your PR will be merged

## Testing

- All new features should include appropriate tests
- Ensure all tests pass before submitting a pull request
- Try to maintain or improve code coverage

## Style Guidelines

### JavaScript/React
- Use ESLint and follow the project's `.eslintrc` configuration
- Use camelCase for variables and functions
- Use PascalCase for components and classes

### CSS/Tailwind
- Follow the project's Tailwind configuration
- Use descriptive, meaningful class names for custom CSS

## License

By contributing to CircadiaLux, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).

Thank you for your contributions!
