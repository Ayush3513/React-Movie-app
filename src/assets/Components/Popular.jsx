import React, { useEffect, useState } from 'react';
import Topnav from './Topnav';
import Dropdown from '../Partials/Dropdown';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import axios from '../../Utils/Axios';
import Tcards from './Tcards';
import InfiniteScroll from 'react-infinite-scroll-component';

const Popular = () => {
    document.title = "Popular"
    const [category, setCategory] = useState("movie");
    const [pCards, setPCards] = useState([]);
    const [page, setPage] = useState(1); // For pagination
    const [hasMore, setHasMore] = useState(false);

    const navigate = useNavigate();

    const getPCards = async () => {
        try {
            const { data } = await axios.get(`${category}/popular`, {
                params: { page } // Sending the page number to fetch more data
            });
            setPCards((prevPCards) => [...prevPCards, ...data.results]); // Append new results
            if (data.results.length === 0) {
                setHasMore(false); // No more data to fetch
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    useEffect(() => {
        setPCards([]); // Reset cards when category or duration changes
        setPage(1); // Reset page to 1
        setHasMore(true); // Reset hasMore to true
        getPCards();
    }, [category]);

    const fetchMoreData = () => {
        setPage((prevPage) => prevPage + 1);
        getPCards();
    };

    return pCards.length > 0 ? (
        <div className="h-screen w-full overflow-auto flex flex-col">
            <div className="h-[10vh] w-full p-10 z-[10] flex items-center fixed bg-[#1F1E24] justify-between">
                <div className="flex items-center">
                    <i onClick={() => navigate(-1)} className="ri-arrow-left-line text-2xl"></i>
                    <h1 className="text-2xl ml-3 leading-none">Popular</h1>
                </div>
                <Topnav />
                <div className="flex w-[15vw] items-center justify-between">
                    <Dropdown title1={"category"} func={(val) => setCategory(val)} options={["tv", "movie"]} />
                </div>
            </div>

            <InfiniteScroll
                dataLength={pCards.length}
                next={fetchMoreData}
                hasMore={hasMore}
                className='pt-20 pl-5 w-[100vw] h-screen  '
            >
               
                    <Tcards data={pCards} title={category} />
                
            </InfiniteScroll>
        </div>
    ) : (
        <Loading/>
    );
};

export default Popular;
