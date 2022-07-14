import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta property="title" content="$name$" />
          <meta property="og:url" content="$param.web_url$" />
          <meta property="og:type" content="website" />

          <meta property="og:title" content="$name$" />
          <meta
            property="og:description"
            content="$param.description$"
          />
          <meta
            property="description"
            content="$param.description$"
          />
          <meta property="og:locale" content="en_US" />
          <meta
            property="og:image"
            content="/img/$name_kebab_case$-logo.png"
          />
          <meta property="image" content="/img/$name_kebab_case$-logo.png" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff"></meta>

          {/* --- Twitter Meta Tags --- */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="$param.web_url$" />
          <meta
            property="twitter:url"
            content="$param.web_url$/"
          />
          <meta name="twitter:title" content="$name$" />
          <meta
            name="twitter:description"
            content="$param.description$"
          />
          <meta
            name="twitter:image"
            content="$param.web_url$/img/$name_kebab_case$-logo.png"
          />
          {/* --- Twitter Meta Tags ends --- */}
        </Head>
        <body>
          <div className="bg1 w-full"></div>
          <div className="bg2 w-full"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
