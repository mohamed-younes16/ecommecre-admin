"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import CellAction from "./CellAction";
import Image from "next/image";

export type BillBoardColumn = {
  id: string;
  label: string;
  createdAt: string;
  labelColor: string;
  imageUrl: string;
};

export const columns: ColumnDef<BillBoardColumn>[] = [
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Label
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
  },

  {
    accessorKey: "imageUrl",
    header: "image",
    cell: ({ row }) => {
      return (
        <Image
          alt=""
          height={50}
          width={50}
          src={row.original.imageUrl}
          className="object-contain"
        />
      );
    },
  },
  {
    accessorKey: "labelColor",
    header: "label Color",
    cell: ({ row }) => {
      return (
        <div className=" bg-white rounded-full w-fit mx-auto flexcenter p-2">
          <div
            style={{ backgroundColor: row.original.labelColor }}
            className="w-6 h-6 border-2 border-foreground rounded-full"
          />
        </div>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      return <CellAction data={row.original} />;
    },
  },
];
