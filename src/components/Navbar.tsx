import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "./ui/button";
import logo from "/logo-no-background.svg";
import { ModeToggle } from "./ui/mode-toggle";
import { useAuth } from "@/context/AuthContext";


const Navbar = () => {
  const navigate = useNavigate();
  const { authUser } = useAuth();

  const redirectUser = () => {
    if (authUser) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="dark:bg-[#000000] bg-slate-500 top-0 left-0 w-full  relative py-1 px-3">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-3">
        <div className=" flex-shrink-0 ">
          <a href="/" className="flex items-center space-x-3">
            <div>
              <img src={logo} className="h-8  " alt="ClassConnect" />
            </div>
          </a>
        </div>

        <div className="flex flex-grow justify-end items-center md:order-2 space-x-6 rtl:space-x-reverse relative">
          <div className="relative"></div>
          <div className="flex">
            <Button
              onClick={redirectUser}
              className="flex justify-center bg-blue-700 hover:bg-blue-900 items-center space-x-1 text-black dark:text-white  "
            >
              <span>Visit Page</span>
              <MoveRight className=" w-5 " />
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
