import { useState, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  district: string;
}

export default function useWeather() {
  const [districts, setDistricts] = useState<string[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDistricts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/api/v1/weather");
      if (response.data.success) {
        setDistricts(response.data.data || []);
      }
    } catch (err: any) {
      setError("Failed to load districts");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchWeatherData = useCallback(async (district: string) => {
    if (!district) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/api/v1/weather/${district}`);
      if (response.data.success) {
        setWeather(response.data.data);
      }
    } catch (err: any) {
      setError(`Failed to load weather for ${district}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    districts: districts || [],
    weather,
    isLoading,
    error,
    fetchDistricts,
    fetchWeatherData,
  };
}
