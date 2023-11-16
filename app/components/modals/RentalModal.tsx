"use client"

import Modal from "./Modal"
import HomeRentModal from "@/app/hooks/useRentModal"
import { useMemo, useState } from "react"
import Heading from "../Heading"
import { catagories } from "../navbar/Categories"
import CategroryInput from "../inputs/CategroryInput"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import CountrySelect from "../inputs/CountrySelect"
import dynamic from  'next/dynamic'
import Counter from "../inputs/Counter"
import UploadImg from "../inputs/UploadImg"
import Input from "../Input"
import axios from "axios"
import toast from "react-hot-toast"
import  {useRouter} from "next/navigation"


enum STEPS {
  CATEGORY =0,
  LOCATION=1,
  INFO=2,
  IMAGES=3,
  DESCRIPTION=4,
  PRICE=5
}

const RentalModal = () => {
  const [step, Setstep] =useState(STEPS.CATEGORY)
const [isloading,setIsLoading] =useState(false)

const router = useRouter();


    const onBack= ()=>{
      Setstep((value) => value -1)
    }

    const OnNext =() => {
      Setstep((value) => value +1 )
    }

   const Onsubmit :SubmitHandler<FieldValues> =(data) =>{
if(step !== STEPS.PRICE){
  return OnNext()
}

setIsLoading(true)

axios.post('/api/listings', data)
.then(() => {
  toast.success('Listing created!');
  router.refresh();
  reset();
  Setstep(STEPS.CATEGORY)
  rentModal.onClose();
})
.catch(() => {
  toast.error('Something went wrong.');
})
.finally(() => {
  setIsLoading(false);
})
}

    const actionLabel = useMemo(()=>{
if(step === STEPS.PRICE){
  return "Create"
}
return "Next"
    },[step])


    
    
    const { 
      register, 
      handleSubmit,
      setValue,
      watch,
      formState: {
        errors,
      },
      reset,
    } = useForm<FieldValues>({
      defaultValues: {
        category: '',
        location: null,
        guestCount: 1,
        roomCount: 1,
        bathroomCount: 1,
        imageSrc: '',
        price: 1,
        title: '',
        description: '',
      }
    });
  

const category = watch('category')
const location =watch('location')
const guestCount =watch('guestCount')
const roomCount = watch('roomCount')
const bathroomCount = watch('bathroomCount')
const imageSrc = watch('imageSrc')

const Map = useMemo(() =>  dynamic(() =>  import('../Map'),{
ssr:false
} ) ,[location])


const setCustoValue =(id:string, value:any) =>{
  setValue(id,value ,{
shouldDirty:true,
shouldTouch:true,
shouldValidate:true
})
}


const SeconfaryActionLabel =useMemo(()=>{
if(step === STEPS.CATEGORY){
  return undefined
}

return 'Back'
},[step])


let BodyContent = (
  <div className="flex flex-col gap-8">
<Heading
title="Which of these best describes your place"
subtitle="Pick a category"
center
/>
<div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
{catagories.map((item)=>(
<div key={item.label} className="col-span-1">
<CategroryInput
onClick={(category) => setCustoValue('category',category)}
selected={category === item.label}
label={item.label}
icon={item.icon}
/>
</div>
))}
</div>
  </div>
)

if(step === STEPS.LOCATION){
BodyContent=(
  <div className="flex flex-col gap-8">
    <Heading
    title="Where is your place located"
    subtitle="Help guests fing you"
    center
    />
    <CountrySelect
    onChange={(value) => setCustoValue('location',value)}
value={location}
    />
    <Map
    center={location?.latlng}
    />
  </div>
)
}

if(step === STEPS.INFO){
  BodyContent =(
    <div  className="flex flex-col gap-8">
<Heading
title="Share some basics about your Place"
subtitle="What aminities do you have"
/>

<Counter
title="Guests"
subTitle="How many Guests do you Allow!"
value={guestCount}
onChange={(value) => setCustoValue('guestCount',value)}
/>
<br />
<Counter
title="Rooms"
subTitle="How many rooms do you Offer?"
value={roomCount}
onChange={(value) => setCustoValue('roomCount',value)}
/>
<br />
<Counter
title="Bathroom"
subTitle="How many Bathroom do you offer!"
value={bathroomCount}
onChange={(value) => setCustoValue('bathroomCount',value)}
/>

    </div>
  )
}

if(step === STEPS.IMAGES){
  BodyContent =(
    <div className="flex flex-col gap-8">
<Heading
title="Add a photo of your Place"
subtitle="Show how your place looks like!"
/>
<UploadImg
value={imageSrc}
onChange={(value) => setCustoValue('imageSrc' ,value)}
/>
    </div>
  )
}


if(step === STEPS.DESCRIPTION){
  BodyContent = (
    <div className="flex flex-col gap-8">
<Heading
title="How would you describe your place"
subtitle="Short and Sweet works best"
/>
<Input
id="title"
label="Title"
disabled={isloading}
register={register}
errors={errors}
required
/>
<Input
id="Description"
label="Description"
disabled={isloading}
register={register}
errors={errors}
required
/>
    </div>
  )
}

if(step === STEPS.PRICE){
  BodyContent =(
    <div className="flex flex-col gap-8">
<Heading
title="Finally, set your price"
subtitle="How much do you charge per night"
/>
<Input
id="price"
formatPrice={true}
label="Price"
type="number"
disabled={isloading}
errors={errors}
required
register={register}
/>
    </div>
  )
}


    const rentModal = HomeRentModal()
  return (
    <Modal
    isOpen={rentModal.isOpen}
    onClose={rentModal.onClose}
    title="AirBnd your Home"
    secondaryActionLabel={SeconfaryActionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined :onBack} 
    onSubmit={handleSubmit(Onsubmit)}
    actionLabel={actionLabel}
    body={BodyContent}
    
    />
  )
}

export default RentalModal
