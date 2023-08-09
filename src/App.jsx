import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/header/header'
import Home from './components/home/home'
import Movielist from './components/movielist/movielist'
import Movie from './components/moviedetail/movie'
import Footer from './components/footer/footer'
import Searchpage from './components/searchpage/searchpage'



function App() {
  return (
    <div className="App">
    <BrowserRouter>

     <Header/>
    

    <Routes>
        <Route index element={<Home/>}></Route>
        <Route path="movie/:id" element={<Movie/>}></Route>
        <Route path='movies/:type' element = {<Movielist/>}></Route>    
        <Route path='search/:name' element = {<Searchpage/>}></Route>    
        <Route path="*" element = {<h1>404 Page Note Found</h1>}></Route>
    </Routes>

     <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
