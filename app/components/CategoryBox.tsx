"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import {IconType} from 'react-icons'
import QU from 'query-string'

interface CategoryBoxProps {
    icon:IconType,
    label:string,
    selected?:boolean
}

const CategoryBox :React.FC<CategoryBoxProps> =({
    icon:Icon,
    label,
    selected
})=>{

    const router =useRouter()
const param =useSearchParams()

const handleClick=useCallback(()=>{
let currnetQuery = {}

if(param){
currnetQuery=QU.parse(param.toString())
}

const updatedQuery :any ={
    ...currnetQuery,
    category: label
} 

if(param?.get('category') === label){
delete updatedQuery.category
}

const url =QU.stringifyUrl({
    url:'/',
    query:updatedQuery
},{skipNull :true})

router.push(url)

},[label,param,router])

    return  (
<div className={`flex flex-col justify-center items-center gap-2 p-3 border-b-3 hover:text-neutral-800 transition cursor-pointer ${selected ? 'border-b-neutral-800' :'border-transparent'}
${selected ? "text-neutral-500" :"text-neutral-800"}
`
}
onClick={handleClick}
>
<Icon size={28}/>
<div className='font-medium test-sm'>
{label}
</div>
</div>
    )
}


export default CategoryBox