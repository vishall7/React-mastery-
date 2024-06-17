import React, { useRef, useState } from 'react'
import { LuAlignJustify } from "react-icons/lu";

function Task() {
    const inputRef = useRef(null)
    const [isReadOnly, setIsReadOnly] = useState(false)
    const [value, setValue] = useState('')
    const [isTaskDone, setIsTaskDone] = useState(false)

      

  return (
    <div className='w-full rounded-lg flex justify-between items-center p-2 border '>
      <div className='flex justify-start gap-x-1 px-1 items-center '>    
        <input 
        className='rounded-2xl w-4 h-4' 
        type='checkbox'
        onChange={()=>setIsTaskDone(!isTaskDone)}        
        />

        <input 
         ref={inputRef}
         className='w-full px-2 py-1 rounded-lg outline-none '
         style={{
            textDecorationLine: isTaskDone ? 'line-through' : 'none',
            textDecorationColor: isTaskDone ? 'gray' : 'black',
            color: isTaskDone ? 'gray' : 'black',
            }}
         type='text' 
         readOnly={isReadOnly} 
         placeholder='Enter a task...' 
         value={value} 
         onChange={(e) => setValue(e.target.value)}
         onKeyDown={e => e.key == "Enter" ? setIsReadOnly(!isReadOnly) : null} />
      </div>
      <div className='flex justify-end gap-x-1 p-1 mr-1 items-center '>       
       <LuAlignJustify className='w-4 h-4 text-zinc-600' />
      </div>
    </div>
  )
}

export default Task
