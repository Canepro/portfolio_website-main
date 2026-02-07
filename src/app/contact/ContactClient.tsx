'use client';

import React, { type ChangeEvent, type FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';

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
    <section className="px-6 py-10 md:px-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Contact</h1>
        <p className="mt-3 max-w-2xl text-[color:var(--color-text-secondary)] leading-7">
          Prefer email? Send a message using the form below. If you include context (links, repo,
          error logs), I can respond faster.
        </p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <form onSubmit={onSubmit} className="grid gap-5">
            <div>
              <label htmlFor="contact-name" className="text-sm font-medium text-white/80">
                Name
              </label>
              <input
                id="contact-name"
                required
                type="text"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={onChange}
                placeholder="Your name"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-white/20 focus:ring-2 focus:ring-[color:var(--color-accent)]"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="text-sm font-medium text-white/80">
                Email
              </label>
              <input
                id="contact-email"
                required
                type="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@company.com"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-white/20 focus:ring-2 focus:ring-[color:var(--color-accent)]"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="text-sm font-medium text-white/80">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="What are you working on, and how can I help?"
                rows={6}
                className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-white/20 focus:ring-2 focus:ring-[color:var(--color-accent)]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button size="default" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending…' : 'Send Message'}
              </Button>
            </div>

            {status === 'success' && (
              <p role="status" className="text-sm text-emerald-400">
                Message sent successfully.
              </p>
            )}
            {status === 'error' && (
              <p role="status" className="text-sm text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
