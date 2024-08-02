"use client"
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { AiFillCloseSquare } from 'react-icons/ai'

const Form = ({ setShowForm }) => {
  const formRef = useRef(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = {
      name: e.target[0].value,
      phone: e.target[1].value,
      email: e.target[2].value,
      hobbies: e.target[3].value
    }
    const newErrors = {}
    if (!newEntry.name) newErrors.name = "name is required !"
    if (!newEntry.phone) newErrors.phone = "phone is required !"
    if (!newEntry.email) newErrors.email = "email is required !"
    if (!newEntry.hobbies) newErrors.hobbies = "hobbies are required !"
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return;
    }
    try {
      setLoading(true)
      const response = await axios.post(`http://localhost:7000/api/v1/entries/add`, newEntry)
      formRef.current.reset();
      setErrors({})
      setLoading(false)
      setShowForm(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
      setErr(true)
      setTimeout(() => {
        setErr(false)
      }, 3000);
    }
  }
  return (
    <div className='flex items-center justify-center py-5 px-5 rounded-lg flex-col border h-max bg-[#eceaea] w-[100%]'>
      <AiFillCloseSquare className='text-[teal] text-3xl self-end mb-2 cursor-pointer' onClick={() => setShowForm(false)} />
      <form ref={formRef} className='flex flex-col gap-4 bg-[#eceaea] w-[90%]' onSubmit={handleSubmit}>
        <input type='text' placeholder='enter your name' className='py-2 px-4 outline-none border rounded-md' />
        {errors.name && <span className='text-[red]'>{errors.name}</span>}

        <input type='text' placeholder='enter your phone number' className='py-2 px-4 outline-none border rounded-md' />
        {errors.phone && <span className='text-[red]'>{errors.phone}</span>}

        <input type='email' placeholder='enter your email' className='py-2 px-4 outline-none border rounded-md' />
        {errors.email && <span className='text-[red]'>{errors.email}</span>}

        <input type='text' placeholder='enter your hobbies' className='py-2 px-4 outline-none border rounded-md' />
        {errors.hobbies && <span className='text-[red]'>{errors.hobbies}</span>}
{
  loading ?
  <div className='py-2 px-4 bg-[#749d9d] cursor-not-allowed outline-none border-none text-[white] rounded-md'>Loading...</div>
  :
        <button className='py-2 px-4 bg-[teal] outline-none border-none text-[white] rounded-md'>SAVE</button>}
      </form>
      {
        err && <span className='text-[red]'>something went wrong please try again !</span>
      }
    </div>
  )
}

export default Form
