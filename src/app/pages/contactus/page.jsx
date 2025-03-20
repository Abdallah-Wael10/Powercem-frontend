"use client"
import Nav from '@/app/compnant/Nav/page'
import Footer from '@/app/compnant/footer/page'
import { useState } from 'react'
import LoadingSpinner from '@/app/compnant/loading/page'

const ContactUs = () => {
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [topic, setTopic] = useState("") // Empty initial value
    const [message, setMessage] = useState("")
    const baseUrl = process.env.NEXT_PUBLIC_API_URL

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch(`${baseUrl}/api/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    companyName,
                    topic,
                    message
                })
            })
            if (!response.ok) {
                throw new Error('Submission failed')
            }
            setStatus("Your form has been submitted successfully!")
            setFirstName("")
            setLastName("")
            setEmail("")
            setCompanyName("")
            setTopic("")
            setMessage("")
        } catch (error) {
            console.error(error)
            setStatus("An error occurred while submitting the form.")
        } finally {
            setLoading(false) 
        }
    }

    const topics = [
        'I’m interested to become a partner and contribute to sustainable solutions',
        'I have a project and want to apply a PowerCem product',
        'Other'
    ]

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <div className='bg-[#F0F0F0]'>
            <Nav />
            <div className='w-full aspect-[74/50] pb-5 bg-cover flex flex-col justify-center items-center bg-no-repeat bg-contact'>
                <h1 className='w-full h-max text-center text-white text-[90px] font-semibold max-900:text-[31px]'>Contact Us</h1>
            </div>
            <div className='w-full h-max pb-5 flex justify-center items-center flex-wrap'>
                <div className='w-1/2 h-max pb-5 flex flex-col text-[#0058a3] text-[23px] font-medium gap-6 justify-center items-center pl-9 max-900:w-full max-900:pl-0'>
                    <h1 className='w-full h-max text-[#0058a3] text-[53px] font-bold text-center max-900:text-[40px]'>Contact us</h1>
                    <a className='hover:scale-110 transition-all duration-150' href="tel:+31 (0) 168 40 94 40">+31 (0) 168 40 94 40</a>
                    <a className='hover:scale-110 transition-all duration-150' href="mailto:info@powercem.com">info@powercem.com</a>
                    <a className='hover:scale-110 transition-all duration-150' href="https://www.google.com/maps/place/PowerCem+Technologies+B.V./@51.6767465,4.615302,17z/data=!3m1!4b1!4m6!3m5!1s0x47c4238a76d573ff:0xfdc1b36d671d6a96!8m2!3d51.6767465!4d4.615302!16s%2Fg%2F1tdb_tpq?entry=ttu&g_ep=EgoyMDI1MDIyNS4wIKXMDSoASAFQAw%3D%3D">Google Maps Route</a>
                </div>
                <div className='w-1/2 h-max pb-5 pt-8 flex justify-center items-center max-900:w-full'>
                    <form onSubmit={handleSubmit} className='w-[80%] h-max pb-5 pt-5 rounded-2xl flex flex-wrap justify-center items-center text-black bg-white gap-6 max-900:w-[95%]'>
                        <input
                            type="text"
                            required
                            placeholder='First Name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className='w-[40%] h-[50px] rounded-xl bg-[#f0f0f0] pl-4'
                        />
                        <input
                            type="text"
                            required
                            placeholder='Last Name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className='w-[40%] h-[50px] rounded-xl bg-[#f0f0f0] pl-4'
                        />
                        <input
                            type="email"
                            required
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-[40%] h-[50px] rounded-xl bg-[#f0f0f0] pl-4'
                        />
                        <input
                            type="text"
                            required
                            placeholder='Company Name'
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className='w-[40%] h-[50px] rounded-xl bg-[#f0f0f0] pl-4'
                        />
                        <select
                            required
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className='w-[85%] h-[50px] rounded-xl bg-[#f0f0f0] pl-4'
                        >
                            <option value="" disabled>Select a topic</option>
                            {topics.map((topic, index) => (
                                <option className='w-full h-max p-5' key={index} value={topic}>
                                    {topic}
                                </option>
                            ))}
                        </select>
                        <textarea
                            placeholder='Message'
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className='w-[80%] h-[100px] rounded-xl bg-[#f0f0f0] pl-4 pt-4'
                        />
                        <h1>{status}</h1>
                        <button type='submit' className='w-[40%] h-[50px] rounded-xl bg-[#0058a3] text-white font-medium text-center'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ContactUs