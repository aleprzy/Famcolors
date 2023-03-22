export default function filterByColor(palettes, activeColorTags) {
	const activeColorTagsArray = Object.keys(activeColorTags)
		.filter((colorTag) => activeColorTags[colorTag])
		.map((colorTag) => colorTag);

	if (activeColorTagsArray.length > 0) {
		return palettes.filter((palette) =>
			activeColorTagsArray.every((colorTag) =>
				palette.colorTags.includes(colorTag)
			)
		);
	} else {
		return palettes;
	}
}
