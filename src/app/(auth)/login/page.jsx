'use client';

import Logo from "@/Components/Share/Logo";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaSignInAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {

  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

   const {data, error} = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
      rememberMe: true,
    })
 console.log(error, data)
    if (data) {
      toast.success("Welcome back");
      router.push("/");
    } else {
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/50 border border-default-200 shadow-xl rounded-3xl p-8">

        {/* HEADER */}
        <div className="text-center mb-6">

          <div className="flex justify-center mb-3">
           <Logo/>
          </div>

          <h1 className="text-xl md:text-3xl font-bold">
            Welcome Back
          </h1>

        </div>

        {/* FORM */}
        <Form onSubmit={onSubmit} className="flex flex-col gap-2">

          {/* EMAIL */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input
              placeholder="john@example.com"
              variant="bordered"
            />
            <FieldError />
          </TextField>

          {/* PASSWORD */}
          <TextField
            isRequired
            name="password"
            validate={(value) => {
              if (!value) return "Password is required";
              if (value.length < 8) return "Min 8 characters";
              return null;
            }}
          >
            <Label>Password</Label>

            <InputGroup>

              <InputGroup.Input
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
              />

              <InputGroup.Suffix>

                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? <BsEye /> : <BsEyeSlash />}
                </Button>

              </InputGroup.Suffix>

            </InputGroup>

            <FieldError />
          </TextField>

          {/* BUTTONS */}
          <div className=" pt-2">

            <Button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-[#ff7a5c] via-[#e56fb0] to-[#8a6bff]  font-semibold"
            >
              <FaSignInAlt />
              Login
            </Button>

          </div>

        </Form>

        {/* DIVIDER */}
        <div className="flex items-center my-6">

          <div className="flex-grow border-t border-default-200"></div>

          <span className="mx-4 text-sm text-default-400">
            OR
          </span>

          <div className="flex-grow border-t border-default-200"></div>

        </div>

        {/* GOOGLE LOGIN */}
        <Button
          onClick={handleGoogleSignIn}
          variant="bordered"
          className="w-full"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </Button>

        {/* FOOTER */}
        <p className="text-center text-sm text-default-500 mt-4">
          Don’t have an account?{" "}
          <Link href="/signup" className="  inline-block bg-gradient-to-r from-[#FF512F] via-[#DD2475] to-[#7B2FF7] bg-clip-text text-transparent font-medium">
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;