'use client'

import React, { useCallback, useState } from 'react'
import { SafeReservation, SafeUser } from '../types'
import Container from '../components/Container';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingHead from '../components/listings/ListingHead';
import ListingPage from '../components/listings/listing';

interface TripsClientProps {
    reservation : SafeReservation[];
    currentuser:SafeUser | null;
} 


const TripsClient :React.FC<TripsClientProps> = ({
    reservation,
    currentuser
}) => {

    const router = useRouter()
    const [deletingID,setDeletingID] = useState('')

const OnCancel = useCallback((id:string)=>{
setDeletingID(id)

axios.delete(`/api/reservations/${id}`)
.then(()=>{
    toast.success("Reservaation Cancelled")
    router.refresh()
})
.catch((error)=>{
toast.error(error?.response?.data?.error)
})

.finally(()=>{
    setDeletingID('')
})

},[router])


  return (
    <Container>
        <Heading
        title='Trips'
        subtitle='Where you have been and where are you going'
        center
        />
        <div
        className='
        mt-10
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
        '
        >
{reservation.map((reservation)=>(
    <ListingPage
    key={reservation.id}
    data={reservation.listing}
    reservation={reservation}
    actionid={reservation.id}
    onAction={OnCancel}
    disabled={deletingID === reservation.id}
    actionLabel='Cancel Reservation'
    currentuser={currentuser}
    />
))}
        </div>
    </Container>
  )
}

export default TripsClient
