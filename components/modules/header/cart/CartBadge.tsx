import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/hooks/hooks";
import React from "react";

export default function CartBadge() {
  const cartsRedux = useAppSelector((state) => state.carts.value);
  if (cartsRedux.length) {
    return (
      <Badge
        variant="destructive"
        className="text-white rounded-full border-0 absolute -right-4 -top-1"
      >
        <span className="text-xs mx-auto">{cartsRedux.length}</span>
      </Badge>
    );
  }
  return <></>;
}
