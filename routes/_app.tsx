// routes/_app.tsx

import { AppProps } from "$fresh/server.ts";
import { tw } from 'twind'
import { globalStyles } from "../styles/global.ts"
import Layout from "../components/Layout.tsx"
import Modal from "../components/Modal.tsx"

export default function App({ Component }: AppProps) {
  return (
    <div class={tw(globalStyles)}>
      <Modal isOpen={true} />
      <Layout>
        <Component />
      </Layout>
    </div>
  );
}