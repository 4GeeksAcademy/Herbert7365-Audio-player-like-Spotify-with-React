import React, { useState, useEffect, useRef } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [songs, setSongs] = useState([]);
	const [currentSong, setCurrentSong]=useState()
	const [urlSong, setUrlSong] = useState("")
	const [currentSongIndex, setCurrentSongIndex] = useState(0);

	const cancionActual = useRef();

	const getSongs = () => {
		fetch(`https://playground.4geeks.com/sound/songs`)
		.then((response) => response.json())
		.then((data)=>{
			setSongs(data.songs);
		})
		.catch((error)=> console.log("Error al obtejner efectos de sonido", error));
	};

	// const handleSelectedSong = (element) => {
	// 	setCurrentSong(element)
	// }

	const getUrl = (url) => {
		setUrlSong(url)
		cancionActual.current.src=(`https://playground.4geeks.com${url}`)
		cancionActual.current.play();
	};

	useEffect(() => {
		// Llama a la función al cargar el componente
		getSongs();
	  }, []);

	// const fucnionEjemplo = () => {


	// const playSongs =(url)=>{
	// 	url.playSongs
	// }
	
	const handleNextSong = () => {
		setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
		getUrl(songs[currentSongIndex].url);
	};
	
	const handlePrevSong = () => {
		setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
		getUrl(songs[currentSongIndex].url);
	};
	return (
		
		<div className="text-center">
			<h1>Efectos de sonido disponibles:</h1>
			{console.log(currentSong)}
			<ul>
				{songs.map((element,i) => (
				<li key={i} onClick={()=>getUrl(element.url)}>{element.name}</li>
				))}
      		</ul>
			<audio ref={cancionActual} >cancion actual</audio>
			{/* <button onClick={fucnionEjemplo}>Play</button> */}

			<section>
				<div>
					<span>
					<i className="fa-solid fa-play"></i>
					</span>
				</div>
				
				<div>
					<span>
					<i className="fa-solid fa-pause"></i>
					</span>
				</div>
				<div>
					<span>
					<i onClick={handleNextSong} className="fa-solid fa-square-caret-right"></i>
					</span>
				</div>
				<div>
					<span>
					<i onClick={handlePrevSong} className="fa-solid fa-square-caret-left"></i>
					</span>
				</div>
			</section>
			

		</div>
		
	
	);
};

export default Home;
