"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"


import Profile from "@components/Profile"

const UserProfile = ({params}) =>{
    const searchparams = useSearchParams();
    const userName = searchparams.get("name")


    const[userPosts, setUserPost] = useState([]);

    useEffect(()=>{
        const getuserPost = async () =>{
            const response = await fetch(`/api/users/${params?.id}/post`);
            const data = await response.json()

            setUserPost(data)
        }

        if(params?.id) getuserPost()
    }, [params?.id])


    return (
        <div>
            <Profile name={userName} 
            desc={`welcome to ${userName} s personalized profile details page`}
            data={userPosts}/>
        </div>
    )
};


export default UserProfile