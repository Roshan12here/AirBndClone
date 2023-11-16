'use client'

import { IconType } from "react-icons"



interface ListCategoryProps {
icon:IconType
label:string
description:string
}

const ListCategory :React.FC<ListCategoryProps> = ({
     icon:Icon,
     label,
     description
}) => {
  return (
    <div 
    className="flex flex-col gap-8"
    >
<div 
className="flex flex-row  items-center gap-4"
>
<Icon
size={48}
 className="text-neutral-800"
/>
<div 
className="flex flex-col"
>
<div 
className="text-lg font-semibold"
>
{label}
</div>
<div className="
text-neutral-500 font-light
">
{description}
</div>
</div>
</div>
    </div>
  )
}

export default ListCategory
