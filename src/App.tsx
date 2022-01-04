import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Avatar } from '@procore/core-react'
import { TwitsDesk } from './components/TwittsDesk/TwittsDesk';
// import { Header } from './components/header/header';

import './App.css';
import { MovieDetailsPage } from './pages/MovieDetailsPage/MovieDetailsPage';
import { LayoutContainer } from './containers/LayoutContainer/LayoutContainer';
import { Header } from './components/header/header';


const App = ({hi}: {hi: string})=> {


  return (
    
   <BrowserRouter>
      <div className="App">
        <LayoutContainer>
          {({allMovies, search, onChangeSearch, onSearchMovies}) => (
            <>
              <Header search={search} onSearchMovies={onSearchMovies} onChangeSearch={onChangeSearch} />
              <Routes>
                < Route path="/" element={<TwitsDesk allMovies={allMovies} />} />
                <Route path="/movie/:movieId" element={< MovieDetailsPage/>} />

              </Routes>
            </>
          )}
        </LayoutContainer>
    </div>
  </BrowserRouter>
    
    
  );
}

export default App;

// search,
// movies,
// onChangeSearch: handleChangeSearch,
// onSearchMovies: handleSearchMovies,
