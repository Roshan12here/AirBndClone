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
import {FcGoogle} from "react-icons/fc"
import {signIn} from "next-auth/react" 
import LoginModal from './LoginModal'
import UseLognModal from "@/app/hooks/UseLoginModal"


const RegisterModal = () => {
const registerModal=useRegisterModal()
const [isloading,setisloading] =useState(false)
const loginModal=UseLognModal()

const {
  register,
  handleSubmit,
  formState:{
    errors,
  }
}= useForm<FieldValues>({
  defaultValues :{
    name:"",
    email:"",
    password:""
  }
})

const toggleModal = useCallback(()=>{
registerModal.onClose(),
loginModal.onOpen()
},[registerModal,loginModal])

const onSubmit: SubmitHandler<FieldValues> =(data) =>{
  setisloading(true)

axios.post("api/register",data)
.then(()=>{
  toast('Registered Successfully')
  registerModal.onClose();
  loginModal.onOpen()
})
.catch((error)=>{
  toast.error("Something Went Wrong")
})
.finally(()=>{
  setisloading(false);
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
    Already have an Account
  </div>
  <div  
  onClick={toggleModal}
  className='text-neutral-800 cursor-pointer hover-underline'>
    Log in
  </div>
</div>
</div>
  </div>
)


const BdoyContant =(
  <div className='flex flex-col gap-4'>
    <Heading
    title='Welcome to Airbnd'
    subtitle='Create an Account'
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
    id="name"
    label="Username"
    type="text"
    disabled={isloading}
    register={register}
    errors={errors}
    required
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
isOpen={registerModal.isOpen}
title='Register'
actionLabel='Continue'
onClose={registerModal.onClose}
onSubmit={handleSubmit(onSubmit)}
body={BdoyContant}
footer={FooterContent}
/>

    </div>
  )
}

export default RegisterModal