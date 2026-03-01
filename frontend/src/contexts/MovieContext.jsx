import { createContext, useState, useContext, useEffect } from "react";
import { getMovieDetails } from '../services/request';

import api from "../lib/axios";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        // const storedFavs = localStorage.getItem("favorites")

        // if (storedFavs) setFavorites(JSON.parse(storedFavs))

        const storedFavs = async () => {
            try {
                const response = await api.get("/favorites")
                getMovieDetails(response.data.map(movie => movie.movieID)).then(details => {
                    
                    const favoritesWithDetails = response.data.map((fav, index) => ({
                        ...fav,
                        details: details[index]
                    }))
                    setFavorites(favoritesWithDetails)
                    console.log(favoritesWithDetails)
                })
            } catch (error) {
                console.error("Error fetching favorites", error)
            }
        }

        storedFavs()
    }, []);

    const addToFavorites = async (movie) => {
        try {
            const response = await api.post("/favorites", { movieID: movie.id })
            setFavorites(prev => [...prev, response.data])
        } catch (error) {
            console.error("Error adding favorite", error)
        }
    }

    const removeFromFavorites = async (movieId) => {
        try {
            const movieDBKey = favorites.find(movie => movie.details.id === movieId)._id
            await api.delete(`/favorites/${movieDBKey}`)
            
            setFavorites(prev => prev.filter(movie => movie.details.id !== movieId))
        } catch (error) {
            console.error("Error removing favorite", error)
        }
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.movieID === movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>

}

// import { createContext, useState, useContext, useEffect } from "react";

// const MovieContext = createContext()

// export const useMovieContext = () => useContext(MovieContext)

// export const MovieProvider = ({children}) => {
//     const [favorites, setFavorites] = useState([])

//     useEffect(() => {
//         const storedFavs = localStorage.getItem("favorites")

//         if (storedFavs) setFavorites(JSON.parse(storedFavs))
//     }, [])

//     useEffect(() => {
//         localStorage.setItem('favorites', JSON.stringify(favorites))
//     }, [favorites])

//     const addToFavorites = (movie) => {
//         setFavorites(prev => [...prev, movie])
//     }

//     const removeFromFavorites = (movieId) => {
//         setFavorites(prev => prev.filter(movie => movie.id !== movieId))
//     }

//     const isFavorite = (movieId) => {
//         return favorites.some(movie => movie.id === movieId)
//     }

//     const value = {
//         favorites,
//         addToFavorites,
//         removeFromFavorites,
//         isFavorite
//     }

//     return <MovieContext.Provider value={value}>
//         {children}
//     </MovieContext.Provider>

// }