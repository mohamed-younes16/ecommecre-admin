import {  auth } from "@clerk/nextjs";
import "@radix-ui/themes/styles.css";
import { ReactNode } from "react";
import "../../globals.css";
import prismadb from "@/lib/prismabd";
import { redirect } from "next/navigation";
import NavBar from "@/components/NavBar";
import { Store } from "@prisma/client";


export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = auth();

  !userId && redirect("/sign-in");
  const stores: Store[] = await prismadb.store.findMany({
    where: { userId: userId || "" },
  });
  stores.length === 0 && redirect("/");

  return (
    <main
      className=" min-h-screen dark:bg-[url(/assets/magicdark.svg)] transition-all 
  bg-cover  bg-[url(/assets/light-bg.svg)]  dark:bg-transparent bg-[#3e3e3efc]
    "
    >
      <NavBar stores={stores} />
      <div  id="wrapper"  className="fixed h-[calc(90dvh_-_50px)] dark:bg-[#00000094]
       top-[120px] shadow-2xl p-6 bg-[#ffffff] 
      hover:shadow-[#898989c3] dark:hover:shadow-[#1c1c1cc3] transition-all overflow-auto w-[94%] mx-auto left-[3%] rounded-lg ">

              {children}

    
      </div>
    </main>
  );
}
