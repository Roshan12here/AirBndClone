'use client'

import { useEffect, useState } from "react"
import EmptyState from "./components/EmptyState"

interface ErrorStatteProps {
    error:Error
} 

const ErrorState:React.FC<ErrorStatteProps> =({
    error
})=>{
    useEffect(()=>{
console.log(error)
    },[error])

return (
    <EmptyState
     title="UH OH"
    subtitle="Something went wrong"
    />   
)

}

export default ErrorState