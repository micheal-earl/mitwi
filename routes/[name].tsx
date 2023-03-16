import { PageProps } from "$fresh/server.ts";
import SidebarLogo from "../components/layout/SidebarLogo.tsx";

export default function Greet(props: PageProps) {
  return (
    <div class="text-blue-500">
      Hello {props.params.name}
      <SidebarLogo />
    </div>
  );
}
