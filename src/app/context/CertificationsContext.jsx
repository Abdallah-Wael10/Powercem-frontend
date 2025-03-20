"use client";
import { createContext, useEffect, useState } from "react";

export const CertificationsContext = createContext();

export const CertificationsProvider = ({ children }) => {
  const [Certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/api/Certifications`);
        const data = await response.json();
        setCertifications(data);
      } catch (error) {
        console.error("Error fetching Certifications data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderData();
  }, [baseUrl]);

  return (
    <CertificationsContext.Provider value={{ Certifications, loading }}>
      {children}
    </CertificationsContext.Provider>
  );
};
