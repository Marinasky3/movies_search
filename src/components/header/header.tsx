import { Search } from '@procore/core-react'
import React, {useRef, useState} from 'react'
import { Button } from "../Button/Button"
import './Header.scss'

type Props = {
    search: string
    onSearchMovies: ()=> void
    onChangeSearch: (term: string)=> void    //(e:React.FormElement<HTMLInputElement>)=>void
}
// search={search} onSearchMovies={onSearchMovies} movies={movies}

export const Header: React.FC<Props> = ({search, onSearchMovies, onChangeSearch }) => {


    const onSubmit = (term: string): void => {
        onChangeSearch(term)
    //   onSearchMovies
    console.log(search)
    }

    return (
       <div className="header_wrapper">
           <h1>Search Movies</h1>
            {/* <input  type="text" value={search} onChange={(e)=>onChangeSearch(e)} />
           <Button onClickHandler = { onSearchMovies }>
                Search
            </Button> */}
            <div className="header_searchWrapper">
                <Search onSubmit={onSubmit} placeholder="Search" />
            </div>
       </div>
    )
}