"use client";
import ModalProvider from "@/providers/modalProvider";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import Heading from "./Heading";
import axios from "axios";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

const DeleteStore = ({ storeId }: { storeId: string }) => {
  return (
    <>
      <ModalProvider>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"destructive"}>
              <Trash2 />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <Heading title="Delete Store" description="Are You Sure ?" />
            </DialogHeader>

            <DialogFooter>
              <Button
                onClick={async () => {
                  try {
                    const adding = axios.delete(`/api/stores/${storeId}`);

                    adding
                      .then((e) => {
                        toast.success(e.data.message, { invert: true });
                        setTimeout(() => {
                          window.location.reload();
                        }, 500);
                      })
                      .catch((e) => {
                        console.log(e);
                        toast.error(
                          e.response.data.message || "Error Happend",
                          {
                            invert: true,
                          }
                        );
                      });

                    toast.dismiss();
                  } catch (error) {
                    console.log(error);
                  }
                }}
                variant={"destructive"}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ModalProvider>
    </>
  );
};

export default DeleteStore;
