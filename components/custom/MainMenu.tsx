"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChevronDown } from "lucide-react";

export const MainMenu = () => {
  const pathname = usePathname();
  return (
    <section className="hidden md:flex z-[9] relative">
      <ul className="flex gap-32 justify-between items-center">
        <li className="relative">
          <Link
            href="/"
            className={cn(
              "h-full duration-300 after:absolute after:top-[20px] after:left-0 after:w-0 after:h-1 after:bg-primary after:duration-100 after:ease-linear hover:after:w-full",
              pathname === "/" && "border-b-4 border-primary/30"
            )}
          >
            Home
          </Link>
        </li>
        <li className="relative">
          <Link
            href="/products"
            className={cn(
              "h-full duration-300 after:absolute after:top-[20px] after:left-0 after:w-0 after:h-1 after:bg-primary after:duration-100 after:ease-linear hover:after:w-full",
              pathname === "/products" && "border-b-4 border-primary/30"
            )}
          >
            Store
          </Link>
        </li>
        <li className="relative">
          <HoverCard openDelay={0}>
            <HoverCardTrigger>
              <div className="flex gap-3">
                Category <ChevronDown />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-[400px]">
              <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                <Link
                  href="/"
                  className="text-center hover:text-primary/40 hover:translate-y-1 hover:translate-x-1 ease-in-out transition-all"
                >
                  Woman Cloth
                </Link>
                <Link
                  href="/"
                  className="text-center hover:text-primary/40 hover:translate-y-1 hover:translate-x-1 ease-in-out transition-all"
                >
                  Man Cloth
                </Link>
                <Link
                  href="/"
                  className="text-center hover:text-primary/40 hover:translate-y-1 hover:translate-x-1 ease-in-out transition-all"
                >
                  Boy Cloth
                </Link>
                <Link
                  href="/"
                  className="text-center hover:text-primary/40 hover:translate-y-1 hover:translate-x-1 ease-in-out transition-all"
                >
                  Girl Cloth
                </Link>
              </div>
            </HoverCardContent>
          </HoverCard>
        </li>
      </ul>
    </section>
  );
};
