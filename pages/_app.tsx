import { AppProps } from "next/app"
import React, { FunctionComponent } from "react"
import { AppThemeProvider } from "../theme/theme-provider"
import Head from "next/head"
import { storeWrapper } from "../modules/store/store-wrapper"

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AppThemeProvider>
        <Component {...pageProps} />
      </AppThemeProvider>
    </>
  )
}

export default storeWrapper.withRedux(App)
