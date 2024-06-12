import React, { useRef } from 'react'
import Card from './Card'

function Foreground() {

    const ref = useRef(null);
    console.log(ref);    
    
    const data = [
        {
            desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
            filesize: "0.9mb",
            close: true,
            tag: {
                isOpen: true,
                tagTitle: "Download now",
                tagColor: "green" 
            } 
        },
        {
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
          filesize: "0.9mb",
          close: true,
          tag: {
              isOpen: false,
              tagTitle: "Download now",
              tagColor: "green" 
          } 
      },
      {
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
        filesize: "0.9mb",
        close: true,
        tag: {
            isOpen: true,
            tagTitle: "Download now",
            tagColor: "skyblue" 
        } 
    }
    ]

  return (
    <div ref={ref} className='fixed z-[3] top-0 left-0 w-full h-full flex gap-10 flex-wrap p-5'>
       {data.map((card, index) => (
          <Card card={card} refrence={ref} />  
       ))} 
    </div>
  )
}

export default Foreground
