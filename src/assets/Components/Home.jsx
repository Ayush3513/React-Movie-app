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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const getHeader = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`)
      let randomData = (Math.random() * data.results.length).toFixed()
      setheader(data.results[randomData])
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  useEffect(() => {
    !header && getHeader()
    getCard()

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [category])

  const getCard = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`)
      setcards(data.results)
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  return header && cards ? (
    <div className='flex flex-col md:flex-row min-h-screen w-full overflow-x-hidden'>
      {!isMobile && <Sidenav />}
      <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
        <Topnav />
        <Header data={header} />

        <div className="p-4 pb-0 flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className='text-2xl md:text-3xl font-semibold mb-2 md:mb-0'>Trending</h1> 
          <Dropdown func={(val) => setcategory(val)} title1={"filter"} options={['tv', 'movie', 'all']} />
        </div>

        <Cards data={cards} title={category} />
        
        {isMobile && (
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
            {/* Add your mobile navigation items here */}
          </nav>
        )}
      </div>
    </div>
  ) : <Loading />
}

export default Home