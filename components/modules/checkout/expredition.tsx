import { Button } from "@/components/ui/button";
import { ChevronRight, Truck, X } from "lucide-react";
import React, { useState } from "react";
import ExpeditionListComponent from "./expeditionList";
import { Address, CostExpedition } from "@/@types";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { toCurrency } from "@/components/custom/Currency";

export default function ExpeditionComponent({
  data,
  expedition,
  setExpedition,
}: {
  data: Address | undefined;
  expedition: CostExpedition | undefined;
  setExpedition: (value: CostExpedition) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="w-4/5 border-t-4 bg-primary-foreground rounded-md shadow-md px-5 py-3">
      <div className="flex items-center gap-x-3">
        <Truck size={32} /> <span className="font-bold">Expedition</span>
      </div>
      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <Drawer open={open}>
          <DrawerTrigger asChild onClick={() => setOpen(true)}>
            <Button
              variant="outline"
              className="h-[80px] shadow-sm rounded-md border cursor-pointer p-3"
            >
              <span className="font-bold">Expedition Provider</span>
              <ChevronRight className="ml-auto" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="w-full lg:w-[50%] lg:mx-auto">
            <DrawerHeader>
              <DrawerTitle>
                {!expedition ? "Pilih Expedisi" : "Ubah Expedisi"}
              </DrawerTitle>
              <DrawerDescription>
                {data && (
                  <ExpeditionListComponent
                    data={data}
                    setExpedition={setExpedition}
                    expedition={expedition}
                    setOpen={setOpen}
                  />
                )}
              </DrawerDescription>
              <DrawerFooter>
                <DrawerClose>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
        {expedition && (
          <div className="h-[80px] w-full flex items-start justify-start border-dashed border-2 p-3 border-primary">
            <div className="flex flex-col items-start">
              <span className="text-xl font-bold">{expedition.name}</span>
              <span className="text-muted-foreground">{expedition.type}</span>
            </div>
            <div className="ml-auto flex flex-col items-end">
              <span className="text-2xl font-bold">
                {toCurrency({ amount: Number(expedition.price) })}
              </span>
              <span>Estimasi {expedition.estimated}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
