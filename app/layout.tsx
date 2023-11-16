import './globals.css'
import type { Metadata } from 'next'
import {Nunito} from "next/font/google" 
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import ToastProvider from './Provides/ToastProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentalModal from './components/modals/RentalModal'
import SearchModalI from './components/modals/SearchModal'

export const metadata: Metadata = {
  title: 'Airbnd',
  description: 'Airbnd clone',
}

const font=Nunito({
  subsets :['latin']
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) 
{

  const currentUser =await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <RegisterModal/>
<RentalModal/>
<SearchModalI/>
          <LoginModal/>
          <ToastProvider/>
      <Navbar currentUser ={currentUser}/>
        </ClientOnly>
      <br />
      <div className='pb-20 pt-20'>
        {children}  
      </div>
        </body>
    </html>
  )
}

