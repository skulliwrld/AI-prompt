"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {signIn,signOut, useSession, getProviders} from 'next-auth/react'

function Nav() {



  const {data:session} = useSession()
  // our state provider
  const [providers, setProviders] = useState() 
  const [toogle, setToogle] = useState(false)

  // initializing our provider using google providers
  useEffect(()=>{
    const SetProviders = async () =>{
      const response = await getProviders();
      setProviders(response);
    }
    SetProviders();
  }, [])


  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href={"/"} className='flex gap-2 flex-center'>
        <Image src='/assets/images/logo.svg'
        alt='photos'
        width={30}
        height={30}
        className='object-contain' />
        <p className='logo_text'>promptopia</p>
      </Link>

    {/* Desktop Navigations */}
    <div className="sm:flex hidden">
      {/* Code if Logged In */}
      {session?.user ? (
        <div className='flex gap-3 md:gap-5'>
          <Link href='/create-prompt' className='black_btn'>
            create prompt
          </Link>

          <button className='outline_btn' type='button' onClick={signOut}>sign out</button>

          <Link href='/profile'>
            <Image src={session?.user.image} width={37} height={37} className='rounded-full' alt='profile'/>
          </Link>
        </div>
      ) : (
          // Code for signing in a users
        <>
          {providers && Object.values(providers).map((provider) =>(
            <button type='button' key={provider.name} className='black_btn' onClick={()=> signIn(provider.id)}> sign in</button>
          ))}
        </>
      )}
    </div>

    {/* Mobile Navigations */}
    <div className="sm:hidden flex relative">
      {session?.user ? (
        <div className='flex'>
          <Image src={session?.user.image}
          alt='photos'
          width={30}
          height={30}
          className='object-contain rounded-full' 
          onClick={() =>{
            setToogle(!toogle)
          }}/>

          {toogle &&
           <div className='dropdown'>
              <Link href='/profile' className='dropdown_link' onClick={() =>{
                setToogle(false)
              }}>My Profile</Link>

              <Link href='/create-prompt' className='dropdown_link' onClick={() =>{
                setToogle(false)
              }}>create prompt</Link>

              <button type="button" onClick={() =>{
                setToogle(false);
                signOut()
              }} className='w-50 black_btn'>Sign Out</button>
            </div>
            }
        </div>
      ) : (
        <>
            {providers && Object.values(providers).map((provider) =>(
            <button type='button' key={provider.name} className='black_btn' onClick={()=> signIn(provider.id)}>sign in</button>
          ))}
        </>
      )}
    </div>

    </nav>
  )
}

export default Nav