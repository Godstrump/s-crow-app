import Document, { Html, Head, Main, NextScript } from 'next/document'
// import { ServerStyleSheets } from '@mui/material/styles';

class EscrowApp extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link 
          href="https://fonts.googleapis.com/css2?family=Comforter&family=Oswald:wght@200;300;400;500;600;700&display=swap" 
          rel="stylesheet" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default EscrowApp;

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
// EscrowApp.getInitialProps = async (ctx) => {

//   // Render app and page and get the context of the page with collected side effects.
//   const sheets = new ServerStyleSheets();
//   const originalRenderPage = ctx.renderPage;

//   ctx.renderPage = () => originalRenderPage({
//     enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
//   });

//   const initialProps = await Document.getInitialProps(ctx);

//   return {
//     ...initialProps,
//     // Styles fragment is rendered after the app and page rendering finish.
//     styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
//   };
// };