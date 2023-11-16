"use client"

import {CldUploadWidget} from "next-cloudinary"
import Image from "next/image"
import { useCallback } from "react"
import {TbPhotoPlus} from "react-icons/tb"

declare global {
    var cloudinary :any
}

interface imageUploadProps {
    onChange:(value :string) => void,
    value:string,
}

const UploadImg:React.FC<imageUploadProps> = ({
    onChange,
    value
}) => {

const HandleUploads = useCallback((result:any) => {
onChange(result.info.secure_url)
},[onchange])

  return (
    <div>
      
<CldUploadWidget
onUpload={HandleUploads}
uploadPreset="iltqgz62"
options={{
    maxFiles:1
}}
>
    {({open}) => {
     return (
        <div 
        onClick={()=> open?.()}
        className="
        relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center
        items-center gap-4 text-neutral-600  
        "
        >
<TbPhotoPlus size={52}/>
<div className="text-semibold  text-lg ">
Click to Upload
</div>

{value && (
    <div 
    className="absolute inset-8 w-full h-full"
    >
<Image
alt="Upload"
fill
style={{objectFit :'cover'}}
src={value}
/>
    </div>
) }

        </div>
     )   
    }}
</CldUploadWidget>

    </div>
  )
}

export default UploadImg
