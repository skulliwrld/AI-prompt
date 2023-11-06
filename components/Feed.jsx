"use client"
import React from 'react'
import {useState ,useEffect} from 'react'
import PromptCard from './PromptCard'

const PromptDataList = ({data, handleTagClick}) =>{
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post)=>(
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick}/>
      ))}

    </div>
  )
}

function Feed() {
  
  const [post, setPost] = useState([])

  // search states
  const [searchText,setSearchText] = useState("")
  const [searchTimeout , setSearchTimeout] = useState(null )
  const [searchedResults,setSearchedResults] = useState([])

  useEffect(()=>{
    const getData = async () =>{
        const res = await fetch('/api/prompt')
        const result = await res.json()
        setPost(result)
    }

    getData()

},[])

const filterPrompts = (searchtext) =>{
  const regex = new RegExp(searchtext, "i")
  return post.filter((items) =>{
    regex.test(items.creator.username) || 
    regex.test(items.tag) ||
    regex.test(items.prompt)
  });

};

const handleSearchChange =(e) =>{
  clearTimeout(searchTimeout);
  setSearchText(e.target.value);

  // debounce method
  setSearchTimeout(
    setTimeout(()=>{
      const searchResult = filterPrompts(e.target.value);
      setSearchedResults(searchResult)
    }, 500)
  )
}


const handleTagClick = (tagName) =>{
  setSearchText(tagName)

  const searchResult = filterPrompts(tagName);
  setSearchedResults(searchResult)

}
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type="text" placeholder='search for tags or prompt data' value={searchText} onChange={handleSearchChange} className='search_input peer' required/>
      
      </form>

      {searchText ? (
        <PromptDataList data={searchedResults} handleTagClick={handleTagClick}/>
      ) : 
      <PromptDataList data ={post} handleTagClick ={handleTagClick}/>
      }

      
      
    </section>
  )
}

export default Feed