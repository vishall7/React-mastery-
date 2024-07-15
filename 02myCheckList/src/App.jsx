import { useEffect, useState } from 'react'
import { CheckListContextProvider } from "./contexts"
import Task from "./components/Task"

// i will add context here
  // will define the state of the tasks(list of tasks)
  // will define state of the checklist(wether it have task or not),
  // will define state of the taskinfo(wether it is open or not),
  // if open will show the taskinfo and manage other UI elements  

function App() {   
  const [tasks, setTasks] = useState([])
  const [openTaskInfoId, setOpenTaskInfoId] = useState(null);
  const [taskErrorId, setTaskErrorId] = useState(null);
 const [taskCompleted, setTaskCompleted] = useState([]);
  
  const addTask = (task) => {    
    setTasks((prev) => [...prev, task])
  }

  const updateTask = (id, task) => {
    setTasks((prev) => prev.map((eachTask) => eachTask.id === id ? {...eachTask, task} : eachTask))
  } 

  const removeTask = (id) => {
    setTasks((prev) => prev.filter((eachTask) => eachTask.id !== id))
  }  
   
  const updateDescription = (id, description) => {
    setTasks((prev) => prev.map((eachTask) => eachTask.id === id ? {...eachTask, description} : eachTask))
  }

  const toggleTaskInfo = (id) => {    
    setOpenTaskInfoId(prev => prev === id ? null : id);
  };

  const toggleComplete = (id) => {
    setTasks((prev) => prev.map((eachTask) => eachTask.id === id ? {...eachTask, isDone: !eachTask.isDone} : eachTask)) 
  }

  const setPriority = (id, priority) => {    
    setTasks((prev) => {
      return prev.map((eachTask) => {
        if(eachTask.id === id) {
          if(eachTask.task.trim() !== '') {
            return {...eachTask, priority}
          }else {
            setTaskErrorId(eachTask.id);
            setTimeout(() => setTaskErrorId(null), 2000);
          }
        }
        return eachTask
      })
    })   
  }
  
  const duplicateTask = (id) => {
    setTasks((prev) => {
      const index = prev.findIndex((eachTask) => eachTask.id === id);
      if(index !== -1) {
        const originalTask = prev[index];
        if(originalTask.task.trim() !== '') {
          const taskToBeduplicated = {...originalTask, id: Date.now(), creationTime: new Date()}
          const newTasks = [...prev]
          newTasks.splice(index + 1, 0, taskToBeduplicated);
          return newTasks;  
        }else {
          setTaskErrorId(originalTask.id);
          setTimeout(() => setTaskErrorId(null), 2000);
        }
      }
      return prev;
    })
  } 
  
  const formatDate = (date) => {    
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1); 
    if (today.toDateString() === date.toDateString()) {
      return "Today, " + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });       
    } else if(yesterday.toDateString() === date.toDateString()) {
      return "Yesterday, " + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    } else {
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true });
    } 
    
  }  

  const addTaskTolist = () => {
    if (tasks.length === 0 || tasks[tasks.length - 1].task.trim() !== "") {
      const newTask = {
        id: Date.now(),
        task: "",
        description: "",
        priority: "",
        isDone: false,
        creationTime:new Date(),
      };
      addTask(newTask);      
      setTaskErrorId(null);
    }     
    else {
      setTaskErrorId(tasks[tasks.length - 1].id); 
      setTimeout(() => setTaskErrorId(null), 2000);               
    }       
  } 

  useEffect(()=>{
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if(tasks && tasks.length) setTasks(tasks);
  },[])

  useEffect(()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
  },[tasks]) 

  useEffect(()=>{
    tasks.map((task) => {
      if (task.task.trim() === "") {
        setTimeout(() => {
          setTasks(prev => prev.filter(eachTask => eachTask.id !== task.id))
        }, 10000);
      }
      return task
    })
  },[addTask, addTaskTolist])
  
  
  
  return (
    <CheckListContextProvider value={{tasks, addTask, updateTask, removeTask, updateDescription, toggleTaskInfo, toggleComplete, setPriority, duplicateTask}}>
    <div className='App w-full h-screen flex justify-center items-center bg-slate-400'>
      <div className='w-[90%] md:w-3/5 lg:w-1/2 h-[95%] border border-t-8 border-b border-slate-600 rounded-2xl shadow-lg shadow-slate-600 flex flex-col bg-slate-50'>
        <div className='w-full px-5 py-2 border-b flex justify-between items-center'>
          <h1 className='text-2xl font-semibold '>My Tasks</h1>
          <div className='flex flex-col justify-center items-end '>
            <p>total tasks: {tasks.length}</p>            
          </div>
        </div>
        <div className='p-4 w-full h-full overflow-y-scroll bg-slate-100 scroll-smooth'>          
          {tasks.length === 0 && 
            <div className='w-full h-full flex justify-center items-center text-lg text-slate-400'>
              <h3>No tasks added</h3>
            </div>
          }
          {tasks.map((task) => 
              <div key={task.id} className='w-full mt-0 my-3'>               
                <div className='w-full px-1 text-slate-500 text-[0.7rem]'>
                  <p>{formatDate(new Date(task.creationTime))}</p> 
                </div>
                <Task                           
                isTaskInfoOpen={openTaskInfoId === task.id}
                task={task}
                taskError={taskErrorId === task.id}
                />                
              </div>
            )
          }                          
        </div>
        <div className='w-full flex justify-end gap-4 items-center p-2 px-4 border rounded-b-2xl'>
          <h3 className='text-sm text-slate-600'>{true ? 'add your task here' : 'enter your task details first'}</h3>
          <button 
          className='border p-2 bg-slate-600 rounded-xl text-sm text-white hover:bg-slate-700'
          onClick={() => addTaskTolist()}
          >
            + new task
          </button>
        </div>
      </div>
    </div>
    </CheckListContextProvider>    
  )
}

export default App
