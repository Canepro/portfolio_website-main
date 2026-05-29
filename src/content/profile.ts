export const profile = {
  name: 'Vincent Mogah',
  // Keep this aligned with the latest LinkedIn headline (but trimmed for readability).
  headline:
    'AI-native Reliability Engineer | Product-minded Platform Builder | Diagnostics & Remediation Tooling',
  location: 'United Kingdom',
  email: 'mogah.vincent@hotmail.com',
  links: {
    github: 'https://github.com/Canepro',
    linkedin: 'https://www.linkedin.com/in/vincent-mogah',
    twitter: 'https://twitter.com/Canepro',
  },
  summary: [
    'I build tools for CI failures and platform diagnostics.',
    'Automation ships only when the fix path is clear and reviewable.',
    'Recent projects: PipelineHealer and SignalForge.',
  ],
} as const;
