'strict'

import {useState,useEffect,useRef} from 'react'
import {useParams} from 'react-router-dom'
import './movielist.css'
import Card from '../card/Card'
import Pagination from '../pagination/pagination'

export default function Movielist(){
	
	const [movielist,setmovielist] = useState([]);
	const [movie,setmovie] = useState([]);
	const scrollref = useRef();
	const [page,setpage] = useState(1)
	const {type} = useParams(); 

    
    useEffect(() => getData(),[])

    useEffect(() => getData(),[type])

    useEffect(() => getData(),[page])
    
    function getData(){
    	 
    	 fetch(`https://api.themoviedb.org/3/movie/${type?type:'popular'}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${page}`)
		     .then(res => res.json())
		     .then(data => setmovielist(data.results))
	}

	function Page(e){
		setpage(e)
	}

	function scrollTo(){
		scrollref.current.scrollIntoView({behaviour:'smooth'})
	}

	return ( 
	<>
	<div className='movie_list'>
		<div className='list_title' ref={scrollref} ><span>{(type ? type : 'popular').toUpperCase()}
	    </span><Pagination page={page} changepage={Page} scrollTo={scrollTo}/></div>
	
		<div className='list_cards'>
			{
				movielist.map( m => <Card img={m.poster_path} rating={m.vote_average} title={m.title} id={m.id} release={m.release_date} key={m.id}/> )
			}
	    </div>

	    <Pagination page={page} changepage={Page} scrollTo={scrollTo}/>
	</div>
	</>    
	)
}