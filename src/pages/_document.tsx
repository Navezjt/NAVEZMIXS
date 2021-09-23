import { ServerStyleSheets } from '@material-ui/core/styles'
import Document, {
  DocumentContext,
  Html,
  Main,
  NextScript,
  Head
} from 'next/document'
import React from 'react'
import csso from 'csso'

export default class MyDocument extends Document {
  render() {
    console.log('_document render')

    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.com" />
          <link
            key="font-roboto"
            rel="stylesheet"
            as="font"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            crossOrigin="anonymous"
          />
          <link
            key="font-rancho"
            rel="stylesheet"
            as="font"
            href="https://fonts.googleapis.com/css?family=Rancho&display=swap"
            crossOrigin="anonymous"
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

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)

  const styleElement = sheets.getStyleElement()
  /* server rendered material ui is NOT minified
    use csso to minify generated css
  */
  styleElement.props.dangerouslySetInnerHTML.__html = csso.minify(
    styleElement.props.dangerouslySetInnerHTML.__html
  ).css

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), styleElement]
  }
}
