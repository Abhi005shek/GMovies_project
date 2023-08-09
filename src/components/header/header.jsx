import {NavLink,useNavigate} from 'react-router-dom';
import './header.css';
import {useState,useEffect} from 'react'
import img from './download.jpeg'
import SearchResult from '../search/search'

export default function Header(){

	const navigate = useNavigate();
	const [toggle,setdisplay] = useState(false);
	const [search_result,setsearchresult] = useState(null);
	const [search,setsearch] = useState('');

	useEffect(()=>{
		fetch(`https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&&query=${search}`)
		     .then(res => res.json())
		     .then(data =>  setsearchresult(data.results) )

		     // window.innerWidth <= '900px' && console.log(ref.current.style)
	},[search])

	
	function input(e){
		setsearch(e)
	}

	function enter(e){
		if(e.code === 'Enter' && e.target.value !== ''){
			e.target.value.replaceAll(' ','+')
			navigate(`/search/${e.target.value}`);
			setsearch('')
		}
	}

	function display(){
		setdisplay(!toggle)
	}


	return (
		<>
			<div className="header">
			
				
				<div className="left_links" >
						<NavLink to="/" className="logo"><span><b>G</b>Movies</span></NavLink>
					    <div className={`navigation ${ (toggle) ? 'display' : ''}`}>
					    <div className='nav_btn'>
					    <div className='btn_container'><button type="button" className="toggle_btn" onClick={display}>CLOSE MENU <ion-icon name="caret-forward-outline"></ion-icon></button></div>
						<NavLink to="/movies/popular" className="header_link" >Popular</NavLink>
						<NavLink to="/movies/top_rated" className="header_link" >Top Rated</NavLink>
						<NavLink to="/movies/upcoming" className="header_link">Upcoming</NavLink>
						</div>
						</div>
				</div>

					<div className='burgur' onClick={display}><ion-icon name="reorder-three-outline"></ion-icon></div>	

					


				<div className="right_link">
					<ion-icon name="search-sharp"></ion-icon>
					<input placeholder="Type to search..." onChange={ e =>  setsearch( (e.target.value).replaceAll(' ','+'))} onKeyPress={enter}/>
				</div>
                
                
					<div className='search_results'>			
                	{(!/sex|fuck|erot|por|hen/.test(search.toLowerCase()))
                		&&
					 (search_result != [] && search != '') && <><SearchResult search={search_result} input={input}/><NavLink className='more_results' to={`/search/${search}`} onClick={()=> setsearch('')}><div>View More Results</div></NavLink></>
			    	}
			        </div>
			
			   		{/*</div>*/}
			</div>
		</>
		)
}