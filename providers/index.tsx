"use client";

import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
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
        <TooltipProvider>
          <ReduxProvider store={store}>{children}</ReduxProvider>
        </TooltipProvider>
        <ProgressBar
          height="5px"
          color="#000"
          options={{ showSpinner: false }}
          shallowRouting
          disableAnchorClick
        />
      </ClerkProvider>
    </div>
  );
};

export default Providers;
