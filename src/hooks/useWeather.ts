import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

interface WeatherData {
    temp: number;
    condition: string;
    humidity: number;
    recommendations: string[];
    location: string;
}

export default function useWeather(district?: string) {
    const [districts, setDistricts] = useState<string[]>([]);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDistricts = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get("/weather");
            if (response.data.success) {
                setDistricts(response.data.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch districts");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchWeather = async (targetDistrict: string) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(`/weather/${targetDistrict}`);
            if (response.data.success) {
                setWeatherData(response.data.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch weather");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDistricts();
        if (district) {
            fetchWeather(district);
        }
    }, [district]);

    return {
        districts,
        weatherData,
        isLoading,
        error,
        fetchWeather,
        refreshDistricts: fetchDistricts
    };
}
