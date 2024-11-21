"use client";

import React, { useState } from "react";
import { History, ShoppingCart, User } from "lucide-react";
import { Button } from "../../ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import CartBadge from "./cart/CartBadge";
import { CartComponent } from "./cart/Cart";
import { Skeleton } from "../../ui/skeleton";
import { useCart } from "@/hooks/use-cart";

export const IconGroup = () => {
  const { isLoading, error } = useCart();
  const [show, setShow] = useState(false);
  const { isSignedIn } = useUser();

  if (error) {
    return (
      <section className="flex gap-5 items-center">
        <Button
          variant="outline"
          size="icon"
          className="relative flex rounded-full"
        >
          <Link href="/sign-in">
            <User size={24} />
          </Link>
        </Button>
      </section>
    );
  }

  if (isLoading) {
    return (
      <div className="flex gap-5 items-center">
        <Skeleton className="hidden relative lg:flex rounded-full size-[2rem]" />
        <Skeleton className="hidden relative lg:flex rounded-full size-[2rem]" />
      </div>
    );
  }

  return (
    <section className="flex gap-5 items-center">
      <Button
        variant="outline"
        size="icon"
        className="relative flex rounded-full size-[1.75rem]"
        onClick={() => setShow(!show)}
      >
        <CartBadge />
        <ShoppingCart />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full size-[1.75rem]"
      >
        <Link href="/histories">
          <History />
        </Link>
      </Button>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="relative flex rounded-full"
        >
          <Link href="/sign-in">
            <User size={24} />
          </Link>
        </Button>
      )}
      {show ? <CartComponent show={show} setShow={setShow} /> : null}
    </section>
  );
};
