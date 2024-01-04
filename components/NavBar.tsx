import { UserButton } from "@clerk/nextjs";
import React from "react";
import { ModeToggle } from "./ui/themeButton";
import { StoreSwitcher } from "./StoreSwitcher";
import { Store } from "@prisma/client";
import MainNav from "./MainNav";

const NavBar = ({ stores }: { stores: Store[] }) => {
  return (
    <div
      className=" overflow-auto !fixed
        h-[100px] shadow-2xl hover:shadow-[#898989c3] transition-all w-[94%] mx-auto left-[3%] rounded-lg top-[10px] p-4 
    backdrop-blur-md  "
    >
      <div className="flex h-full justify-between items-center">
        <div className="flex items-center gap-6 ">
          <StoreSwitcher stores={stores || []} />
          <MainNav />
        </div>{" "}
        <div className="flexcenter gap-4 min-w-[180px]">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />{" "}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
