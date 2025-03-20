"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Projectt = ({ image, title, owner, soilType, idd }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [isVisible, setIsVisible] = useState(false);
  const projectRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once visible
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px', // No margin
      }
    );

    if (projectRef.current) {
      observer.observe(projectRef.current);
    }

    // Cleanup
    return () => {
      if (projectRef.current) {
        observer.unobserve(projectRef.current);
      }
    };
  }, []);

  return (
    <Link 
      ref={projectRef}
      href={`/pages/projectId/${idd}`} 
      className={`w-full h-max min-h-[620px] pb-5 flex flex-col items-center gap-5 bg-[#D9D9D9] rounded-b-3xl rounded-t-[57px]
        transition-all duration-500 ease-in-out hover:bg-[#cfcfcf] hover:shadow-md
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="w-full h-[390px] relative">
        <Image 
          src={`${baseUrl}/${image}`}  
          alt="project"
          fill
          className="rounded-[50px] object-cover"
          priority
        />
      </div>
      
      <h1 className="w-full h-max text-[25px] text-[#0158A3] font-semibold pl-5">{title}</h1>
      <h2 className="w-full h-max text-[23px] text-[#0158A3] font-medium pl-5">Owner: {owner}</h2>
      <h2 className="w-full h-max text-[23px] text-[#0158A3] font-medium pl-5">Soil type: {soilType}</h2>
    </Link>
  );
};

export default Projectt;