import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Sprout, ChevronDown, Check } from "lucide-react";
import { RWANDA_DISTRICTS } from "../../constants/locations";

import useSignup from "../../hooks/useSignup";

const COMMON_CROPS = [
  "Maize",
  "Beans",
  "Irish Potatoes",
  "Rice",
  "Cassava",
  "Coffee",
  "Tea",
  "Other",
];

export const Register: React.FC = () => {
  const { 
    register, 
    handleSubmit, 
    onSubmit, 
    errors, 
    isLoading,
    selectedRole,
    selectedDistrict,
    selectedCrops
  } = useSignup();

  return (
    <div className="flex min-h-screen bg-background font-sans">
      {/* Left Column: Visuals & Branding */}
      <div className="hidden lg:flex flex-1 bg-primary relative overflow-hidden items-center justify-center p-16">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white blur-[120px]"></div>
          <div className="absolute bottom-10 right-10 w-[30%] h-[30%] rounded-full bg-secondary blur-[100px]"></div>
        </div>
        
        <div className="relative z-10 max-w-lg">
          <Link to="/" className="flex items-center gap-3 mb-10 no-underline">
            <div className="bg-white p-2 rounded-md shadow-lg">
              <Sprout size={32} className="text-primary" />
            </div>
            <span className="text-3xl font-black text-white tracking-tighter italic">Agri_Smart</span>
          </Link>
          
          <h1 className="text-5xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
            Empower Your Farm with <span className="text-secondary italic">Digital Intelligence.</span>
          </h1>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-sm backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
              <div className="bg-secondary/20 p-2 rounded-full">
                <Check size={24} className="text-white" />
              </div>
              <p className="text-sm text-white font-medium">Over 5,000 active Farmers across Rwanda</p>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-sm backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
              <div className="bg-secondary/20 p-2 rounded-full">
                <Check size={24} className="text-white" />
              </div>
              <p className="text-sm text-white font-medium">200+ Certified Agricultural Experts</p>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-sm backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
              <div className="bg-secondary/20 p-2 rounded-full">
                <Check size={24} className="text-white" />
              </div>
              <p className="text-sm text-white font-medium">Yield improvements of up to 40%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Register Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-y-auto">
        {/* Mobile Logo */}
        <div className="absolute top-8 left-8 lg:hidden">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary-dark">
            <Sprout size={28} className="text-primary" />
            <span>Agri_Smart</span>
          </Link>
        </div>

        <div className="w-full max-w-[550px] animate-fade-in py-12">
          <div className="mb-10 lg:text-left text-center">
            <h2 className="text-4xl font-bold text-text-main mb-3 tracking-tight">Create Account</h2>
            <p className="text-text-muted text-lg">Join Rwanda's digital agricultural transformation</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                placeholder="Jean"
                error={errors.firstName?.message}
                {...register("firstName")}
              />
              <Input
                label="Last Name"
                type="text"
                placeholder="Rukundo"
                error={errors.lastName?.message}
                {...register("lastName")}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="farmer@example.com"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+250 788 000 000"
                error={errors.phone?.message}
                {...register("phone")}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-xs font-medium text-text-main uppercase tracking-widest opacity-80">District</label>
                <div className="relative">
                  <select
                    className={`w-full px-4 py-3 bg-surface border rounded-md text-sm text-text-main transition-all outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 appearance-none cursor-pointer ${
                      errors.district ? "border-red-500" : "border-gray-200"
                    }`}
                    {...register("district")}
                  >
                    <option value="">Select District</option>
                    {RWANDA_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={18} />
                </div>
                {errors.district && <span className="text-[10px] font-bold text-red-500 uppercase">{errors.district.message}</span>}
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label className="text-xs font-medium text-text-main uppercase tracking-widest opacity-80">I am a...</label>
                <div className="relative">
                  <select
                    className={`w-full px-4 py-3 bg-surface border rounded-md text-sm text-text-main transition-all outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 appearance-none cursor-pointer ${
                      errors.role ? "border-red-500" : "border-gray-200"
                    }`}
                    {...register("role")}
                  >
                    <option value="FARMER">Farmer (Looking for advice)</option>
                    <option value="ADVISOR">Agricultural Advisor (Certified)</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                    size={18}
                  />
                </div>
              </div>
            </div>

            {/* Conditional Other District */}
            {selectedDistrict === "Other" && (
              <Input
                label="Specify District"
                type="text"
                placeholder="Enter your district"
                error={errors.districtOther?.message}
                {...register("districtOther")}
              />
            )}

            {/* Farmer Specific Fields */}
            {selectedRole === "FARMER" && (
              <div className="flex flex-col gap-4 animate-slide-up p-5 bg-primary/5 rounded-md border border-primary/10">
                <h3 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                   <Sprout size={16} /> Farm Details
                </h3>
                <Input
                  label="Land Size (Hectares)"
                  type="number"
                  step="0.1"
                  placeholder="2.5"
                  error={errors.landSizeHectares?.message}
                  {...register("landSizeHectares")}
                />
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-xs font-medium text-text-main uppercase tracking-widest opacity-80">Common Crops</label>
                  <div className="grid grid-cols-2 gap-2">
                    {COMMON_CROPS.map((crop) => (
                      <label key={crop} className="flex items-center gap-3 p-3 rounded-md border border-gray-100 bg-white hover:border-primary/30 transition-all cursor-pointer group">
                        <input
                          type="checkbox"
                          value={crop}
                          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                          {...register("crops")}
                        />
                        <span className="text-sm text-text-main group-hover:text-primary transition-colors">{crop}</span>
                      </label>
                    ))}
                  </div>
                  {errors.crops && <span className="text-[10px] font-bold text-red-500 uppercase">{errors.crops.message}</span>}
                </div>
                {selectedCrops?.includes("Other") && (
                   <Input
                    label="Specify Other Crops"
                    type="text"
                    placeholder="Enter crops (comma separated)"
                    error={errors.cropsOther?.message}
                    {...register("cropsOther")}
                  />
                )}
              </div>
            )}

            {/* Advisor Specific Fields */}
            {selectedRole === "ADVISOR" && (
              <div className="flex flex-col gap-4 animate-slide-up p-5 bg-secondary/5 rounded-md border border-secondary/10">
                <h3 className="text-sm font-bold text-secondary uppercase tracking-wider flex items-center gap-2">
                   Professional Details
                </h3>
                <Input
                  label="Area of Specialization"
                  type="text"
                  placeholder="e.g. Soil Science, Crop Protection"
                  error={errors.specialization?.message}
                  {...register("specialization")}
                />
                <Input
                  label="Certification Number"
                  type="text"
                  placeholder="MINAGRI-2024-XXX"
                  error={errors.certificationNumber?.message}
                  {...register("certificationNumber")}
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Password"
                type="password"
                placeholder="Min 8 characters"
                error={errors.password?.message}
                {...register("password")}
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Repeat password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />
            </div>

            <Button type="submit" size="lg" fullWidth disabled={isLoading}>
              {isLoading ? "Creating account..." : "Start Your Journey"}
            </Button>
          </form>


          <div className="mt-10 text-center">
            <p className="text-sm text-text-muted">
              Already have an account? 
              <Link
                to="/login"
                className="text-primary font-bold hover:underline ml-2"
              >
                Sign In Instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
