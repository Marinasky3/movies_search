import { Link } from 'react-router-dom';
import { Card } from '@procore/core-react'
import { Icon } from '@procore/core-react'
import './MovieCard.scss'
import img from '../../img/noPoster.jpeg'

const { REACT_APP_STORAGE_URL } = process.env;

export const MovieCard = ({movie }) => {
    const movieRating: number = Number((movie.vote_average/2).toFixed(0))
    const movieRatingToShow: number = Number((movie.vote_average/2).toFixed(2))

    const arrOfStarsForRating: Array<number> = []
    for ( let i = 0; i<movieRating; i++){
        arrOfStarsForRating.push(1)
    }
    const utcDate = new Date(movie.release_date)
    const year = utcDate.getFullYear();
    // console.log(year)

    return(
        <Card style={{padding: 24, position:'relative'}}>

            <Link to={`/movie/${movie.title}?movieId=${movie.id}`} className="movieCard_movieLink">

                <div className="movieCard_movieActive">
                   <div className="movieCard_title">                
                        {movie.title}
                   </div>
                   <div className="movieCard_releaseYear">Release: {year}</div>
                </div>
                <div 
                    style={{background: movie.poster_path !== null ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path}) 0 0/100% 100% no-repeat` : `url(${img})  center no-repeat `}} 
                    className="movieCard_movieBackground">
                </div>
                <div className="">

                </div>
             </Link>
                <div className="movieCard_ratingWrapper">
                    <div className="">

                        Rating: {movieRatingToShow}
                    </div>
                    <div className="">
                        {
                            arrOfStarsForRating.map(()=>{
                                return(
                                    <Icon clickable={true} icon="star" />
                                )
                            })
                        }
                    </div>
                </div>
           
        </Card>
    //   background: url( ${props => props.bgUrl}) 0 0/100% 100% no-repeat
    )
} 