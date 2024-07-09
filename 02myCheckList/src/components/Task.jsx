import React, { useEffect, useRef, useState } from 'react';
import { LuAlignJustify } from "react-icons/lu";
import { useCheckListContext } from '../contexts';
import TaskInfo from './TaskInfo';

function Task({ task, isTaskInfoOpen, taskError }) {
  const [taskValue, setTaskValue] = useState(task.task);
  const [description, setDescription] = useState(task.description);
  const [isTaskDone, setIsTaskDone] = useState(task.isDone);
  const [isTaskReadOnly, setIsTaskReadOnly] = useState(false);
  const [isDescReadOnly, setIsDescReadOnly] = useState(false); 
  const [positionClass, setPositionClass] = useState('top-[100%]');
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [priorityColors, setPriorityColors] = useState({});   

  const descriptionRef = useRef(null);
  const taskRef = useRef(null);

  const { updateTask, updateDescription, toggleTaskInfo, tasks, toggleComplete } = useCheckListContext();

  const colors = [    
    { name: 'Low', border: '#a3e635', bg: '#ecfccb', afterCheckBg: '#a3e635'},
    { name: 'Medium', border: '#facc15', bg: '#fef9c3', afterCheckBg: '#facc15' },
    { name: 'High', border: '#fb923c', bg: '#ffedd5', afterCheckBg: '#fb923c' },
    { name: 'Extreme', border: '#f87171', bg: '#fee2e2', afterCheckBg: '#f87171' }
  ]

  useEffect(()=>{
    if(taskValue.trim() !== '') {
      const colorObject = colors.find(color => color.name === task.priority);
      setPriorityColors(colorObject);
    }
  }, [task.priority])   
  
  
  const onTaskChange = (e) => {
    setTaskValue(e.target.value);
    updateTask(task.id, e.target.value);
  };

  const onDescChange = (e) => {
    setDescription(e.target.value);
    updateDescription(task.id, e.target.value);
  };  

  useEffect(() => {
    const handleSize = () => {
      if (descriptionRef.current) {
        descriptionRef.current.style.height = 'auto';
        descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
      }
    };
    handleSize();
  }, [isDescOpen, description]);

  useEffect(() => {
    if (taskRef.current) {
      const { top } = taskRef.current.getBoundingClientRect();     
      setPositionClass(top > window.innerHeight / 2 ? 'bottom-[0%]' : 'top-[0%]');      
    }
  }, [isTaskInfoOpen]);

  
  return (
    <>
    <div ref={taskRef} className='relative w-full rounded-lg flex flex-col gap-2 items-center p-2 bg-slate-50 shadow-xl '>
      <div className='w-full flex justify-between gap-x-1 px-1 items-center'>
        <input
          className=' w-5 h-5 appearance-none border-2 rounded shrink-0'
          style={{
            backgroundColor:  isTaskDone ? priorityColors.afterCheckBg || '#94a3b8' : priorityColors.bg || '#e2e8f0',
            borderColor: priorityColors.border || '#94a3b8',  
          }}
          type='checkbox'
          checked={isTaskDone}
          onChange={() => setIsTaskDone(!isTaskDone) && toggleComplete(task.id)}
        />

        <input
          className='w-full px-2 py-1 rounded-lg outline-none text-[1rem] truncate bg-inherit'
          style={{
            textDecorationLine: (isTaskDone && taskValue) ? 'line-through' : 'none',
            textDecorationColor: isTaskDone ? 'gray' : 'black',
            color: isTaskDone ? 'gray' : 'black',
          }}
          type='text'
          readOnly={isTaskReadOnly}
          placeholder='Enter a task...'
          value={taskValue}
          maxLength={40}
          onChange={(e) => onTaskChange(e)}
          onKeyDown={(e) => e.key === 'Enter' && setIsTaskReadOnly(!isTaskReadOnly)}
          onDoubleClick={() => setIsTaskReadOnly(!isTaskReadOnly)}
        />

        <div className='flex justify-end gap-x-1 p-1 mr-1 items-center'>
          <LuAlignJustify
            className='w-4 h-4 text-zinc-600 cursor-pointer'
            onClick={()=>toggleTaskInfo(task.id)}
          />
        </div>
      </div>
      {
        isDescOpen && 
        <div className='w-full text-slate-600'>
          <textarea
            ref={descriptionRef}
            className='w-[90%] ml-6 rounded-lg border outline-none p-4 h-40 bg-inherit'
            name="description"
            id="textarea"
            placeholder='Description...'
            value={description}
            readOnly={isDescReadOnly}
            onKeyDown={(e) => e.key === 'Enter' && setIsDescReadOnly(!isDescReadOnly)}
            onDoubleClick={() => setIsDescReadOnly(!isDescReadOnly)}
            onChange={(e) => onDescChange(e)}
            style={{
              overflowWrap: 'break-word',
              whiteSpace: 'pre-wrap',
              boxSizing: 'border-box',
              padding: '0.5rem',
              resize: 'none',
              overflow: 'hidden',
            }}
            >
          </textarea>
        </div>
      }     
            
      {
        isTaskInfoOpen && 
        <TaskInfo 
          task={task} 
          positionClass={positionClass} 
          toggleDesc={()=>setIsDescOpen(!isDescOpen)}
          showOrHideDesc={isDescOpen}          
        />
      }
    </div>
    {taskError && <p className='text-red-500 px-2 '>task needs to have a value</p>}
    </>
  );
}

export default Task;
