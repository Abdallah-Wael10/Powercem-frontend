"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { ProjectsContext } from '@/app/context/projectContext'
import { useContext , useState ,useEffect } from 'react'
import LoadingSpinner from '@/app/compnant/loading/page'
import Image from 'next/image'
import Nav from '@/app/compnant/Nav/page'
import Footer from '@/app/compnant/footer/page'
import Airports from "./images/Airports.png"
import dam from "./images/dam.png"
import plat from "./images/plat.png"
import port from "./images/port.png"
import roads from "./images/roads.png"
import icon from "./images/icon.png"
import Projectt from '@/app/compnant/project/page'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // Import Navigation and Pagination modules
import "swiper/css"; // Import core Swiper styles
import "swiper/css/navigation"; // Import Navigation styles
import "swiper/css/pagination"; // Import Pagination styles
const ProductById = () => {
    const { id } = useParams()
      const [products, setproducts] = useState(null);
      const { Projects} = useContext(ProjectsContext);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        useEffect(() => {
          if (!id) return;
      
          const fetchProductById = async () => {
            try {
              setLoading(true);
              setError(null);
              const response = await fetch(`${baseUrl}/api/products/${id}`);
      
              if (!response.ok) throw new Error("Failed to fetch products");
      
              const data = await response.json();
              setproducts(data);
            } catch (err) {
              setError(err.message);
            } finally {
              setLoading(false);
            }
          };
      
          fetchProductById();
        }, [id, baseUrl]);
          if (loading) return <LoadingSpinner />;
          if (error) return <h1 className="text-red-500">{error}</h1>;
          if (!products) return null;

          const icons = [
            { icon: Airports, alt: "Airports" },
            { icon: dam, alt: "Dams" },
            { icon: plat, alt: "Plats" },
            { icon: port, alt: "Ports" },
            { icon: roads, alt: "Roads" },
          ]
  return (
    <main>
            <Nav />
      <div
        className="w-full aspect-[75/50] bg-cover flex flex-col justify-center items-center bg-no-repeat"
        style={{
          backgroundImage: `url(${baseUrl}/${products.mainImage?.replace(/\\/g, "/")})`,
        }}
      >
        <h1 className="w-full h-max text-center text-white text-[90px] font-black opacity-0 animate-fade-in max-600:text-[31px]">
          {products.name}
        </h1>
      </div>
      <div className="w-full h-max pb-5 pt-5 bg-white flex gap-8 justify-evenly items-center flex-wrap">
  {icons.map((e) => (
    <div key={e.alt} className="flex flex-col justify-center items-center">
      <div className="w-[33px] h-[33px] relative">
        <Image 
          src={e.icon} 
          alt={e.alt} 
          width={33} 
          height={33} 
          
          priority 
          className="w-auto h-auto object-contain"
        />
      </div>
      <h1 className="text-[#0158A3] text-[18px] font-semibold mt-2 text-center">
        {e.alt}
      </h1>
    </div>
  ))}
</div>
    <section className='w-full  h-max pb-5 flex flex-col items-center gap-9 bg-[#F0F0F0]'>
    <h1 className="w-full h-max text-[27px] text-[#0158A3] font-semibold pl-[70px] pt-5 max-900:pl-0 max-900:text-center max-900:text-[20px]">
          Home / Our Products / {products.name}
        </h1>
        <div className='w-[90%] h-max pb-5 flex justify-center items-center max-900:flex-wrap '>
                <div className='w-1/2  h-max pb-5  flex justify-center items-center max-900:w-full ' >
                 <h1 className='w-full h-max text-[#0158A3] text-[64px] font-normal max-900:text-[33px] max-1439:text-[50px]'>{products.title}</h1>
                </div>
                <div className='w-1/2  h-max pb-5  flex justify-center items-center max-900:w-full ' >
                 <h2 className='w-full h-max text-black text-[25px] font-extralight  max-900:text-[15px] max-1439:text-[19px]'>{products.description}</h2>
                </div>
        </div>
    </section>
        <section className='w-full h-max pb-5 flex flex-col items-center gap-9  bg-[#F0F0F0] '>
        <h1 className="w-full h-max text-[27px] text-[#0158A3] font-normal pl-[70px] pt-5 max-900:pl-0 max-900:text-center">
        The benefits of {products.name}
        </h1>
        <div className='w-[97%] h-max pb-5 flex justify-center items-center flex-wrap gap-4 max-1439:flex-wrap  '>
                <div className='w-[45%] h-max flex justify-center items-center gap-6 max-900:w-full max-900:flex-wrap max-1439:w-[90%]'>
                            <div className='w-1/2 h-[500px] bg-[#D9D9D9] flex flex-col justify-center items-center gap-5 rounded-[40px] max-900:w-[97%]'>
                                    <h1 className='w-full h-max text-[31px] text-black font-semibold text-center'>{products.benefitTitle1}</h1>
                                    <p className='w-full h-max text-[24px] font-normal text-[#838383] text-center'>{products.benefitDescription1}</p>
                            </div>
                            <div className="w-1/2 h-[500px] bg-slate-700 flex justify-center items-center rounded-[40px] overflow-hidden max-900:w-[97%]">
                            <div className="w-full h-full relative">
                                <Image 
                                src={`${baseUrl}/${products.benefitImage1}`} 
                                alt={products.benefitTitle1} 
                                fill 
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // ✅ Helps Next.js optimize image loading
                                quality={100} 
                                style={{ objectFit: "cover" }} // ✅ Ensures proper fit inside the container
                                className="rounded-[40px]" 
                                priority 
                                />
                            </div>
                            </div>

                </div>
                <div className='w-[45%] h-max  flex justify-center items-center gap-6 max-900:w-full max-900:flex-wrap max-1439:w-[90%]'>
                            <div className='w-1/2 h-[500px] bg-[#D9D9D9] flex flex-col justify-center items-center gap-5 rounded-[40px] max-900:w-[97%]'>
                                    <h1 className='w-full h-max text-[31px] text-black font-semibold text-center'>{products.benefitTitle2}</h1>
                                    <p className='w-full h-max text-[24px] font-normal text-[#838383] text-center'>{products.benefitDescription2}</p>
                            </div>
                            <div className="w-1/2 h-[500px] bg-slate-700 flex justify-center items-center rounded-[40px] overflow-hidden max-900:w-[97%]">
                            <div className="w-full h-full relative">
                                <Image 
                                src={`${baseUrl}/${products.benefitImage2}`} 
                                alt={products.benefitTitle2} 
                                fill 
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // ✅ Helps Next.js optimize image loading
                                quality={100} 
                                style={{ objectFit: "cover" }} // ✅ Ensures proper fit inside the container
                                className="rounded-[40px]" 
                                priority 
                                />
                            </div>
                            </div>

                </div>
                <div className='w-[45%] h-max  flex justify-center items-center gap-6 max-900:w-full max-900:flex-wrap max-1439:w-[90%]'>
                            <div className='w-1/2 h-[500px] bg-[#D9D9D9] flex flex-col justify-center items-center gap-5 rounded-[40px] max-900:w-[97%]'>
                                    <h1 className='w-full h-max text-[31px] text-black font-semibold text-center'>{products.benefitTitle3}</h1>
                                    <p className='w-full h-max text-[24px] font-normal text-[#838383] text-center'>{products.benefitDescription3}</p>
                            </div>
                            <div className="w-1/2 h-[500px] bg-slate-700 flex justify-center items-center rounded-[40px] overflow-hidden max-900:w-[97%]">
                            <div className="w-full h-full relative">
                                <Image 
                                src={`${baseUrl}/${products.benefitImage3}`} 
                                alt={products.benefitTitle3} 
                                fill 
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // ✅ Helps Next.js optimize image loading
                                quality={100} 
                                style={{ objectFit: "cover" }} // ✅ Ensures proper fit inside the container
                                className="rounded-[40px]" 
                                priority 
                                />
                            </div>
                            </div>

                </div>
        </div>
        </section>
          <section className='w-full h-max pb-5 flex justify-center items-center  bg-[#F0F0F0] '>
              <div className='w-[90%] h-max flex justify-center items-center max-900:flex-wrap max-900:w-full '>
                  <div className='w-1/2 h-[1400px]  flex justify-center items-center max-900:w-[97%] max-900:h-[520px]'>
                  <div className="w-[80%] h-full relative">
                                <Image 
                                src={`${baseUrl}/${products.applicationImage}`} 
                                alt={products.applicationTitle} 
                                fill 
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // ✅ Helps Next.js optimize image loading
                                quality={100} 
                                style={{ objectFit: "cover" }} // ✅ Ensures proper fit inside the container
                                className="rounded-[40px]" 
                                priority 
                                />
                            </div>
                  </div>
                  <div className='w-1/2 h-max flex flex-col pt-5 pb-5 justify-center items-center gap-5 max-900:w-[97%] '>
                      <div className='w-full h-max flex gap-6 items-center '>
                          <Image src={icon} alt="icon"  priority className='w-[50px] h-[50px]' />
                          <h1 className='w-auto h-max text-[#0158A3] text-[25px] font-medium max-900:text-[16px]'>Applications</h1>
                          <hr className='w-full h-max'/>
                          
                      </div>
                    <h1 className='w-full h-max text-[#0158A3] text-[50px] font-normal max-900:text-[30px] max-900:text-center'>{products.applicationTitle}</h1>
                    <p className='w-full h-max  text-black text-[24px] font-light max-900:text-[13px] max-900:text-center'>{products.applicationDescription}</p>
                  </div>
              </div>
          </section>
          <section className='w-full h-max pb-5 flex justify-center items-center  bg-[#F0F0F0] '>
              <div className='w-[90%] h-max flex justify-center items-center max-900:flex-wrap max-900:w-full  '>
                  <div className='w-1/2 h-max flex flex-col pt-5 pb-5 justify-center items-center gap-5 max-900:w-[97%] '>
                      <div className='w-full h-max flex gap-6 items-center '>
                          <Image src={icon} alt="icon"  priority className='w-[50px] h-[50px]' />
                          <h1 className='w-auto h-max text-[#0158A3] text-[25px] font-medium max-900:text-[16px]'>Sustainability</h1>
                          <hr className='w-full h-max'/>
                          
                      </div>
                    <h1 className='w-full h-max text-[#0158A3] text-[50px] font-normal max-900:text-[30px] max-900:text-center'>{products.sustainabilityTitle}</h1>
                    <p className='w-full h-max  text-black text-[24px] font-light max-900:text-[13px] max-900:text-center'>{products.sustainabilityDescription}</p>
                  </div>
                  <div className='w-1/2 h-[1000px]  flex justify-center items-center max-900:w-[97%] max-900:h-[520px]'>
                  <div className="w-[80%] h-full relative">
                                <Image 
                                src={`${baseUrl}/${products.sustainabilityImage}`} 
                                alt={products.sustainabilityTitle} 
                                fill 
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // ✅ Helps Next.js optimize image loading
                                quality={100} 
                                style={{ objectFit: "cover" }} // ✅ Ensures proper fit inside the container
                                className="rounded-[40px]" 
                                priority 
                                />
                            </div>
                  </div>
              </div>
          </section>
          <section className="w-full min-h-screen flex justify-center items-center bg-[#F0F0F0] py-10">
  <div className="w-[80%] max-w-[1200px] flex justify-center items-center">
    <div className="relative w-full h-[600px] flex justify-center items-center">
      <Image
        src={`${baseUrl}/${products.detailsImage}`}
        alt={products.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
        quality={100}
        className="rounded-[40px] object-contain"
        priority
      />
    </div>
  </div>
</section>
<section className="w-full h-max pb-6 flex flex-col gap-5 bg-black text-white">
      <h1 className="text-[50px] font-normal pt-5 pl-5 max-900:pl-0 max-900:text-center max-900:text-[20px]">Projects we are proud of:</h1>
      <Swiper
        spaceBetween={20}
        slidesPerView={3} 
        breakpoints={{
          0: {
            slidesPerView: 1, 
            spaceBetween: 10, 
          },
          901: {
            slidesPerView: 3, 
            spaceBetween: 20,
          },
        }}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="w-[90%]"
      >
  {Projects.map((e) => (
    <SwiperSlide key={e._id}>
      <div className="w-full h-max max-900:w-full">
        <Projectt
          idd={e._id}
          title={e.title}
          owner={e.owner}
          image={e.mainImage}
          soilType={e.soilType}
        />
      </div>
    </SwiperSlide>
  ))}
</Swiper>
    </section>

      <Footer />


        
  
      
    </main>
  )
}

export default ProductById
