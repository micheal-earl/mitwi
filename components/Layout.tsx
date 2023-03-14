import { FunctionalComponent, VNode } from "preact";
import Sidebar from "./layout/Sidebar.tsx"

interface LayoutProps {
  children: VNode;
}

const Layout: FunctionalComponent<LayoutProps> = ({ children }) => {
  return (
    <div class="h-screen bg-black">
      <div class="container h-full mx-auto xl:px-30 max-w-6xl">
        <div class="grid grid-cols-4 h-full">
          <Sidebar />
          <div class="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout;