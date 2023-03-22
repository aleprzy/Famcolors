import { createContext } from "react";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export const ColumnContext = createContext();

export const ColumnProvider = ({ children }) => {
	const [columns, setColumns] = useState(1);
	const handleColumnChange = (numColumns) => {
		setColumns(numColumns);
	};
	const isTablet = useMediaQuery({ minWidth: 991, maxWidth: 1399 });
	const isDesktop = useMediaQuery({ minWidth: 1400 });

	useEffect(() => {
		if (isDesktop) {
			setColumns(3);
		} else if (isTablet) {
			setColumns(2);
		} else {
			setColumns(1);
		}
	}, [isDesktop, isTablet]);

	return (
		<ColumnContext.Provider value={{ columns, handleColumnChange }}>
			{children}
		</ColumnContext.Provider>
	);
};
