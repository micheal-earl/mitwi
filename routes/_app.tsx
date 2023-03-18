// routes/_app.tsx

import { AppProps } from "$fresh/server.ts";
import { tw } from "twind";
import { globalStyles } from "../styles/global.ts";
import { Head } from "$fresh/runtime.ts";
import Layout from "../components/Layout.tsx";
import LoginModal from "../islands/LoginModal.tsx";
//import Modal from "../components/Modal.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>Mitwi Twitter Clone</title>
      </Head>
      <div class={tw(globalStyles)}>
        <LoginModal />
        {/* <Modal actionLabel="Submit" title="Test Modal" isOpen={true} /> */}
        <Layout>
          <Component />
        </Layout>
      </div>
    </>
  );
}
