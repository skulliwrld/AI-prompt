"use client"

import React from 'react'
import {useState, useEffect} from "react"

import { useSearchParams ,useRouter} from 'next/navigation'
import Form from '@components/Form'

function EditPrompt() {

    const searchParam = useSearchParams();
    const PromptId = searchParam.get('id');
    const router = useRouter()

    const [submitting, setSubmitting] = useState(false)
    const [post , setPost] = useState({
        prompt: "",
        tag:""
    })



    useEffect(()=>{
        const GetPromptDetails = async () =>{
            const response = await fetch(`/api/prompt/${PromptId}`)

            const data = await response.json();
            
            setPost({
                prompt:data.prompt,
                tag:data.tag
            })

        }

        if(PromptId) GetPromptDetails()
    },[PromptId])

    const updatePrompt = async (e) =>{
      e.preventDefault();

      setSubmitting(true);

      if(!PromptId) return alert('Prompt ID not Found')

      try{
        const response = await fetch(`/api/prompt/${PromptId}`, {
          method:"PATCH",
          body:JSON.stringify({
            prompt: post.prompt,
            tag:post.tag
          })
        })

        if(response.ok){
            router.push("/")
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
        type="Edit"
        post={post}
        handleSubmit={updatePrompt}
        setpost={setPost}
        submitting={submitting}/>
    </div>
  )
}

export default EditPrompt