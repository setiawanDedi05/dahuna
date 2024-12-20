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
  rollbackDecrement,
  rollbackDelete,
  rollbackIncrement,
  toggleCheckItem,
} from "../../../../redux/reducer/cartSlice";
import { deleteItemCart } from "@/actions/deleteItemCart";
import { decrementItemCart } from "@/actions/decrementItemCart";
import { incrementItemCart } from "@/actions/incrementItemCart";
import { Checkbox } from "@/components/ui/checkbox";
import { changeChecked } from "@/actions/changeChecked";
import { toast } from "sonner";
import { message } from "@/constants/message";

type ProductListItemProps = {
  cart: Cart;
  index: number;
};
/* 
  @params index digunakan sebagai penanda posisi cart yang dihapus, akan di rollback sesuai posisi awal 
*/
export const ProductListItem = ({ cart, index }: ProductListItemProps) => {
  const dispatch = useDispatch();
  const handleDelete = async (item: Cart) => {
    dispatch(deleteItem(item.productId!));
    try {
      dispatch(changeStatus("loading"));
      await deleteItemCart(item.productId!);
    } catch (error) {
      toast.error(message.commonStatus500);
      dispatch(changeStatus("failed"));
      dispatch(rollbackDelete({ item, index }));
    } finally {
      dispatch(changeStatus("idle"));
    }
  };

  const handleDecrease = async (item: Cart) => {
    dispatch(decrementQuantity(item.productId!));
    try {
      dispatch(changeStatus("loading"));
      await decrementItemCart(item.productId!);
    } catch (error) {
      dispatch(changeStatus("failed"));
      toast.error(message.commonStatus500);
      dispatch(rollbackDecrement(item));
    } finally {
      dispatch(changeStatus("idle"));
    }
  };

  const handleIncrease = async (item: Cart) => {
    dispatch(incrementQuantity(item.productId!));
    try {
      dispatch(changeStatus("loading"));
      await incrementItemCart(item.productId!);
    } catch (error) {
      toast.error(message.commonStatus500);
      dispatch(rollbackIncrement(item));
      dispatch(changeStatus("failed"));
    } finally {
      dispatch(changeStatus("idle"));
    }
  };

  const handleToggleCheckItem = async (item: Cart, value: boolean) => {
    dispatch(toggleCheckItem({ productId: item.productId!, value: value }));
    try {
      dispatch(changeStatus("loading"));
      await changeChecked(item.productId!, value);
    } catch (error) {
      dispatch(changeStatus("failed"));
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
