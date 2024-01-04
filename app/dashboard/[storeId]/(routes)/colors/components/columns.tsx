"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown,  } from "lucide-react";
import CellAction from "./CellAction";

export type ColorColumn = {
  id: string;
  name: string;
  createdAt: string;
  value: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          color name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "value",
    cell: ({ row }) => {
      return (
        <div className="flex gap-6">
          {row.original.value}{" "}
          <div
            style={{ backgroundColor: row.original.value }}
            className="rounded-full border-2 border-foreground w-6 h-6"/>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
  },
  {
    id: "action",
    cell: ({ row }) => {
      return <CellAction data={row.original} />;
    },
  },
];
