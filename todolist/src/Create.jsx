import React from 'react'
import axios from 'axios'
import './App.css'


function Create() {
  const [task,setTask]=React.useState()
  const handleAdd=()=>{
    axios.post('https://todo-eb97.onrender.com/add',{task:task})
    .then(result=>{
      location.reload()
    })
    .catch(err=>console.log(err))
  }
  
  return (   
    <div className='create_form'>
        <input type="text" placeholder='Enter Task' onChange={(e)=>setTask(e.target.value)}/>
        <button type="button" onClick={handleAdd}>Add</button>
     </div>  
    
  )
}

export default Create