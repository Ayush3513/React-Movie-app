import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import Cards from '../Partials/Cards';
import Trailer from './Trailer';
import { loadtv, removetv } from '../store/reducer/tvSlice';
import { loadtvs } from '../store/actions/tvaction';

const TvDetails = () => {

  const {pathname} = useLocation()
  const navigate = useNavigate()
  const { id } = useParams();
  const dispatch = useDispatch();


useEffect(() => {
    dispatch(loadtvs(id));

    // Cleanup function to remove tv data when the component unmounts
    return () => {
      dispatch(removetv());
    };
  }, [dispatch, id]);

  const {info} = useSelector(state => state.tv)
  
   // Added 'id' to the dependency array

  return info ? (

    <div style={{ background: `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.8),rgba(0, 0, 0, .9)) ,url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path })`, backgroundSize:"cover" ,backgroundPosition:"top"}} className='h-screen relative w-full overflow-auto p-5'>
      <nav className='h-[15vh] w-full px-16 py-5 flex items-center justify-between gap-10 text-2xl'>
        <div className=""><Link><i onClick={() => navigate(-1)} className="ri-arrow-left-line "></i></Link></div>
        <div className="flex gap-10"><a target='_blank' href={info.detail.homepage ? info.detail.homepage : null}><i className="ri-external-link-fill"></i></a>
        <a target='_blank'  href={`https://www.wikidata.org/wiki/${info.extarnalids.wikidata_id}`}><i className="ri-earth-fill"></i></a>
        <a target='_blank'  href={info.extarnalids.imdb_id && `https://www.imdb.com/title/${info.extarnalids.imdb_id}/`}>IMDb</a></div>
      </nav>

      <div className="h-fit  w-full px-[8%]">
        <div className="flex">
        <img className='h-[50vh] w-[15vw]  shadow-[10px_20px_40px_5px_rgb(0,0,0)] object-cover' src={`https://image.tmdb.org/t/p/original/${info.detail.backdrop_path || info.detail.poster_path}`} alt="" />
        <div className="ml-16 relative">
          <h1 className=' font-black text-7xl'>{info.detail.original_name || info.detail.name || info.detail.original_title || info.detail.title}<span className='text-2xl font-semibold text-zinc-300'>({info.detail.first_air_date.split("-")[0]})</span></h1>
          
          <div className="flex gap-5 my-5 text-xl text-zinc-300">
            <h1 className=''>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map(e => e.name).join(" ,")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>
          <h1 className='text-4xl my-5 italic '>{info.detail.tagline}</h1>
          <div className="text-5xl mb-3 font-semibold ">Overview</div>
          <p>{info.detail.overview}</p>

          <div className="text-5xl mt-5 mb-3 font-semibold">Languages</div>
          <p>{info.detail.spoken_languages.map(e => e.english_name).join(" , ")}</p>

            <Link to={`${pathname}/trailer`} className='py-3 px-6 font-semibold bg-[#6556CD] absolute right-0 bottom-0 flex items-center gap-3 rounded-lg text-2xl'><i className="ri-play-fill"></i><h1>Trailer</h1></Link>

        </div>
        </div>
        <div className="flex flex-col gap-5 mt-10">
          {info.watchproviders && info.watchproviders.flatrate && <div className='flex items-center gap-5'>
            <h1>Available on platform</h1>
            {info.watchproviders.flatrate.map(i => 
               
              <img className='h-[2.5vw] w-[2.5vw] rounded-xl object-cover' src={`https://image.tmdb.org/t/p/original/${i.logo_path}`} />
          )}
              
            </div>}
            {info.watchproviders && info.watchproviders.buy && <div className='flex items-center gap-5' >
            <h1 className='mr-8'>Available on buy</h1>
              
              {info.watchproviders.buy.map(i => 
              <img className='h-[2.5vw] w-[2.5vw] rounded-xl object-cover' src={`https://image.tmdb.org/t/p/original/${i.logo_path}`} />
          )}
              
            </div>}
            {info.watchproviders && info.watchproviders.rent && <div className='flex gap-5' >
            <h1 className='mr-8'>Available on rent</h1>
            
              {info.watchproviders.rent.map(i => 
              <img className='h-[2.5vw] w-[2.5vw] rounded-xl object-cover' src={`https://image.tmdb.org/t/p/original/${i.logo_path}`} />
          )}
              
            </div>}
         
        </div>
        <hr  className='my-16'/>
        <h1 className='text-3xl font-bold  my-5 pl-5'>Seasons</h1>
        <div className='h-fit  flex items-center justify-start gap-10 p-6 overflow-auto  '>
        
           {info.detail.seasons.map((e,i)=>{
            console.log(e)
            return <Link to={`/tv/details/${id}`} key={i}   className="h-[40vh]  w-[14vw] mb-5 flex-shrink-0  relative">
            <img className='h-[90%] w-screen shadow-[10px_20px_40px_5px_rgb(0,0,0)] object-cover object-top' src={e.poster_path ? `https://image.tmdb.org/t/p/original/${ e.poster_path}` : "https://cdn.vectorstock.com/i/500p/82/99/no-image-available-like-missing-picture-vector-43938299.jpg"} alt="" />
            <h1 className='mt-3 text-xl'>{e.name}</h1>
       </Link>
           })}
           
    </div>
        <hr  className='my-16'/>
        <div className="">
          <h1 className='text-3xl font-bold  my-5 pl-5'>Recommendation</h1>

          { <Cards data={info.recommendations} title={"tv"} /> }
          
          
        </div>
        
      </div>
      <Outlet />
    </div>
    
  ): <Loading />
};

export default TvDetails;
