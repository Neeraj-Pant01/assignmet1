"use client"
import axios from 'axios'
import React, { useState } from 'react'
import { AiFillCloseSquare } from 'react-icons/ai'

const Editform = ({ seteditform, setEntry, entry }) => {
    const [updatedInfo, setUpdatedInfo] = useState({
        name: entry?.name,
        phone: entry?.phone,
        email: entry?.email,
        hobbies: entry?.hobbies
    })
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false)


    const handleChange = (e) => {
        const { value, name } = e.target;
        setUpdatedInfo((pre) => {
            return {
                ...pre, [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.put(`http://localhost:7000/api/v1/entries/update/${entry?._id}`,updatedInfo);
            console.log("after editing", response.data)
            setLoading(false)
            seteditform(false)
        } catch (err) {
            console.log(err)
            setErr(true)
            setLoading(false)
        }
    }
    return (
        <div className='flex items-center justify-center py-5 px-5 rounded-lg flex-col border h-max bg-[#eceaea] w-[100%]'>
            <AiFillCloseSquare className='text-[teal] text-3xl self-end mb-2 cursor-pointer' onClick={() => seteditform(false)} />
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-[#eceaea] w-[90%]'>
                <input type='text' name='name' value={updatedInfo.name} placeholder='enter your name' className='py-2 px-4 outline-none border rounded-md' onChange={handleChange} />

                <input type='text' name='phone' value={updatedInfo.phone} placeholder='enter your phone number' className='py-2 px-4 outline-none border rounded-md' onChange={handleChange} />

                <input type='text' name='email' value={updatedInfo.email} placeholder='enter your email' className='py-2 px-4 outline-none border rounded-md' onChange={handleChange} />

                <input type='text' name='hobbies' placeholder='enter your hobbies' className='py-2 px-4 outline-none border rounded-md' value={updatedInfo.hobbies} onChange={handleChange} />

                {loading ?
                    <div className='py-2 px-4 bg-[#729e9e] outline-none border-none cursor-not-allowed text-[white] rounded-md'>Loading...</div>
                    :
                    <button className='py-2 px-4 bg-[teal] outline-none border-none text-[white] rounded-md'>SAVE</button>
                }
            </form>
            {
                err && <div className='text-center text-[red]'>something went wrong ! try again </div>
            }
        </div>
    )
}

export default Editform