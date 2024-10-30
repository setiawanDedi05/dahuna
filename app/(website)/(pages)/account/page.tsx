import { SignOutButton, UserButton } from "@clerk/nextjs";
import React from "react";

export default function page() {
  return (
    <div>
      Account
      <UserButton />
      <SignOutButton />
    </div>
  );
}
