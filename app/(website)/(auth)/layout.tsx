import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2">{children}</div>
  );
}
