"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown,  } from "lucide-react";
import CellAction from "./CellAction";
import { size } from "@prisma/client";

export type ProductColumn = {
  id: string;
  name: string;
  createdAt: string;
  category: string;
  size:string;
  color:string;
  isArchived:boolean;
  isFeatured:boolean;
  price:string;
  images:number
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "color",
    cell: ({ row }) => {
      return (
        <div className="flex gap-6">
          {row.original.color}{" "}
          <div
            style={{ backgroundColor: row.original.color }}
            className="rounded-full w-6 h-6"
          ></div>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="font-bold">{formatted}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
  },
  {
    accessorKey:"images",
    header: "Images count",
  },
  {
    accessorKey:"category",
    header: "Category",
  },
  {
    accessorKey:"isArchived",
    header: "is archived",
  },
  {
    accessorKey:"isFeatured",
    header: "is featured",
  },
  {
    accessorKey:"size",
    header: "size",
  },
  {
    id: "action",
    cell: ({ row }) => {
      return <CellAction data={row.original} />;
    },
  },
];
