import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const preferredColorScheme = useColorScheme();
  return (
    <>
      <Head>
        <title>Find self improvement servers</title>

        <link rel="icon" href="/favicon.ico" />

        <meta
          name="description"
          content="Find self improvement communities from your country"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta property="og:title" content="Find your bros" />
        <meta
          property="og:description"
          content="Find self improvement communities from your country"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: preferredColorScheme,
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
