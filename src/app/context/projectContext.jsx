"use client";
import { createContext, useEffect, useState } from "react";

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [Projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/api/projects`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching Projects data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [baseUrl]);

  return (
    <ProjectsContext.Provider value={{ Projects, loading }}>
      {children}
    </ProjectsContext.Provider>
  );
};
