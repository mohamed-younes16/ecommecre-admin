"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, {  useState } from "react";

const MainNav = () => {


  const [index, setindex] = useState<number|null>(null);
  const params = useParams();
  const pathname = usePathname();
  const routes = [
    {
      href: `/dashboard/${params?.storeId}/overview`,
      label: `Overview`,
      active: pathname === `/dashboard/${params?.storeId}/overview`,
    },
    {
      href: `/dashboard/${params?.storeId}/settings`,
      label: `Settings`,
      active: pathname === `/dashboard/${params?.storeId}/settings`,
    },
    {
      href: `/dashboard/${params?.storeId}/products`,
      label: `Products`,
      active: pathname === `/dashboard/${params?.storeId}/products`,
    },
    {
      href: `/dashboard/${params?.storeId}/billboards`,
      label: `Billboards`,
      active: pathname === `/dashboard/${params?.storeId}/billboards`,
    },
    {
      href: `/dashboard/${params?.storeId}/categories`,
      label: `Categories`,
      active: pathname === `/dashboard/${params?.storeId}/categories`,
    },
    {
      href: `/dashboard/${params?.storeId}/sizes`,
      label: `Sizes`,
      active: pathname === `/dashboard/${params?.storeId}/sizes`,
    },
    {
      href: `/dashboard/${params?.storeId}/orders`,
      label: `Orders`,
      active: pathname === `/dashboard/${params?.storeId}/orders`,
    },
    {
      href: `/dashboard/${params?.storeId}/colors`,
      label: `Colors`,
      active: pathname === `/dashboard/${params?.storeId}/colors`,
    },
  ];
  return (
    <div className=" flex gap-[10px] relative">
      {index!==null && <div
        style={{ translate: `${80 * index + index * 10}px 0` }}
        className={`absolute origin-left duration-150
          bottom-0 left-0 z-10 h-[4px] w-[80px]
            bg-cyan-400  `}
      />}

      {routes.map((e, i) => (
        <div
          onClick={() => setindex(i)}
          key={e.label}
          className="relative w-[80px]  flexcenter group py-1  overflow-x-hidden "
        >
          <Link href={e.href}> {e.label} </Link>
          <div
            className={`absolute origin-left duration-75 group-hover:scale-x-100 bottom-0 left-0 scale-x-0 h-[4px] w-full
            bg-[#b7b7b772] z-20`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default MainNav;
