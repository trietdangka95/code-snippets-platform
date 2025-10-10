"use client";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { ChevronDownIcon, PlusIcon } from "@/components/Icons";
import Button from "@/components/ui/Button";
import { useToast } from "@/hooks/useToast";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import authService from "@/services/auth";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { useState } from "react";

interface Inputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const RegisterPage = () => {
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const { success, error } = useToast();

  const switchLanguage = (newLocale: string) => {
    const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";
    router.push(`/${newLocale}${pathnameWithoutLocale}`);
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
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
    try {
      const res = await authService.register(
        data.email,
        data.password,
        data.name
      );
      if (res.id) {
        // Set register success state to hide form
        setIsRegisterSuccess(true);
        success("Account created successfully");

        // Wait a moment to show success message, then redirect
        setTimeout(() => {
          router.push(`/${locale}/login`);
        }, 1500);
      } else {
        error(res.error);
      }
    } catch (err) {
      error(
        typeof err === "string"
          ? err
          : err instanceof Error
          ? err.message
          : "An unknown error occurred"
      );
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center px-6 py-12 relative">
      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-50">
        <div className="relative">
          <select
            value={locale}
            onChange={(e) => switchLanguage(e.target.value)}
            className="appearance-none bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-xl w-full min-w-[120px]"
          >
            <option value="en">English</option>
            <option value="vi">Tiếng Việt</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDownIcon className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mt-6">
        <div className="rounded-2xl p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm">
          {isRegisterSuccess ? (
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-green-600 mb-2">
                  Account Created!
                </h1>
                <p className="text-gray-600 text-sm">
                  Redirecting to login page...
                </p>
              </div>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            </div>
          ) : (
            <>
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
                        placeholder="Enter your name"
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

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    <PlusIcon className="w-5 h-5" />
                    {isSubmitting ? "Creating..." : "Create Account"}
                  </span>
                </Button>
                <div className="flex justify-center mb-2 mt-4">
                  <Link
                    href={`/${locale}/login`}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                  >
                    Already have an account? Sign in
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
