// routes/_app.tsx

import { AppProps } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";
import Layout from "../components/Layout.tsx";
import LoginModal from "../islands/LoginModal.tsx";
import RegisterModal from "../islands/RegisterModal.tsx";
import Toast from "../islands/Toast.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>Mitwi Twitter Clone</title>
        <link rel="stylesheet" href={asset("base.css")} />
        <link rel="stylesheet" href={asset("ReactToastify.min.css")} />
      </Head>
      <Toast />
      <LoginModal />
      <RegisterModal />
      <Layout>
        <Component />
      </Layout>
    </>
  );
}
