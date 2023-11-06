"use client"

import React from 'react'
import {useState} from "react"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'

function CreatePrompt() {
  

  const Router = useRouter()
    const {data : session} = useSession()

    const [submitting, setSubmitting] = useState(false)
    const [post , setPost] = useState({
        prompt: "",
        tag:""
    })

    const handleSubmit = async (e) =>{
      e.preventDefault();

      setSubmitting(true);

      // Here we post in our data to our database
      try{
        const response = await fetch("/api/prompt/new", {
          method:"POST",
          body:JSON.stringify({
            prompt: post.prompt,
            userId:session?.user.id,
            tag:post.tag
          })
        })

        if(response.ok){
          Router.push("/")
        }
      }catch(error){
        console.log(error)
      }finally{
        setSubmitting(false)
      }
  }

  return (
    <div>
        <Form 
        type="create"
        post={post}
        handleSubmit={handleSubmit}
        setpost={setPost}
        submitting={submitting}/>
    </div>
  )
}

export default CreatePrompt