import { Cart } from "@/@types";
import { toCurrency } from "@/components/custom/Currency";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";

type ProductListItemProps = {
  cart: Cart;
  handleDelete: (id: string) => void;
  handleDecrease: (id: string) => void;
  handleIncrease: (id: string) => void;
};

export const ProductListItem = ({
  cart,
  handleDecrease,
  handleDelete,
  handleIncrease,
}: ProductListItemProps) => {
  return (
    <div className="flex flex-col my-1">
      <Button
        size="icon"
        variant="destructive"
        className="relative -left-0 shadow-md top-4"
        onClick={() => handleDelete(cart.id)}
      >
        <Trash2 size={30} />
      </Button>
      <div className="flex gap-x-2 justify-between px-5 py-2 border">
        <Image
          src={cart.Product.Images[0].url}
          width="100"
          height="400"
          alt={cart.Product.name}
        />
        <div className="flex flex-col justify-between items-center">
          <span className="truncate capitalize">{cart.Product.name}</span>
          <div className="flex items-center gap-5">
            <Button
              variant="outline"
              className="rounded-full"
              size="icon"
              onClick={() => handleDecrease(cart.id)}
            >
              <MinusCircle />
            </Button>
            <div className="rounded-md border py-2 px-5">{cart.quantity}</div>
            <Button
              variant="outline"
              className="rounded-full"
              size="icon"
              onClick={() => handleIncrease(cart.id)}
            >
              <PlusCircle />
            </Button>
          </div>
          <div className="border px-5 py-3">
            {toCurrency({ amount: cart.price })} x {cart.quantity} ={" "}
            {toCurrency({ amount: cart.price * cart.quantity })}
          </div>
        </div>
      </div>
    </div>
  );
};
