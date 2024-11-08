import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@/components/ui/tooltip";

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
        afterSignInUrl="/"
      >
        <TooltipProvider>{children}</TooltipProvider>
      </ClerkProvider>
    </div>
  );
};

export default Providers;
