'use client';

import React, { type ChangeEvent, type FormEvent, useState } from 'react';

import { PageShell } from '@/components/layout/PageShell';
import { SectionCard } from '@/components/layout/SectionCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function ContactClient() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', message: '' });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <PageShell
      width="narrow"
      eyebrow="Contact"
      title="Get in touch"
      description="Send a message below. A repo link, job description, or error log helps."
    >
      <SectionCard className="mt-10" padding="lg">
        <form onSubmit={onSubmit} className="grid gap-5">
          <div>
            <label htmlFor="contact-name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="contact-name"
              required
              type="text"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={onChange}
              placeholder="Your name"
              className="mt-2 h-11"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="contact-email"
              required
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@company.com"
              className="mt-2 h-11"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="contact-message"
              required
              name="message"
              value={form.message}
              onChange={onChange}
              placeholder="What are you working on, and how can I help?"
              rows={6}
              className="mt-2"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button variant="accent" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending…' : 'Send message'}
            </Button>
          </div>

          {status === 'success' ? (
            <p role="status" className="text-sm text-[color:var(--color-accent)]">
              Message sent successfully.
            </p>
          ) : null}
          {status === 'error' ? (
            <p role="status" className="text-sm text-red-500">
              Something went wrong. Please try again.
            </p>
          ) : null}
        </form>
      </SectionCard>
    </PageShell>
  );
}
