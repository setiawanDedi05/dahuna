import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <div className="absolute top-10 left-10 flex items-center gap-4">
        <Button variant="nostyle" className="text-2xl group-hover:text-primary gap-8"><MoveLeft size={40} className="group-hover:text-primary duration-100 ease-linear group-hover:translate-x-0" />Go Back</Button>
      </div>
      <div className="flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
