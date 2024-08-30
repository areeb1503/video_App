import React, { useContext } from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import VideoLength from "../shared/videoLength";
import { Context } from "../context/contextApi";

const SuggestionVideoCard = ({videoId,snippet,videoDetail }) => {
    const {searchResults}=useContext(Context);
   

    return (
        <Link to={`/video/${videoId}`}>
            <div className="flex mb-3 ">
                <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl bg-slate-800 overflow-hidden">
                    <img
                        className="h-full w-full object-cover"
                        src={snippet?.thumbnails?.high?.url||snippet?.thumbnails?.default?.url}
                    />
                   
                </div>
                <div className="flex flex-col ml-3 overflow-hidden">
                    <span className="text-sm lg:text-xs xl:text-sm font-bold line-clamp-2 text-white">
                        {snippet?.title}
                    </span>
                    
                    <div className="flex text-[12px] lg:text-[10px] xl:text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
                        <span>{`${abbreviateNumber(
                            
                            videoDetail[0]?.statistics?.viewCount.toLocaleString()
                        )} views`}</span>
                        <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                            
                        </span>
                        
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SuggestionVideoCard;