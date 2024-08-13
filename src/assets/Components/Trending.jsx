import React, { useEffect, useState } from 'react';
import Topnav from './Topnav';
import Dropdown from '../Partials/Dropdown';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import axios from '../../Utils/Axios';
import Tcards from '../Components/Tcards';
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
    document.title = "Trending"
    const [category, setCategory] = useState("all");
    const [duration, setDuration] = useState("day");
    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(1); // For pagination
    const [hasMore, setHasMore] = useState(false);

    const navigate = useNavigate();

    const getCard = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/${duration}`, {
                params: { page } // Sending the page number to fetch more data
                
            });
            setCards((prevCards) => [...prevCards, ...data.results]); // Append new results
            if (data.results.length === 0) {
                setHasMore(false); // No more data to fetch
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };


    useEffect(() => {
        setCards([]); // Reset cards when category or duration changes
        setPage(1); // Reset page to 1
        setHasMore(true); // Reset hasMore to true
        getCard();
    }, [category, duration]);

    const fetchMoreData = () => {
        setPage((prevPage) => prevPage + 1);
        getCard();
    };
    return cards.length > 0 ? (
        <div className="h-screen w-full overflow-auto flex flex-col">
            <div className="h-[10vh] w-full z-[10] p-10 flex items-center fixed bg-[#1F1E24] justify-between">
                <div className="flex items-center">
                    <i onClick={() => navigate(-1)} className="ri-arrow-left-line text-2xl"></i>
                    <h1 className="text-2xl ml-3 leading-none">Trending</h1>
                </div>
                <Topnav />
                <div className="flex w-[20vw] items-center justify-between">
                    <Dropdown title1={"category"} func={(val) => setCategory(val)} options={["tv", "movie", "all"]} />
                    <Dropdown title1={"duration"} func={(val) => setDuration(val)} options={["day", "week"]} />
                </div>
            </div>

            <InfiniteScroll
                dataLength={cards.length}
                next={fetchMoreData}
                hasMore={hasMore}
                className='pt-20 w-[100vw] h-screen z-0 '
            >
               
                    <Tcards data={cards} />
                
            </InfiniteScroll>
        </div>
    ) : (
        <Loading/>
    );
};

export default Trending;
