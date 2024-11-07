import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const LoaderProducts = () => {
  return (
    <div className="flex flex-col gap-y-5">
      <SkeletonTopBar />
      <SkeletonContent />
    </div>
  );
};

const SkeletonTopBar = () => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-5">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  );
};

const SkeletonContent = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 relative">
      <SkeletonProductCard />
      <SkeletonProductCard />
      <SkeletonProductCard />
      <SkeletonProductCard />
      <SkeletonProductCard />
      <SkeletonProductCard />
    </div>
  );
};

const SkeletonProductCard = () => {
  return (
    <div className="p-3 w-full h-full border flex flex-col justify-start gap-1">
      <div className="flex group/image h-[400px] relative overflow-hidden">
        <div className="absolute z-10 left-1 top-3 flex gap-3">
          <Skeleton className="size-11" />
          <Skeleton className="size-11" />
        </div>
        <Skeleton className="h-[400px] w-[300px]" />
      </div>
      <h2 className="text-left truncate text-xl font-bold leading-10">
        <Skeleton className="h-10 w-36" />
      </h2>
      <span className="text-muted-foreground text-sm text-left truncate">
        <Skeleton className="h-5 w-52" />
      </span>
      <div className="flex justify-start items-start gap-5">
        <Skeleton className="h-14 w-32" />
        <Skeleton className="h-14 w-32" />
      </div>
    </div>
  );
};
