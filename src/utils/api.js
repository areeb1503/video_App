export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';
const URL="search?relatedToVideoId=7ghhRHRP6t4&part=id%2Csnippet&type=video&maxResults=50"

const options = {
  method: 'GET', // Specify GET method
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY, // Use environment variable (consider a .env file)
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
  params:{
    maxResults:100
  }
  
 
};

export const fetchFromApi = async (URL) => {
  
  try {
    const fullUrl = `${BASE_URL}/${URL}`;
    const response = await fetch(fullUrl, options);
    const data = await response.json();
    return data;


  } catch (error) {
    console.error("Error fetching data:", error);
  }




};