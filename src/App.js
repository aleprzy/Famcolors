import React, { useState } from "react";
import allPalettes from "./palettesData";
import { ColumnProvider } from "./contexts/ColumnContext";
import { PaintingsVisibilityProvider } from "./contexts/PaintingsVisibilityContext";
import filterByColor from "./utils/filterByColors";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
	const [activeButtonName, setButtonActivity] = useState("allPalettes");
	const [searchValue, setSearchValue] = useState("");
	const [activeColorTags, setActiveColorTags] = useState({});

	const handleButtonClick = (buttonName) => {
		setButtonActivity(buttonName);
		setActiveColorTags({});
		window.scrollTo(0, 0);
		if (buttonName === "favorites") {
			clearSearchValue();
		}
	};
	const handleSearchChange = (e) => {
		setSearchValue(e.target.value);
	};
	function clearSearchValue() {
		setSearchValue("");
	}
	const handleColorTagClick = (colorTag) => {
		setActiveColorTags((prevActiveColorTags) => ({
			...prevActiveColorTags,
			[colorTag]: !prevActiveColorTags[colorTag],
		}));
	};

	const favorites = allPalettes.filter((palette) => palette.favorite);

	let palettesToRender;
	if (activeButtonName === "allPalettes") {
		palettesToRender = allPalettes;
	} else if (activeButtonName === "favorites") {
		palettesToRender = favorites;
	}

	palettesToRender = filterByColor(palettesToRender, activeColorTags);

	return (
		<div className="App">
			<Header />
			<ColumnProvider>
				<PaintingsVisibilityProvider>
					<Navbar
						onHandleButtonClick={handleButtonClick}
						activeButtonName={activeButtonName}
						onHandleColorTagClick={handleColorTagClick}
						activeColorTags={activeColorTags}
					/>
					<Main
						palettesToRender={palettesToRender}
						activeButtonName={activeButtonName}
						searchValue={searchValue}
						onHandleSearchChange={handleSearchChange}
						onHandleClearSearchValue={clearSearchValue}
					/>
				</PaintingsVisibilityProvider>
			</ColumnProvider>
			<Footer />
		</div>
	);
}
