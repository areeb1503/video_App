import React, { useState, useEffect, createContext } from 'react'
import { fetchFromApi } from '../utils/api'

export const Context = createContext();
export const AppContext = (props) => {
    const [loading, setLoading] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [selectCategories, setSelectCategories] = useState("New")
    const [mobileMenu, setMobileMenu] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {

        setLoading(true)
        fetchFromApi(`search?part=snippet&q=${selectCategories}&type=video&maxResults=50`)
            //   .then(response=>response.json())
            .then(data => {
                if (data.items) {
                    setSearchResults(data.items)

                }


            }
            )
            .catch(error => console.log(error))
            .finally(setLoading(false))






    }, [selectCategories])


    return (
        <Context.Provider value={{
            loading,
            setLoading,
            searchResults,
            setSearchResults,
            selectCategories,
            setSelectCategories,
            mobileMenu,
            setMobileMenu,
            isSidebarOpen,
            setIsSidebarOpen,
        }}>
            {props.children}
        </Context.Provider>


    )
}