import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../api/axiosInstance";

// Define the shape of our JWT token
interface JwtPayload {
  role?: "ADMIN" | "ADVISOR" | "FARMER";
  sub?: string;
  exp?: number;
  [key: string]: any;
}

// Validation schema
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export default function useSignin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      // POST /auth/login based on docs
      const response = await axiosInstance.post("/auth/login", data);
      
      const { success, message, data: responseData } = response.data;

      // Note: Backend docs say success: true/false is always present
      if (success === false) {
        throw new Error(message || "Login failed");
      }

      const { accessToken } = responseData;
      
      if (accessToken) {
        // Save to localStorage
        localStorage.setItem("token", accessToken);

        // Decode token to get user role
        let role: string | undefined;
        try {
          const decoded = jwtDecode<JwtPayload>(accessToken);
          role = decoded.role;
        } catch (e) {
          console.error("Failed to decode token:", e);
        }

        toast.success(message || "Welcome to Agri_Smart!");

        // Redirect based on role
        if (role === "ADMIN") {
          navigate("/admin");
        } else if (role === "ADVISOR") {
          navigate("/advisor");
        } else if (role === "FARMER") {
          navigate("/farmer");
        } else {
          navigate("/");
        }
      } else {
        toast.error("No access token received.");
      }

      reset();
    } catch (err: any) {
      const errorMessage = 
        err.response?.data?.message || 
        err.message || 
        "An error occurred during login.";
      
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
  };
}