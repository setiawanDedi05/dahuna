"use client";
import React, { useState } from "react";
import { SearchIcon, ShoppingCart, User, X } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "../ui/input";

export const IconGroup = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="flex gap-5 items-center">
      <Dialog open={open}>
        <DialogTrigger
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
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
      <Button variant="nostyle" size="icon" className="hidden lg:flex">
        <ShoppingCart size={32} />
      </Button>
      <Button variant="nostyle" size="icon" className="hidden lg:flex">
        <User size={32} />
      </Button>
    </section>
  );
};
