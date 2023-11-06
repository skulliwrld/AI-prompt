"use client"

import {useState , useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

function ProfilePage() {

  const router = useRouter()

    const {data:session} = useSession()

    const [posts, setPosts] = useState([])

    
    
    const handleEdit = (post) =>{
      router.push(`/update-prompt?id=${post._id}`);

        
    }

    const handleDelete = async (post) =>{

      const hasConfirmed = confirm("Are you sure you want to delete this prompt ?")

      if(hasConfirmed){
        try {
          await fetch(`/api/prompt/${post._id.toString()}`,{
            method: "DELETE",
          });

          const filteredPost = posts.filter((items) =>{
            items._id !== post._id
          })
          setPosts(filteredPost)

        } catch (error) {
           console.log(error)
        }
      }

    }


   

    useEffect(()=>{
        const getData = async () =>{
            const res = await fetch(`/api/users/${session?.user.id}/post`)
            const result = await res.json()
            setPosts(result)
        }

        if(session?.user.id) getData()
    
    },[])
  return (
    <div>
        <Profile 
        name='My'
        desc='Welcome to your personalized profile page'
        data={posts}
        handleDelete={handleDelete}
        handleEdit={handleEdit}/>
    </div>
  )
}

export default ProfilePage