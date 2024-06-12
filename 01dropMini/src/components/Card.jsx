import React from 'react'
import { FaRegFileAlt } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion"

function Card({card, refrence}) {
  return (
    <motion.div drag dragConstraints={refrence} whileDrag={{scale: 1.1}} dragElastic={0.1} dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }} 
    className='relative flex-shrink-0 w-52 h-64 rounded-[40px] bg-zinc-900/90 text-white px-8 py-10 overflow-hidden text-sm font-semibold cursor-grab'>
        <FaRegFileAlt/>
        <p className='text-sm leading-tight mt-5 font-semibold'>{card.desc}</p>
        <div className='footer absolute bottom-0 left-0 w-full '>
            <div className='flex justify-between items-center py-3 px-8 mb-3'>
                <div>{card.filesize}</div>
                <span className='bg-zinc-600 w-6 h-6 flex items-center justify-center rounded-full'>
                    {card.close ? <IoClose/> : <MdOutlineFileDownload size="1em" color='#fff'/>}                    
                </span>
            </div>
            {card.tag.isOpen && (
                    <div className='tag w-full py-3 flex items-center justify-center' 
                    style={{ backgroundColor: card.tag.tagColor }}>
                        <h3 className='text-sm'>{card.tag.tagTitle}</h3>
                    </div>
                )}
        </div>
    </motion.div>
  )
}

export default Card
