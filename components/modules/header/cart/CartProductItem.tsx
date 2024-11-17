import { Cart } from "@/@types";
import { toCurrency } from "@/components/custom/Currency";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  changeStatus,
  decrementQuantity,
  deleteItem,
  incrementQuantity,
  rollback,
  toggleCheckItem,
} from "../../../../redux/reducer/cartSlice";
import { deleteItemCart } from "@/actions/deleteItemCart";
import { decrementItemCart } from "@/actions/decrementItemCart";
import { incrementItemCart } from "@/actions/incrementItemCart";
import { Checkbox } from "@/components/ui/checkbox";
import { changeChecked } from "@/actions/changeChecked";

type ProductListItemProps = {
  cart: Cart;
};

export const ProductListItem = ({ cart }: ProductListItemProps) => {
  const dispatch = useDispatch();
  const handleDelete = async (item: Cart) => {
    dispatch(deleteItem(item.id!));
    try {
      dispatch(changeStatus("loading"));
      await deleteItemCart(item.id!);
    } catch (error) {
      dispatch(changeStatus("failed"));
      dispatch(rollback(item));
    } finally {
      dispatch(changeStatus("idle"));
    }
  };

  const handleDecrease = async (item: Cart) => {
    dispatch(decrementQuantity(item.id!));
    try {
      dispatch(changeStatus("loading"));
      await decrementItemCart(item.id!);
    } catch (error) {
      dispatch(changeStatus("failed"));
      dispatch(rollback(item));
    } finally {
      dispatch(changeStatus("idle"));
    }
  };

  const handleIncrease = async (item: Cart) => {
    dispatch(incrementQuantity(item.id!));
    try {
      dispatch(changeStatus("loading"));
      await incrementItemCart(item.id!);
    } catch (error) {
      dispatch(changeStatus("failed"));
      dispatch(rollback(item));
    } finally {
      dispatch(changeStatus("idle"));
    }
  };

  const handleToggleCheckItem = async (item: Cart, value: boolean) => {
    dispatch(toggleCheckItem({ id: item.id!, value: value }));
    try {
      dispatch(changeStatus("loading"));
      await changeChecked(item.id!, value);
    } catch (error) {
      dispatch(changeStatus("failed"));
      dispatch(rollback(item));
    } finally {
      dispatch(changeStatus("idle"));
    }
  };

  return (
    <div className="flex flex-col my-1">
      <Button
        size="icon"
        variant="destructive"
        className="relative -left-0 shadow-md top-4"
        onClick={() => handleDelete(cart)}
      >
        <Trash2 size={30} />
      </Button>
      <div className="flex gap-x-2 justify-between items-center px-5 py-2 border">
        <Checkbox
          defaultChecked={cart.checked}
          onCheckedChange={(e: boolean) => handleToggleCheckItem(cart, e)}
        />
        <Image
          src={cart.Product!.Images[0].url}
          width="100"
          height="400"
          alt={cart.Product!.name}
        />
        <div className="flex flex-col justify-between items-center">
          <span className="truncate capitalize">{cart.Product!.name}</span>
          <div className="flex items-center gap-5">
            <Button
              variant="outline"
              className="rounded-full"
              size="icon"
              onClick={() => handleDecrease(cart)}
            >
              <MinusCircle />
            </Button>
            <div className="rounded-md border py-2 px-5">{cart.quantity}</div>
            <Button
              variant="outline"
              className="rounded-full"
              size="icon"
              onClick={() => handleIncrease(cart)}
            >
              <PlusCircle />
            </Button>
          </div>
          <div className="border px-5 py-3 mt-5">
            {toCurrency({ amount: cart.price })} x {cart.quantity} ={" "}
            {toCurrency({ amount: cart.price * cart.quantity })}
          </div>
        </div>
      </div>
    </div>
  );
};
