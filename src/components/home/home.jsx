import {useEffect,useState} from 'react'
import {NavLink} from 'react-router-dom' 
import './home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Movielist from '../movielist/movielist'

export default function Home(){

const [popularMovies, setpopularMovies] = useState([])

	useEffect(()=>{
		fetch('https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US')
		     .then(res => res.json())
		     .then(data => {
		     	setpopularMovies(data.results)
		     	console.log(data.results)})
	},[])

	return (
		<>
		<div className='poster'>
		<Carousel transitionTime={3} autoPlay={true} infiniteLoop={true} showStatus={false} showThumbs={false}>
		{popularMovies.map( m => (
			<NavLink key = {m.id} className='poster_link' to={`/movie/${m.id}`}>
			<div className='poster_img'>
				<img src = {`https://image.tmdb.org/t/p/original/${m.backdrop_path}`} />
			</div>
			<div className='poster_overlay'>
			<div className='poster_title'>{m ? m.title : ''}</div>
			<div className='poster_runtime'>
				<span className='poster_release'>{m ? m.release_date : ''}</span>
				<span className='poster_rating'>{m.vote_average} <ion-icon name="star"></ion-icon></span>
			</div>
			<div className='poster_description'>{m ? (m.overview).slice(0,150) + '...' : ''}</div>
			</div>
			</NavLink>
		))}
		</Carousel>

		<Movielist />
		</div>
		</>
		);
}