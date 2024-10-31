import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useSWR, { Fetcher } from "swr";
import { Category } from "@/types";

export const SidebarMenu = () => {
  const fetcher: Fetcher<Category[], string> = (args) =>
    fetch(args)
      .then((res) => res.json())
      .then((res) => res.data);

  const { data, error, isLoading } = useSWR<Category[]>(
    `${process.env.NEXT_PUBLIC_URL}/api/category`,
    fetcher
  );

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <MenuIcon size={34} />
        </SheetTrigger>
        <SheetContent
          side="left"
          className={cn("px-4 w-full [&>#closeBtn]:text-4xl", "md:w-[400px]")}
        >
          <Tabs defaultValue="category" className="mt-10">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="category">Categories</TabsTrigger>
              <TabsTrigger value="page">Page</TabsTrigger>
            </TabsList>
            <TabsContent value="category">
              <div className="flex flex-col gap-8 h-full">
                {/* TODO:api call */}
              </div>
            </TabsContent>
            <TabsContent value="page">{/* TODO:api call */}</TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </div>
  );
};
