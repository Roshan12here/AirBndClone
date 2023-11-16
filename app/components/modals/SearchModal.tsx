'use client'

import qs from 'query-string'
import React, { useCallback, useMemo, useState } from 'react'
import Modal from './Modal'
import SearchModal from '@/app/hooks/UseSearchModal'
import { useRouter, useSearchParams } from 'next/navigation'
import {  Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect'
import { formatISO } from 'date-fns'
import Heading from '../Heading'
import Calander from '../inputs/Calender'
import Counter from '../inputs/Counter'

enum STEPS {
LOCATION=0,
DATE=1,
INFO=2
}

const SearchModalI = () => {
    const router = useRouter()
    const searchModal = SearchModal()
  const params = useSearchParams()

 const [location,Setlocation] = useState<CountrySelectValue>() 
const [Step,SetStep] = useState(STEPS.LOCATION)
const [guestCount,setGuestCount] = useState(1)
const [roomCount,SetRoomCount] = useState(1)
const [BathRoom,setBathRoom] = useState(1)
const [dateRange,setdateRange] = useState<Range>({
    startDate : new Date(),
    endDate : new Date(),
    key:'selection'
})

const Map = useMemo(()=> dynamic(()=> import('../Map'),{
ssr :false
}),[location])


const onBack = useCallback(()=>{
SetStep((value) => value -1 )
},[])

const onNext = useCallback(()=>{
SetStep((value) => value + 1 )
},[])

const onSubmit = useCallback(async()=>{
if(Step !== STEPS.INFO){
return onNext()
} 
let currentQuery = {};

if(params){
currentQuery =  qs.parse(params.toString())
}

const updatedQuery : any ={
    ...currentQuery,
    locationvalue:location?.value,
    guestCount,
    roomCount,
    BathRoom,
}

if(dateRange.startDate){
    updatedQuery.startDate= formatISO(dateRange.startDate)
}

if(dateRange.endDate){
    updatedQuery.endDate= formatISO(dateRange.endDate)
}

const url = qs.stringifyUrl({
    url:'/',
    query:updatedQuery
},{skipNull : true})

SetStep(STEPS.LOCATION);
searchModal.onClose()

router.push(url)
},[Step,
SearchModal,
location,
router,
guestCount,
roomCount,
BathRoom,
dateRange,
onNext,
params
])

const actionLabel = useMemo(()=>{
if(Step === STEPS.INFO){
    return 'Search'
}

return 'Next'
},[Step])

const secondaryActionLabel = useMemo(() => {
    if (Step === STEPS.LOCATION) {
      return undefined
    }

    return 'Back'
  }, [Step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect 
        value={location} 
        onChange={(value) => 
          Setlocation(value as CountrySelectValue)} 
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )

if(Step === STEPS.DATE){
  bodyContent = (
    <div
    className='flex flex-col gap-8'
    >
<Heading
title='Where do you plan to go'
subtitle='Make sure everyone is free'
/>
<Calander
value={dateRange}
onChange={(value)=> setdateRange(value.selection)}
/>
    </div>
  )
}

if(Step === STEPS.INFO){
  bodyContent=(
    <div
    className='
    flex flex-col gap-8
    '
    >
<Heading
title='More information'
subtitle='Find your perfect place'
/>
<Counter
title='Guests'
subTitle='How many gusets are coming'
value={guestCount}
onChange={(value)=> setGuestCount(value)}
/>
<Counter
title='Rooms'
subTitle='How many rooms do you want'
value={roomCount}
onChange={(value)=> SetRoomCount(value)}
/>
<Counter
title='Bathrooms'
subTitle='How many Bathrooms do you want'
value={BathRoom}
onChange={(value)=> setBathRoom(value)}
/>
    </div>
  )
}

    return (
    <Modal
    isOpen={searchModal.isOpen}
    onClose={searchModal.onClose}
    onSubmit={onSubmit}
    secondaryAction={Step === STEPS.LOCATION ? undefined : onBack}
    secondaryActionLabel={secondaryActionLabel}
    title='Filters'
    actionLabel={actionLabel}
body={bodyContent}
    />
  )
}

export default SearchModalI
