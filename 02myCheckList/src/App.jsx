import { useState } from 'react'
import Task from './components/Task'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App w-full h-screen flex justify-center items-center'>
      <div className='w-full h-1/2 border border-t-8 border-zinc-400 rounded-xl shadow-md shadow-zinc-300'>
        <div className='w-full border-b border-zinc-300 px-4 p-3'>
          <h1 className='text-2xl font-mono font-semibold '>My CheckList</h1>
        </div>
        <div className='p-4 w-full h-3/5 '>
          <Task/>
        </div>
      </div>
    </div>    
  )
}

export default App
