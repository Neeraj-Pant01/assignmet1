"use client"
import React, { useState, useEffect } from 'react'
import Form from './Form'
import TableRow from './TableRow'
import Editform from './EditForm'
import axios from 'axios'

const Table = () => {
    const [showform, setShowForm] = useState(false)
    const [editform, seteditform] = useState(false)
    const [loading, setLoading] = useState(false)
    const [allEntries, setAllEntries] = useState([])
    const [entry, setEntry] = useState()
    const [selectedItems, setSelecTedItem] = useState([])
    const [err, setErr] = useState(false)
    const [sendLoading, setSendLoading] = useState(false)

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const response = await axios.get('https://assignmet1-txkt.onrender.com/api/v1/entries/')
                console.log(response.data)
                setAllEntries(response.data)
                setLoading(false)
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
        getData();
    }, [showform, editform])


    const handleSend = async () => {
        if(selectedItems.length == 0){
            setErr(true)
            setTimeout(()=>{
                setErr(false)
            },3000)
        }
        try{
            setSendLoading(true)
            const response = await axios.post('https://assignmet1-txkt.onrender.com/sendmail',selectedItems)
            setSendLoading(false)
            window.location.reload();
        }catch(err){
            console.log(err)
            setSendLoading(false)
        }
    }

    return (
        <div className='min-h-screen border flex items-center justify-center w-[100%] relative'>
            {
                showform &&
                <div className='absolute bg-[white] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:w-[30%]'>
                    <Form setShowForm={setShowForm} />
                </div>
            }
            {
                editform &&
                <div className='absolute bg-[white] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:w-[30%]'>
                    <Editform seteditform={seteditform} setEntry={setEntry} entry={entry} />
                </div>
            }
            <div className='flex flex-col w-[100%] items-center justify-center'>
                <table className='md:w-[80%]'>
                    <thead>
                        <tr className='border'>
                            <th className='border md:px-4 md:py-3'></th>
                            <th className='border md:px-4 md:py-3'>ID</th>
                            <th className='border md:px-4 md:py-3'>Name</th>
                            <th className='border md:px-4 md:py-3'>Phone</th>
                            <th className='border md:px-4 md:py-3'>Email</th>
                            <th className='border md:px-4 md:py-3'>Hobbies</th>
                            <th className='border md:px-4 md:py-3'></th>
                        </tr>
                    </thead>
                    {
                        loading ?
                            <tbody>
                                <tr>
                                    <td>Loading...</td>
                                </tr>
                            </tbody>
                            :
                            <tbody className='text-[grey]'>
                                {
                                    allEntries.length > 0 &&
                                    allEntries.map((e, i) => <TableRow setEntry={setEntry} seteditform={seteditform} key={i} e={e} i={i} setSelecTedItem={setSelecTedItem} selectedItems={selectedItems} />)
                                }
                            </tbody>
                    }
                </table>
                {
                    !editform &&
                    <div className="flex items-center justify-between w-[80%]">
                        <button className='bg-[teal] text-[white] py-2 px-4 w-[200px] border-none outline-none rounded-md mt-5 self-end' onClick={handleSend}>Send Details</button>
                        <button className='bg-[teal] text-[white] py-2 px-4 w-[200px] border-none outline-none rounded-md mt-5 self-end' onClick={() => setShowForm(true)}>Add</button>
                    </div>
                }
                {
                    err &&
                    <div className='text-center text-[red]'>no item selected !</div>
                }
                {
                    sendLoading && 
                    <div className='text-center text-[red]'>Sending Details...</div>
                }
            </div>
        </div>
    )
}

export default Table
