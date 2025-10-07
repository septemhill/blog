import type { AppProps } from 'next/app';
import Header from '@/components/Header'; // 確保引入正確路徑的 Header
import Meta from '@/components/Meta';
import '@/styles/globals.css'; // 引入全域 CSS

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <Header />
      <main className="pt-20">
        <Component {...pageProps} />
      </main>
    </>
  );
}