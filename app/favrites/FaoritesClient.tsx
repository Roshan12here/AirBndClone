import React from 'react'
import { SafeListing, SafeUser } from '../types'
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingPage from '../components/listings/listing';

interface FaoritesClientProps{
    listings:SafeListing[];
    currentuser?:SafeUser | null;
} 

const FaoritesClient :React.FC<FaoritesClientProps> = ({
    listings,
    currentuser
}) => {
  return (
    <Container>
        <Heading
        title='Favorites'
        subtitle='List of place you have favorited'
        />
<div
className='mt-10
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
{listings.map((listing)=>(
<ListingPage
currentuser={currentuser}
key={listing.id}
data={listing}
/>

))}
</div>
    </Container>
  )
}

export default FaoritesClient