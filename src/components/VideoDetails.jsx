import React, { useEffect, useState,useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFromApi } from "../utils/api";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number"
import Loader from "../shared/Loader";
import { Context } from "../context/contextApi";
import SuggestionVideoCard from "./SuggestionVideoCard";


const VideoDetails = ({snippet}) => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [videoDuration,setVideoDuration]=useState(null)
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [loading,setLoading]=useState(false)
  const { id } = useParams();
  const { searchResults } = useContext(Context);
  snippet=searchResults
  useEffect(() => {
    fetchFromApi(   `videos?part=snippet,statistics&id=${id}&maxResults=50`)
      .then((data) => {setVideoDetail(data.items)
        setIsDataFetched(true);
      })

      fetchFromApi( `search?relatedToVideoId=${id}&part=id,snippet&type=video&maxResults=50`)
      .then((data) => {setVideos(data.items)
        setIsDataFetched(true);
      })
  }, [id]);



  if(!videoDetail) return <Loader />;

  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black">
        <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
            <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-visible">
                <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${id}`}
                        controls
                        width="100%"
                        height="100%"
                        style={{ backgroundColor: "#000000" }}
                        playing={true}
                    />
                </div>
                <div className="text-white font-bold text-sm md:text-xl md:mt-4 ">
                    {videoDetail[0].snippet.title}
                </div>
                <div className="flex justify-between flex-col md:flex-row md:mt-4">
                   
                    <div className="flex text-white mt-4 md:mt-0">
                        <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                            <AiOutlineLike className="text-xl text-white mr-2" />
                            {`${abbreviateNumber(
                              (videoDetail[0].statistics.likeCount).toLocaleString()
                            )} Likes`}
                        </div>
                        <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                            {`${abbreviateNumber(
                               
                              (videoDetail[0].statistics.viewCount).toLocaleString()
                            )} Views`}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px] overflow-auto no-scrollbar">
                      {isDataFetched && videos.map((item, index) => {
                         const videoId = item.id.videoId;
                     
                        return (
                            <SuggestionVideoCard
                                key={index}
                                videoId={videoId}
                                snippet={item.snippet}
                                videoDetail={videoDetail}
                                
                              
                            />
                        );
                    })}
                </div>
            
        </div>
    </div>
);
};


export default VideoDetails