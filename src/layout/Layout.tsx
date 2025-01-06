import Sidebar from "@/components/Sidebar";
import { ReactNode, useState } from "react";

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

const Layout = ({ children, showSidebar = true }: LayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(
    JSON.parse(localStorage.getItem("isCollapsed") || "false")
  );

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    localStorage.setItem("isCollapsed", JSON.stringify(newCollapsedState));
    setIsCollapsed(newCollapsedState);
  };

  return (
    <div className="min-h-screen flex">
      {showSidebar && (
        <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      )}
      <main className={`flex-grow ${isCollapsed ? "ml-20" : "ml-64"}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
