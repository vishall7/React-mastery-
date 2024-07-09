import { useState } from 'react'
import { CheckListContextProvider } from "./contexts"
import Task from "./components/Task"
import TaskInfo from "./components/TaskInfo"
// i will add context here
  // will define the state of the tasks(list of tasks)
  // will define state of the checklist(wether it have task or not),
  // will define state of the taskinfo(wether it is open or not),
  // if open will show the taskinfo and manage other UI elements  

function App() {   
  const [tasks, setTasks] = useState([])
  const [openTaskInfoId, setOpenTaskInfoId] = useState(null);
  const [taskErrorId, setTaskErrorId] = useState(null);  
  const [newTask, setNewTask] = useState({
    id: Date.now(),
    task: "",
    description: "",
    priority: "",
    isDone: false,
  })
  
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
    setTasks((prev) => prev.map((eachTask) => eachTask.id === id ? {...eachTask, priority}  : eachTask))
    tasks.map((task) => task.id === id && task.task === '' ? setTaskErrorId(task.id) : null)
    setTimeout(() => setTaskErrorId(null), 2000);    
  }
  
    
  const addTaskTolist = (task) => {
    if (tasks.length === 0 || tasks[tasks.length - 1].task.trim() !== "") {
      addTask(task);
      setNewTask({
        id: Date.now(),
        task: "",
        description: "",
        priority: "",
        isDone: false,
      })
      setTaskErrorId(null);
    }     
    else {
      setTaskErrorId(tasks[tasks.length - 1].id); 
      setTimeout(() => setTaskErrorId(null), 2000);               
    }       
  }  

  return (
    <CheckListContextProvider value={{tasks, addTask, updateTask, removeTask, updateDescription, toggleTaskInfo, toggleComplete, setPriority}}>
    <div className='App w-full h-screen flex justify-center items-center bg-sky-500'>
      <div className='w-2/5 h-full border border-t-8 border-b border-slate-500 rounded-xl shadow-zinc-300 flex flex-col bg-slate-50'>
        <div className='w-full px-5 p-3 border-b'>
          <h1 className='text-2xl font-semibold '>My Tasks</h1>
        </div>
        <div className='p-4 w-full h-full overflow-y-scroll bg-slate-100 scroll-smooth'>
          {tasks.length === 0 && 
            <div className='w-full h-full flex justify-center items-center text-xl text-zinc-400'>
              <h3>No tasks added</h3>
            </div>
          }
          {tasks.map((task) => 
              <div key={task.id} className='w-full my-4'>
                <Task                           
                isTaskInfoOpen={openTaskInfoId === task.id}
                task={task}
                taskError={taskErrorId === task.id}
                />                
              </div>
            )
          }          
        </div>
        <div className='w-full flex justify-end gap-4 items-center pt-5 p-2 border'>
          <h3 className='text-sm text-slate-600'>{true ? 'add your task here' : 'enter your task details first'}</h3>
          <button 
          className='border p-2 bg-slate-500 rounded-xl text-sm text-white hover:bg-slate-600'
          onClick={() => addTaskTolist(newTask)}
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
