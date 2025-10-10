"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import Button from "@/components/ui/Button";
import { useToast } from "@/hooks/useToast";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import authService from "@/services/auth";
import Link from "next/link";
interface Inputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const RegisterPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);

  const switchLanguage = (newLocale: string) => {
    // Remove current locale from pathname
    const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";
    // Navigate to new locale
    router.push(`/${newLocale}${pathnameWithoutLocale}`);
  };

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
      router.push(`/${locale}/login`);
    } else {
      error(res.error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center px-6 py-12 relative">
      {/* Language Switcher */}
      <div className="absolute top-6 right-6">
        <div className="relative">
          <select
            value={locale}
            onChange={(e) => switchLanguage(e.target.value)}
            className="appearance-none bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg w-full"
          >
            <option value="en">English</option>
            <option value="vi">Tiếng Việt</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

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

            <Button
              type="submit"
              variant="primary"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
            >
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
            <div className="flex justify-center mb-2 mt-4">
              <Link
                href={`/${locale}/login`}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
