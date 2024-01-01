"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";


export type orderColumn = {
  id: string;
  isPaid: boolean;
  createdAt: string;
  phone: string;
  address: string;
  totalPrice: number;
  products:string
};

export const columns: ColumnDef<orderColumn>[] = [

  {
    accessorKey: "products",
    header: "products",
  },
  {
    accessorKey: "address",
    header: "address",
  },
  {
    accessorKey: "phone",
    header: "phone",
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
  }
  ,
  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          total Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {

      const amount = parseFloat(row.getValue("totalPrice"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="font-bold">{formatted}</div>
    },
  },
  
  {
    accessorKey: "isPaid",
    header: "is paid",
  },

]
