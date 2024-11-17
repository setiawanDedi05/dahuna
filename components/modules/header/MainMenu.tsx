import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import MenuCategory from "./MenuCategory";

export const MainMenu = () => {
  return (
    <section className="hidden md:flex z-[9] relative">
      <ul className="flex gap-32 justify-between items-center">
        <li className="relative">
          <Link
            href="/"
            className={cn(
              "h-full duration-300 after:absolute after:top-[20px] after:left-0 after:w-0 after:h-1 after:bg-primary after:duration-100 after:ease-linear hover:after:w-full"
            )}
          >
            Home
          </Link>
        </li>
        <li className="relative">
          <Link
            href="/products"
            className={cn(
              "h-full duration-300 after:absolute after:top-[20px] after:left-0 after:w-0 after:h-1 after:bg-primary after:duration-100 after:ease-linear hover:after:w-full"
            )}
          >
            Store
          </Link>
        </li>
        <li className="relative">
          <MenuCategory />
        </li>
      </ul>
    </section>
  );
};
