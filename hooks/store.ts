import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = {
  SideBarOpen: boolean;
  setSideBarOpen: (v: boolean) => void;
  requests: number;
  setRequests: (v: number) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      SideBarOpen: true,
      setSideBarOpen: (v: boolean) => set(() => ({ SideBarOpen: v })),
      requests: 0,
      setRequests: (v: number) => set(() => ({ requests: v })),
    }),
    { name: "data", storage: createJSONStorage(() => sessionStorage) }
  )
);

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);
  const origin: string =
    typeof window !== "undefined" && window?.location?.origin
      ? window.location.origin
      : "";
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return;
  return origin;
};
