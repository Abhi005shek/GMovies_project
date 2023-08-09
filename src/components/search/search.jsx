'strict'
import './search.css'
import {NavLink} from 'react-router-dom'


export default function SearchResult(props){

	return (

		<>
		{ 	(props.search === [])

			 ? <div>No Data Found</div>
            
            :
            
			props.search.map( (s,i) => (
			(i < 5) && <NavLink to={`/movie/${s.id}`} className='result_movie' onClick={()=> props.input('')}><div className='results' key={s.id}>
			<div className='result_img'><img src={s.poster_path ? `https://image.tmdb.org/t/p/original/${s.poster_path}`: ''} /></div>
			<div className='result_name'>{s.title}</div>
			</div> 
			</NavLink>
			))

			
		}
		</>
		)
}