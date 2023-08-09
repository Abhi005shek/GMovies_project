import './pagination.css'
import { useRef } from 'react';

export default function Pagination(props){

	// if(props.page == 1){
	// 	document.querySelector('prev_btn').style.display='none'
	// }
	// if(props.page == 100){
	// 	document.querySelector('next_btn').style.display='none'
	// }


	return (


		<div className='container'>
		{(props.page != 1)
		&&
		<button className='prev_btn' onClick={()=> { 
			props.scrollTo();
			(props.page !== 1) && props.changepage(props.page - 1)}}>Prev</button>
		
		}
		<p>{props.page} of 100</p>
	 	
		{(props.page < 100)
		&&
		<button className='next_btn' onClick={()=> { 
			props.scrollTo();
		   ( props.page < 100 ) && props.changepage(props.page + 1)} }>Next</button>
		}
		</div>
	)
}