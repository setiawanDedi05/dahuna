import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ClerkProvider appearance={{
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "blockButton",
        } 
      }}
      afterSignOutUrl="/sign-in"
      afterSignInUrl="/dashboard"
      signInFallbackRedirectUrl="/sign-in"
      signUpFallbackRedirectUrl="/"
      >{children}</ClerkProvider>
    </div>
  );
};

export default Providers;
