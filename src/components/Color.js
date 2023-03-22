import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Color(props) {
	const hexToRgb = (color) =>
		((value) =>
			value.length === 3
				? value.split("").map((c) => parseInt(c.repeat(2), 16))
				: value.match(/.{1,2}/g).map((v) => parseInt(v, 16)))(
			color.replace("#", "")
		);
	const isHexLight = (color) =>
		(([r, g, b]) => (r * 299 + g * 587 + b * 114) / 1000 > 155)(
			hexToRgb(color)
		);

	const [isCopied, setCopied] = useState(false);

	return (
		<CopyToClipboard
			text={props.color.hex}
			onCopy={() => {
				setCopied(true);
				setTimeout(() => {
					setCopied(false);
				}, 1500);
			}}>
			<div
				className={`colors-container__color ${
					isHexLight(props.color.hex) ? "light" : "dark"
				}`}
				style={{ backgroundColor: props.color.hex }}>
				<p className="colors-container__color-code">
					{isCopied ? "copied!" : props.color.hex}
				</p>
			</div>
		</CopyToClipboard>
	);
}
