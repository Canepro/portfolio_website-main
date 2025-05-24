import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          initialProps.styles,
          sheet.getStyleElement(),
        ],
      };
    } catch (error) {
      console.error('Document getInitialProps error:', error);
      return await Document.getInitialProps(ctx);
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Modern portfolio showcasing innovative web development projects and skills" />
          <meta name="keywords" content="portfolio, web development, React, Next.js, JavaScript" />
          <meta name="author" content="Portfolio Owner" />
          
          {/* Open Graph meta tags */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Portfolio - Web Developer" />
          <meta property="og:description" content="Modern portfolio showcasing innovative web development projects" />
          <meta property="og:image" content="/images/og-image.jpg" />
          
          {/* Preconnect to external domains */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          
          {/* Font loading with display=swap for better performance */}
          <link
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          
          {/* PWA manifest */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
