export type ExperienceItem = {
  company: string;
  role: string;
  location?: string;
  start: string; // YYYY-MM
  end?: string; // YYYY-MM or undefined for present
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: 'Softcat',
    role: 'Microsoft Engineer',
    location: 'Manchester, England, United Kingdom',
    start: '2024-09',
    highlights: [
      'Senior escalation owner for identity and access platforms across Microsoft 365, Entra ID, and Azure AD with a reliability mindset.',
      'Troubleshoot SSO, Conditional Access, directory sync, and RBAC workflows supporting enterprise workloads.',
      'Run incident response end-to-end; drive post-incident actions into automation, runbooks, and resilience improvements.',
    ],
  },
  {
    company: 'Rocket.Chat',
    role: 'Senior Tech Analyst',
    location: 'Delaware, United States',
    start: '2022-04',
    highlights: [
      'Support partners and enterprise customers deploying microservices to Azure/AWS using Docker and Kubernetes.',
      'Resolve system-level production issues using standard operating and diagnostic protocols.',
      'Mentor Tier 1 support and collaborate with engineering on fixes and product improvements.',
    ],
  },
  {
    company: 'Tek Experts',
    role: 'Technical Lead – Cloud Engineering',
    location: 'Lagos State, Nigeria',
    start: '2020-01',
    end: '2020-11',
    highlights: [
      'Led a cloud engineering team supporting the stability, security, and reliability of Azure platforms for enterprise customers.',
      'Drove root cause analysis and long-term remediation, treating escalations as platform reliability problems.',
      'Introduced repeatable troubleshooting patterns, runbooks, and scripted workflows to reduce manual effort.',
    ],
  },
  {
    company: 'Tek Experts',
    role: 'Cloud Engineer',
    location: 'Lagos State, Nigeria',
    start: '2019-07',
    end: '2020-01',
    highlights: [
      'Supported global enterprise customers troubleshooting Azure infrastructure, Azure AD, and Microsoft 365 Security & Compliance.',
      'Collaborated with SMEs and senior escalation engineers to resolve deep platform issues.',
    ],
  },
];
