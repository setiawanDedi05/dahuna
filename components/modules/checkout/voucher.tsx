"use client";

import { checkVoucher } from "@/actions/checkVoucher";
import { toCurrency } from "@/components/custom/Currency";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setVoucher } from "@/redux/reducer/orderSlice";
import { RootState } from "@/redux/store";
import { Voucher } from "@prisma/client";
import { Loader, TicketMinus } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function VoucherComponent() {
  const dispatch = useDispatch();
  const [code, setCode] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { voucher } = useSelector((state: RootState) => state.order);

  const onClickHandler = async () => {
    try {
      setLoading(true);
      const result = (await checkVoucher(code as string)) as Voucher | null;
      if (result) {
        toast.success("Voucher berhasil di gunakan");
        dispatch(setVoucher(result));
        return;
      }
      toast.error("voucher tidak di temukan");
    } catch (error) {
      toast.error("Error Hubungi Customer Service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-4/5 border-t-4 bg-primary-foreground rounded-md shadow-md px-5 py-3">
      <div className="flex items-center gap-x-3">
        <TicketMinus size={32} />{" "}
        <span className="font-bold">Do you Have Voucher?</span>
      </div>
      <div className="flex py-5 gap-3 items-end">
        <div className="flex w-full flex-col gap-y-3">
          <Label>Code</Label>
          <Input
            name="code"
            placeholder="EXAMPLE001"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          disabled={!Boolean(code) || loading}
          onClick={onClickHandler}
        >
          {loading ? <Loader className="animate-spin" /> : "Use"}
        </Button>
      </div>
      {voucher && (
        <div className="border-2 border-dashed border-green-500/60 rounded-md py-5 px-3 flex justify-between">
          <span className="text-xl">{voucher.code}</span>
          <span className="ml-auto text-2xl">
            {toCurrency({ amount: voucher.amount })}
          </span>
        </div>
      )}
    </div>
  );
}
