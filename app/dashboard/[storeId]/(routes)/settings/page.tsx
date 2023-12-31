import ApiAlert from "@/components/ApiAlert";
import DeleteStore from "@/components/DeleteStore";
import Heading from "@/components/Heading";
import SettingsForm from "@/components/forms/SettingsForm";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismabd";
import { auth } from "@clerk/nextjs";

import { redirect } from "next/navigation";
import React from "react";

const page = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {" "}
        <Heading description="Manage Store Prefrences" title="Settings" />
        <DeleteStore storeId={store.id} />
      </div>
      <Separator className="my-6"/>
      <SettingsForm currentStore={store} />
    </div>
  );
};

export default page;
