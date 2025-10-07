import Head from "next/head";

export default function HomePage() {
  return (
    <div>
      {/* This title will override the default title in _app.tsx */}
      <Head>{<title>Home - My Awesome Blog</title>}</Head>
      <h1>Welcome to My Awesome Blog!</h1>
    </div>
  );
}