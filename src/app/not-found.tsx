import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PageShell } from '@/components/layout/PageShell';

export default function NotFound() {
  return (
    <PageShell
      width="narrow"
      title="Page not found"
      description="That route does not exist or moved. Try one of the links below."
    >
      <div className="mt-8 flex flex-wrap gap-3">
        <Button variant="accent" asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button variant="glass" asChild>
          <Link href="/projects">Projects</Link>
        </Button>
        <Button variant="glass" asChild>
          <Link href="/blog">Blog</Link>
        </Button>
      </div>
    </PageShell>
  );
}
