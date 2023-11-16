'use client'
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { catagories } from "@/app/components/navbar/Categories";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types"

import { useCallback, useEffect, useMemo, useState } from "react";
import useLoginModal from '@/app/hooks/UseLoginModal'
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { Range } from "react-date-range";


const initialDateRange = {
startDate:new Date(),
endDate:new Date(),
key:'selection'
}


interface listingClientProps {
    reservations?:SafeReservation[],
    listing:SafeListing &{
        user:SafeUser
    };
    currentuser:SafeUser | null
}

const listingClient :React.FC<listingClientProps> =({
    listing,
    reservations=[],
    currentuser
})=>{

const loginModal = useLoginModal()

const router = useRouter()


const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

const [isloading,SetisLoading] =useState(false)
const [totalPrice,setTotalPrice] =useState(listing.price)
const [daterange,SetDaateRange] = useState<Range>(initialDateRange)

const onCreateReservation =useCallback(()=>{
if(!currentuser){
    loginModal.onOpen();
}

SetisLoading(true)


axios.post('/api/reservations',{
    totalPrice,
    startDate:daterange.startDate,
    endDate:daterange.endDate,
    listingId:listing?.id
})
.then(()=>{
    toast.success('Listing Created')
SetDaateRange(initialDateRange)
router.push('/trips')
})
.catch(()=>{
    toast.error('Something Went wrong')
})
.finally(()=>{
    SetisLoading(false)
})
},[
     totalPrice,
     daterange,
     listing?.id,
     router,
     loginModal,
     currentuser
]) 
 

useEffect(()=>{
if(daterange.startDate && daterange.endDate){
    const dayCount =differenceInCalendarDays(
        daterange.startDate,
        daterange.endDate
    )
    if(dayCount && listing.price){
        setTotalPrice(dayCount*listing.price)
    }else{
        setTotalPrice(listing.price)
    }
};

},[daterange,listing.price])


    const category =useMemo(()=>{
return catagories.find((item) => item.label === listing.category)
    },[listing.category]);
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
<div className="flex flex-col gap-6">
<ListingHead

title={listing.title}
imageSrc={listing.imageSrc}
locationvalue = {listing.locationValue}
id={listing.id}
currentuser = {currentuser}
/>
<div 
className="
grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6
"
>
<ListingInfo
// detinitialTime={listing.price}
user={listing.user}
category={category}
description={listing.description}
roomCount = {listing.roomCount}
bathroomCount={listing.bathroomCount}
guestCount={listing.guestCount}
locationValue ={listing.locationValue}
/>
<div 
className="
order-first
md:order-last
mb-10
md:col-span-3
"
>
<ListingReservation
price={listing.price}
totalprice={totalPrice}
onChangeData={(value) => SetDaateRange(value)}
dateRange={daterange}
onSubmit={onCreateReservation}
disabled={isloading}
disabledDates={disabledDates}
/>
</div>
</div>
</div>
            </div>
        </Container>
    )
}


export default listingClient
  