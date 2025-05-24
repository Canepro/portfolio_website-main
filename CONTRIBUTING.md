# Contributing to Portfolio Website

Thank you for your interest in contributing to this project! This document provides guidelines and information for contributors.

## 🤝 Code of Conduct

This project adheres to professional standards of conduct. Please be respectful, inclusive, and constructive in all interactions.

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Clear Description**: What you expected vs. what happened
2. **Steps to Reproduce**: Minimal steps to recreate the issue
3. **Environment**: Browser, OS, Node.js version
4. **Screenshots**: If applicable
5. **Error Messages**: Full error output if available

### Bug Report Template

```markdown
**Bug Description**
Brief description of the issue

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen

**Actual Behavior**
What actually happened

**Environment**
- OS: [e.g., Windows 11, macOS Monterey]
- Browser: [e.g., Chrome 96, Firefox 95]
- Node.js: [e.g., 16.14.0]
- npm/yarn: [e.g., npm 8.3.1]

**Additional Context**
Any other relevant information
```

## ✨ Feature Requests

Feature suggestions are welcome! Please provide:

1. **Use Case**: Why this feature would be valuable
2. **Description**: Detailed explanation of the proposed feature
3. **Examples**: Similar implementations or mockups if available

## 🔧 Development Setup

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Git

### Getting Started

1. **Fork & Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio_website-main.git
   cd portfolio_website-main
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Pull Request Process

### Before Submitting

1. **Test Locally**: Ensure your changes work as expected
2. **Check Build**: Run `npm run build` to verify production build
3. **Review Changes**: Double-check your modifications
4. **Update Documentation**: Update README/docs if needed

### PR Requirements

- [ ] Clear, descriptive title
- [ ] Detailed description of changes
- [ ] References related issues (if applicable)
- [ ] Tests pass (if applicable)
- [ ] No console errors or warnings
- [ ] Responsive design maintained

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Documentation update

## How Has This Been Tested?
Describe testing performed

## Screenshots (if applicable)
Add screenshots of changes

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] My changes generate no new warnings
- [ ] I have updated documentation where necessary
```

## 🎨 Coding Standards

### General Guidelines

- **Consistency**: Follow existing code patterns
- **Readability**: Write self-documenting code
- **Performance**: Consider performance implications
- **Responsiveness**: Ensure mobile compatibility

### React/Next.js Specific

- Use functional components with hooks
- Follow component naming conventions (PascalCase)
- Keep components focused and reusable
- Use proper PropTypes or TypeScript (if applicable)

### Styled-Components

- Use descriptive component names
- Group related styles together
- Follow CSS best practices
- Maintain responsive design patterns

### File Structure

```
src/
├── components/
│   └── ComponentName/
│       ├── ComponentName.js
│       ├── ComponentNameStyles.js
│       └── index.js
└── layout/
    └── Layout.js
```

## 🚀 Deployment Considerations

- Changes to main branch trigger automatic Netlify deployment
- Ensure all dependencies are properly declared in package.json
- Test build process locally before submitting PR
- Consider SEO and performance implications

## 📋 Issue Labels

| Label | Description |
|-------|-------------|
| `bug` | Something isn't working |
| `enhancement` | New feature or request |
| `documentation` | Improvements to docs |
| `good first issue` | Good for newcomers |
| `help wanted` | Extra attention needed |
| `question` | Further information requested |

## 🆘 Getting Help

- **Documentation**: Check README.md and this file first
- **Issues**: Search existing issues before creating new ones
- **Discussions**: Use GitHub Discussions for questions

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to make this project better! 🚀
