"use client";
import { createContext, useEffect, useState } from "react";

export const EgyClientContext = createContext();

export const EgyClientProvider = ({ children }) => {
  const [egyClient, setegyClient] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchEgyegyClientData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/api/ClientS/egypt`);
        const data = await response.json();
        setegyClient(data);
      } catch (error) {
        console.error("Error fetching egyClient data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEgyegyClientData();
  }, [baseUrl]);

  return (
    <EgyClientContext.Provider value={{ egyClient, loading }}>
      {children}
    </EgyClientContext.Provider>
  );
};
