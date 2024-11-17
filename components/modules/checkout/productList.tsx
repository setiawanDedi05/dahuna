import { Cart } from "@/@types";
import { toCurrency } from "@/components/custom/Currency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BoxIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function ProductListComponent({
  carts,
  totalAmount,
}: {
  carts: Cart[];
  totalAmount: number | undefined;
}) {
  return (
    <div className="w-4/5 border-t-4 bg-primary-foreground rounded-md shadow-md px-5 py-3">
      <div className="flex items-baseline gap-x-3">
        <BoxIcon size={32} /> <span className="font-bold">Order Products</span>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Harga Satuan</TableHead>
            <TableHead className="w-[30px]">Jumlah</TableHead>
            <TableHead className="text-right">Subtotal Product</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {carts?.map((cart) => (
            <TableRow key={cart.id}>
              <TableCell className="font-medium">
                <div className="flex gap-2 items-center">
                  <Image
                    src={cart.Product.Images[0].url}
                    width={100}
                    height={50}
                    alt={cart.Product.name}
                  />
                  <span className="truncate">{cart.Product.name}</span>
                </div>
              </TableCell>
              <TableCell>{toCurrency({ amount: cart.price })}</TableCell>
              <TableCell>{cart.quantity}</TableCell>
              <TableCell className="text-right">
                {toCurrency({ amount: cart.price })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="border-t-2 flex justify-end gap-10 items-end pt-5">
        <span className="font-bold">Total</span>
        <span className="font-bold text-xl">
          {toCurrency({ amount: totalAmount as number })}
        </span>
      </div>
    </div>
  );
}