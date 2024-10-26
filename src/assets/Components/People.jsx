import React, { useEffect, useState } from 'react';
import Topnav from './Topnav';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import axios from '../../Utils/Axios';
import Tcards from './Tcards';
import InfiniteScroll from 'react-infinite-scroll-component';

const People = () => {
    document.title = "Popular People";
    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const getCard = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const { data } = await axios.get(`person/popular`, {
                params: { page }
            });
            setCards((prevCards) => [...prevCards, ...data.results]);
            setHasMore(data.results.length > 0);
        } catch (error) {
            console.log("Error: ", error);
            setError("Failed to fetch data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCard();
    }, []);

    const fetchMoreData = () => {
        setPage((prevPage) => prevPage + 1);
        getCard();
    };

    return (
        <div className="min-h-screen w-full bg-[#1F1E24] flex flex-col">
            <div className="sticky top-0 z-10 bg-[#1F1E24] shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center">
                            <button 
                                onClick={() => navigate(-1)} 
                                aria-label="Go back"
                                className="text-2xl mr-3 hover:text-gray-300 transition-colors"
                            >
                                <i className="ri-arrow-left-line"></i>
                            </button>
                            <h1 className="text-xl w-60 sm:text-2xl font-bold">Popular People</h1>
                        </div>
                        <Topnav />
                    </div>
                </div>
            </div>

            {error && (
                <div className="text-red-500 p-4 text-center">{error}</div>
            )}

            <InfiniteScroll
                dataLength={cards.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Loading />}
                className='flex-grow bg-black w-full px-4 sm:px-6 lg:px-8 pt-6'
            >
                <Tcards data={cards} title="person" />
            </InfiniteScroll>

            {isLoading && cards.length === 0 && <Loading />}

            {!isLoading && cards.length === 0 && !error && (
                <div className="text-center py-10 text-gray-500">
                    No people found.
                </div>
            )}
        </div>
    );
};

export default People;