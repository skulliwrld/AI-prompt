import Link from "next/link"

function Form({type,post,handleSubmit,setpost,submitting}) {
  return (
    <section className="w-full max-w-full flex flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient head_text">{type} Post</span>
      </h1>
      <p className='desc'>
        {type} and share amazing prompt with the world, let your imagination run wild with any AI-powered plaform.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">

        <label className='font-san font-semibold text-base text-gray-700'>Your AI Prompt</label>
        <textarea 
        value={post.prompt}
        onChange={(e) =>{
            setpost({...post, prompt:e.target.value})
        }}
        placeholder="write your prompt here"
        className="form_textarea"
        required />

        <label className='font-san font-semibold text-base text-gray-700'>Tags (#web development,#coding, #business, #finance)</label>
        <input 
        value={post.tag}
        onChange={(e) =>{
            setpost({...post, tag:e.target.value})
        }}
        placeholder="write your tag# here"
        className="form_input"
        required />

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">cancel</Link>
          <button type="submit" disabled={submitting} className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
            {submitting ? `${type}....`: type}
          </button>
        </div>

      </form>
    </section>
  )
}

export default Form