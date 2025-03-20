"use client";

import { createContext, useEffect, useState } from "react";

export const AboutUsContext = createContext();

export const AboutUsProvider = ({ children }) => {
  const [aboutUsData, setAboutUsData] = useState({}); // Initialize as object if expecting { title: ... }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const API_URL = `${baseUrl}/api/aboutUs`;

  const fetchAboutUsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
      const data = await response.json();
      console.log("Fetched data:", data); // Debug the API response
      setAboutUsData(data); // Set as object or adjust if array
    } catch (error) {
      setError(error.message || "Error fetching AboutUs data");
      console.error("Error fetching AboutUs data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutUsData();
  }, [baseUrl]);

  return (
    <AboutUsContext.Provider
      value={{ aboutUsData, setAboutUsData, loading, error, refreshAboutUs: fetchAboutUsData }}
    >
      {children}
    </AboutUsContext.Provider>
  );
};