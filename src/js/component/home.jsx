import React, { useState, useEffect, useRef } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { MediaPlayer } from "./Player";
//create your first component
const Home = () => {
	const [songs, setSongs] = useState([]);
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [urlSong, setUrlSong] = useState("")

	const audioPlayer = useRef();

	const getSongs = () => {
		fetch(`https://playground.4geeks.com/sound/songs`)
		.then((response) => response.json())
		.then((data)=>{
			setSongs(data.songs);
			console.log("Array de objetos de canciones",data.songs)
		})
		.catch((error)=> console.log("Error al buscar canciones", error));
	};

	// const handleSelectedSong = (element) => {
	// 	setCurrentSong(element)
	// }

	const getUrl = (url, index) => {
		setUrlSong(url)
		audioPlayer.current.src=(`https://playground.4geeks.com${url}`)
		audioPlayer.current.play();
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

	const handleSongClick = (element, index) => {
		getUrl(element.url, index);
	  };

	return (
		
		<div className="container text-center overflow-auto">
			<section >
				<h1>Efectos de sonido disponibles:</h1>
				
				<ol className="list-group">
					{songs.map((element,i) => (
					<li key={i} id={i} value={i} onClick={()=>handleSongClick(element, i)} className={"list-group-item p-3 text-start" + (i===currentSongIndex && urlSong ? " active": "")}><span>{element.id} </span>{element.name}</li>
					))}
				</ol>
				{/* <audio ref={audioPlayer} ></audio> */}
				{/* <button onClick={fucnionEjemplo}>Play</button> */}
			</section>
			<section>
				<div>
					<audio ref={audioPlayer}>
						<source src={currentSongIndex} type="audio/mpeg"/>
					</audio>
				</div>
				<div>
					<span>
					<i onClick={() => audioPlayer.current.play()} className="fa-solid fa-play"></i><i onClick={() => audioPlayer.current.pause()} className="fa-solid fa-pause"></i>
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
