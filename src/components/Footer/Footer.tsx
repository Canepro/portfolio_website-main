import Link from 'next/link';
import { profile } from '@/content/profile';
import { safeExternalHref } from '@/lib/url';

export default function Footer() {
  const github = safeExternalHref(profile.links.github);
  const linkedin = safeExternalHref(profile.links.linkedin);
  return (
    <footer className="border-t border-[color:var(--color-border)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm md:flex-row md:items-center md:justify-between md:px-10">
        <p className="text-[color:var(--color-text-secondary)]">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-4">
          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </a>
          ) : null}
          {linkedin ? (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              LinkedIn
            </a>
          ) : null}
          <Link href="/systems" className="underline underline-offset-4">
            Platform archive
          </Link>
          <Link href="/contact" className="underline underline-offset-4">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
