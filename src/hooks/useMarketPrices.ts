import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-hot-toast";

interface MarketPrice {
    crop: string;
    price: number;
    unit: string;
    trend: "UP" | "DOWN" | "STABLE";
    location: string;
    updatedAt: string;
}

export default function useMarketPrices() {
    const [prices, setPrices] = useState<MarketPrice[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPrices = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get("/market-prices");
            if (response.data.success) {
                setPrices(response.data.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch market prices");
        } finally {
            setIsLoading(false);
        }
    };

    const updatePrice = async (data: Partial<MarketPrice>) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post("/market-prices", data);
            if (response.data.success) {
                toast.success(response.data.message || "Price updated");
                await fetchPrices();
                return true;
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Update failed");
        } finally {
            setIsLoading(false);
        }
        return false;
    };

    useEffect(() => {
        fetchPrices();
    }, []);

    return {
        prices,
        isLoading,
        error,
        updatePrice,
        refreshPrices: fetchPrices
    };
}
