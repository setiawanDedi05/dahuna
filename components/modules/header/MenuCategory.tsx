import { Category } from "@/@types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import prisma from "@/lib/db";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function MenuCategory() {
  const categories = await prisma.category.findMany();
  return (
    <HoverCard openDelay={0}>
      <HoverCardTrigger>
        <div className="flex gap-3">
          Category <ChevronDown />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-[400px]">
        <div className="grid grid-cols-2 gap-x-10 gap-y-5">
          {categories.map((category: Category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="text-center hover:text-primary/40 hover:translate-y-1 hover:translate-x-1 ease-in-out transition-all capitalize"
            >
              {category.title}
            </Link>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
