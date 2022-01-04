import {useEffect, useState, useCallback} from 'react'
import axios from 'axios'

// import 

import './TwittsDesk.scss'
import { MovieCard } from '../MovieCard/MovieCard'




const BEARER_TOKEN : string = 'AAAAAAAAAAAAAAAAAAAAACktXgEAAAAADRSDMdzmvFevwLRt4V%2BswZJNTpU%3DSNnxDtwOrdmOcuMBv7MoVhauPJwXDGwvuzOfd3lhOFVluihCYz'
const ACCESS_TOKEN: string =  ''

// const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=9c4ab0b19a0403736cc569bf558c3ec8&page=2`;

type Props = {
    allMovies: []
}

export const TwitsDesk: React.FC<Props> = ({allMovies}) => {


    return(
        <div className="twitsDesk_wrapper">
            
                    { allMovies.map((movie, index) => {
                            return(
                                <MovieCard movie={movie} key={index} />
                            )
                        })
                    }

        </div>
    )
} 
