"use client"

import React, { useCallback, useState } from 'react'
import {AiOutlineMenu} from "react-icons/ai"
import Avatar from '../Avatar'
import Menuitem from './menuitem'
import useLoginModal  from "@/app/hooks/UseLoginModal"
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'
import HomeRentModal from '@/app/hooks/useRentModal'
import { useRouter } from 'next/navigation'
import useRegisterModal from '@/app/hooks/UseRegisterModal'

interface UserMenuProps {
  currentUser?:SafeUser | null
}


const UserMenu:React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const [isOpen,setIsopen] =useState(false)
  const LoginModal=useLoginModal()
  const RegisterModal = useRegisterModal()
  const router = useRouter()
const RentalModal = HomeRentModal()

  const toggleOpen=useCallback(()=>{
setIsopen((value)=>!value)
  },[])

const RentAirBnd = useCallback(()=>{
 if(!currentUser){
return LoginModal.onOpen()
 }

RentalModal.onOpen()

},[currentUser,LoginModal,RentalModal])

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
 <div
 onClick={RentAirBnd}
 className='
 hidden 
md:block
text-sm
font-semibold
py-3
px-4
rounded-full
hover:bg-neutral-100
transition 
cursor-pointer
 '
 >
Airbnd Your Home
 </div>
 <div  className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-100 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition '>
<AiOutlineMenu  onClick={toggleOpen}
/>
 <div className='hidden md:block '>
<Avatar src='/images/placeholder.jpg'  />
 </div>
 </div>
      </div>
      {isOpen && (
        <div 
        className='absolute rounded-xl shadow-md w-[48vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm '>
<div className='flex flex-col cursor-pointer '>
{currentUser ? (
   <>
   <Menuitem 
   onClick={()=> router.push('/trips')}
   label='My Trips'
   />
   <Menuitem 
   onClick={()=>router.push('/favrites')}
   label='My Favorates'
   />
   <Menuitem 
   onClick={()=>router.push('/reservations')}
   label='My Reservations'
   />
   <Menuitem 
   onClick={()=>router.push('/properties')}
   label='My Properties'
   />
   <Menuitem 
   onClick={RentalModal.onOpen}
   label='Airbnd My Hone'
   />
<hr/>
   <Menuitem 
   onClick={()=>signOut()}
   label='Log Out'
   />
   </>
) :
(
  <>
  <Menuitem 
  onClick={LoginModal.onOpen}
  label='Login'
  />
  <Menuitem 
  onClick={RegisterModal.onOpen}
  label='Sign Up'
  />
  </>
  )
}
</div>
        </div>
        )}
        </div>
        )
      }
      
      export default UserMenu
      