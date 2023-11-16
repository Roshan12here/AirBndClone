import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import ListingPage from "./components/listings/listing";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListing";

interface HomeProps {
  searchParams :IListingParams
}


const Home = async ({searchParams} : HomeProps)=> { 
  
  const listings = await getListings(searchParams)  
  const currntUser = await getCurrentUser()


  return (
<ClientOnly>
  <Container>
    <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
{listings.map((listings) =>{
  return (
<div>
  <ListingPage
  currentuser={currntUser}
  key={listings.id}
  data={listings}
  />
</div>
  )
  })}
    </div>
  </Container>
</ClientOnly>
  )
}   


export default Home