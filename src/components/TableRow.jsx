import axios from 'axios'
import React, {useState} from 'react'
import { AiFillDelete, AiFillEdit } from "react-icons/ai"

const TableRow = ({seteditform, e, i, setEntry,setSelecTedItem, selectedItems}) => {
  const [err, setErr] = useState(false)
  const handleEdit = async () =>{
    try{
      const response = await axios.get(`http://localhost:7000/api/v1/entries/${e._id}`)
      console.log(response.data)
      setEntry(response.data)
      seteditform(true)
    }catch(err){
      setErr(true)
      console.log(err)
    }
  }

  const handleDelete = async () =>{
    try{
      const response = await axios.delete(`http://localhost:7000/api/v1/entries/remove/${e._id}`)
      console.log(response)
      window.location.reload()
    }catch(err){
      console.log(err)
    }
  }

  const setItemChange = () => {
    if (selectedItems.some(item => item._id === e._id)) {
      // Remove the item if it's already in the selectedItems array
      const filteredItems = selectedItems.filter(item => item._id !== e._id);
      setSelecTedItem(filteredItems);
    } else {
      // Add the item to the selectedItems array
      setSelecTedItem([...selectedItems, e]);
    }
  };

  return (
    <tr className='border'>
        <td className='md:px-4 py-3 border'>
            <input type='checkbox' onChange={setItemChange} />
        </td>
        <td className='md:px-4 md:py-3 border'>{e._id}</td>
        <td className='md:px-4 md:py-3 border'>{e.name}</td>
        <td className='md:px-4 md:py-3 border'>{e.email}</td>
        <td className='md:px-4 md:py-3 border'>{e.phone}</td>
        <td className='md:px-4 md:py-3 border'>
          {e.hobbies}
        </td>
        <td className='md:px-4 md:py-3 border flex gap-5 items-center'>
          <AiFillEdit className='text-[green] text-2xl cursor-pointer' onClick={handleEdit} />
          <AiFillDelete className='text-[tomato] text-2xl cursor-pointer' onClick={handleDelete}/>
        </td>
    </tr>
  )
}

export default TableRow
