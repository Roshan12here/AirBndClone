import getCurrentUser from '@/app/actions/getCurrentUser'
import getListingByid from '@/app/actions/getListingbyId'
import ClientOnly from '@/app/components/ClientOnly'
import EmptyState from '@/app/components/EmptyState'
import ListingClient from './listingClient'
import getReservations from '@/app/actions/getReaservations'

interface IParams {
  listingid?:string
}

//   userouter is not used because it is a server component and we canot use hooks in it
const Listingpage =async ({params} :{params:IParams}) => {
  const listing=await getListingByid(params)
  const Reservation = await getReservations(params)
const currentuser = await getCurrentUser()
  
if(!listing){
  return <ClientOnly>
    <EmptyState/>
  </ClientOnly>
}

  return (
    <ClientOnly>
      <ListingClient
          listing={listing}
          reservations={Reservation}
          currentuser={currentuser} 
      />
    </ClientOnly>
  )
}

export default Listingpage
