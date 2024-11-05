import { MobileBottom } from "@/components/custom/MobileBottom";
import { Footer } from "@/components/modules/footer";
import { Header } from "@/components/modules/header";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="h-min-screen overflow-x-hidden">{children}</div>
      <Footer />
    </>
  );
}
