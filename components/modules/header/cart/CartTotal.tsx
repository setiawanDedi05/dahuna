import { toCurrency } from "@/components/custom/Currency";

export const Total = ({
  total,
  totalAmount,
}: {
  total: number;
  totalAmount: number;
}) => {
  return (
    <div className="flex flex-col mt-10">
      <div className="flex justify-between">
        <span>Total Item</span>
        <span>{total}</span>
      </div>
      <div className="border-t-2 flex justify-end my-5 py-3 px-5">
        <span className="text-right text-2xl font-bold">
          {toCurrency({ amount: totalAmount })}
        </span>
      </div>
    </div>
  );
};
