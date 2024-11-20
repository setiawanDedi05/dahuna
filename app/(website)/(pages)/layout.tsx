import { Footer } from "@/components/modules/footer";
import { Header } from "@/components/modules/header";
import "swiper/css/navigation";
import "swiper/css";
import "../../style.css";
import Script from "next/script";
import { MobileButton } from "@/components/modules/header/MobileButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Script
        type="text/javascript"
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key="SB-Mid-client-njA4aD0cwvtPvD03"
        strategy="lazyOnload"
      />
      <div className="h-min-screen overflow-x-hidden">{children}</div>
      <MobileButton />
      <Footer />
    </>
  );
}
