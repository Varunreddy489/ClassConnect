import {
  Bell,
  Menu,
  Star,
  House,
  // Inbox,
  // Files,
  // ClipboardList,
  UserRoundPen,
  GraduationCap,
  MessagesSquare,
  BadgeIndianRupee,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@radix-ui/react-dropdown-menu";

import Logout from "./Logout";
import logo from "/logo-no-background.svg";
import { ModeToggle } from "./ui/mode-toggle";

const Sidebar = ({
  isCollapsed,
  toggleSidebar,
}: {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}) => {
  return (
    <div
      className={`flex flex-col h-screen top-0 fixed left-0 bg-gray-50 dark:bg-[#000000] text-gray-950 dark:text-gray-100 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center  justify-between p-4">
        <div className="flex space-x-3">
          <button onClick={toggleSidebar}>
            <Menu className="size-10 p-1 hover:bg-gray-900 rounded-full" />
          </button>
          <a
            href="/"
            className={`flex items-center space-x-3 ${
              isCollapsed ? "hidden" : "block"
            }`}
          >
            <img src={logo} className="h-8" alt="ClassConnect" />
          </a>
        </div>
      </div>

      <div className="flex flex-col  h-screen justify-between  border-r">
        <ul className="flex flex-col space-y-2">
          <li>
            <Link
              to="/home"
              className="relative flex items-center h-11 hover:bg-gray-900 pr-6 group"
            >
              <div>
                <House className="ml-4 size-6" />
              </div>
              <span
                className={`ml-2 text-sm tracking-wide truncate transition-opacity duration-300 ${
                  isCollapsed ? "hidden" : "block"
                }`}
              >
                Dashboard
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/clubs"
              className="relative flex items-center h-11 hover:bg-gray-900 pr-6 group"
            >
              <div>
                <MessagesSquare className="ml-4" />
              </div>
              <span
                className={`ml-2 text-sm tracking-wide truncate transition-opacity duration-300 ${
                  isCollapsed ? "hidden" : "block"
                }`}
              >
                All Clubs
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/member/clubs"
              className="relative flex items-center h-11 hover:bg-gray-900 pr-6 group"
            >
              <div>
                <GraduationCap className="ml-4" />
              </div>
              <span
                className={`ml-2 text-sm tracking-wide truncate transition-opacity duration-300 ${
                  isCollapsed ? "hidden" : "block"
                }`}
              >
                Club Member
              </span>
            </Link>
          </li>

          <li>
            <a
              href="#"
              className="relative flex items-center h-11 hover:bg-gray-900 pr-6 group"
            >
              <div>
                <Bell className="ml-4" />
              </div>
              <span
                className={`ml-2 text-sm tracking-wide truncate transition-opacity duration-300 ${
                  isCollapsed ? "hidden" : "block"
                }`}
              >
                Notifications
              </span>
              <span
                className={`px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full ${
                  isCollapsed ? "hidden" : "block"
                }`}
              >
                1.2k
              </span>
            </a>
          </li>

          <Separator className="my-2" />

          <li>
            <a
              href="#"
              className="relative flex items-center h-11 hover:bg-gray-900 pr-6 group"
            >
              <div>
                <BadgeIndianRupee className="ml-4" />
              </div>
              <span
                className={`ml-2 text-sm tracking-wide truncate transition-opacity duration-300 ${
                  isCollapsed ? "hidden" : "block"
                }`}
              >
                Jobs
              </span>
              <span
                className={`px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full ${
                  isCollapsed ? "hidden" : "block"
                }`}
              >
                15
              </span>
            </a>
          </li>

          <Separator className="my-2" />

          <li className="px-5">
            <div className="flex items-center h-8">
              <h1
                className={`tracking-wide text-xl font-bold mb-2 text-center ${
                  isCollapsed ? "hidden" : "block"
                }`}
              >
                Settings
              </h1>
            </div>
          </li>

          <li>
            <Link
              to="/profile"
              className="relative flex items-center h-11 hover:bg-gray-900 pr-6 group"
            >
              <div>
                <UserRoundPen className="ml-4" />
              </div>
              <span
                className={`ml-2 text-sm tracking-wide truncate transition-opacity duration-300 ${
                  isCollapsed ? "hidden" : "block"
                }`}
              >
                Profile
              </span>
            </Link>
          </li>

          <li className="flex hover:bg-gray-900 items-center">
            <div>
              <Logout />
            </div>
            <span
              className={`ml-2 text-sm tracking-wide truncate transition-opacity duration-300 ${
                isCollapsed ? "hidden" : "block"
              }`}
            >
              Logout
            </span>
          </li>

          <li>
            <a
              href="#"
              className="relative flex items-center h-11 hover:bg-gray-900 pr-6 group"
            >
              <div>
                <ModeToggle />
              </div>
              <span
                className={`text-sm tracking-wide truncate transition-opacity duration-300 ${
                  isCollapsed ? "hidden" : "block"
                }`}
              >
                Toggle theme
              </span>
            </a>
          </li>
        </ul>
        <div className="flex mb-4 justify-end">
          <a
            href="https://github.com/Varunreddy489/ClassConnect"
            className={`relative flex space-x-3 items-center h-11 hover:bg-gray-900 pr-6 group ${
              isCollapsed ? "w-16" : "w-64"
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <Star className="ml-4" />
            </div>
            <span
              className={`ml-2 text-sm tracking-wide truncate transition-opacity duration-300 ${
                isCollapsed ? "hidden" : "block"
              }`}
            >
              Give a star
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
