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

    const getHeader = async () =>{
        try {
            const {data} = await axios.get(`/trending/all/day`)
            let randomData = (Math.random()*data.results.length).toFixed()
            setheader(data.results[randomData])
        } catch (error) {
            console.log("Error: " ,error)
        }
    }

    useEffect(()=>{
        !header && getHeader()
         getCard()
    },[category])


    const getCard = async () =>{
      try {
          const {data} = await axios.get(`/trending/${category}/day`)
          setcards(data.results)
      } catch (error) {
          console.log("Error: " ,error)
      }
  }


  return header && cards ? (
    <div className='h-screen w-screen flex overflow-x-hidden overflow-y-auto'>
    <Sidenav />
    <div className=" h-full w-[80%] overflow-y-auto overflow-x-hidden  ">
      <Topnav />
      <Header data={header} />

      <div className="p-4 pb-0 flex justify-between"><h1 className='text-3xl font-semibold '>Trending</h1> 
      <Dropdown func={(val)=>setcategory(val)} title1={"filter"}  options={['tv','movie','all']} />
      </div>

      <Cards data={cards} title={category} />
    </div>
    </div>
  ) : <Loading />
}

export default Home