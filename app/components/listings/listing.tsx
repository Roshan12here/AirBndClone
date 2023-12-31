"use client"

import Image from "next/image"
import { SafeReservation, SafeUser } from '@/app/types'
import { Listing, Reservation } from '@prisma/client'
import React, { useCallback, useMemo } from 'react'
import {useRouter} from "next/navigation"
import useCountries from '@/app/hooks/WorldlCountry'
import {format} from "date-fns"
import HeartButton from "../HeartButton"
import Button from "../Button"
import { SafeListing } from "@/app/types"

interface ListingCardProsp {
    data: SafeListing,
reservation?:SafeReservation,
onAction?:(id:string) => void
disabled?:boolean
actionLabel?:string
actionid?:string
currentuser?:SafeUser | null
}


const ListingPage :React.FC<ListingCardProsp> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionid ='',
    currentuser
}) => {
    const router = useRouter()

const {getByValue} = useCountries()

const location = getByValue(data.locationValue)

const handleCancel = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
e.stopPropagation()

if(disabled) {
    return
}

onAction?.(actionid)


},[actionid,disabled,onAction ])

const price = useMemo(()=>{
if(reservation){
    return reservation.totalPrice
}


return data.price

},[reservation,data.price])


const ReservationData =useMemo(()=>{
if(!reservation){
    return null
}


const start = new Date(reservation.startDate)
const end = new Date(reservation.endDate)

return `${format(start, 'PP' )} - ${format(end, 'PP' )} `



},[reservation])

    return (
    <div 
    onClick={()=>router.push(`/listings/${data.id}`)}
    className='
    col-span-1 cursor-pointer group
    '>
<div className='flex flex-col gap-2 w-full'>
<div className='
aspect-square 
w-full
relative
overflow-hidden
rounded-xl
'>
<Image
fill
alt="Listings"
src={data.imageSrc}
className="
object-cover
h-full
w-full
group-hover:scale-110
transition 
"
/>
<div className="absolute top-3 right-3">
<HeartButton
listingId={data.id}
currentUser={currentuser}
/>
</div>
</div>
<div className="font-semibold text-lg">
{location?.region}, {location?.label} 
</div>
<div className="
font-light text-neutral-500
">
{ReservationData  || data.category  }
</div>
<div className="
flex flex-row items-center gap-1
">
<div className="font-semibold">
${price}
</div>
{!reservation && (
    <div className="font-light">
         Night
    </div>
)}
</div>
{
    onAction && actionLabel &&(
        <Button
        disabled={disabled}
small
label={actionLabel}
onClick={handleCancel}
        />
    )
}
</div>
    </div>
  )
}

export default ListingPage
