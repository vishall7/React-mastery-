import React from 'react';
import { useState } from 'react';
import { MdClose } from "react-icons/md";
import { IoFlagSharp } from "react-icons/io5";
import { useCheckListContext } from '../contexts';

function TaskInfo({ task, positionClass, toggleDesc, showOrHideDesc}) {
  const [currentTaskPriority, setCurrentTaskPriority] = useState(null);
  const { toggleTaskInfo, removeTask, setPriority } = useCheckListContext();
    
  const handlePriority = (id, priority) => {
    setPriority(task.id, priority);
    setCurrentTaskPriority((prev) => prev === priority ? null : priority);
  }

  console.log('currentTaskPriority -', currentTaskPriority)

  return (
    <div 
      className={`z-10 w-[45%]  rounded-lg border bg-white shadow-lg shadow-zinc-400 absolute left-[calc(100%_-_55%)] ${positionClass}`}>
      <div className='absolute left-[calc(100%_-_1.9rem)] text-[0.9rem] cursor-pointer text-neutral-600 hover:bg-zinc-100 rounded-md p-2'
        onClick={() => toggleTaskInfo(task.id)}>
        <MdClose />
      </div>
      <div className='p-3 w-full'>
                <h3 className='mb-2 text-[1rem] cursor-default'>Priority</h3>
        <div className="w-full flex justify-between items-center gap-3 ">
          <div
            onClick={() => handlePriority(task.id, "Low")}
            className='w-full flex justify-center items-center rounded-md p-2 text-lime-400 hover:bg-zinc-100 cursor-pointer border hover:border-blue-500'>
            <IoFlagSharp className='h-4 w-full' name='Low'/>
          </div>
          <div 
          onClick={() => handlePriority(task.id, 'Medium')}
          className='w-full flex justify-center items-center rounded-md p-2 text-yellow-400 hover:bg-zinc-100 cursor-pointer border hover:border-blue-500'>
            <IoFlagSharp className='h-4 w-full' name='Medium' />
          </div>
          <div           
          onClick={(e) => handlePriority(task.id, "High")}
          className='w-full flex justify-center items-center rounded-md p-2 text-orange-400 hover:bg-zinc-100 cursor-pointer border hover:border-blue-500'>
            <IoFlagSharp className='h-4 w-full' name='High'/>
          </div>
          <div 
          onClick={() => handlePriority(task.id, "Extreme")}
          className='w-full flex justify-center items-center rounded-md p-2 text-red-400 hover:bg-zinc-100 cursor-pointer border hover:border-blue-500'>
            <IoFlagSharp className='h-4 w-full' name='Extreme'/>
          </div>
        </div>
      </div>

      <div className='w-full bg-slate-300 h-[1px] my-2'></div>

      <div className=' w-full my-2 text-[1rem] flex flex-col gap-2 cursor-default'>        
        <h3 
        onClick={toggleDesc}        
        className='px-3 py-1 hover:bg-zinc-200'
        >
          {showOrHideDesc ? 'Hide description' : 'Show description'}
        </h3>
        <h3 className='px-3 py-1 hover:bg-zinc-200'>Duplicate</h3>
      </div>

      <div className='w-full bg-slate-300 h-[1px] my-2'></div>

      <div
      onClick={() => removeTask(task.id)}
      >
        <h3 className='px-3 w-full my-2 text-[1rem] hover:text-red-400 cursor-pointer'>Delete task</h3>
      </div>
    </div>
  );
}

export default TaskInfo;
