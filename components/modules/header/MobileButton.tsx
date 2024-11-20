"use client";

import { cn } from "@/lib/utils";
import { Boxes, History, HistoryIcon, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const MobileButton = () => {
  const pathname = usePathname();
  return (
    <div className="fixed md:hidden z-50 bottom-10 w-full h-[80px] ">
      <div className="w-3/4 h-full bg-primary/70 mx-auto rounded-lg flex text-primary-foreground items-center">
        <Link
          href="/"
          className={cn(
            pathname === "/" && "border-b-4",
            "h-full w-1/3 flex justify-center items-center cursor-pointer"
          )}
        >
          <Home
            size={32}
            className={cn(
              pathname === "/"
                ? ""
                : "hover:rotate-12 hover:duration-1000",
              "p-3 size-16"
            )}
          />
        </Link>
        <Link
          href="/products"
          className={cn(
            pathname === "/products" && "border-b-4",
            "h-full w-1/3 flex justify-center items-center cursor-pointer"
          )}
        >
          <Boxes
            className={cn(
              pathname === "/products"
                ? ""
                : "hover:rotate-12 hover:duration-1000",
              "p-3 size-16"
            )}
          />
        </Link>
        <Link
          href="/histories"
          className={cn(
            pathname === "/histories" && "border-b-4",
            "h-full w-1/3 flex justify-center items-center cursor-pointer"
          )}
        >
          <HistoryIcon
            className={cn(
              pathname === "/histories"
                ? ""
                : "hover:rotate-12 hover:duration-1000",
              "p-3 size-16"
            )}
          />
        </Link>
      </div>
    </div>
  );
};
