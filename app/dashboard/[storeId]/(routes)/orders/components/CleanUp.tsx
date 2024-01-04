"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CleanUp = ({ cleanUp }: { cleanUp: () => Promise<void> }) => {
  return (
    <Button
      onClick={async () => {
        toast.loading("cleaning");
        await cleanUp();
        toast.dismiss()
      }}
      variant={"destructive"}
    >
      Clean Orders
    </Button>
  );
};

export default CleanUp;
