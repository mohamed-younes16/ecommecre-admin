"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StoreSchema } from "@/models/Schemas/Setup";
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


const CommonForm = ({ form, onSubmit, icon }) => (
  <>
    <DialogTrigger className="w-full">{icon}</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Store</DialogTitle>
        <DialogDescription>
          Add a new Store to manage products and categories
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="account-form_input"
                    type="text"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex items-center gap-6 justify-end">
            <Button type="submit" variant={"outline"}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className={`${
                form.formState.isSubmitting ? "animate-bounce bg-zinc-500" : ""
              } flexcenter gap-6`}
            >
              Submit
              {form.formState.isSubmitting && (
                <div className="w-8 h-8 border-4 border-white dark:border-black !border-t-transparent rounded-full animate-spin" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  </>
);

const StoreModal = ({ icon, openOptional }) => {
  const form = useForm<z.infer<typeof StoreSchema>>({
    resolver: zodResolver(StoreSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof StoreSchema>) {
    try {
      const data = {
        ...values,
      };

      const adding = axios.post(`/api/stores`, data);

      adding
        .then((e) => {
          toast.success(e.data.message, { invert: true });
          setTimeout(() => {
            window.location.assign(`/dashboard/${e.data.store.id}/overview`);
          }, 500);
        })
        .catch((e) => {
          console.log(e);
          toast.error(e.response.data.message, { invert: true });
        });

      toast.dismiss();
    } catch (error) {
      console.log(error);
    }
  }

  return openOptional ? (
    <Dialog>
      <CommonForm form={form} icon={icon} onSubmit={onSubmit} />
    </Dialog>
  ) : (
    <Dialog open={true}>
      <CommonForm form={form} icon={icon} onSubmit={onSubmit} />
    </Dialog>
  );
};

export default StoreModal;
