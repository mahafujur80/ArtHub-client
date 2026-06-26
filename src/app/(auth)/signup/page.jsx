'use client';

import Logo from "@/Components/Share/Logo";
import { authClient } from "@/lib/auth-client";
import { UploadImage } from "@/lib/server/UploadImage";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
  Select,
  ListBox
} from "@heroui/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {

  const handleGoogleSignIn = async () => {
  await authClient.signIn.social({
    provider: "google",
  });
};

  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    // PASSWORD MATCH CHECK 
    if (userData.password !== userData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!image || image.size === 0) {
      toast.error("Please select an image");
      return;
    }

    const imageData = await UploadImage(image);
    

    const { data, error } = await authClient.signUp.email({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      image: imageData.url,
      plan: "free",
      role: userData.role,
    });
    console.log(data, error);
    if (data) {
      toast.success("Welcome to ArtHub");
      router.push("/");
    } else {
      toast.error(error?.message || "Sign up failed");
    }
  }


return (
  <div className="min-h-screen  flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-md rounded-3xl border border-default-200 bg-white/50 shadow-xl p-8">
      {/* HEADER */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-3">
          <Logo />
        </div>
        <h1 className="text-xl md:text-3xl font-bold">
          Create Account
        </h1>

      </div>

      {/* FORM */}
      <Form onSubmit={onSubmit} className=" flex flex-col gap-2">
        {/* NAME */}
        <TextField
          isRequired
          name="name"
          validate={(value) =>
            value.length < 3 ? "Name must be at least 3 characters" : null
          }
        >
          <Label>Full Name</Label>
          <Input placeholder="John Doe" variant="bordered" />
          <FieldError />
        </TextField>

        {/* PHOTO */}
        <TextField isRequired>
          <Label>Profile Image</Label>
          <input
            required
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            name="image"
            className="w-full rounded-xl border p-2"
            accept="image/*"
          />
          <FieldError />
        </TextField>

        {/* EMAIL */}
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) =>
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ? "Invalid email"
              : null
          }
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" variant="bordered" />
          <FieldError />
        </TextField>

        {/* role */}
        <Select isRequired name="role" placeholder="Select Your Role">
          <Label>Role</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="buyer" textValue="buyer">
                Buyer
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="artist" textValue="artist">
                Artist
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
        {/* PASSWORD */}
        <TextField
          isRequired
          validate={(value) => {
            if (value.length < 6) return "Min 6 characters";
            if (!/[A-Z]/.test(value)) return "Add uppercase letter";
            if (!/[0-9]/.test(value)) return "Add number";
            return null;
          }}
        >
          <Label>Password</Label>

          <InputGroup>
            <InputGroup.Input
              name="password"
              type={isVisible ? "text" : "password"}
              placeholder="Password"
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

          <Description>Min 6 chars, 1 uppercase, 1 number</Description>
          <FieldError />
        </TextField>


        {/* CONFIRM PASSWORD */}
        <TextField
          isRequired
          validate={(value, formValues) => {
            if (value.length < 6) return "Min 6 characters";

            if (formValues?.password && value !== formValues.password) {
              return "Passwords do not match";
            }
            return null;
          }}
        >
          <Label>Confirm Password</Label>

          <InputGroup>
            <InputGroup.Input
              name="confirmPassword"
              type={isVisible ? "text" : "password"}
              placeholder="Confirm password"
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

        {/* BUTTON */}
        <Button
          type="submit"
          className="w-full text-white bg-orange-500 font-semibold"
        >
          <FaUserPlus />
          Create Account
        </Button>

      </Form>

      {/* divider */}
      <div className="flex items-center my-5">

        <div className="flex-grow border-t border-default-200"></div>

        <span className="mx-4 text-sm text-default-400">
          OR
        </span>

        <div className="flex-grow border-t border-default-200"></div>

      </div>

      <Button
        onClick={handleGoogleSignIn}
        variant="bordered"
        className="w-full"
      >
        <FcGoogle />
        Continue with Google
      </Button>

      {/* FOOTER */}
      <p className="text-center text-sm mt-4">
        Already have account?{" "}
        <Link href="/login" className=" inline-block text-orange-500">
          Login
        </Link>
      </p>

    </div>
  </div>
);
};

export default RegisterPage;