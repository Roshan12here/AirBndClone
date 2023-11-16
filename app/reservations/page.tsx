import EmptyState from "../components/EmptyState";

import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReaservations";
import ReservationsClient from "./ReservationsClient";

const ReservationPage = async ()=>{
const currentuser = await getCurrentUser()

if(!currentuser){
    return (
        <ClientOnly>
            <EmptyState
            title="Unautherized"
            subtitle="Please Login"
            />
        </ClientOnly>
    )
}

const reservations = await getReservations({
    authorId:currentuser.id
})

if(reservations.length === 0){
    return (
        <ClientOnly>
            <EmptyState
            title="No Reservations found"
            subtitle="Looks like you have no reservations on your properties"
            />
        </ClientOnly>
    )
}
return (
    <ClientOnly>
        <ReservationsClient
        reservations={reservations}
        currentuser={currentuser}
        />
    </ClientOnly>
)
}

export default ReservationPage