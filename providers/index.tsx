"use client";

import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: "/assets/images/logo.png",
            socialButtonsPlacement: "bottom",
            socialButtonsVariant: "blockButton",
            logoPlacement: "inside",
            shimmer: true,
          },
        }}
        afterSignOutUrl="/sign-in"
        dynamic
      >
        <TooltipProvider>{children}</TooltipProvider>
        <ProgressBar
          height="10px"
          color="#000"
          options={{ showSpinner: true }}
          shallowRouting
          disableAnchorClick
        />
      </ClerkProvider>
    </div>
  );
};

export default Providers;
