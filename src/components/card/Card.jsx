import {useEffect,useState} from 'react'
import {NavLink} from 'react-router-dom'
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css' 
import './card.css'
import img from './image.jpg'

export default function Card(props){
	
	function Year(y){
      let date = new Date(y)
       return date.getFullYear();
	}

	return (
	<>       { (!/sex|fuck|erot|por|hen|nude/.test(props.title.toLowerCase()))
				&&

              <NavLink className="Card_link" to={`/movie/${props.id}`} style={{textDecoration:'none',color:'white'}}> 
				<div className='card'>
					<div className='card_img'>
					    <img className='card_image' src={ props.img ? `https://image.tmdb.org/t/p/original${props.img}` : img}/>	
					</div>
					<div className='card_description'>
						<p className='card_title'>{ (props.title.length >= 25) ? props.title.slice(0,23) + '...' : props.title}</p>
						<p className='card_detail'>
							<span className='year'>{Year(props.release)}</span>
							<span className='rating'>{(props.rating)} <ion-icon name="star"></ion-icon></span>	
						</p>
					</div>
				</div>
			</NavLink>
			}
	</>
	)
}