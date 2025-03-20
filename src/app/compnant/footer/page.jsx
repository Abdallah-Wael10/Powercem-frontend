import React from 'react'
import Image from 'next/image'
import logo from "../footer/image/logoo.png"
import Link from 'next/link'
const Footer = () => {
  return (
    <footer className='w-full h-max pb-14 flex flex-col justify-center items-center bg-[#F0F0F0]'>
            <div className='w-full h-max pb-5 pt-5 flex justify-center items-center '><Image className='w-[11%] h-[160px] max-600:w-[45%] max-900:w-[29%]' src={logo} alt='logo '/></div>
          <hr className='w-full h-[1px] bg-[#4D55673D]' />
            <div className='w-full h-max flex justify-center items-center max-900:flex-wrap '>
                    <div className='w-1/4 h-max flex flex-col pt-5 items-center gap-6  max-900:w-full '>
                            <h1 className='w-full h-max text-[#0158A3] font-semibold text-center text-[20px]'>Company</h1>
                            <div className='w-full h-max flex flex-col gap-5 justify-center items-center'>
                                <Link className='w-full h-max font-normal text-[15px] text-[#0158A3] text-center' href="">About us</Link>
                                <Link className='w-full h-max font-normal text-[15px] text-[#0158A3] text-center' href="/pages/project">Projects</Link>
                                <Link className='w-full h-max font-normal text-[15px] text-[#0158A3] text-center' href="">Contact</Link>
                            </div>
                    </div>
                    <div className='w-1/4 h-max flex flex-col pt-5 items-center gap-6  max-900:w-full '>
                    <h1 className='w-full h-max text-[#0158A3] font-semibold text-center text-[20px]'>Our products</h1>
                    <div className='w-full h-max flex flex-col gap-5 justify-center items-center'>
                                <Link className='w-full h-max font-normal text-[15px] text-[#0158A3] text-center' href="">RoadCem</Link>
                                <Link className='w-full h-max font-normal text-[15px] text-[#0158A3] text-center' href="">ImmoCem</Link>
                                <Link className='w-full h-max font-normal text-[15px] text-[#0158A3] text-center' href="">ConcreCem</Link>
                            </div>
                    </div>
                    <div className='w-1/4 h-max flex flex-col pt-5 items-center gap-6   max-900:w-full'>
                    <h1 className='w-full h-max text-[#0158A3] font-semibold text-center text-[20px]'>Contact</h1>
                    <div className='w-full h-max flex flex-col gap-5 justify-center items-center'>
                                <Link className='w-full h-max font-normal text-[15px] text-[#0158A3] text-center' href="">Plaza 24, 4782 SK</Link>
                                <Link className='w-full h-max font-normal text-[15px] text-[#0158A3] text-center' href="">Moerdijk, The Netherlands</Link>
                                <Link className='w-full h-max font-normal text-[15px] text-[#0158A3] text-center' href="">info@powercem.com</Link>
                                <Link className='w-full h-max font-normal text-[15px] text-[#0158A3] text-center' href="">+31 (0) 168 40 94 40</Link>
                            </div>
                    </div>
                    <div className='w-1/4 h-max flex flex-col pt-5 items-center gap-6  max-900:w-full '>
                    <h1 className='w-full h-max text-[#0158A3] font-semibold text-center text-[20px]'>Follow us</h1>
                    <div className='w-full h-max flex flex-col gap-5 justify-center items-center'>
                                <Link className='w-full h-max font-normal text-[15px] text-[#0158A3] text-center' href="">Youtube</Link>
                                <Link className='w-full h-max font-normal text-[15px] text-[#0158A3] text-center' href="">Linkedin</Link>
                                <Link className='w-full h-max font-normal text-[15px] text-[#0158A3] text-center' href="">Instagram</Link>
                                <Link className='w-full h-max font-normal text-[15px] text-[#0158A3] text-center' href="">Facebook</Link>
                            </div>
                    </div>
            </div>
    </footer>
  )
}

export default Footer
