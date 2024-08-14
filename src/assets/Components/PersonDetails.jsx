
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import Cards from '../Partials/Cards';
import { loadpersons, removeperson } from '../store/actions/personaction';
import Dropdown from '../Partials/Dropdown';


const PersonDetails = () => {

  const {pathname} = useLocation()
  const navigate = useNavigate()
  const { id } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie");

  const {info} = useSelector(state => state.person)
  
  useEffect(() => {
    dispatch(loadpersons(id));

    // Cleanup function to remove person data when the component unmounts
    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id]); // Added 'i
  
console.log(info)


  return info ? (
    <div className='h-screen w-full overflow-y-auto'>
         <nav className='h-[15vh] w-full px-16 py-5 flex items-center justify-between gap-10 text-2xl'>
        <div className=""><Link><i onClick={() => navigate(-1)} className="ri-arrow-left-line "></i></Link></div>
        
      </nav>
          <div className="flex">
            <div className="first pl-[10%]">
            <img className='h-[40vh]  shadow-[10px_20px_40px_5px_rgb(0,0,0)] object-cover' src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`} alt="" />
            <div className="flex text-2xl mt-5 gap-10"><a target='_blank' href={info.detail.homepage}><i className="ri-facebook-circle-fill"></i></a>
        <a target='_blank'  href={`https://www.wikidata.org/wiki/${info.extarnalids.wikidata_id}`}><i className="ri-earth-fill"></i></a>
        <a target='_blank'  href={`https://www.imdb.com/title/${info.extarnalids.imdb_id}/`}><i className="ri-instagram-fill"></i></a></div>
        <hr  className='my-5'/>
        <h1 className='text-3xl font-bold'>Personal Info</h1>

        <h1 className='text-xl mt-3 font-semibold'>Known for : <span className='text-xl inline-block font-thin text-zinc-300'>{info.detail.known_for_department}</span></h1>
        

        <h1 className='text-xl mt-3 font-semibold'>Gender : <span className='text-xl inline-block font-thin text-zinc-300'>{info.detail.gender ? "Male": "Female" }</span></h1>
        

        <h1 className='text-xl mt-3 font-semibold'>Birthday : <span className='text-xl inline-block font-thin text-zinc-300'>{info.detail.birthday}</span></h1>
        

        <h1 className='text-xl mt-3 font-semibold'>Deathday : <span className='text-xl inline-block font-thin text-zinc-300'>{info.detail.deathday ? info.detail.deathday : "still alive"}</span></h1>
        

        <h1 className='text-xl mt-3 font-semibold w-[14vw]'>Place of birth : <span className='text-xl inline-block font-thin text-zinc-300'>{info.detail.place_of_birth}</span></h1>
        


            </div>
            <div className="second ml-10 p-10 pr-20">
                <h1 className='text-8xl font-black '>{info.detail.name}</h1>
                <h2 className='text-3xl font-semibold mt-10'>Overview</h2>
                <p className='pt-3'>{info.detail.biography}</p>

                <hr  className='my-10'/>

                <h1 className='text-3xl font-semibold mt-10 mb-5 ' >Best Works</h1>
                <div className="w-[65vw] -ml-8 overflow-x-auto">
                <Cards data={info.combinedcredits.cast} /> 
                </div>
                <hr  className='my-10'/>

                <div className="flex w-full justify-between items-center">
                <h2 className='text-3xl font-semibold'>Acting</h2>
                <Dropdown title1={category} func={(val) => setCategory(val)} options={["tv", "movie"]} />
                </div>
                <div className=""></div>  
                <div className="h-[50vh] w-full mt-10 bg-black  overflow-y-auto">
                  {info[category + "credits"].cast.map((e,i)=>(
                      
                      <Link to={`/${category}/details/${e.id}`} className='h-[10vh] w-full flex flex-col hover:bg-zinc-700 items-start justify-center pl-5 '>
                        
                      <p><span className='font-semibold text-md'>Movie Name</span> : { e.original_title}</p>
                      <p><span className='font-semibold text-md'>Character</span> : {e.character}</p>
                  </Link>
                  ))}
                    
                </div>
                
            </div>
          </div>

          
    </div>
  ): <Loading />
} 

export default PersonDetails