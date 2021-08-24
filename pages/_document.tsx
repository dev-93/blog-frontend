import Document, {
  Head,
  Main,
  NextScript,
  DocumentContext,
  Html,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
  
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {    
    // function setCookie(name: string, value: any, day: number) {
    //   const date = new Date();
    //   date.setTime(date.getTime() + day * 24 * 60 * 60 * 1000);
    //   document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    // };

    // const cookie = ctx.isServer ? ctx.req.headers.cookie : '';

    // const cookie = ctx.req?.headers.cookie;

    // console.log(cookie, "쿠키");

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
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}