import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { MdClose } from "react-icons/md";
import { IoFlagSharp } from "react-icons/io5";
import { useCheckListContext } from '../contexts';

function TaskInfo({ task, positionClass, toggleDesc, showOrHideDesc}) {
  const [currentTaskPriority, setCurrentTaskPriority] = useState(task.priority); 
  const taskInfoRef = useRef(null); 
  const { toggleTaskInfo, removeTask, setPriority, duplicateTask } = useCheckListContext();  

  const handlePriority = (id, priority) => {  
    const newPriority = currentTaskPriority === priority ? "" : priority;
    setCurrentTaskPriority(newPriority);
    setPriority(id, newPriority);
    toggleTaskInfo(task.id);        
  };
  
  const getPriorityClasses = (priority) => {
    return currentTaskPriority === priority
      ? 'border-blue-500 bg-zinc-100'
      : ' hover:bg-zinc-100';
  };  

  const onDuplicateClick = () => {
    duplicateTask(task.id);
    toggleTaskInfo(task.id);
  }

  const onToggleDesc = () => {
    toggleDesc();
    toggleTaskInfo(task.id);
  }

  useEffect(()=>{
    let timeoutId;
    const handleClickOutside = (e) => {
      if (taskInfoRef.current && !taskInfoRef.current.contains(e.target)) {      
        timeoutId = setTimeout(() => {
          toggleTaskInfo(task.id);
        }, 250);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
  }, [task.id, toggleTaskInfo]);
 
  return (
    <div
      ref={taskInfoRef}
      className={`z-10 sm:w-[30%] w-[55%] text-[0.7rem] sm:text-sm rounded-lg border bg-white shadow-lg shadow-zinc-400 absolute sm:left-[calc(100%_-_37%)] left-[calc(100%_-_70%)] ${positionClass}`}>
      <div className='absolute left-[calc(100%_-_1.9rem)] sm:text-[0.9rem] cursor-pointer text-neutral-600 hover:bg-zinc-100 rounded-md p-2'
        onClick={() => toggleTaskInfo(task.id)}>
        <MdClose />
      </div>
      <div className='p-2 w-full  '>
                <h3 className='mb-2 cursor-default'>Priority</h3>
        <div className="w-full flex justify-between items-center gap-x-1 sm:px-2 ">
          <div
            onClick={() => handlePriority(task.id, "Low")}
            className={`flex justify-center items-center rounded-md p-[0.4rem] sm:p-2 text-lime-400 cursor-pointer border ${getPriorityClasses("Low")}`}>
            <IoFlagSharp className='' name='Low'/>
          </div>
          <div
            onClick={() => handlePriority(task.id, 'Medium')}
            className={`flex justify-center items-center rounded-md p-[0.4rem] sm:p-2 text-yellow-400 cursor-pointer border ${getPriorityClasses("Medium")}`}>
            <IoFlagSharp className='' name='Medium' />
          </div>
          <div        
            onClick={(e) => handlePriority(task.id, "High")}
            className={`flex justify-center items-center rounded-md p-[0.4rem] sm:p-2 text-orange-400 cursor-pointer border ${getPriorityClasses("High")}`}>
            <IoFlagSharp className='' name='High'/>
          </div>
          <div            
            onClick={() => handlePriority(task.id, "Extreme")}
            className={`flex justify-center items-center rounded-md p-[0.4rem] sm:p-2 text-red-400 cursor-pointer border ${getPriorityClasses("Extreme")}`}>
            <IoFlagSharp className='' name='Extreme'/>
          </div>
        </div>
      </div>

      <div className='w-full bg-slate-300 h-[1px] my-1'></div>

      <div className=' w-full my-2 flex flex-col gap-2 cursor-default'>        
        <h3 
        onClick={onToggleDesc}        
        className='px-3 py-1 hover:bg-zinc-200'
        >
          {showOrHideDesc ? 'Hide description' : 'Show description'}
        </h3>
        <h3
        onClick={() => onDuplicateClick()} 
        className='px-3 py-1 hover:bg-zinc-200'>Duplicate</h3>
      </div>

      <div className='w-full bg-slate-300 h-[1px] my-2'></div>

      <div
      onClick={() => removeTask(task.id)}
      >
        <h3 className='px-3 w-full my-2  hover:text-red-400 cursor-pointer'>Delete task</h3>
      </div>
    </div>
  );
}

export default TaskInfo;
