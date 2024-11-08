"use client";
import React, { useState } from "react";
import {
  MinusCircle,
  PlusCircle,
  SearchIcon,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import Image from "next/image";
import { toCurrency } from "./Currency";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Checkout } from "../modules/product";

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
        <Badge
          variant="destructive"
          className="text-white rounded-full border-0 absolute -right-4 -top-1"
        >
          <span className="text-xs mx-auto">0</span>
        </Badge>
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
      <Checkout show={show} />
    </section>
  );
};
