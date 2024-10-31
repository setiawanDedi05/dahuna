import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

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
        afterSignInUrl="/dashboard"
        signInFallbackRedirectUrl="/sign-in"
        signUpFallbackRedirectUrl="/"
      >
        {children}
      </ClerkProvider>
    </div>
  );
};

export default Providers;
