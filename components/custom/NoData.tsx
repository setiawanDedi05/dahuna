import { Box } from "lucide-react";
import React from "react";

export default function NoData() {
  return (
    <div className="flex justify-center items-center w-full h-[400px] border-muted border-dashed border-2 gap-5 text-muted-foreground">
      <Box size={32} /> <span className="text-xl">Tidak Ada data</span>
    </div>
  );
}
