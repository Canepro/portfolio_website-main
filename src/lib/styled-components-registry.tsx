'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    // Avoid leaking styles between requests.
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  // During SSR we want to collect styles.
  if (typeof window === 'undefined') {
    return (
      <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>
    );
  }

  // On the client, styled-components manages its own stylesheet.
  return <>{children}</>;
}
