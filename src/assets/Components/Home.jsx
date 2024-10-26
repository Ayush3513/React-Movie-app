import React, { useEffect, useState } from 'react'
import Sidenav from '../Partials/Sidenav'
import Topnav from './Topnav'
import Header from '../Partials/Header'
import axios from '../../Utils/Axios'
import Cards from '../Partials/Cards'
import Dropdown from '../Partials/Dropdown'
import Loading from './Loading'

const Home = () => {
  document.title = "Home Page"

  const [header, setheader] = useState(null);
  const [cards, setcards] = useState(null);
  const [category, setcategory] = useState("all");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768 ? true : false);

  const getHeader = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`)
      let randomData = (Math.random() * data.results.length).toFixed()
      setheader(data.results[randomData])
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  const navOpenHandler = ()=>{

    setIsMobile(window.innerWidth <= 768 ? true : false)

  }

  useEffect(() => {
    !header && getHeader()
    getCard()

    const handleResize = () => {
      setIsMobile();
    };

    window.addEventListener('resize', navOpenHandler);
    return () => window.removeEventListener('resize', navOpenHandler);
  }, [category])

  const getCard = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`)
      setcards(data.results)
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  const toggelHandler = () => setIsMobile(!isMobile)

  return header && cards ? (
    
    
    <div className='flex flex-row min-h-screen w-full relative '>
       {isMobile && (<label  className="flex flex-col gap-2 w-8 absolute top-5 right-5">
      <input onClick={toggelHandler} className="peer hidden" type="checkbox" />
      <div className="rounded-2xl h-[3px] w-1/2 bg-white duration-500 peer-checked:rotate-[225deg] origin-right peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px]" />
      <div className="rounded-2xl h-[3px] w-full bg-white duration-500 peer-checked:-rotate-45" />
      <div className="rounded-2xl h-[3px] w-1/2 bg-white duration-500 place-self-end peer-checked:rotate-[225deg] origin-left peer-checked:translate-x-[12px] peer-checked:translate-y-[1px]" />
    </label>)}
     <Sidenav  />
      <div className="flex-1 flex flex-col overflow-y-auto ">
        <Topnav navOpenHandler={navOpenHandler} />
        <Header data={header} />

        <div className="p-4 pb-0 flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className='text-2xl md:text-3xl font-semibold mb-2 md:mb-0'>Trending</h1> 
          <Dropdown func={(val) => setcategory(val)} title1={"filter"} options={['tv', 'movie', 'all']} />
        </div>

        <Cards data={cards} title={category} />
        
        {/* {isMobile && (
          <nav className="md:hidden h-screen/4 fixed top-0 left-0 right-0 bg-[#1F1F1F] p-4">
            {<Sidenav />}
          </nav>
        )} */}
      </div>
    </div>
  ) : <Loading />
}

export default Home