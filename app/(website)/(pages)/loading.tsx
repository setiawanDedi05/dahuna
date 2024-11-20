import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div className="z-50 h-screen w-screen flex justify-center items-center">
      <Image
        src="/assets/images/logo.png"
        alt="loading"
        width={100}
        height={100}
        className="animate-bounce"
      />
    </div>
  );
}
