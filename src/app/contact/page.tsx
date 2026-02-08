import type { Metadata } from 'next';

import ContactClient from '@/app/contact/ContactClient';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Vincent Mogah via email.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <ContactClient />;
}
