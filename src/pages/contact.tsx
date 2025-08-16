import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Layout } from '../layout/Layout';
import SEO from '../components/SEO/SEO';
import { Button } from '../components/ui/button';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', message: '' });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
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
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <>
      <SEO
        title="Contact - Vincent Mogah"
        description="Get in touch with Vincent Mogah via email."
        canonical="https://portfolio.canepro.me/contact"
      />
      <Layout>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 16px' }}>
          <h1 style={{ fontSize: 48, marginBottom: 16 }}>Contact</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 32 }}>
            Prefer email? Send a message using the form below.
          </p>
          <form onSubmit={onSubmit} style={{ display: 'grid', gap: 16 }}>
            <input
              required
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Your name"
              style={{
                padding: '14px 16px',
                borderRadius: 8,
                border: '1px solid var(--color-border)',
                background: 'var(--color-card-bg)',
                color: 'var(--color-text-primary)',
              }}
            />
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Your email"
              style={{
                padding: '14px 16px',
                borderRadius: 8,
                border: '1px solid var(--color-border)',
                background: 'var(--color-card-bg)',
                color: 'var(--color-text-primary)',
              }}
            />
            <textarea
              required
              name="message"
              value={form.message}
              onChange={onChange}
              placeholder="Your message"
              rows={6}
              style={{
                padding: '14px 16px',
                borderRadius: 8,
                border: '1px solid var(--color-border)',
                background: 'var(--color-card-bg)',
                color: 'var(--color-text-primary)',
                resize: 'vertical',
              }}
            />
            <div>
              <Button size="md" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending…' : 'Send Message'}
              </Button>
            </div>
            {status === 'success' && (
              <p role="status" style={{ color: '#10B981' }}>Message sent successfully.</p>
            )}
            {status === 'error' && (
              <p role="status" style={{ color: '#EF4444' }}>Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </Layout>
    </>
  );
};

export default ContactPage;


