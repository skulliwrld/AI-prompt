
import Feed from '@components/Feed.jsx'
function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className='md:hidden'/>
        <span className='orange_gradient text-center' > AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        promptopia is an open-sources AI prompting tool for modern world to discover, create and share creative prompt
      </p>
      <Feed />
    </section>
  )
}

export default Home