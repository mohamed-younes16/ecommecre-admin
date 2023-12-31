import Heading from "@/components/Heading";

import { ReactNode } from "react";

const page = async ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Heading title="Overview" description="Overview your total Income"/>
    </main>
  );
};

export default page;
