# Contributing Guide

> Guidelines for contributing to the portfolio website project

Thank you for your interest in contributing to this portfolio website! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **Bug Reports**: Report issues and bugs
- **Feature Requests**: Suggest new features or improvements
- **Code Contributions**: Submit pull requests with fixes or enhancements
- **Documentation**: Improve or add documentation
- **Design**: Suggest UI/UX improvements
- **Testing**: Help with testing and quality assurance

### Before You Start

1. **Check Existing Issues**: Search existing issues to avoid duplicates
2. **Read Documentation**: Familiarize yourself with the project structure
3. **Set Up Development Environment**: Follow the installation guide in README.md

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ (recommended 20)
- npm or yarn
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/Canepro/portfolio_website-main.git
cd portfolio_website-main

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 3000) |
| `npm run dev:3001` | Start development server (port 3001) |
| `npm run build` | Create production build |
| `npm start` | Start production server |

## 📝 Code Style Guidelines

### TypeScript

- **Strict Mode**: All code must pass TypeScript strict mode
- **Type Definitions**: Provide proper type definitions for all components
- **Interfaces**: Use interfaces for component props and data structures
- **No `any` Types**: Avoid using `any` type; use proper typing instead

### React Components

- **Functional Components**: Use functional components with hooks
- **Props Interface**: Define interfaces for all component props
- **Default Props**: Use default parameters instead of defaultProps
- **Component Naming**: Use PascalCase for component names

```typescript
// Good example
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  variant, 
  size = 'md', 
  children, 
  onClick 
}) => {
  // Component implementation
};
```

### Styled Components

- **Type Safety**: Use TypeScript interfaces for styled component props
- **Theme Integration**: Access theme values through props.theme
- **Naming Convention**: Use descriptive names for styled components

```typescript
interface StyledButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${props => 
    props.variant === 'primary' 
      ? props.theme.colors.primary 
      : props.theme.colors.secondary
  };
  font-size: ${props => props.theme.fontSizes[props.size]};
`;
```

### File Organization

- **Component Files**: Use `.tsx` extension for React components
- **Styled Components**: Use `.ts` extension for styled component files
- **Type Definitions**: Use `.d.ts` extension for type definition files
- **Directory Structure**: Follow the existing project structure

## 🔄 Git Workflow

### Branch Naming

Use descriptive branch names with prefixes:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests

Examples:
- `feature/timeline-animations`
- `fix/contact-form-validation`
- `docs/update-readme`

### Commit Messages

Follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(timeline): add keyboard navigation support

fix(contact): resolve SMTP configuration issue

docs(readme): update installation instructions
```

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write your code following the style guidelines
   - Add tests if applicable
   - Update documentation if needed

3. **Test Your Changes**
   ```bash
   # Type checking
   npx tsc --noEmit
   
   # Build test
   npm run build
   
   # Start production server
   npm start
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat(component): add new feature"
   ```

5. **Push to Remote**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Use the PR template if available
   - Provide clear description of changes
   - Include screenshots for UI changes
   - Reference related issues

## 🧪 Testing Guidelines

### Type Checking

All code must pass TypeScript compilation:

```bash
npx tsc --noEmit
```

### Build Verification

Ensure the project builds successfully:

```bash
npm run build
```

### Manual Testing

Test your changes across:
- **Browsers**: Chrome, Firefox, Safari, Edge
- **Devices**: Desktop, tablet, mobile
- **Accessibility**: Keyboard navigation, screen readers
- **Performance**: Lighthouse audits

## 📚 Documentation

### Code Documentation

- **JSDoc Comments**: Add JSDoc comments for complex functions
- **Component Documentation**: Document component props and usage
- **Inline Comments**: Add comments for complex logic

### README Updates

Update README.md if your changes affect:
- Installation process
- Configuration options
- Available features
- Project structure

## 🐛 Bug Reports

### Before Submitting

1. **Search Existing Issues**: Check if the bug has already been reported
2. **Reproduce the Issue**: Ensure you can consistently reproduce the problem
3. **Check Environment**: Verify the issue occurs in the latest version

### Bug Report Template

```markdown
## Bug Description
Brief description of the issue

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: [e.g. Windows 10, macOS 12]
- Browser: [e.g. Chrome 96, Firefox 95]
- Node.js Version: [e.g. 18.0.0]

## Additional Information
Screenshots, console errors, etc.
```

## 💡 Feature Requests

### Before Submitting

1. **Check Existing Issues**: Search for similar feature requests
2. **Consider Scope**: Ensure the feature aligns with project goals
3. **Provide Context**: Explain why the feature would be valuable

### Feature Request Template

```markdown
## Feature Description
Brief description of the requested feature

## Problem Statement
What problem does this feature solve?

## Proposed Solution
How would you like to see this implemented?

## Alternative Solutions
Any alternative approaches you've considered?

## Additional Context
Screenshots, mockups, or examples
```

## 🎨 Design Contributions

### UI/UX Improvements

- **Accessibility**: Ensure changes maintain or improve accessibility
- **Responsive Design**: Test on multiple screen sizes
- **Design System**: Follow existing design patterns
- **Performance**: Consider performance impact of design changes

### Design Guidelines

- **Color Scheme**: Use theme colors from CSS variables
- **Typography**: Follow established font hierarchy
- **Spacing**: Use consistent spacing patterns
- **Animations**: Keep animations smooth and purposeful

## 🔒 Security

### Security Guidelines

- **Input Validation**: Always validate and sanitize user input
- **Environment Variables**: Never commit sensitive data
- **Dependencies**: Keep dependencies updated
- **Code Review**: Security-sensitive changes require thorough review

### Reporting Security Issues

For security vulnerabilities, please email directly instead of creating a public issue.

## 📋 Code Review Process

### Review Checklist

- [ ] Code follows style guidelines
- [ ] TypeScript compilation passes
- [ ] Build succeeds without errors
- [ ] Tests pass (if applicable)
- [ ] Documentation updated
- [ ] No sensitive data exposed
- [ ] Accessibility maintained
- [ ] Performance impact considered

### Review Guidelines

- **Be Constructive**: Provide helpful, specific feedback
- **Ask Questions**: Clarify unclear code or decisions
- **Suggest Improvements**: Offer specific suggestions
- **Respect Contributors**: Be respectful and encouraging

## 🏆 Recognition

### Contributors

Contributors will be recognized in:
- Project README
- Release notes
- GitHub contributors list

### Types of Recognition

- **Code Contributors**: Direct code contributions
- **Documentation**: Documentation improvements
- **Bug Reports**: Quality bug reports with reproduction steps
- **Feature Ideas**: Valuable feature suggestions

## 📞 Getting Help

### Questions and Support

- **GitHub Issues**: Use issues for bug reports and feature requests
- **Documentation**: Check existing documentation first
- **Community**: Engage with the community respectfully

### Communication Guidelines

- **Be Respectful**: Treat all contributors with respect
- **Be Patient**: Allow time for responses
- **Be Clear**: Provide clear, specific information
- **Be Helpful**: Help others when you can

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for contributing!** 🎉

Your contributions help make this project better for everyone.
