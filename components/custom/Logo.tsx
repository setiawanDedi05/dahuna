import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Logo = () => {
  return (
    <Link href="/" className="flex justify-center items-center gap-1">
      <Image
        src="/assets/images/logo.png"
        alt="logo"
        width={50}
        height={50}
        priority
        className="object-contain border-r-2"
      />
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-md lg:text-2xl">Dahuna</h2>
        <h5 className="text-primary-foreground text-xs bg-primary w-full text-right px-1">Clothing</h5>
      </div>
    </Link>
  );
};
