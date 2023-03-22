import React, { useContext, useState } from "react";
import ColorFilter from "./ColorFilter";
import { ColumnContext } from "../contexts/ColumnContext";
import { PaintingsVisibilityContext } from "../contexts/PaintingsVisibilityContext";

export default function Navbar({
	onHandleButtonClick,
	activeButtonName,
	onHandleColorTagClick,
	activeColorTags,
}) {
	const { columns, handleColumnChange } = useContext(ColumnContext);
	const { arePaintingsVisible, handleTogglePaintingsVisibility } = useContext(
		PaintingsVisibilityContext
	);
	return (
		<nav className="navbar">
			<div className="view-wrapper">
				<p>view:</p>
				{[3, 4].map((num) => (
					<button
						key={num}
						onClick={() => handleColumnChange(num)}
						className={`view-wrapper__btn view-wrapper__btn--${num} ${
							columns === num ? "is-active" : ""
						}`}>
						{num}
					</button>
				))}
			</div>
			<button
				onClick={() => onHandleButtonClick("allPalettes")}
				className={`navbar__btn navbar__btn--palette ${
					activeButtonName === "allPalettes" ? "is-active" : ""
				}`}>
				<i className="fa-solid fa-palette"></i>
				<span className="all-palettes-text">all palettes</span>
			</button>
			<button
				onClick={() => handleTogglePaintingsVisibility()}
				className="navbar__btn navbar__btn--show-hide">
				{arePaintingsVisible ? (
					<i className="fa-regular fa-eye"></i>
				) : (
					<i className="fa-regular fa-eye-slash"></i>
				)}
				<span className="hide-paintings-text">
					<span>{arePaintingsVisible ? "hide" : "show"}</span> paintings
				</span>
			</button>
			<ColorFilter
				onHandleColorTagClick={onHandleColorTagClick}
				activeColorTags={activeColorTags}
			/>
			<button
				onClick={() => onHandleButtonClick("favorites")}
				className={`navbar__btn navbar__btn--heart ${
					activeButtonName === "favorites" ? "is-active" : ""
				}`}>
				<i className="fa-solid fa-heart"></i>
				<span className="favorites-text">favorites</span>
			</button>
		</nav>
	);
}
