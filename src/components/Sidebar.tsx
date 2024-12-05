import {
  Bell,
  Menu,
  House,
  UserRoundPen,
  GraduationCap,
  CalendarCheck,
  MessagesSquare,
  BriefcaseBusiness,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@radix-ui/react-dropdown-menu";

import Logout from "./Logout";
import logo from "/logo-no-background.svg";
import { ModeToggle } from "./ui/mode-toggle";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

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
          <Button
            onClick={toggleSidebar}
            className="rounded-full"
            variant="ghost"
            size="icon"
          >
            <Menu className="size-10  p-1 hover:dark:bg-gray-900 hover:bg-slate-300   " />
          </Button>
          <a
            href="/home"
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
              className="relative flex items-center h-11 hover:dark:bg-gray-900 hover:bg-slate-300   pr-6 group"
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
              to="/member/clubs"
              className="relative flex items-center h-11 hover:dark:bg-gray-900 hover:bg-slate-300   pr-6 group"
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
            <Link
              to="/notifications"
              className="relative flex items-center h-11 hover:dark:bg-gray-900 hover:bg-slate-300   pr-6 group"
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
            </Link>
          </li>

          <Separator className="my-2" />

          <li>
            <Link
              to="/jobs"
              className="relative flex items-center h-11 hover:dark:bg-gray-900 hover:bg-slate-300   pr-6 group"
            >
              <div>
                <BriefcaseBusiness className="ml-4" />
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
            </Link>
          </li>

          <li>
            <Link
              to="/events"
              className="relative flex items-center h-11 hover:dark:bg-gray-900 hover:bg-slate-300   pr-6 group"
            >
              <div>
                <CalendarCheck className="ml-4" />
              </div>
              <span
                className={`ml-2 text-sm tracking-wide truncate transition-opacity duration-300 ${
                  isCollapsed ? "hidden" : "block"
                }`}
              >
                Events
              </span>
              <span
                className={`px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full ${
                  isCollapsed ? "hidden" : "block"
                }`}
              >
                15
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/network"
              className="relative flex items-center h-11 hover:dark:bg-gray-900 hover:bg-slate-300  pr-6 group"
            >
              <div>
                <MessagesSquare className="ml-4" />
              </div>
              <span
                className={`ml-2 text-sm tracking-wide truncate transition-opacity duration-300 ${
                  isCollapsed ? "hidden" : "block"
                }`}
              >
                Network
              </span>
            </Link>
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
              className="relative flex items-center h-11 hover:dark:bg-gray-900 hover:bg-slate-300   pr-6 group"
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

          <li className="flex hover:dark:bg-gray-900 hover:bg-slate-300   items-center">
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
              className="relative flex items-center h-11 hover:dark:bg-gray-900 hover:bg-slate-300   pr-6 group"
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
            className={`relative flex space-x-3 items-center h-11 hover:dark:bg-gray-900 hover:bg-slate-300   pr-6 group ${
              isCollapsed ? "w-16" : "w-64"
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              {/* <Star className="ml-4" /> */}
              <GitHubLogoIcon className="ml-4 size-6 " />
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
