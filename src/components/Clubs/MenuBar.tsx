import { Info, LogOut } from "lucide-react";

const MenuBar = () => {
  return (
    <div>
      <div>
        <Info />
        <span>Info</span>
      </div>
      <div>
        <LogOut />
        <span>Leave Club</span>
      </div>
    </div>
  );
};

export default MenuBar;
