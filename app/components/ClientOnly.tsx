"use client"

import React, { useEffect, useState } from 'react'


interface ClientOnlyProps {
  children:React.ReactNode
}


const ClientOnly:React.FC<ClientOnlyProps>= ({
  children
}) => {
const [ismounted,setismounted] =useState(false)

useEffect(()=>{
setismounted(true)
},[])

if(!ismounted){
return null
}

return (
    <div>
      {children}
    </div>
  )
}

export default ClientOnly
