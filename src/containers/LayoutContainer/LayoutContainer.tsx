import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { string } from 'prop-types';

const { REACT_APP_API_URL, REACT_APP_MOVIE_API_KEY } = process.env;

interface AllMoviesResponse{
     [key: string]: (string | number | [] | {}) 
}
interface ILayoutContainer { 
    children(search: string, allMovies: Array<{}>,  handleChangeSearch: (string)=> void, handleSearchMovies: () => void
    )}

  // ?? interface for React.FC when you call children props as a function
export const LayoutContainer /*: React.FC<ILayoutContainer>*/ = (props) => {

    const [ allMovies, setAllMovies ] = useState<AllMoviesResponse[]>([])
    const [ currentPage, setCurrentPage ] = useState<number>(1)
    const [ fetching, setFetching ] = useState<boolean>(true)
    // const [showSmallLoader, setShowSmallLoader] = useState(false)

    const [search, setSearch] = useState<string>('');
    // const [movies, setMovies] = useState([]);
    // const [isSearching, setIsSearching] = useState(false);
    // const [movieId, setMovieId] = useState({});
    // const [isAuthenticated, setIsAuthenticated] = useState(false)

    const navigate = useNavigate();

    const handleChangeSearch = (term: string): void => { // e
        setSearch(term);      // ok) e.target.value
    };

    useEffect (()=>{

        if(fetching){
            axios.get(`${REACT_APP_API_URL}/trending/movie/week?api_key=${REACT_APP_MOVIE_API_KEY}&page=${currentPage}`)
            .then(function (response) {
                // handle success
                console.log(response.data.results);
                setAllMovies( (prevState) => {  return [...prevState, ...response.data.results ]})
                setCurrentPage((prevState)=>{ return prevState+1 })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(()=> { setFetching(false) })
        }
    },[fetching])

    useEffect(()=>{

        document.addEventListener( 'scroll', scrollHandler )

        return function() { document.removeEventListener( 'scroll', scrollHandler ) }
    },[])

    const scrollHandler = ( e ) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 ){
            
            setFetching(true)
           
        }
    }

    useEffect(()=>{
        if (search){

            handleSearchMovies()
        }
        
    },[search])

    const handleSearchMovies = async () => {
        
        console.log (search)
        // setIsSearching(true);

        try {
            const url = `${REACT_APP_API_URL}/search/movie?api_key=${REACT_APP_MOVIE_API_KEY}&query=${search}`;

            const {
                data: { results }
            } = await axios.get(url);

            setSearch('');
            setAllMovies(results);
            // setIsSearching(false);

            console.log(allMovies)

            navigate('/');
        } catch (e) {
            console.error('[e]', e);
        }
        console.log(allMovies)
        
    };

    return props.children({
        search,
        allMovies,
        onChangeSearch: handleChangeSearch,
        onSearchMovies: handleSearchMovies,


    })
}