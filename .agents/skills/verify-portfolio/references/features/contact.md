# Contact without delivery

## Reach

Open `/contact`; leave all form fields unsubmitted.

## Drive

Load `/contact` and inspect heading, layout, labels, and contact actions. HTTP contracts compare canonical/social titles with the page heading.

## Observable success

Read-only contact page renders at both sizes and themes with no browser candidates.

## Prerequisites and limits

Never submit, click mailto, or test delivery here. The browser driver blocks non-GET/HEAD `/api/contact` requests, but the sweep does not deliberately exercise that block. SMTP, server-side validation, abuse protection, and actual delivery remain untested.
