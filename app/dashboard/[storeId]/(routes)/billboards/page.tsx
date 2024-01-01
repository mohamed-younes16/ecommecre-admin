import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import prismadb from "@/lib/prismabd";
import { format } from "date-fns";

import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { BillBoardColumn, columns } from "./components/columns";
import ApiList from "@/components/ApiList";
import { Separator } from "@/components/ui/separator";

const page = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const billboards =
    (await prismadb.billBoard.findMany({ where: { storeId } })) || [];
  const formattedBillBoards: BillBoardColumn[] = billboards.map((e) => ({
    id: e.id,
    createdAt: format(e.createdAt, "MMMM do , yyyy"),
    label: e.label,
    imageUrl:e.imageUrl,
    labelColor:e.labelColor
  }));
  console.log(formattedBillBoards);
  return (
    <div  id="content" className="p-6" >
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${billboards.length})`}
          description="Manage BillBoards For Your Store"
        />{" "}
        <Link
          href={`/dashboard/${storeId}/billboards/new`}
          className="flexcenter"
        >
          <Button className="flexcenter gap-6">
            <PlusCircle /> Add New{" "}
          </Button>
        </Link>
      </div>{" "}
      <Separator className="my-6" />
      <DataTable searchKey="label" columns={columns} data={formattedBillBoards} />
      <ApiList entityName="billboards" entitiIdName="billboardId" />
    </div>
  );
};

export default page;
