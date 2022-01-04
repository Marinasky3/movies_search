import { Link } from 'react-router-dom';
import axios from 'axios'
import { Avatar } from '@procore/core-react'
import {useState, useEffect} from 'react'
import img from '../../img/noPoster.jpeg'
import cinema_tools from '../../img/cinema_tools.jpeg'
import './MovieDetailsPage.scss'

interface IMovieDetails{
    genres: Array<{name: string }> //Array<{ id: number, name: string }> [key: string]: (string | number | [] | {}) 
    release_date: string
    poster_path: string
    backdrop_path: string
    title: string
    tagline: string
    vote_average: number
    vote_count: number
    budget: number
    revenue: number
    production_countries: Array<{name: string }>
    runtime: number
    production_companies: Array<{name: string, logo_path: string | null}>
    overview: string
}

export const MovieDetailsPage = () => {
 
    const queryParams: URLSearchParams = new URLSearchParams(window.location.search);
    console.log( 'queryParams', queryParams)
    const movieId: string | null = queryParams.get('movieId');

    const [ movieDetails, setMovieDetails ] = useState <IMovieDetails | null> (null)


        const movieGenre: string[] | undefined = movieDetails?.genres.reduce((sum: string[], current: {name: string} )=> [ ...sum, current.name], [] )
        const releaseDate: Date = movieDetails ? new Date(movieDetails!.release_date) : new Date(1)
        const releaseDateDay: number | undefined = releaseDate.getDay()
        const releaseDateMonth: number | undefined  = (releaseDate.getMonth()) + 1
        const releaseDateYear: number  = releaseDate.getFullYear()

    
 


    const getNiceNumberWithSpace = (number: number): string => {

        const getNumOfTriplets: number = Math.ceil(String(number).length / 3)
        let budget: string = String(number)
        let budgetArr : string[] = []
        for(let i = 0; i < getNumOfTriplets; i++){
            const strLength: number = budget.length;
            const lastTriplet: string = budget.slice(-3)
    
            budget = budget.slice(0, -3)
            budgetArr.unshift(lastTriplet)
        }
        budgetArr.join(' ')
        return budgetArr.join(' ')
    }
    const getFirstLettersOfWords = (str: string): string | null => {
        // var str     = "Java Script Object Notation";
        let matches: string[] | null = str.match(/\b(\w)/g);              // ['J','S','O','N']
        return matches!.join(''); 
    }


    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=9c4ab0b19a0403736cc569bf558c3ec8&language=en-US`)
        .then( (response): void => {
            // handle success
            console.log(response.data);
            setMovieDetails(response.data)
        })
        .catch( (error: Error): void=> {
            // handle error
            console.log(error);
        }) 
    }, [])

    return(
        <>
        { movieDetails ?

        <div style={{background: `url(https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path})  0 0/cover no-repeat` }} className="movieDetailsPage_wrapper">
            <Link className='movieDetailsPage_link' to="/" >Back</Link>
            <div className="movieDetailsPage_card">
                <div className="movieDetailsPage_cardHeaderWrapper">
                    <div 
                        style={{background: movieDetails.poster_path ? `url(https://image.tmdb.org/t/p/w500${movieDetails.poster_path})  0 0/cover no-repeat` : `url(${img})  center no-repeat`  }} 
                        className="movieDetailsPage_posterWrapper">
                    </div>
                    <div className="movieDetailsPage_infoWrapper">
                        <div className="movieDetailsPage_movieTitle">
                            {movieDetails.title}
                            <div>{movieDetails.tagline}</div>
                        </div>
                        <div className="movieDetailsPage_infoList">Rating: <span>{movieDetails.vote_average} ({movieDetails.vote_count} votes)</span></div>
                        <div className="movieDetailsPage_infoList">Budget: <span>{getNiceNumberWithSpace(movieDetails.budget)}$</span></div>
                        <div className="movieDetailsPage_infoList">Revenue: <span>{getNiceNumberWithSpace(movieDetails.revenue)}$</span></div>
                        <div className="movieDetailsPage_infoList">Genre: <span>{ movieGenre?.join(', ') }</span></div>
                        <div className="movieDetailsPage_infoList">Production countries: 
                            <span>
                                {
                                    movieDetails.production_countries.map((countryObj)=>{
                                        return(countryObj.name + '; ')
                                    })
                                }
                            </span>
                        </div>
                        <div className="movieDetailsPage_infoList">Runtime: <span>{movieDetails.runtime} min</span></div>
                        <div className="movieDetailsPage_infoList">Release date: 
                             <span>
                                 {`${releaseDateDay}`.length ===1 ? '0'+releaseDateDay : releaseDateDay}. 
                                {`${releaseDateMonth}`.length ===1 ? '0'+releaseDateMonth : releaseDateMonth}.{releaseDateYear}
                            </span>
                        </div>
                        <span className="movieDetailsPage_secondaryTitle">Production companies</span>
                        <div className="movieDetailsPage_productionCompaniesWrapper">
                            {
                                movieDetails.production_companies.map((company: {name, logo_path: string | null})=>{
                                    return(
                                        <>
                                        <div className="movieDetailsPage_companyInfoWrapper">
                                            <div className="movieDetailsPage_companyNameWrapper"> {company.name}</div>
                                            <Avatar size="lg">
                                                { company.logo_path ?
                                                    <Avatar.Portrait imageUrl={`https://image.tmdb.org/t/p/w500${company.logo_path}`} />
                                                    :
                                                    <Avatar.Label>{getFirstLettersOfWords(company.name)}</Avatar.Label>
                                                }
                                            </Avatar>
                                        </div>
                                        </>
                                      
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="movieDetailsPage_movieOverViewHeader">Overview</div>
                <div className="movieDetailsPage_movieOverViewWrapper">
                        <div className="movieDetailsPage_movieOverView">
                            {movieDetails.overview}
                        </div>
                        <div
                            style={{background: movieDetails.backdrop_path ? `url(https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}) center no-repeat` : `url(${cinema_tools})  0 0/contain no-repeat ` }}
                             className="movieDetailsPage_movieOverViewImg"></div>
                </div>

            
            </div>

        </div>
        : null
        }
        </>
    )
}