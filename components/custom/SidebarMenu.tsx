"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const SidebarMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon size={34} />
      </SheetTrigger>
      <SheetContent
        side="left"
        className={cn("px-4 w-full [&>#closeBtn]:text-4xl", "md:w-[400px]")}
      >
        <SheetTitle>Categories</SheetTitle>
        <div className="grid grid-cols-3 gap-y-10 mt-10">
          <Link href="/" className="text-left">
            Woman Cloth
          </Link>
          <Link href="/" className="text-left">
            Man Cloth
          </Link>
          <Link href="/" className="text-left">
            Boy Cloth
          </Link>
          <Link href="/" className="text-left">
            Girl Cloth
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};
