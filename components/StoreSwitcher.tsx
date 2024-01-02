"use client";

import * as React from "react";
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Store } from "@prisma/client";
import ModalProvider from "@/providers/modalProvider";
import StoreModal from "./storeModal";
import { useParams } from "next/navigation";

export function StoreSwitcher({ stores }: { stores: Store[] }) {
  const params = useParams();
  const [open, setOpen] = React.useState(false);
  const [Storename, setStorename] = React.useState(
    stores.find((e) => e.id == params?.storeId)?.name
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex items-center justify-between w-[230px]    gap-6 "
        >
          <div className="flexcenter gap-4">
            <StoreIcon />
            <p className=" max-w-[120px] whitespace-nowrap overflow-hidden overflow-ellipsis">
              {" "}
              {Storename
                ? stores.find((store) => store.name === Storename)?.name
                : "Select store"}
            </p>
          </div>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search store..." />
          <CommandEmpty>No store found.</CommandEmpty>
          <CommandGroup>
            {stores.map((store) => (
              <CommandItem
                key={store.name}
                value={store.name}
                onSelect={(currentValue) => {
                  setStorename(currentValue === Storename ? "" : currentValue);
                  setOpen(false);
                  window.location.assign( `/dashboard/${store.id}/overview`)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    Storename === store.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {store.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
        <ModalProvider>
          <StoreModal
          openOptional={true}
            icon={
              <div className=" px-6 my-4 gap-4  w-full flex  items-center">
                <PlusCircle />
                Create Store
              </div>
            }
          />
        </ModalProvider>
      </PopoverContent>
    </Popover>
  );
}
