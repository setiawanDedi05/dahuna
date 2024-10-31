import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="hidden md:flex bg-cover bg-center bg-[url('/assets/images/image-5.jpg')]" />
      <div className="flex justify-center items-center">
        <SignUp />
      </div>
    </>
  );
}
