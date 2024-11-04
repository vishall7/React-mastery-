import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function App() {
  const { register, handleSubmit } = useForm();


  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input className='border-2 border-orange-500 m-10' type="text" {...register('firstName')} placeholder="First Name" />
        <input className='border-2 border-orange-500 m-10' type="text" {...register('lastName')} placeholder="Last Name" />
        <input className='border-2 border-orange-500 m-10' type="text" {...register('age')} placeholder="Age" />
        <input className='border-2 border-slate-500 p-4 m-10' type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default App

