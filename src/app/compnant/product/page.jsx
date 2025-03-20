"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import product from "../../images/product.png";
import arrow from "../../images/arroww.svg";
import Link from 'next/link';

const Product = ({ image, id }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [isVisible, setIsVisible] = useState(false);
  const productRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    );

    if (productRef.current) {
      observer.observe(productRef.current);
    }

    return () => {
      if (productRef.current) {
        observer.unobserve(productRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={productRef}
      className={`w-[20%] h-max pb-4 flex flex-col gap-5 justify-center items-center bg-transparent max-330:w-[97%] max-600:w-[80%] max-900:w-[40%] max-1440:w-[29%] max-2000:w-[20%] max-2561:w-[30%]
        transition-all duration-500 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
<div className="w-full relative aspect-[60/105]"> 
  <Image 
    src={`${baseUrl}/${image}`}  
    alt="project"
    fill
    sizes="(max-width: 900px) 100vw, (max-width: 1440px) 50vw, 20vw"
    className="rounded-[50px] object-cover"
    priority
  />
</div>
      <Link 
        href={`/pages/products/${id}`}
        className="w-[80%] h-[82px] gap-8 text-center flex justify-center items-center rounded-full bg-white text-black text-[20px] max-1440:text-[20px] max-1440:w-[80%] max-2000:w-[80%] max-2561:w-[40%] max-2561:text-[28px]"
      >
        Read more
        <span className="w-[25%] h-[60px] flex justify-center items-center rounded-full bg-[#0158A3]">
          <Image
            src={arrow}
            alt="arrow"
            width={40}
            height={12}
            className="h-auto" // Fix applied here
          />
        </span>
      </Link>
    </div>
  );
};

export default Product;