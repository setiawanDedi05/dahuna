import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="bg-black/10 z-50 h-screen w-screen flex justify-center items-center">
      <Loader2 className="animate-spin text-white" />
    </div>
  );
}
