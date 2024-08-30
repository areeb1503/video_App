import React, { useContext, useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Context } from '../context/contextApi';
import LeftNav from './LeftNav';
import { fetchFromApi } from '../utils/api';
import SearchResultVideoCard from './SearchResultVideoCard';

const SearchResult = () => {
  const [videos, setVideos] = useState([]);
  const { searchQuery } = useParams();
  const{loading, setLoading}=useContext(Context)

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchFromApi(`search?q=${searchQuery}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date`)
      .then((data) => {
        // setLoading(true)
        setVideos(data.items)
        console.log(data.items)
        // setLoading(false)
        
      })
  }, [searchQuery]);
  
  const navigate = useNavigate();
  

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
            <LeftNav />
            <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
                <div className="grid grid-cols-1 gap-2 p-5">
                    {!loading && videos?.map((item) => {
                   
                        const videoId = item.id.videoId;
                        return (
                            <SearchResultVideoCard
                                key={videoId}
                                videoId={videoId}
                                snippet={item.snippet}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
  )
}

export default SearchResult