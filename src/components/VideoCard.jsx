
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/contextApi";


function VideoCard({ videoId, snippet }) {
  const {mobileMenu,}=useContext(Context)
  const thumbnailUrl = snippet?.thumbnails?.high?.url||snippet?.thumbnails?.default?.url; 
  

  return (
    <Link to={`/video/${videoId}`} >
      <div className={`flex flex-col mb-8`}>
        <div className={`relative flex shrink-0 h-48 md:h-48 md:rounded-xl overflow-hidden `}>
          <img
            // height={snippet?.thumbnails?.default?.height} // Use snippet's thumbnails
            // width={snippet?.thumbnails?.default?.width}
            className={`h-full w-full object-cover rounded-2xl `}
            src={thumbnailUrl}
            alt={snippet?.title} // Add alt text for accessibility
          />
          {snippet.length}
        </div>
        
        <h3 className="text-lg font-bold mt-2 text-white">{snippet?.title}</h3>
        <p className="text-gray-500">{snippet?.channelTitle}</p>
      </div>
    </Link>
  );
}

export default VideoCard;


