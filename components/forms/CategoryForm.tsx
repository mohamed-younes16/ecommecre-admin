"use client";

import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategorySchema } from "@/models/Schemas/Setup";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import "@uploadthing/react/styles.css";
import axios from "axios";
import { billBoard, category } from "@prisma/client";
import { ImagePlusIcon, Loader2, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Heading from "../Heading";
import Image from "next/image";
import { ignoreKeys } from "@/actions";
import _ from "lodash";
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";

const CategoryForm = ({
  category,
  storeId,
  billBoards,
}: {
  category: category;
  storeId: string;
  billBoards: billBoard[];
}) => {
  const title = category ? "Edit category" : "Create category";
  const description = category ? "Edit category" : "Create category";
  const action = category ? "update" : "create ";
  const [begain, setBegain] = useState(false);
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: category?.name || "",
      billboardId: category?.billboardId || "",
      logo: category?.logo || "",
    },
  });
  const watchedFormData = form.watch();
  const keysToIgnore = ["createdAt", "updatedAt", "storeId", "id", "billboard"];
  const initialProduct = {
    ...ignoreKeys(category, keysToIgnore),
  };

  const isFormDataChanged = !_.isEqual(initialProduct, watchedFormData);

  async function onSubmit(values: z.infer<typeof CategorySchema>) {
    toast.loading("");
    try {
      const data = {
        ...values,
      };

      const adding =
        action === "update"
          ? axios.patch(
              `/api/stores/${storeId}/categories/${category?.id}`,
              data
            )
          : axios.post(
              `/api/stores/${storeId}/categories/${category?.id}`,
              data
            );

      adding
        .then((e) => {
          toast.success(e.data.message, { invert: true });
          setTimeout(() => {
            window.location.assign(`/dashboard/${storeId}/categories`);
          }, 500);
        })
        .catch((e) => {
          console.log(e);
          toast.error(e.response.data.message || "Error Happend", {
            invert: true,
          });
        });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Heading title={title} description={description} />{" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-8">
          <div className="flex flex-col gap-3 justify-start  w-full ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className=" flex flex-col w-fit   ">
                  <FormLabel>Label Name</FormLabel>

                  <FormControl className="">
                    <Input
                      className="account-form_input "
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem className=" flex flex-col justify-start flex-wrap ">
                  <FormLabel>category Logo</FormLabel>
                  {field.value ? (
                    <FormLabel
                      className=" mr-8 relative 
             w-full max-w-[90px] m-0 h-[90px] 
            bg-zinc-900 rounded-xl  flexcenter "
                    >
                      {field?.value && (
                        <>
                          <Trash2
                            onClick={() => field.onChange("")}
                            className="absolute cursor-pointer transition-all  
                      hover:scale-105 bg-red-500 -top-2 -right-2
                      rounded-md  p-2 h-10 w-10 text-white z-50"
                          />
                          <Image
                            src={field.value}
                            className=" object-contain   rounded-lg"
                            alt="image of you"
                            fill
                          />
                        </>
                      )}
                    </FormLabel>
                  ) : (
                    <div className="flex items-s gap-6">
                      <UploadButton
                        content={{
                          button: (
                            <div className="flexcenter whitespace-nowrap text-foreground gap-6">
                              {!begain ? (
                                <>
                                  {" "}
                                  <ImagePlusIcon className="" />
                                  <p>Upload An Image</p>
                                </>
                              ) : (
                                <Loader2 className="relative z-50 animate-spin" />
                              )}
                            </div>
                          ),
                        }}
                        endpoint="imageUploader"
                        className="items-start"
                        appearance={{
                          button: `bg-border w-52 p-2  text-primary-foreground `,
                        }}
                        onUploadBegin={() => setBegain(true)}
                        onClientUploadComplete={(e) => {
                          setBegain(false);
                          field.onChange(e?.[0].url);
                        }}
                      />
                    </div>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem className=" flex flex-col w-fit   ">
                  <FormLabel>choose a billboard</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={category?.billboardId}
                      onValueChange={(e) => {
                        field.onChange(e);
                        toast.loading("setting up billboard Preview", {
                          duration: 1000,
                        });
                      }}
                    >
                      <SelectTrigger className="w-[180px] ring-0 !shadow-none">
                        <SelectValue placeholder="Select a billboard" />
                      </SelectTrigger>
                      <SelectContent className="!shadow-none">
                        <SelectGroup>
                          <SelectLabel>BillBoards List</SelectLabel>
                          {billBoards.map((e) => (
                            <SelectItem key={e.id} value={e.id}>
                              {" "}
                              {e.label}{" "}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  {field.value ? (
                    <>
                      {" "}
                      <FormLabel>Image Preview</FormLabel>
                      <Image
                        className="rounded-xl"
                        alt=""
                        height={250}
                        width={250}
                        src={
                          billBoards.find((e) => e.id == field.value)?.imageUrl!
                        }
                      />
                    </>
                  ) : null}
                </FormItem>
              )}
            />
          </div>
          {isFormDataChanged && (
            <div className="flex items-center gap-6 justify-start">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className={`${
                  form.formState.isSubmitting ? " bg-foreground" : ""
                } flexcenter w-[100px] gap-6`}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="h-6 w-6 animate-spin " />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </>
  );
};

export default CategoryForm;
