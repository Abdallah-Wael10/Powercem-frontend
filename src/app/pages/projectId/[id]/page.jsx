"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/app/compnant/loading/page";
import Image from "next/image";
import Nav from "@/app/compnant/Nav/page";
import Projectt from "@/app/compnant/project/page";
import { useContext } from "react";
import { ProjectsContext } from "@/app/context/projectContext";
import Footer from "@/app/compnant/footer/page";

const ProjectId = () => {
  const { id } = useParams();
  const { Projects} = useContext(ProjectsContext);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const imageRefs = useRef([]); // Reference for images
  const [visibleImages, setVisibleImages] = useState({}); // Store visibility status

  useEffect(() => {
    if (!id) return;

    const fetchProjectById = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${baseUrl}/api/projects/${id}`);

        if (!response.ok) throw new Error("Failed to fetch project");

        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectById();
  }, [id, baseUrl]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleImages((prev) => ({
              ...prev,
              [entry.target.dataset.index]: true,
            }));
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the image is visible
    );

    imageRefs.current.forEach((img) => img && observer.observe(img));

    return () => {
      imageRefs.current.forEach((img) => img && observer.unobserve(img));
    };
  }, [project]); // Run after project is loaded

  if (loading) return <LoadingSpinner />;
  if (error) return <h1 className="text-red-500">{error}</h1>;
  if (!project) return null;

  return (
    <div>
      <Nav />
      <div
        className="w-full aspect-[67/50] bg-cover flex flex-col justify-center items-center bg-no-repeat"
        style={{
          backgroundImage: `url(${baseUrl}/${project.mainImage?.replace(/\\/g, "/")})`,
        }}
      >
        <h1 className="w-full h-max text-center text-white text-[40px] font-black opacity-0 animate-fade-in max-600:text-[17px]">
          {project.title}
        </h1>
      </div>

      <main className="w-full h-max flex flex-col flex-wrap items-center  gap-7 bg-[#F0F0F0]">
        <h1 className="w-full h-max text-[27px] text-[#0158A3] font-semibold pl-[70px] pt-5 max-900:pl-0 max-900:text-center max-600:text-[17px]">
          Home / PROJECTS / {project.title}
        </h1>

        {/* Extra Images with Scroll Animation */}
        <div className="w-[90%] h-max flex flex-wrap pt-5 gap-7 pb-6 justify-center items-center">
          {project.extraImages?.map((image, index) => (
            <div
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              data-index={index}
              className={`relative w-[34%] h-[351px] overflow-hidden rounded-lg transform transition-all duration-700 max-900:w-[90%] ${
                visibleImages[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Image
                src={`${baseUrl}/${image.replace(/\\/g, "/")}`}
                alt={`Extra Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      </main>
      <section className='w-full h-max flex flex-col flex-wrap items-center  gap-7 bg-[#F0F0F0]'>
                <h1 className='w-full h-max text-[27px] text-[#0158A3] font-semibold pl-[70px] pt-5'>Other projects</h1>
                <div className='w-[90%] h-max flex flex-wrap pt-5 gap-7 pb-6 justify-center items-center '>
                {Projects.map((e)=>(
                      <div key={e._id} className='w-[30%] h-max max-900:w-full max-1440:w-[40%] '>
                        <Projectt
                        
                        title={e.title}
                        image={e.mainImage}
                        soilType={e.soilType}
                        owner={e.owner}
                        idd={e._id}
                        />
                    </div>
                       ))}
                </div>
         </section>
         <hr className="w-full h-[1px] bg-gray-300"/>
         <Footer/>
    </div>
  );
};

export default ProjectId;
