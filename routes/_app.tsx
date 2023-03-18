// routes/_app.tsx

import { AppProps } from "$fresh/server.ts";
import { tw } from "twind";
import { Head } from "$fresh/runtime.ts";
import globalStyles from "../styles/global.ts";
import Layout from "../components/Layout.tsx";
import LoginModal from "../islands/LoginModal.tsx";
import RegisterModal from "../islands/RegisterModal.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>Mitwi Twitter Clone</title>
      </Head>
      <div class={tw(globalStyles)}>
        <LoginModal />
        <RegisterModal />
        <Layout>
          <Component />
        </Layout>
      </div>
    </>
  );
}
