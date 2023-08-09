import {NavLink,useParams} from 'react-router-dom'
import {useEffect,useState} from 'react'
import './searchpage.css'
import Card from '../card/Card'

export default function Searchpage(){

	const {name} = useParams();
	const [results,setresult] = useState([])

	useEffect(()=>{
		if(name !== '')
	{	fetch(`https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&&query=${name.replaceAll(' ','+')}`)
		     .then(res => res.json())
		     .then(data =>{ setresult(data.results) 
		 					 console.log(data.results)})  
	}

	},[name])

	return(
      
         
	 	<div className='Searchpage'>
	 	<div className='query'>{`SEARCH : ${name}`}</div> 
	   {(results.length)
 		?
	 	(!/sex|fuck|erot|por|hen|nude/.test(name.toLowerCase()))
        ?
        <>	
		<div className='searchresults'>
		{
		results.map( m => <Card img={m.poster_path} rating={m.vote_average} title={m.title} id={m.id} release={m.release_date} key={m.id}/> )
		}
		</div>
		</>
		:
		<div>No results Found</div>
		:
		<div>No results Found</div>
		 } 
		</div>
		)
}