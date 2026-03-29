import { useState } from "react";
import { useForm, type SubmitHandler, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";

// Validation schema for registration
const signupSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().optional(),
  role: yup.string().oneOf(["FARMER", "ADVISOR", "ADMIN"], "Invalid role").required("Role is required"),
  district: yup.string().required("District is required"),
  districtOther: yup.string().when("district", {
    is: "Other",
    then: (schema) => schema.required("Please specify your district"),
    otherwise: (schema) => schema.optional(),
  }),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  
  // Farmer specific
  landSizeHectares: yup
    .number()
    .transform((value) => (isNaN(value) || value === null || value === undefined) ? undefined : value)
    .nullable()
    .when("role", {
      is: "FARMER",
      then: (schema) => schema.required("Land size is required").min(0, "Cannot be negative"),
      otherwise: (schema) => schema.optional(),
    }),
  crops: yup.array().of(yup.string()).when("role", {
    is: "FARMER",
    then: (schema) => schema.min(1, "At least one crop is required").required("At least one crop is required"),
    otherwise: (schema) => schema.optional(),
  }),
  cropsOther: yup.string().optional(),

  // Advisor specific
  specialization: yup.string().when("role", {
    is: "ADVISOR",
    then: (schema) => schema.required("Specialization is required"),
    otherwise: (schema) => schema.optional(),
  }),
  certificationNumber: yup.string().when("role", {
    is: "ADVISOR",
    then: (schema) => schema.required("Certification number is required"),
    otherwise: (schema) => schema.optional(),
  }),
});

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: "FARMER" | "ADVISOR" | "ADMIN";
  district: string;
  districtOther?: string;
  password: string;
  confirmPassword: string;
  landSizeHectares?: number | null;
  crops?: string[];
  cropsOther?: string;
  specialization?: string;
  certificationNumber?: string;
}

export default function useSignup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema) as any,
    defaultValues: {
      role: "FARMER",
      crops: [],
      specialization: "",
      certificationNumber: "",
    }
  });

  const selectedRole = useWatch({ control, name: "role" });
  const selectedDistrict = useWatch({ control, name: "district" });
  const selectedCrops = useWatch({ control, name: "crops" });

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const { 
        confirmPassword, 
        district, 
        districtOther, 
        crops, 
        cropsOther, 
        ...rest 
      } = data;
      
      // Handle "Other" District
      const finalDistrict = district === "Other" ? districtOther : district;

      // Handle Crops
      let finalCrops: string[] = [];
      if (rest.role === "FARMER" && Array.isArray(crops)) {
        finalCrops = [...crops].filter(c => c !== "Other");
        if (crops.includes("Other") && cropsOther) {
           finalCrops.push(cropsOther);
        }
      }

      const payload = {
        ...rest,
        district: finalDistrict,
        crops: finalCrops,
      };

      const response = await axiosInstance.post("/auth/register", payload);
      
      const { success, message } = response.data;

      if (success === false) {
        throw new Error(message || "Registration failed");
      }

      toast.success(message || "Account created! Please login.");
      navigate("/login");
      reset();
    } catch (err: any) {
      const errorMessage = 
        err.response?.data?.message || 
        err.message || 
        "An error occurred during registration.";
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    error,
    selectedRole,
    selectedDistrict,
    selectedCrops,
  };
}
