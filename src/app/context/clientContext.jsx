"use client";
import { createContext, useEffect, useState } from "react";

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [Client, setClient] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/api/CLIENTS/world`);
        const data = await response.json();
        setClient(data);
      } catch (error) {
        console.error("Error fetching Client data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [baseUrl]);

  return (
    <ClientContext.Provider value={{ Client, loading }}>
      {children}
    </ClientContext.Provider>
  );
};
