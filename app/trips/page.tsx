import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReaservations";
import TripsClient from "./TripsClient";

const TripsPage = async ()=>{
const currentuser = await getCurrentUser()

if(!currentuser){
return <ClientOnly>
    <EmptyState
    title="Unautherized"
    subtitle="Please Login"
    />
</ClientOnly>
}

const reservation = await getReservations({
    userId:currentuser.id
})

if(reservation.length === 0){
    return <ClientOnly>
        <EmptyState
        title="No trips found"
        subtitle='Looks like you have not reserved any trips'
        />
    </ClientOnly>
}

return (
    <ClientOnly>
        <TripsClient
        reservation={reservation}
        currentuser={currentuser}
        />
    </ClientOnly>
)

}

export default TripsPage