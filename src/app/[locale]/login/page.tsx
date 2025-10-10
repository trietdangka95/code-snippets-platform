"use client";
import Button from "@/components/ui/Button";
import authService from "@/services/auth";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Contrail_One } from "next/font/google";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

const LoginPage = () => {
  interface Inputs {
    email: string;
    password: string;
  }
  const schema = yup
    .object({
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup.string().required("Password is required"),
    })
    .required();
  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("login");

  const switchLanguage = (newLocale: string) => {
    // Remove current locale from pathname
    const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";
    // Navigate to new locale
    router.push(`/${newLocale}${pathnameWithoutLocale}`);
  };

  const onSubmit = async (data: Inputs) => {
    const res = await authService.login(data.email, data.password);
    if (res.id) {
      router.push(`/${locale}/home`);
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
              {t("welcomeBack")}
            </h1>
            <p className="text-gray-600 text-sm">{t("signInToContinue")}</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <div className="relative">
                  <Input
                    label={t("emailAddress")}
                    placeholder={t("emailPlaceholder")}
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
                    label={t("password")}
                    placeholder={t("passwordPlaceholder")}
                    error={errors.password?.message}
                    onClearError={() => clearErrors("password")}
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
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                {t("signIn")}
              </span>
            </Button>
          </form>
          {/* style create account link */}
          <div className="flex justify-center mb-2 mt-4">
            <Link
              href={`/${locale}/register`}
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
            >
              {t("createAccount")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
