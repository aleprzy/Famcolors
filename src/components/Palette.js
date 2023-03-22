import React, { useState, useEffect, useRef, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import Color from "./Color";
import exportAsImage from "../utils/exportAsImage";

export default function Palette({ palette, arePaintingsVisible }) {
	const favoriteKey = useMemo(() => palette.id.toString(), [palette.id]);

	useEffect(() => {
		const favorite = JSON.parse(localStorage.getItem(favoriteKey));
		if (favorite !== null) {
			setFavorite(favorite);
			palette.favorite = favorite;
		}
	});

	const [isFavorite, setFavorite] = useState(false);

	const handleFavoriteClick = () => {
		setFavorite((prevState) => !prevState);
		palette.favorite = !palette.favorite;
		localStorage.setItem(favoriteKey, JSON.stringify(palette.favorite));
	};
	const exportRef = useRef();

	const [isInfoVisible, toggleInfo] = useState(false);
	const handleInfoClick = () => {
		toggleInfo((prevState) => !prevState);
	};
	const isTabletOrMobile = useMediaQuery({
		query: "(max-width: 1200px)",
	});

	return (
		<div className="palette-box">
			<div className="palette">
				<img
					className={`palette__painting ${
						arePaintingsVisible ? "" : "paintings-are-hidden"
					}`}
					src={`/img/paintings/${palette.img}`}
					alt={`"${palette.info.title}" by ${palette.info.author}`}
				/>
				<div
					ref={exportRef}
					className={`colors-container ${
						arePaintingsVisible ? "" : "paintings-are-hidden"
					}`}>
					{palette.colors.map((color) => {
						return <Color key={color.id} color={color} />;
					})}
				</div>
			</div>
			<div className="palette-btns-wrapper">
				<div className="palette-btns-wrapper--left">
					<button
						onClick={isTabletOrMobile ? handleInfoClick : null}
						className={`palette__btn palette__btn--info ${
							arePaintingsVisible ? "" : "paintings-are-hidden"
						}`}>
						{isInfoVisible ? (
							<i className="fa-regular fa-circle-xmark"></i>
						) : (
							<i className="fa-solid fa-circle-info"></i>
						)}
					</button>
					<div
						className={`painting-info ${isInfoVisible ? "visible" : "hidden"}`}>
						<p>
							The painting is "{palette.info.title}" by {palette.info.author}.
						</p>
					</div>
				</div>
				<div className="palette-btns-wrapper--right">
					<button
						onClick={() =>
							exportAsImage(exportRef.current, "famcolors-palette")
						}
						className="palette__btn palette__btn-download">
						<i className="fa-solid fa-arrow-down-long"></i>
					</button>
					<button
						onClick={handleFavoriteClick}
						className="palette__btn palette__btn--heart">
						{isFavorite ? (
							<i className="fa-solid fa-heart"></i>
						) : (
							<i className="fa-regular fa-heart"></i>
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
