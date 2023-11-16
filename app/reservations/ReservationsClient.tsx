'use client'

import toast from "react-hot-toast"
import axios from "axios"
import { useCallback,useState } from "react"
import { useRouter } from "next/navigation"
import { SafeReservation,SafeUser } from "../types"

import Heading from "../components/Heading"
import Container from "../components/Container"
import ListingPage from "../components/listings/listing"

interface ReservationsClientProps {
  reservations:SafeReservation[],
  currentuser?:SafeUser | null
}

const ReservationsClient:React.FC<ReservationsClientProps> = ({
  reservations,
  currentuser
}) => {
  const router = useRouter();
  const [deletingId,setdeletingId] = useState('')

const onCancel = useCallback((id:string)=>{
setdeletingId(id)

axios.delete(`/api/reservations/${id}`)
 .then(()=>{
  toast.success('Reservation Cancelled')
 })
.catch(()=>{
  toast.error('Something went wrong')
})
.finally(()=>{
  setdeletingId('')
})
},[router])  

  return (
    <Container>
      <Heading
      title="Reservations"
      subtitle="Bookings on your properties"
      />
      <div 
      className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
      lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  gap-8
      "
      >
{reservations.map((reservation)=>(
  <ListingPage
  key={reservation.id}
  data={reservation.listing}
  reservation={reservation}
  actionid={reservation.id}
  onAction={onCancel}
  disabled ={deletingId === reservation.id}
  actionLabel='Cancel guest Reservations'
  currentuser={currentuser} 
  />
))}
      </div>
    </Container>
  )
}

export default ReservationsClient
