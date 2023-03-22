import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import colorTagsData from "../colorTagsData";

export default function ColorFilter({
	onHandleColorTagClick,
	activeColorTags,
}) {
	const isVerticalMobile = useMediaQuery({
		maxWidth: 768,
		orientation: "portrait",
	});
	const [isFilterOpen, toggleFilter] = useState(false);

	const handleFilterClick = () => {
		toggleFilter((prevState) => !prevState);
	};

	return (
		<div className="color-filter-wrapper">
			{isVerticalMobile ? (
				<button onClick={handleFilterClick} className="navbar__btn">
					{isFilterOpen ? (
						<span className="navbar__btn--filter">
							filter by color <i className="fa-solid fa-angle-up"></i>
						</span>
					) : (
						<i className="fa-solid fa-ellipsis"></i>
					)}
				</button>
			) : (
				<button
					onClick={handleFilterClick}
					className={`navbar__btn navbar__btn--filter ${
						isFilterOpen ? "is-active" : ""
					}`}>
					filter by color{" "}
					<i
						className={`${
							isFilterOpen ? "is-open" : ""
						} fa-solid fa-angle-up`}></i>
				</button>
			)}
			<div
				className="filter-colors-container"
				style={{ display: isFilterOpen ? "flex" : "none" }}>
				{colorTagsData.map((colorTag) => {
					return (
						<button
							key={colorTag.name}
							onClick={() => onHandleColorTagClick(colorTag.name)}
							className="filter-colors-container__color"
							style={{
								backgroundColor: colorTag.hex,
								border: colorTag.name === "white" ? "1px solid grey" : "",
								boxShadow: activeColorTags[colorTag.name]
									? "inset 0px 0px 0px 3px white"
									: "",
								outline: activeColorTags[colorTag.name]
									? "2px solid black"
									: "",
							}}></button>
					);
				})}
			</div>
		</div>
	);
}
