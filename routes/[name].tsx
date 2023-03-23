import { PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import SidebarLogo from "../components/layout/SidebarLogo.tsx";

export default function Greet(props: PageProps) {
  return (
    <>
      <Header showBackArrow={true} label="User Profile" />
      <div class="text-3xl text-blue-400 p-5">
        404, {props.params.name} not found
      </div>
    </>
  );
}
