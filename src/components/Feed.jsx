
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import VideoCard from "./VideoCard";
import Loader from "../shared/Loader"

const Feed = () => {
  const { loading, searchResults, selectCategories, setSelectCategories, mobileMenu } = useContext(Context);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    if (searchResults.length > 0) {
      setIsDataFetched(true);
    }
  }, [searchResults]); 
  console.log(searchResults)
  if(!isDataFetched) return <Loader />; 

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      
                <LeftNav selectCategory={selectCategories} setSelectCategory={setSelectCategories} />
      <div className="flex-grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black overflow-auto no-scrollbar">
        <span className="text-white text-2xl">{selectCategories} videos</span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          {!loading && isDataFetched && searchResults.map((searchResult, index) => {
            const videoId = searchResult.id.videoId;
            const { snippet } = searchResult;

            return (
              <VideoCard
                key={videoId || index} // Fallback to index as key if videoId is undefined
                videoId={videoId}
                snippet={snippet}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
