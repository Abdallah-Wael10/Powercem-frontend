"use client"
import React from 'react'
import Image from 'next/image'
import Nav from '@/app/compnant/Nav/page'
import Footer from '@/app/compnant/footer/page'
import Projectt from '@/app/compnant/project/page'
import { useContext } from 'react'
import { ProjectsContext } from '@/app/context/projectContext'
import { ClientContext } from '@/app/context/clientContext'
import { EgyClientContext } from '@/app/context/egyClientContext'
import LoadingSpinner from '@/app/compnant/loading/page'
const Project = () => {
     const { Projects ,loading} = useContext(ProjectsContext)
     const { Client } = useContext(ClientContext)
     const { egyClient } = useContext(EgyClientContext)
     const baseUrl = process.env.NEXT_PUBLIC_API_URL; 
     if(loading) return <LoadingSpinner/>

  return (
    <div>
            <Nav/>
        <div className='w-full aspect-[110/50] bg-cover flex flex-col justify-center items-center bg-no-repeat  bg-bgp     max-1439:bg-cover '>
            <h1 className='w-full h-max text-center text-white text-[90px] font-semibold max-600:text-[29px]'>Projects</h1>
        </div>
         <main className='w-full h-max flex flex-col flex-wrap items-center rounded-b-3xl gap-7 bg-[#F0F0F0]'>
                <h1 className='w-full h-max text-[27px] text-[#0158A3] font-semibold pl-[70px] pt-5 max-900:pl-0 max-900:text-center'>Home / PROJECTS</h1>
                <div className='w-[90%] h-max flex flex-wrap pt-5 gap-7 pb-6 justify-center items-center max-900:w-[98%] '>
                    
                    {Projects.map((e)=>(
                      <div key={e._id} className='w-[30%] h-max    max-900:w-full max-1440:w-[40%]'>
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
         </main>
         <section className='w-full h-max flex flex-col pt-5 items-center gap-6  bg-black '>
                        <h1 className='w-full h-max pb-5 text-[47px] font-medium text-center text-white max-600:text-[21px]'>Our Clients Over the World</h1>
                        <div className='w-[90%] h-max flex pb-8  pt-5 justify-center items-center gap-10 flex-wrap'>
                            {Client.map((e)=>(
                              <Image key={e._id} src={`${baseUrl}/${e.image}`} alt='world client' width={100} height={100} className='w-auto h-auto'/>
                            ))}
                        </div>
         </section> 
         <section className='w-full h-max flex flex-col pt-5 items-center gap-6 rounded-t-3xl bg-[#F0F0F0] '>
                        <h1 className='w-full h-max pb-5 text-[47px] font-medium text-center text-[#385A8F] max-600:text-[21px]'>Our Clients in Egypt <br />(governmental & private sector)</h1>
                        <div className='w-[90%] h-max flex pb-8  pt-5 justify-center items-center gap-10 flex-wrap'>
                            {egyClient.map((e)=>(
                              <Image key={e._id} src={`${baseUrl}/${e.image}`} alt='egy client' width={100} height={100} className='w-auto h-auto '/>
                            ))}
                        </div>
         </section> 
         <hr  className='w-full h-[1px] bg-gray-400'/>
         <Footer/>
      
    </div>
  )
}

export default Project
