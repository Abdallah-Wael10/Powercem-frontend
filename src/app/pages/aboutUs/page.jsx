"use client"
import { useContext ,React ,useEffect } from 'react'
import { AboutUsContext } from '@/app/context/aboutUsContext'
import LoadingSpinner from '@/app/compnant/loading/page'
import Nav from '@/app/compnant/Nav/page'
import Image from 'next/image'
import icon from "../products/[id]/images/icon.png"
import Footer from '@/app/compnant/footer/page'
const AboutUs = () => {
  const { aboutUsData, } = useContext(AboutUsContext);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;


    if (!aboutUsData) return <LoadingSpinner />
    
  return (
    <main className="bg-[#F0F0F0]">
        <Nav />
        <div className='w-full aspect-[89/50] pb-5 bg-cover flex flex-col justify-center items-center bg-no-repeat bg-AboutUS rounded-[40px] '>
                <h1 className='w-full h-max text-center text-white text-[80px] font-semibold max-600:text-[30px]'>About us</h1>
            </div>
            <div className='w-full h-max flex flex-col justify-center items-center pb-7'>
            <h1 className='w-full h-max text-[24px] text-[#0158A3] font-semibold pl-[70px] pt-5 max-900:pl-0 max-900:text-center'>Home / About Us</h1>
            </div>
            <section className="w-full h-[500px] flex justify-center items-center max-600:flex-wrap ">
                <div className="w-1/2 h-max flex justify-center items-center max-600:w-full ">
                <h1 className="w-full h-max text-[30px] text-[#0158A3] font-extrabold text-center max-600:text-[20px]">{aboutUsData[0]?.title}</h1>
                </div>
                 <div className="w-1/2 h-max flex justify-center items-center  max-600:w-full">
                 <h1 className="w-full h-max text-[20px] text-black font-extralight text-center max-600:text-[16px]">{aboutUsData[0]?.description}</h1>
                 </div>


            </section>
            <section className="w-full h-max  flex justify-center items-center max-600:flex-wrap" >
            <div className="w-1/2 h-max  flex justify-center items-center max-600:w-full max-600:pb-5 ">
             <div className="w-[80%] h-[1300px] relative max-600:h-[520px]">
                                            <Image 
                                            src={`${baseUrl}/${aboutUsData[0]?.image1}`} 
                                            alt="icon product"  
                                            fill 
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // ✅ Helps Next.js optimize image loading
                                            quality={100} 
                                            style={{ objectFit: "cover" }} // ✅ Ensures proper fit inside the container
                                            className="rounded-[40px]" 
                                            priority 
                                            />
                                        </div>
            </div>
            <div className="w-1/2 h-max pb-5 max-600:w-full  ">
              <div className='w-full h-max flex gap-6 items-center '>
                                      <Image src={icon} alt="icon"  priority className='w-[50px] h-[50px]' />
                                      <h1 className='w-auto h-max text-[#0158A3] text-[20px] font-medium max-600:text-[17px]'>{aboutUsData[0]?.productName1}</h1>
                                      <hr className='w-full h-max'/>
                                      
                                  </div>
                    <div className="w-full h-max flex justify-center items-center ">
                      <div className="w-[40%]   aspect-[105/190] relative">
                                      <Image 
                                        src={`${baseUrl}/${aboutUsData[0]?.productImage1}`}  
                                        alt="icon product"  
                                        layout="fill"  
                                        objectFit="cover"  
                                        className="rounded-[50px]" 
                                        priority  
                                      />
                                    </div>
                    </div>
                    <h1 className="w-full h-max text-center pb-7 pt-5 text-[#0158A3] text-[30px] font-extrabold max-600:text-[24px] ">
                    {aboutUsData[0]?.productTitle1}
                    </h1>
                    <p className="w-full h-max text-black text-[20px] font-normal text-center max-600:text-[14px] "> 
                    {aboutUsData[0]?.productDescription1}
                    </p>
            </div>

            </section>
            <section className="w-full h-max  flex justify-center items-center max-600:flex-wrap" >
            <div className="w-1/2 h-max pb-5 pl-5 max-600:w-full ">
              <div className='w-full h-max flex gap-6 items-center '>
                                      <Image src={icon} alt="icon"  priority className='w-[50px] h-[50px]' />
                                      <h1 className='w-auto h-max text-[#0158A3] text-[23px] font-medium max-600:text-[17px]'>{aboutUsData[0]?.productName2}</h1>
                                      <hr className='w-full h-max'/>
                                      
                                  </div>
                    <div className="w-full h-max flex justify-center items-center ">
                      <div className="w-[40%] aspect-[105/190] relative">
                                      <Image 
                                        src={`${baseUrl}/${aboutUsData[0]?.productImage2}`}  
                                        alt="icon product"  
                                        layout="fill"  
                                        objectFit="cover"  
                                        className="rounded-[50px]" 
                                        priority  
                                      />
                                    </div>
                    </div>
                    <h1 className="w-full h-max text-center pb-7 pt-5 text-[#0158A3] text-[30px] font-extrabold max-600:text-[24px] ">
                    {aboutUsData[0]?.productTitle2}
                    </h1>
                    <p className="w-full h-max text-black text-[20px] font-normal text-center max-600:text-[14px] "> 
                    {aboutUsData[0]?.productDescription2}
                    </p>
            </div>
            <div className="w-1/2 h-max  flex justify-center items-center max-600:w-full max-600:pb-5 ">
             <div className="w-[80%] h-[1300px] relative max-600:h-[520px]">
                                            <Image 
                                            src={`${baseUrl}/${aboutUsData[0]?.image2}`} 
                                            alt="icon product"  
                                            fill 
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // ✅ Helps Next.js optimize image loading
                                            quality={100} 
                                            style={{ objectFit: "cover" }} // ✅ Ensures proper fit inside the container
                                            className="rounded-[40px]" 
                                            priority 
                                            />
                                        </div>
            </div>

            </section>
            <section className="w-full h-max pb-7  flex justify-center items-center max-600:flex-wrap" >
            <div className="w-1/2 h-max  flex justify-center items-center    max-600:w-full max-600:pb-5 ">
             <div className="w-[80%] h-[1300px] relative max-600:h-[520px]">
                                            <Image 
                                            src={`${baseUrl}/${aboutUsData[0]?.image3}`} 
                                            alt="icon section"  
                                            fill 
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // ✅ Helps Next.js optimize image loading
                                            quality={100} 
                                            style={{ objectFit: "cover" }} // ✅ Ensures proper fit inside the container
                                            className="rounded-[40px]" 
                                            priority 
                                            />
                                        </div>
            </div>
            <div className="w-1/2 h-max pb-5  max-600:w-full ">
              <div className='w-full h-max flex gap-6 items-center '>
                                      <Image src={icon} alt="icon"  priority className='w-[50px] h-[50px]' />
                                      <h1 className='w-auto h-max text-[#0158A3] text-[23px] font-medium max-600:text-[17px]'>{aboutUsData[0]?.productName3}</h1>
                                      <hr className='w-full h-max'/>
                                      
                                  </div>
                    <div className="w-full h-max flex justify-center items-center ">
                      <div className="w-[40%] aspect-[105/190]  relative">
                                      <Image 
                                        src={`${baseUrl}/${aboutUsData[0]?.productImage3}`}  
                                        alt="icon section"  
                                        layout="fill"  
                                        objectFit="cover"  
                                        className="rounded-[50px]" 
                                        priority  
                                      />
                                    </div>
                    </div>
                    <h1 className="w-full h-max text-center pb-7 pt-5 text-[#0158A3] text-[30px] font-extrabold max-600:text-[24px] ">
                    {aboutUsData[0]?.productTitle3}
                    </h1>
                    <p className="w-full h-max text-black text-[20px] text-center font-normal max-600:text-[14px]"> 
                    {aboutUsData[0]?.productDescription3}
                    </p>
            </div>

            </section>
            <section className="w-full h-max flex justify-center items-center max-600:flex-wrap ">
                    <div className="w-1/2 h-max flex justify-center items-center max-600:w-full ">
                    <h1 className="w-full h-max text-center text-[30px] text-[#0158A3] font-extrabold max-600:text-[21px]">{aboutUsData[0]?.section2Title}</h1>
                    </div>
                    <div className="w-1/2 h-max flex justify-center items-center pb-5 pt-5 max-600:w-full ">
                    <h1 className="w-full h-max text-center text-[20px] text-black font-light max-600:text-[15px]">{aboutUsData[0]?.section2Description}</h1>
                    </div>
            </section>
            <section className="w-full h-max  flex justify-center items-center max-600:flex-wrap" >
            <div className="w-1/2 h-max  flex justify-center items-center max-600:w-full max-600:pb-5 ">
             <div className="w-[80%] h-[1300px] relative max-600:h-[520px]">
                                            <Image 
                                            src={`${baseUrl}/${aboutUsData[0]?.section3Image}`} 
                                            alt="icon section"  
                                            fill 
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // ✅ Helps Next.js optimize image loading
                                            quality={100} 
                                            style={{ objectFit: "cover" }} // ✅ Ensures proper fit inside the container
                                            className="rounded-[40px]" 
                                            priority 
                                            />
                                        </div>
            </div>
            <div className="w-1/2 h-max pb-5 max-600:w-full ">
              <div className='w-full h-max flex gap-6 items-center '>
                                      <Image src={icon} alt="icon"  priority className='w-[50px] h-[50px]' />
                                      <h1 className='w-full h-max text-[#0158A3] text-[23px] font-medium max-600:text-[18px]'>{aboutUsData[0]?.section3Name}</h1>
                                  
                                      
                                  </div>
                    <h1 className="w-full h-max text-center pb-7 pt-5 text-[#0158A3] text-[30px] font-extrabold max-600:text-[19px]">
                    {aboutUsData[0]?.section3Title}
                    </h1>
                    <p className="w-full h-max text-black text-[20px] font-normal text-center max-600:text-[14px] "> 
                    {aboutUsData[0]?.section3Description}
                    </p>
            </div>

            </section>
            <section className="w-full h-max pb-10 flex justify-center items-center max-600:flex-wrap" >
            <div className="w-1/2 h-max pb-5  max-600:w-full ">
                    <h1 className="w-full h-max text-center pb-7 pt-5 text-[#0158A3] text-[30px] font-extrabold max-600:text-[20px]">
                    {aboutUsData[0]?.section4Title}
                    </h1>
                    <p className="w-full h-max text-black text-[20px] font-normal text-center max-600:text-[14px] "> 
                    {aboutUsData[0]?.section4Description}
                    </p>
            </div>
            <div className="w-1/2 h-max  flex justify-center items-center max-600:w-full ">
             <div className="w-[80%] h-[1300px] max-600:h-[520px] relative">
                                            <Image 
                                            src={`${baseUrl}/${aboutUsData[0]?.section4Image}`} 
                                            alt="icon section" 
                                            fill 
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // ✅ Helps Next.js optimize image loading
                                            quality={100} 
                                            style={{ objectFit: "cover" }} // ✅ Ensures proper fit inside the container
                                            className="rounded-[40px]" 
                                            priority 
                                            />
                                        </div>
            </div>


            </section>
            <section className="w-full h-max pb-8 flex flex-col justify-center items-center">
              <h1 className="w-full h-max text-[#0158A3] text-[60px] font-bold text-center max-600:text-[40px]">Contact us: </h1>
              <a className='hover:scale-110 transition-all duration-150 bg-white rounded-2xl text-black w-auto p-5 h-max text-center text-[30px] max-600:text-[21px]' href="mailto:info@powercem.com">info@powercem.com</a>

            </section>
            <Footer/>
            
      
    </main>
  )
}

export default AboutUs
