"use client";
import { useEffect, useRef, useState, useContext, useMemo } from "react";
import { SliderContext } from "./context/sliderContext";
import { CertificationsContext } from "./context/CertificationsContext";
import { partnersContext } from "./context/PartnersContext";
import { ProductsContext } from "./context/ProductContext";
import LoadingSpinner from "./compnant/loading/page";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectFade, Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import arrow from "./images/arroww.svg";
import Link from "next/link";
import Product from "./compnant/product/page";
import Nav from "./compnant/Nav/page";
import Footer from "./compnant/footer/page";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { slider, loading } = useContext(SliderContext);
  const { Certifications } = useContext(CertificationsContext);
  const { partners } = useContext(partnersContext);
  const { Products } = useContext(ProductsContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  const memoizedProducts = useMemo(() => (
    Products.map((e) => (
      <Product key={e._id} id={e._id} image={e.productImage} />
    ))
  ), [Products]);

  if (loading || !slider || slider.length === 0) {
    return <LoadingSpinner />;
  }

  const Counter = ({ endValue }) => {
    const counterRef = useRef(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            let start = 0;
            const duration = 2000; // 2 seconds animation
            const step = (timestamp) => {
              if (!start) start = timestamp;
              const progress = Math.min((timestamp - start) / duration, 1);
              const current = Math.floor(progress * endValue);
              setCount(current);
              if (progress < 1) {
                requestAnimationFrame(step);
              }
            };
            requestAnimationFrame(step);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );

      if (counterRef.current) {
        observer.observe(counterRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }, [endValue]);

    const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return <span ref={counterRef}>{formatNumber(count)}</span>;
  };

  return (
    <div className="bg-white min-h-screen">
      <Nav />
      <Swiper
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        modules={[EffectFade, Pagination, Navigation, Autoplay]}
        className="w-full h-[800px] max-600:h-[575px]"
        // Removed preloadImages prop
      >
        {slider.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div
              className="w-full h-full animate-slide-in flex gap-6 flex-col justify-center items-center text-center relative bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${baseUrl}/${slide.image?.replace(/\\/g, "/")})` }}
            >
              <h1 className="w-[70%] h-max pb-5 text-white text-[40px] font-black max-600:text-[15px]">
                {slide.title}
              </h1>
              <Link
                className="w-[15%] h-max pb-3 pt-3 mt-7 gap-[20px] text-center flex justify-center items-center rounded-full bg-white text-black text-[25px] max-600:w-[50%] max-900:w-[34%] max-1025:w-[24%] max-1440:w-[17%] max-330:w-[70%]"
                href="/pages/aboutUs"
              >
                About us
                <span className="w-[26%] h-[60px] relative flex justify-center items-center rounded-full bg-[#0158A3] hover:bg-white transition-all duration-500 ">
                  <Image
                    src={arrow}
                    alt="arrow"
                    fill
                    sizes="26vw"
                    className="object-contain"
                    priority
                  />
                </span>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="w-full h-max pb-10 pt-10 flex flex-wrap gap-14 justify-center items-center bg-[#F0F0F0]">
        {memoizedProducts}
      </div>

      <div className="w-full h-[300px] flex justify-center items-center bg-black text-white">
        <h1 className="w-[30%] h-max text-[45px] text-center font-normal max-600:text-[15px] max-900:text-[26px] max-1025:text-[32px] max-330:w-[50%]">
          Soil Stabilization for a sustainable future
        </h1>
      </div>

      <div className="w-full h-max flex justify-center items-center bg-world bg-no-repeat bg-cover max-1025:bg-auto">
        <div className="w-[65%] h-max pb-5 pt-5 gap-5 flex flex-col justify-center items-center max-900:w-full max-900:text-center">
          <div className="w-full h-max flex flex-col gap-5">
            <h1 className="w-full h-max text-[16px] font-bold text-[#0158A3]">
              NUMBERS SPEAK LOUDER THAN WORDS
            </h1>
            <p className="w-[90%] h-max text-black text-[36px] font-medium max-600:text-center max-900:w-full max-330:text-[25px]">
              We are committed to providing the most sustainable soil stabilisation solutions to all our customers
            </p>
          </div>
          <div className="w-full h-max flex justify-center  items-center gap-5 max-1440:flex-wrap">
            <div className="w-[34%] h-[250px] shadow-xl bg-white flex flex-col justify-center items-center max-1025:w-[70%] max-1440:w-[48%]  ">
              <h1 className="w-full text-center text-[70px] font-light text-[#4EABE9] max-900:text-[40px]">
                <Counter endValue={19814} />
              </h1>
              <p className="w-full h-max text-center text-black text-2xl">
                Tonnes Aggregate Import saved so far in 2021
              </p>
            </div>
            <div className="w-[34%] h-[250px] shadow-xl bg-white flex flex-col justify-center items-center max-1025:w-[70%] max-1440:w-[48%]">
              <h1 className="w-full text-[70px] text-center font-light text-[#4EABE9] max-900:text-[40px]">
                <Counter endValue={606} />
              </h1>
              <p className="w-full h-max text-black text-2xl text-center">
                Tonnes Co2 Saved In 2021
              </p>
            </div>
            <div className="w-[34%] h-[250px] shadow-xl bg-white flex flex-col justify-center items-center max-1025:w-[70%] max-1440:w-[48%]">
              <h1 className="w-full text-[70px] font-light text-center text-[#4EABE9] max-900:text-[40px]">
                <Counter endValue={449833} />
              </h1>
              <p className="w-full h-max text-black text-2xl text-center">
                m2 UK Stabilised Soils To Date
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-max pb-5 flex flex-col pt-3 gap-4 items-center bg-gray-100">
        <h1 className="w-full h-max text-[35px] text-center font-normal text-[#15263F] max-600:text-[20px]">
          World wide patented technology
        </h1>
        <div className="w-[98%] h-max flex flex-wrap gap-5 justify-center items-center">
          {Certifications.map((e) => (
            <Image
              key={e._id}
              src={`${baseUrl}/${e.image}`}
              width={100}
              height={100}
              sizes="(max-width: 900px) 20vw, 20vw"
              className="w-[20%] h-[360px] object-contain max-600:h-[120px] max-900:h-[200px]"
              alt="Certifications"
            />
          ))}
        </div>
      </div>

      <div className="w-full h-max pb-7 flex flex-col pt-3 gap-7 items-center bg-white">
        <h1 className="w-full h-max text-[35px] text-center font-normal text-[#15263F] max-600:text-[20px]">
          Partners of success
        </h1>
        <div className="w-[98%] h-max flex flex-wrap gap-14 justify-center items-center">
          {partners.map((e) => (
            <Image
              key={e._id}
              src={`${baseUrl}/${e.image}`}
              width={100}
              height={100}
              sizes="(max-width: 900px) 10vw, 10vw"
              className="w-[10%] h-[140px] object-contain max-600:w-[20%] max-600:h-[50px] max-900:w-[25%] max-900:h-[80px]"
              alt="Partner"
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}