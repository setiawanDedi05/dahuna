"use client";

import { Button } from "@/components/ui/button";
import { Map, MapPin, Pen, Trash2 } from "lucide-react";
import AddressList from "./addressList";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setNote, toggleDropship } from "@/redux/reducer/orderSlice";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import AddAddressDialog from "./addAddressDialog";
import { useState } from "react";

export default function AddressComponent() {
  const {
    selectedAddress: address,
    note,
    noTelpDropship,
    nameDropship,
    isDropship,
  } = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch();
  const [isSave, setIsSave] = useState<boolean>(false);

  return (
    <div className="w-4/5 border-t-4 border-t-primary bg-primary-foreground rounded-md border-dashed shadow-md px-5 py-3">
      <div className="flex items-baseline gap-x-3">
        <MapPin size={32} /> <span className="font-bold">Delivery Address</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[90%_10%] gap-y-5 items-center gap-3">
        {address ? (
          <div className="border-2 border-dashed border-muted py-5 px-3">
            <div className="flex flex-col">
              <span>{address.name}</span>
              <span className="text-muted-foreground">{address.noTelp}</span>
              <p>{`${address.detail}, ${address.kelurahan}, ${address.kecamatan}, ${address.kota}, ${address.provinsi}, ${address.kodePos}`}</p>
            </div>
          </div>
        ) : (
          <div className="border-2 flex border-dashed border-muted py-5 px-3 justify-center items-center">
            <Map /> Tidak ada Alamat terdaftar
          </div>
        )}
        <Drawer>
          <DrawerTrigger asChild>
            <Button>{address ? "Ubah" : "Pilih"}</Button>
          </DrawerTrigger>
          <DrawerContent className="w-full lg:w-[50%] lg:mx-auto p-5">
            <DrawerTitle>Alamat Tersimpan</DrawerTitle>
            <DrawerDescription>
              Pilih Alamat sebagai Alamat Penerima Pesanan
            </DrawerDescription>
            <AddressList />
            <AddAddressDialog />
          </DrawerContent>
        </Drawer>
      </div>
      <div className="flex flex-col p-3">
        <div className="flex py-5 gap-3 items-end">
          <div className="flex w-full flex-col gap-y-3">
            <Label>Catatan</Label>
            <Input
              value={note}
              onChange={(e) => dispatch(setNote(e.target.value))}
              placeholder="Belakang SD"
            />
          </div>
        </div>
      </div>
      <div className="flex my-5 gap-3 items-baseline border-t-2 border-secondary py-5">
        <Checkbox
          defaultChecked={isDropship}
          onCheckedChange={(value: boolean) => dispatch(toggleDropship())}
        />{" "}
        <span>Kirim Sebagai Dropshipper</span>
      </div>
      {isDropship && (
        <div className="flex gap-5 items-end">
          <div className="flex flex-col gap-3">
            <Label>Nama</Label>
            <Input
              placeholder="Ikhsan"
              value={nameDropship}
              disabled={isSave}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>No Telp</Label>
            <Input
              placeholder="081********"
              value={noTelpDropship}
              disabled={isSave}
              inputMode="numeric"
            />
          </div>
          <Button disabled={isSave} onClick={() => setIsSave(true)}>
            Simpan
          </Button>{" "}
          {isSave ? (
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setIsSave(false);
              }}
            >
              <Pen />
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
}
