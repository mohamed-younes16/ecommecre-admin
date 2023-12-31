import { ThemeProvider } from "@/components/ui/theme-provider";
import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";
import "@radix-ui/themes/styles.css";
import { ReactNode } from "react";
import "./globals.css";
import { Toaster } from "sonner";

import { GeistMono } from "geist/font/mono";

export const metadata = {
  title: "admin-app",
  description: "admin-app ",
};
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        suppressHydrationWarning
        lang="en"
        className={`${GeistSans.variable} ${GeistMono.variable}`}
      >
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="admin-theme"
          >
            <Toaster richColors position="top-center" />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
