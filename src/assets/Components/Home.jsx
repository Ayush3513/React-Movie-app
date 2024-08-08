import React, { useEffect, useState } from 'react'
import Sidenav from '../Partials/Sidenav'
import Topnav from './Topnav'
import Header from '../Partials/Header'
import axios from '../../Utils/Axios'

const Home = () => {
document.title = "Home Page"

const [header, setheader] = useState(null);

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
    },[])


  return header ? (
    <>
    <Sidenav />
    <div className=" h-full w-[80%]  ">
      <Topnav />
      <Header data={header} />
    </div>
    </>
  ) : <h1>loading</h1>
}

export default Home