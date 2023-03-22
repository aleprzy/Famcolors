import { createContext, useState } from "react";

export const PaintingsVisibilityContext = createContext();
export const PaintingsVisibilityProvider = ({ children }) => {
	const [arePaintingsVisible, togglePaintingsVisibility] = useState(true);
	const handleTogglePaintingsVisibility = () => {
		togglePaintingsVisibility((prevState) => !prevState);
	};
	return (
		<PaintingsVisibilityContext.Provider
			value={{ arePaintingsVisible, handleTogglePaintingsVisibility }}>
			{children}
		</PaintingsVisibilityContext.Provider>
	);
};
