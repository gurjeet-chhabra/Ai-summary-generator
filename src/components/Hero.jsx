import React from 'react'
import {logo} from '../assets'

const Hero = () => {
  return (
    <header className='w-full justify-center items-center flex flex-col'>
      <nav className=' flex justify-between w-full mb-10 pt-3 items-center'>
        <img src={logo} alt="logo" className=' w-28 object-contain'/>
        <button 
        onClick={() => window.open('https://github.com')}
        className=' bg-black rounded-xl text-white w-24 hover:bg-white hover:text-black'>
          Github</button>
      </nav>

      <h1 className='head-text font-extrabold text-6xl'> Summarize articles with <br className=' max-md:hidden'/>
      <span className='orange_gradient'>OpenAI GPT-4</span></h1>
      <h2> Simplify your reading with Summize, an open source article summarizer 
        that transforms healthy articles into clear and concise summaries
      </h2>
    </header>
  )
}

export default Hero