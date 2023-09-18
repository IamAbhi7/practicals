import React from 'react';
import Navbar from "./Components/Navbar";
import Banner from './Components/Banner';
import Footer from './Components/Footer';
import Main from './Components/Main';
// import Keypress from './Components/Keypress'
// import Card from './Components/Card';
import Forms from './Components/Forms'


function App() {
	return (
		<React.Fragment>
			<div className='page-wrapper'>
			<Navbar/>
			<Banner/>
			<Main/>
			{/* <Forms/> */}
			</div>   
			<Footer/>
		</React.Fragment>
	);
}

export default App;
