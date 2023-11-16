"use client"

import React from 'react'
import {AiFillGithub} from "react-icons/ai"
import {useCallback,useState} from "react"
import useRegisterModal from '@/app/hooks/UseRegisterModal'  
import {FieldValues,
        SubmitHandler,
        useForm 
        } from "react-hook-form"
import axios from 'axios'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../Input'
import {toast} from "react-hot-toast"
import Button from '../Button'
import iseLoginModal from '@/app/hooks/UseLoginModal'
import { signIn } from 'next-auth/react'
import {useRouter} from "next/navigation"
import { error } from 'console'


const LoginModal = () => {
const registerModal=useRegisterModal()
const loginModal=iseLoginModal()
const [isloading,setisloading] =useState(false)
const router =useRouter()

const ToggleModal = useCallback(()=>{
loginModal.onClose(),
registerModal.onOpen()
},[loginModal,registerModal])

const {
  register,
  handleSubmit,
  formState:{
    errors,
  }
}= useForm<FieldValues>({
  defaultValues :{
    email:"",
    password:""
  }
})

const onSubmit: SubmitHandler<FieldValues> =(data) =>{
  setisloading(true)

signIn('credentials' , {
  ...data,
  redirect:false
})
.then((callback)=>{
setisloading(false)

if(callback?.ok){
toast.success('Logged in')


router.refresh()
loginModal.onClose()
}

if(callback ?.error){
  toast.error(callback.error)
}
})
}


const FooterContent=(
  <div className='flex flex-col gap-4 mt-3'>
<hr/>
<Button
outline 
label='Continue with Github'
icon={AiFillGithub}
onClick={()=>signIn('github')}
/>
<div className='
text-neutral-500
text-center
mt-4
font-light
'>
<div className='flex flex-row items-center gap-2 text-center justify-center'>
  <div>
    First time using AirBnd? 
  </div>
  <div  
  onClick={ToggleModal}
  className='text-neutral-800 cursor-pointer hover-underline'>
Sign up
  </div>
</div>
</div>
  </div>
)


const BdoyContant =(
  <div className='flex flex-col gap-4'>
    <Heading
    title='Welcome Back To AirBnd'
    subtitle='Login to your Account'
    center
    />
    <Input
    id="email"
    label="Email"
    disabled={isloading}
    register={register}
    errors={errors}
    required
    type='email'
    />
    <Input
    id="password"
    label="Password"
    type='password'
    disabled={isloading}
    register={register}
    errors={errors}
    required
    />
  </div>
)


return (
    <div>

<Modal
disabled={isloading}
isOpen={loginModal.isOpen}
title='Login'
dummy='Dummy Email to Login'
dummyemail='shamasgujjar129@gmail.com'
dummypassword='shamas129'
actionLabel='Continue'
onClose={loginModal.onClose}
onSubmit={handleSubmit(onSubmit)}
body={BdoyContant}
footer={FooterContent}
/>

    </div>
  )
}

export default LoginModal
