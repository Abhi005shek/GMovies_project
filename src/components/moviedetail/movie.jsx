'strict'
import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import './movie.css'
import Card from '../card/Card'

export default function Movie(){

	const [movies,setmovie] = useState({})
	const [recommend,setrecommend] = useState([])
	const [video,setvideo] = useState([])
	const [credit,setcredit] = useState([])
	const {id} = useParams()

	const responsive = {
  superLargeDesktop: {    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
    

	useEffect(() => { 
		getData();
		getVideo();
		getCredit();
		window.scrollTo(0,0);
	 },[id])

	function getData(){
    	fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
		     .then(res => res.json())
		     .then(data => { 
		     	setmovie(data)
		     	console.log(data) })
		     .catch(err => console.log('Error ==> ',err))

		fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=4e44d9029b1270a757cddc766a1bcb63`)
		     .then(res => res.json())
		     .then(data => setrecommend(data.results))
	}

	function getVideo(){
    	fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
		     .then(res => res.json())
		     .then(data => setvideo(data.results))
		     			
		     .catch(err => console.log('Error ==> ',err))
	}

	function getCredit(){
    	fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
		     .then(res => res.json())
		     .then(data => { setcredit(data.cast.slice(0, 15))
		 					 console.log(data.cast)})
		     			
		     .catch(err => console.log('Error ==> ',err))
	}




	return (
		<div className='movie_page'>
		{(!/sex|fuck|erot|por|hen/.test(`${movies.title}`.toLowerCase())) ?
		 <>
 		 <div className='movie'>
			<div className='movie_poster'>
				<img src={`https://image.tmdb.org/t/p/original/${movies.backdrop_path}`} />
			    <div className='poster_effect'></div>
			</div>

			<div className='movie_detail'>
				<div className='movie_detailleft'>
					<div className="movie_posterbox">
						<img src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}/>
					</div>
					
				</div>
				<div className='movie_detailright'>
						<div className="movie_name">{movies.title}</div>
						<div className="movie_tagline">{movies.tagline}</div>

						<div className="movie_duration">{movies.runtime + ' min'}</div>
						<div className="movie_release">{movies.release_date}</div>

						<div className="movie_genre">
						 	{
								movies.genres ?  movies.genres.map(m => <span key={m.id}>{m.name}</span>) : null
							}
						</div>
		

					<div className='views'>
						<span className="movie_rating">{movies.vote_average} <ion-icon name="star"></ion-icon></span> /&nbsp;
						<span className="movie_votes">{movies.vote_count} voted</span>
				    </div>
						
				</div>

			</div>      
		
		</div>

		<div className="movie_description"><span>SYNOPSIS</span><br/>{movies.overview}</div>

		<div className='cast_title'><h3>CAST</h3></div>
		<div className="credit">
			{	(credit != [])  && credit.map(m => <div key={m.id} className='cast'><div className='cast_img'><img src={`https://image.tmdb.org/t/p/original${m.profile_path}`}/></div><p>{m.name}</p></div>) }
			
		</div>

		<div className='videos_trailer'>
		   <div className="trailer">TRAILER</div> 
			 <div className='videos'>
			{	video.map( v => v.type === 'Trailer' && <iframe key={v.id} allowFullScreen={true} src={`https://www.youtube.com/embed/${v.key}`}></iframe>)
					
			}
			</div>	
		   </div>

            <div className='recommendations_section'>
            <div className='recommend_title'>You May Also Like</div>
			<div className='recommendations'>

				{
				  recommend.map( m => <Card img={m.poster_path} rating={m.vote_average} title={m.title} id={m.id} release={m.release_date} key={m.id}/> )
				}
			</div>	
			</div>
		</>
		:
		<div className='no_data'>No Result Found</div>
   }
	</div>
		);
}