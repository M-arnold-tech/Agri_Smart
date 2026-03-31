import { useState, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";

export interface MarketPrice {
  id: string;
  crop: string;
  price: number;
  unit: string;
  district: string;
  updatedAt: string;
}

export default function useMarketPrices() {
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/api/v1/market-prices");
      if (response.data.success) {
        setPrices(response.data.data || []);
      }
    } catch (err: any) {
      setError("Failed to load market prices");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const upsertPrice = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/api/v1/market-prices", data);
      return response.data.success;
    } catch (err: any) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    prices: prices || [],
    isLoading,
    error,
    fetchPrices,
    upsertPrice
  };
}
