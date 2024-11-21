import NoData from "@/components/custom/NoData";
import React from "react";
import HistoryCard from "./historyCard";

export default function HistoryList({ histories }: { histories: any[] }) {
  if (!histories.length) {
    return <NoData />;
  }
  return (
    <div className="flex flex-col gap-5">
      {histories.map((history: any) => (
        <HistoryCard key={history.id} history={history} />
      ))}
    </div>
  );
}
