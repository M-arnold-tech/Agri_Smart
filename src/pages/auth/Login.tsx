import React from "react";
import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Sprout } from "lucide-react";

import useAuth from "../../hooks/useAuth";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export const Login: React.FC = () => {
  const { login, isLoading } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    await login(data);
  };

  return (
    <div className="flex min-h-screen bg-background font-sans">
      {/* Left Column: Visuals & Branding */}
      <div className="hidden lg:flex flex-1 items-center justify-start bg-primary-dark relative overflow-hidden p-16">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-sm bg-white blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-sm bg-secondary blur-[150px]"></div>
        </div>

        <div className="relative z-10 max-w-lg">
          <Link to="/" className="flex items-center gap-3 mb-12 no-underline">
            <div className="bg-white p-2 rounded-xl ">
              <Sprout size={32} className="text-primary" />
            </div>
            <span className="text-3xl font-semibold text-white tracking-tighter italic">
              Agri_Smart
            </span>
          </Link>

          <h1 className="text-5xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
            Connect with Rwanda's Best{" "}
            <span className="text-secondary italic">Agricultural Experts.</span>
          </h1>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-white/10 p-1.5 rounded-sm">
                <div className="w-1.5 h-1.5 bg-secondary rounded-sm"></div>
              </div>
              <p className=" text-white/80 leading-relaxed font-light">
                Access real-time crop calendars tailored to your specific region
                and soil type.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-white/10 p-1.5 rounded-sm">
                <div className="w-1.5 h-1.5 bg-secondary rounded-sm"></div>
              </div>
              <p className=" text-white/80 leading-relaxed font-light">
                Direct chat with certified advisors to solve pests and
                irrigation issues instantly.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-white/10 p-1.5 rounded-sm">
                <div className="w-1.5 h-1.5 bg-secondary rounded-sm"></div>
              </div>
              <p className=" text-white/80 leading-relaxed font-light">
                Stay ahead with localized weather alerts and optimized harvest
                timing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Mobile Logo */}
        <div className="absolute top-8 left-8 lg:hidden">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl text-primary-dark"
          >
            <Sprout size={28} className="text-primary" />
            <span>Agri_Smart</span>
          </Link>
        </div>
        <div className="w-full max-w-[420px] animate-fade-in">
          <div className="mb-10 lg:text-left text-center">
            <h2 className="text-4xl font-bold text-text-main mb-3 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-text-muted text-xs ">
              Login to continue your growth journey
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-full"
          >
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. farmer@musanze.com"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
            />

            <Button type="submit" size="lg" fullWidth disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In to Dashboard"}
            </Button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-xs text-text-muted">
              Don't have an account yet?
              <Link
                to="/register"
                className="text-primary font-bold hover:underline ml-2"
              >
                Join Agrismart Today
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
