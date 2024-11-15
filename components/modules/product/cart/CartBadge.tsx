import { Badge } from "@/components/ui/badge";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import React from "react";
import useSWR, { Fetcher } from "swr";

const fetcher: Fetcher<number, string> = (args) =>
  fetch(args)
    .then((res) => res.json())
    .then((res) => {
      return res.content;
    });

export default function CartBadge() {
  const { userId } = useAuth();

  const { data, error, isLoading } = useSWR<number>(
    userId && process.env.NEXT_PUBLIC_URL + "/api/cart/total?userId=" + userId,
    fetcher
  );

  if (!userId || error) {
    return <></>;
  }

  if (isLoading) {
    return (
      <Badge
        variant="destructive"
        className="text-white rounded-full border-0 absolute -right-4 -top-1"
      >
        <Loader2 className="animate-spin" />
      </Badge>
    );
  }

  return (
    <Badge
      variant="destructive"
      className="text-white rounded-full border-0 absolute -right-4 -top-1"
    >
      <span className="text-xs mx-auto">{data}</span>
    </Badge>
  );
}
