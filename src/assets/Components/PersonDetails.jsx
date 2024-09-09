import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import { loadpersons, removeperson } from '../store/actions/personaction';

// Lazy load components
const Dropdown = lazy(() => import('../Partials/Dropdown'));
const Cards = lazy(() => import('../Partials/Cards'));

// Create separate components for person info sections
const PersonalInfo = React.memo(({ info }) => (
  <div>
    <h2 className='text-2xl font-bold mb-4'>Personal Info</h2>
    <InfoItem title="Known for" value={info.detail.known_for_department} />
    <InfoItem title="Gender" value={info.detail.gender ? "Male" : "Female"} />
    <InfoItem title="Birthday" value={info.detail.birthday} />
    <InfoItem title="Deathday" value={info.detail.deathday || "Still alive"} />
    <InfoItem title="Place of birth" value={info.detail.place_of_birth} />
  </div>
));

const InfoItem = React.memo(({ title, value }) => (
  <div className="mb-3">
    <h3 className='text-lg font-semibold'>{title}</h3>
    <p className='text-zinc-300'>{value}</p>
  </div>
));

const PersonDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie");
  const { info } = useSelector(state => state.person);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadpersons(id));
    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id]);

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  if (!info) return <Loading />;

  return (
    <div className='min-h-screen w-full overflow-y-auto bg-gray-900 text-white'>
      <nav className='sticky top-0 z-10 bg-gray-800 p-4 flex items-center justify-between'>
        <button onClick={() => navigate(-1)} aria-label="Go back" className="text-2xl">
          <i className="ri-arrow-left-line"></i>
        </button>
      </nav>

      <div className="flex flex-col md:flex-row p-4 md:p-8 gap-8">
        <div className="md:w-1/3 lg:w-1/4">
          {!isImageLoaded && <div className="w-full max-w-xs mx-auto h-[300px] bg-gray-700 animate-pulse rounded-lg"></div>}
          <img 
            className={`w-full max-w-xs mx-auto rounded-lg shadow-lg object-cover ${isImageLoaded ? 'visible' : 'hidden'}`}
            src={`https://image.tmdb.org/t/p/w500/${info.detail.profile_path}`} 
            alt={info.detail.name} 
            onLoad={handleImageLoad}
          />
          <div className="flex justify-center text-2xl mt-5 gap-10">
            {info.detail.homepage && <a target='_blank' rel="noopener noreferrer" href={info.detail.homepage} aria-label="Facebook"><i className="ri-facebook-circle-fill"></i></a>}
            {info.extarnalids.wikidata_id && <a target='_blank' rel="noopener noreferrer" href={`https://www.wikidata.org/wiki/${info.extarnalids.wikidata_id}`} aria-label="Wikidata"><i className="ri-earth-fill"></i></a>}
            {info.extarnalids.imdb_id && <a target='_blank' rel="noopener noreferrer" href={`https://www.imdb.com/title/${info.extarnalids.imdb_id}/`} aria-label="Instagram"><i className="ri-instagram-fill"></i></a>}
          </div>
          <hr className='my-5'/>
          <PersonalInfo info={info} />
        </div>

        <div className="md:w-2/3 lg:w-3/4">
          <h1 className='text-4xl md:text-6xl lg:text-8xl font-black mb-6'>{info.detail.name}</h1>
          <h2 className='text-2xl md:text-3xl font-semibold mt-6 mb-2'>Overview</h2>
          <p className='text-sm md:text-base'>{info.detail.biography}</p>

          <hr className='my-8'/>

          <h2 className='text-2xl md:text-3xl font-semibold mb-4'>Best Works</h2>
          <div className="w-full overflow-x-auto -mx-4 px-4">
            <Suspense fallback={<Loading />}>
              <Cards data={info.combinedcredits.cast} title="movie" limit={5} />
            </Suspense>
          </div>
          <div className="mt-4 text-right">
            <Link to={`/person/${id}/all-works`} className="text-blue-400 hover:text-blue-300">
              View All Works
            </Link>
          </div>

          <hr className='my-8'/>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className='text-2xl md:text-3xl font-semibold'>Acting</h2>
            <Suspense fallback={<Loading />}>
              <Dropdown title1={category} func={(val) => setCategory(val)} options={["tv", "movie"]} />
            </Suspense>
          </div>
          
          <div className="h-[50vh] w-full bg-gray-800 rounded-lg overflow-y-auto">
            {info[category + "credits"].cast.map((e, i) => (
              <Link key={i} to={`/${category}/details/${e.id}`} className='block hover:bg-gray-700 p-4 border-b border-gray-700'>
                <p className="text-lg font-semibold">{e.original_title || e.name}</p>
                <p className="text-sm text-gray-400">Character: {e.character}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PersonDetails);