import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <>
    <div className="hidden md:flex bg-cover bg-center bg-[url('/assets/images/image-4.jpg')]" />
    <div className="flex justify-center items-center">
      <SignIn />
    </div>
  </>;
}
