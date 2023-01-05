import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to site!</title>
      </Head>
      <main className="app h-full w-full">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
