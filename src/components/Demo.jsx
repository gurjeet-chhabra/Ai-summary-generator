import React, { useEffect, useState } from 'react'
import {copy, linkIcon , loader} from '../assets'
import {useLazyGetSummaryQuery} from '../services/article'

const Demo = () => {

  const [article , setArticle] = useState({
    url:'',
    summary:'',
  })

  const [allArticles , setAllArticles] = useState([]);

  const [copied , setCopied] = useState('');

  const [getSummary, {error , isFetching}] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    )
    if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage);
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
   const {data} = await getSummary({articleUrl: article.url});

   if(data?.summary){
    const newArticle = {...article, summary:data.summary};
   
    const updatedArticles = [newArticle, ...allArticles];

    setArticle(newArticle);
    setAllArticles(updatedArticles);

    localStorage.setItem('articles' , JSON.stringify(updatedArticles));

    console.log(newArticle);
   }
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(()=> setCopied((false),3000))
  }
  return (
    <section className='mt-16 w-full max-w-xl'>
      <div className='flex flex-col w-full gap-2 justify-center items-center'>
        <form className=' relative flex justify-center items-center shadow-2xl'
        onSubmit={handleSubmit}>
          <img src={linkIcon} alt="LinkIcon" className='absolute left-0 my-2 ml-3 w-5' />
          <input type="url" placeholder='Enter a URL' value={article.url}
          onChange={(e) => setArticle({...article , url: e.target.value})} 
          required
          className='url_input_peer w-96 h-7 text-center' />
          <button type='Submit' className='submit_btn
           peer-focus:border-gray-700: peer-focus:text-gray-700:'>search</button>
        </form>

        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.map((item,index)=>(
            <div 
            onClick={()=> setArticle(item)}
            key={`link-${index}`}
            className='link_card'>
              <div className='copy-btn'>
                <img src={copied === item.url? tick:copy} alt="copy_icon"
                className='w-[40%] h-[40%] object-contain'
                onClick={() => handleCopy(item.url)} />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className='my-10 max-w-full flex justify-center items-center'>
          {isFetching ? (
            <img src={loader} alt="loader"
            className='w-20 h-20 object-contain' />
          ): error ? (
            <p className='font-inter font-bold text-center text-black'>
              oop's an unexpected error occured
              <br />
              <span className='font-normal text-gray-700'>
                {error?.data?.error}
              </span>
              </p>
          ):(
            article.summary && (
              <div className='flex flex-col gap-3'>
                <h2 className='font-bold text-gray-600 text-xl'>Article
                <span className='blue_gradient'>Summary</span>
                </h2>
                <div className='summary-box'>
                  <p className='font-inter font-medium text-sm text-gray-700'>{article.summary}</p>
                </div>
              </div>
            )
          )}
        </div>
    </section>
  )
}

export default Demo