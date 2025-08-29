import { SignIn } from "@clerk/clerk-react";

export const SignInPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden ">
      <img
        src="/img/bg.png"
        alt=""
        className="absolute w-full h-full object-cover opacity-20"
      />

      <SignIn path="/sign-in" />
    </div>
  );
};