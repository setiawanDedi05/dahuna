"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../../ui/button";

export const SidebarMenu = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon size={34} />
      </SheetTrigger>
      <SheetContent
        side="left"
        className={cn("px-4 w-full [&>#closeBtn]:text-4xl", "md:w-[400px]")}
      >
        <nav className="flex flex-col mt-10 gap-y-5">
          <Button asChild variant={pathname === "/" ? "default" : "outline"}>
            <Link href="/">Home</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/products" ? "default" : "outline"}
          >
            <Link href="/products">Store</Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
