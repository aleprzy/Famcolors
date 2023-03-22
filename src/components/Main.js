import React, { useContext } from "react";
import Palette from "./Palette";
import { ColumnContext } from "../contexts/ColumnContext";
import { PaintingsVisibilityContext } from "../contexts/PaintingsVisibilityContext";

export default function Main({
	palettesToRender: initialPalettes,
	activeButtonName,
	searchValue,
	onHandleSearchChange,
	onHandleClearSearchValue,
}) {
	const { columns } = useContext(ColumnContext);
	const { arePaintingsVisible } = useContext(PaintingsVisibilityContext);

	const palettesToRender = initialPalettes.slice().reverse();

	const searchingPalettes = palettesToRender.filter(
		(palette) =>
			palette.info.title.toLowerCase().includes(searchValue.toLowerCase()) ||
			palette.info.author
				.toLowerCase()
				.includes(searchValue.toLocaleLowerCase())
	);

	return (
		<main className="main">
			{activeButtonName === "allPalettes" && (
				<div className="main__top-bar">
					<div className="main__input-wrapper">
						<input
							type="text"
							value={searchValue}
							onChange={onHandleSearchChange}
							placeholder="Search by painting or painter..."
							className="main__input"
						/>
						{searchValue === "" ? null : (
							<button
								onClick={onHandleClearSearchValue}
								className="main__input-cross-btn">
								<i className="fa-solid fa-xmark"></i>
							</button>
						)}
					</div>
				</div>
			)}
			{activeButtonName === "favorites" && (
				<div className="main__favorites-title">
					<p>Your favorite palettes</p>
				</div>
			)}

			{searchingPalettes.length > 0 && (
				<section className={`main__palettes-container grid-view--${columns}`}>
					{searchingPalettes.map((palette) => (
						<Palette
							key={palette.id}
							palette={palette}
							arePaintingsVisible={arePaintingsVisible}
						/>
					))}
				</section>
			)}
			{(palettesToRender.length === 0 || searchingPalettes.length === 0) && (
				<section className="main__palettes-container--empty">
					<p>No palette here 👀</p>
				</section>
			)}
		</main>
	);
}
