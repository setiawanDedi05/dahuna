import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { selectAddress } from "@/redux/reducer/orderSlice";
import { RootState } from "@/redux/store";
import { Map } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AddressList() {
  const dispatch = useDispatch();
  const { addresses, selectedAddress } = useSelector(
    (state: RootState) => state.order
  );

  if (addresses?.length === 0) {
    return (
      <div className="border-2 flex justify-center items-center gap-5 my-3 border-dashed border-muted w-full h-[150px] text-muted-foreground">
        <Map /> Tidak ada Alamat terdaftar
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="flex flex-col my-5 gap-y-3 ">
        {addresses!.map((address) => (
          <DrawerClose key={address.id} asChild>
            <Button
              variant="outline"
              className={cn(
                "border border-dashed p-5 flex flex-col items-start w-full h-[100px] relative",
                selectedAddress?.id === address.id
                  ? "border-green-500/30"
                  : "border-black-500/30"
              )}
              onClick={() => {
                if (selectedAddress?.id !== address.id) {
                  dispatch(selectAddress(address));
                }
              }}
            >
              <span className="font-bold">{address.name}</span>
              <span className="text-muted-foreground">{address.noTelp}</span>
              <p>{`${address.detail}, ${address.kelurahan}, ${address.kecamatan}, ${address.kota}, ${address.provinsi}, ${address.kodePos}`}</p>
              {selectedAddress?.id === address.id ? (
                <div className="bg-primary absolute right-3 top-3 text-primary-foreground p-2 rounded-md">
                  selected
                </div>
              ) : (
                <></>
              )}
            </Button>
          </DrawerClose>
        ))}
      </div>
    </ScrollArea>
  );
}
