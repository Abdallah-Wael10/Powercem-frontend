"use client";
import { createContext, useEffect, useState } from "react";

export const SliderContext = createContext();

export const SliderProvider = ({ children }) => {
  const [slider, setSlider] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/api/sliders`);
        const data = await response.json();
        setSlider(data);
      } catch (error) {
        console.error("Error fetching slider data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderData();
  }, [baseUrl]);

  return (
    <SliderContext.Provider value={{ slider, loading }}>
      {children}
    </SliderContext.Provider>
  );
};
