"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/store";
import { loginUser, signupUser } from "@/src/store/slices/authSlice";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { loading, isUserAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const formSchema = authFormSchema(type);
  //   for form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
    },
  });

  // for submitting form
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      if (type === "sign-up") {
        const payload = {
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email,
          password: data.password,
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          postalCode: data.postalCode || "",
          dateOfBirth: data.dateOfBirth || "",
          ssn: data.ssn || "",
        };
        await dispatch(signupUser(payload));
        router.push("/sign-in");
      }
      if (type === "sign-in") {
        await dispatch(
          loginUser({ email: data.email, password: data.password })
        );
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Radiant logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Radiant
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {isUserAuthenticated
              ? "Link Account"
              : type === "sign-in"
              ? "Sign In"
              : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {isUserAuthenticated
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {isUserAuthenticated ? (
        <div className="flex flex-col gap-4">{/* {plaid link } */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name={"firstName"}
                      label={"First Name"}
                      placeholder={"Example: aman"}
                    />
                    <CustomInput
                      control={form.control}
                      name={"lastName"}
                      label={"Last Name"}
                      placeholder={"Example: bansal"}
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name={"address"}
                    label={"Address"}
                    placeholder={"Enter your address"}
                  />
                  <CustomInput
                    control={form.control}
                    name={"city"}
                    label={"City"}
                    placeholder={"Example: Ahmedabad"}
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name={"state"}
                      label={"State"}
                      placeholder={"Example: GUJARAT"}
                    />

                    <CustomInput
                      control={form.control}
                      name={"postalCode"}
                      label={"Postal Code"}
                      placeholder={"Example: 380001"}
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name={"dateOfBirth"}
                      label={"Date Of Birth"}
                      placeholder={"DD-MM-YYYY"}
                    />
                    <CustomInput
                      control={form.control}
                      name={"ssn"}
                      label={"SSN"}
                      placeholder={"Ex: 1234"}
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                name={"email"}
                label={"Email"}
                placeholder={"Enter your email"}
              />
              <CustomInput
                control={form.control}
                name={"password"}
                label={"Password"}
                placeholder={"Enter your password"}
              />
              <div className="flex flex-col gap-4">
                <Button className="form-btn" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp;Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
