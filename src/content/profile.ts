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
    'I build reliability systems that turn recurring pain into reusable diagnostics.',
    'I ship tooling with deterministic defaults, evidence-first triage, and bounded AI.',
    'Recent work focuses on product-quality systems for remediation, diagnostics, and operator confidence.',
  ],
} as const;
