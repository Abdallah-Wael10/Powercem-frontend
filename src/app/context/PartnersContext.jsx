"use client";
import { createContext, useEffect, useState } from "react";

export const partnersContext = createContext();

export const PartnersProvider = ({ children }) => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/api/partners`);
        const data = await response.json();
        setPartners(data);
      } catch (error) {
        console.error("Error fetching partners data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderData();
  }, [baseUrl]);

  return (
    <partnersContext.Provider value={{ partners, loading }}>
      {children}
    </partnersContext.Provider>
  );
};
