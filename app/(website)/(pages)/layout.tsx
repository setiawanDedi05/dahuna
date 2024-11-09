import { Footer } from "@/components/modules/footer";
import { Header } from "@/components/modules/header";
import React from "react";
import "swiper/css/navigation";
import "swiper/css";
import "../../style.css";

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
