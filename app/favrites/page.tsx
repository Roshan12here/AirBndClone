import EmptyState from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"

import getCurrentUser from "../actions/getCurrentUser"
import getFavoriteListings from "../actions/getFoviritelisting"
import FaoritesClient from "./FaoritesClient"


const Favoritepage = async () => {
const listing = await getFavoriteListings()
const currentuser = await getCurrentUser()

if(listing.length === 0){

  return (
    <ClientOnly>
      <EmptyState
      title="No Favorites found"
      subtitle="looks like you have no favorite listings"
      />
    </ClientOnly>
)
}
return (
  <ClientOnly>
    <FaoritesClient
    listings={listing}
    currentuser={currentuser}
    />
  </ClientOnly>
)
}

export default Favoritepage
