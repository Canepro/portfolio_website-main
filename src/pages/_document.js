import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    return (
      <Html lang='en-GB'>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
        </Head>
        <body>
          <Main />
          <NextScript />

        <!-- Start of Rocket.Chat Livechat Script -->
          <script type="text/javascript">
          (function(w, d, s, u) {
            w.RocketChat = function(c) { w.RocketChat._.push(c) }; w.RocketChat._ = []; w.RocketChat.url = u;
            var h = d.getElementsByTagName(s)[0], j = d.createElement(s);
            j.async = true; j.src = 'https://canepros.rocket.chat/livechat/rocketchat-livechat.min.js?_=201903270000';
            h.parentNode.insertBefore(j, h);
          })(window, document, 'script', 'https://canepros.rocket.chat/livechat');
	      </script>

        </body>
      </Html>
    );
  }
}