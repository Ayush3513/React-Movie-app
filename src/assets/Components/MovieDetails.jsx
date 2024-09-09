import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { loadmovies, removemovie } from '../store/actions/movieaction';
import Loading from './Loading';

// Lazy load the Cards component
const Cards = lazy(() => import('../Partials/Cards'));

// Create a separate component for movie info
const MovieInfo = React.memo(({ info }) => (
  <div className="flex-1">
    <h1 className='font-bold text-3xl md:text-5xl lg:text-6xl mb-2'>
      {info.detail.original_name || info.detail.name || info.detail.original_title || info.detail.title}
      <span className='text-lg md:text-xl font-semibold text-zinc-300 ml-2'>
        ({info.detail.release_date.split("-")[0]})
      </span>
    </h1>
    
    <div className="flex flex-wrap gap-3 my-3 text-sm md:text-base text-zinc-300">
      <span>{info.detail.release_date}</span>
      <span>{info.detail.genres.map(e => e.name).join(", ")}</span>
      <span>{info.detail.runtime}min</span>
    </div>
    
    {info.detail.tagline && (
      <h2 className='text-xl md:text-2xl my-3 italic'>{info.detail.tagline}</h2>
    )}
    
    <div className="text-2xl md:text-3xl mb-2 font-semibold">Overview</div>
    <p className="text-sm md:text-base mb-4">{info.detail.overview}</p>

    <div className="text-2xl md:text-3xl mb-2 font-semibold">Languages</div>
    <p className="text-sm md:text-base mb-4">{info.detail.spoken_languages.map(e => e.english_name).join(", ")}</p>
  </div>
));

const MovieDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector(state => state.movie);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(loadmovies(id));
    return () => {
      dispatch(removemovie());
    };
  }, [dispatch, id]);

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);
  
  if (!info) return <Loading />;

  return (
    <div 
      style={{ 
        background: `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.8),rgba(0, 0, 0, .9)), url(https://image.tmdb.org/t/p/w1280/${info.detail.backdrop_path})`, 
        backgroundSize: "cover",
        backgroundPosition: "center"
      }} 
      className='min-h-screen w-full overflow-auto p-4 md:p-6 lg:p-8'
    >
      <nav className='w-full flex items-center justify-between gap-4 text-xl md:text-2xl mb-6'>
        <Link onClick={() => navigate(-1)} aria-label="Go back">
          <i className="ri-arrow-left-line"></i>
        </Link>
        <div className="flex gap-4 md:gap-6">
          {info.detail.homepage && (
            <a target='_blank' rel="noopener noreferrer" href={info.detail.homepage} aria-label="Visit official website">
              <i className="ri-external-link-fill"></i>
            </a>
          )}
          {info.extarnalids.wikidata_id && (
            <a target='_blank' rel="noopener noreferrer" href={`https://www.wikidata.org/wiki/${info.extarnalids.wikidata_id}`} aria-label="View on Wikidata">
              <i className="ri-earth-fill"></i>
            </a>
          )}
          {info.extarnalids.imdb_id && (
            <a target='_blank' rel="noopener noreferrer" href={`https://www.imdb.com/title/${info.extarnalids.imdb_id}/`}>IMDb</a>
          )}
        </div>
      </nav>

      <div className="w-full">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {!isImageLoaded && <div className="w-full md:w-1/3 lg:w-1/4 max-w-xs mx-auto md:mx-0 h-[300px] bg-gray-700 animate-pulse rounded-lg"></div>}
          <img 
            className={`w-full md:w-1/3 lg:w-1/4 max-w-xs mx-auto md:mx-0 shadow-lg rounded-lg object-cover ${isImageLoaded ? 'visible' : 'hidden'}`}
            src={`https://image.tmdb.org/t/p/w500/${info.detail.backdrop_path || info.detail.poster_path}`} 
            alt={info.detail.title}
            onLoad={handleImageLoad}
          />
          <MovieInfo info={info} />
        </div>

        <div className="flex flex-col gap-4 mt-8">
          {['flatrate', 'buy', 'rent'].map(providerType => 
            info.watchproviders && info.watchproviders[providerType] && (
              <div key={providerType} className='flex flex-wrap items-center gap-3'>
                <h3 className="text-lg font-semibold w-full md:w-auto mb-2 md:mb-0">Available to {providerType}:</h3>
                {info.watchproviders[providerType].map((i, index) => 
                  <img key={index} className='h-10 w-10 rounded-xl object-cover' src={`https://image.tmdb.org/t/p/w92/${i.logo_path}`} alt={i.provider_name} loading="lazy" />
                )}
              </div>
            )
          )}
        </div>

        <hr className='my-8'/>

        <div className="">
          <h2 className='text-2xl md:text-3xl font-bold my-4'>Recommendations</h2>
          <Suspense fallback={<Loading />}>
            <Cards data={info.recommendations} title={"movie"} />
          </Suspense>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default React.memo(MovieDetails);