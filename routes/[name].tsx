import { PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import SidebarLogo from "../components/layout/SidebarLogo.tsx";

export default function Greet(props: PageProps) {
  return (
    <>
      <Header showBackArrow={true} label="User Profile" />
      <div class="text-blue-500">
        Hello {props.params.name}
        <SidebarLogo />
      </div>
    </>
  );
}
