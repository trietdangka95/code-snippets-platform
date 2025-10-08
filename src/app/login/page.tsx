"use client";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const handleNavigateToHome = () => {
    router.push("/");
  };
  const loginWithGoogle = () => {
    console.log("TODO login with google");
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="border rounded-2xl bg-white/70 backdrop-blur shadow-sm">
          <div className="px-6 pt-6 pb-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Sign in to your account
            </p>
          </div>
          <div className="px-6 pb-6">
            <form className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm mb-1">Password</label>
                  <Link
                    href="/forgot"
                    className="text-xs text-gray-600 hover:text-black"
                  >
                    Forgot?
                  </Link>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                  />
                  Remember me
                </label>
              </div>

              <Button
                type="button"
                variant="primary"
                className="w-full"
                onClick={handleNavigateToHome}
              >
                Sign in
              </Button>
            </form>
            <div className="mt-6">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={loginWithGoogle}
              >
                Continue with Google
              </Button>
            </div>
            <p className="text-sm text-gray-600 text-center mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
