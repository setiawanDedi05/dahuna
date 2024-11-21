"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Boxes, History, HistoryIcon, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const MobileButton = () => {
  const pathname = usePathname();
  return (
    <div className="fixed md:hidden z-50 bottom-10 w-full h-[40px] ">
      <div className="h-full w-[300px] bg-primary mx-auto rounded-lg flex text-primary-foreground items-center">
        <Tooltip delayDuration={0}>
          <TooltipTrigger
            className={cn(
              pathname === "/" && "border-b-4",
              "h-full w-1/3 flex justify-center items-center cursor-pointer"
            )}
          >
            <Link href="/">
              <Home
                className={cn(
                  pathname === "/" ? "" : "hover:rotate-12 hover:duration-1000",
                  "p-3 size-10"
                )}
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Home</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip delayDuration={0}>
          <TooltipTrigger
            className={cn(
              pathname === "/products" && "border-b-4",
              "h-full w-1/3 flex justify-center items-center cursor-pointer"
            )}
          >
            <Link href="/products">
              <Boxes
                className={cn(
                  pathname === "/products"
                    ? ""
                    : "hover:rotate-12 hover:duration-1000",
                  "p-3 size-10"
                )}
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Store</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip delayDuration={0}>
          <TooltipTrigger
            className={cn(
              pathname === "/histories" && "border-b-4",
              "h-full w-1/3 flex justify-center items-center cursor-pointer"
            )}
          >
            <Link href="/histories">
              <HistoryIcon
                className={cn(
                  pathname === "/histories"
                    ? ""
                    : "hover:rotate-12 hover:duration-1000",
                  "p-3 size-10"
                )}
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>History</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
