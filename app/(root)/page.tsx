import StoreModal from "@/components/storeModal";
import prismadb from "@/lib/prismabd";
import ModalProvider from "@/providers/modalProvider";
import { auth } from "@clerk/nextjs";
import { Button } from "@radix-ui/themes";

export default async function Home() {
  const { userId } = auth();

  const stores = await prismadb.store.findMany({
    where: {
      userId: userId || "",
    },
  }) || [];

  return (
    <main
      className="  min-h-screen dark:bg-[url(/assets/magicdark.svg)] transition-all 
      bg-cover  bg-[url(/assets/light-bg.svg)]  dark:bg-transparent bg-[#3e3e3efc]
        
      "
    >
      <ModalProvider>
        <StoreModal  openOptional={stores.length > 0} icon={<Button> Create Store</Button>} />
      </ModalProvider>
    </main>
  );
}
