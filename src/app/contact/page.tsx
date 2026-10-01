import type { Metadata } from 'next';

import ContactClient from '@/app/contact/ContactClient';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Vincent Mogah via email.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact',
    description: 'Get in touch with Vincent Mogah via email.',
    url: '/contact',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'Contact',
    description: 'Get in touch with Vincent Mogah via email.',
    images: [],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
