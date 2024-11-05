import React from "react";

export const Heading = ({ title }: { title: string }) => {
  return (
    <div className="flex w-full relative">
      <h3 className="after:w-[80px] after:h-[5px] after:bg-primary pb-2 after:absolute  after:left-0 after:bottom-0 text-3xl font-extrabold">
        {title}
      </h3>
    </div>
  );
};
