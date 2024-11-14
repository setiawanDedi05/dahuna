"use client";

import React, { Suspense, useState } from "react";
import { SearchIcon, ShoppingCart, User, X } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Checkout } from "../modules/product";
import CartBadge from "../modules/product/cart/CartBadge";

export const IconGroup = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <section className="flex gap-5 items-center">
      <Dialog open={open}>
        <DialogTrigger className="cursor-pointer" onClick={() => setOpen(true)}>
          <SearchIcon size={24} />
        </DialogTrigger>
        <DialogContent className="[&>.closeBtn]:hidden rounded-md">
          <div className="flex justify-center items-center gap-5">
            <SearchIcon className="text-slate-300" />
            <Input placeholder="search product" />
            <Button
              variant="nostyle"
              onClick={() => setOpen(false)}
              className="hover:bg-red-400 !p-3 hover:text-white"
            >
              <X />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Button
        variant="outline"
        size="icon"
        className="hidden relative lg:flex rounded-full size-[1.75rem]"
        onClick={() => setShow(!show)}
      >
        <CartBadge />
        <ShoppingCart />
      </Button>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="hidden relative lg:flex rounded-full"
        >
          <Link href="/sign-in">
            <User size={24} />
          </Link>
        </Button>
      )}
      {show && <Checkout show={show} setShow={setShow} />}
    </section>
  );
};
