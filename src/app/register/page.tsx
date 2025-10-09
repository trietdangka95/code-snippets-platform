"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useToast } from "@/hooks/useToast";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import authService from "@/services/auth";
interface Inputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const RegisterPage = () => {
  const router = useRouter();
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<Inputs>({
    resolver: yupResolver(
      yup.object({
        email: yup
          .string()
          .email("Invalid email")
          .required("Email is required"),
        password: yup.string().required("Password is required"),
        name: yup.string().required("Name is required"),
        confirmPassword: yup
          .string()
          .required("Confirm Password is required")
          .oneOf([yup.ref("password"), ""], "Passwords must match"),
      })
    ),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: Inputs) => {
    const res = await authService.register(
      data.email,
      data.password,
      data.name
    );
    if (res.id) {
      success("Account created successfully");
      router.push("/login");
    } else {
      error(res.error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-gray-600 text-sm">Join CodeSnippets today</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <div className="relative">
                  <Input
                    label="Name"
                    placeholder="John Doe"
                    error={errors.name?.message}
                    onClearError={() => clearErrors("name")}
                    className="group-hover:shadow-md transition-all duration-200"
                    type="text"
                    {...field}
                  />
                </div>
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <div className="relative">
                  <Input
                    label="Email"
                    placeholder="you@example.com"
                    error={errors.email?.message}
                    onClearError={() => clearErrors("email")}
                    className="group-hover:shadow-md transition-all duration-200"
                    type="email"
                    {...field}
                  />
                </div>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <div className="relative">
                  <Input
                    label="Password"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    onClearError={() => clearErrors("password")}
                    className="group-hover:shadow-md transition-all duration-200"
                    type="password"
                    {...field}
                  />
                </div>
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <div className="relative">
                  <Input
                    label="Confirm Password"
                    placeholder="••••••••"
                    error={errors.confirmPassword?.message}
                    onClearError={() => clearErrors("confirmPassword")}
                    className="group-hover:shadow-md transition-all duration-200"
                    type="password"
                    {...field}
                  />
                </div>
              )}
            />

            <Button type="submit" variant="primary" className="w-full">
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                {loading ? "Creating..." : "Create Account"}
              </span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
