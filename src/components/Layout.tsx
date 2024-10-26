import { ReactNode, useState } from "react";

import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

const Layout = ({ children, showSidebar = true }: LayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
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
